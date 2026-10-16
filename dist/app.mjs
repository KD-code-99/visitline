import { demoRecord, newRecord, blankRoute, validateRecord, parseRecord, evaluateRecord, localToday, STATUS } from './core.mjs';
import { visitorHtml } from './export.mjs';

const byId = id => document.getElementById(id);
let record = validateRecord(demoRecord());
let selectedRoute = 'courtyard';
let selectedStage = 'courtyard-entrance';
const observationDrafts = new Map();
let checksDraft = null;
let eventDraft = false;
let importInProgress = false;

function stageValues(stage) {
  return { title: stage.title, widthCm: String(stage.widthCm ?? ''), steps: String(stage.steps ?? ''), availability: stage.availability, checkedOn: stage.checkedOn, note: stage.note };
}
function readStageValues() {
  return { title: byId('stage-title').value, widthCm: byId('stage-width').value, steps: byId('stage-steps').value, availability: byId('stage-availability').value, checkedOn: byId('stage-date').value, note: byId('stage-note').value };
}
function checkValues(requirements) {
  return { stepFree: requirements.stepFree, minWidthCm: String(requirements.minWidthCm), includeToilet: requirements.includeToilet };
}
function readCheckValues() {
  return { stepFree: byId('step-free').checked, minWidthCm: byId('min-width').value, includeToilet: byId('include-toilet').checked };
}
function hasDrafts() { return observationDrafts.size > 0 || checksDraft !== null || eventDraft; }
function renderDraftState() {
  byId('pending-edits').hidden = !hasDrafts();
  byId('observation-draft').hidden = !observationDrafts.has(selectedStage);
  byId('checks-draft').hidden = checksDraft === null;
}
async function mayExport() {
  return !hasDrafts() || await confirmAction(`Some edits have not been saved in this plan. Download version ${record.revision} without those edits? Choose Cancel to finish them first.`, 'Download without these edits');
}

function ask({ title, message, acceptLabel, value }) {
  const dialog = byId('action-dialog');
  if (dialog.open) throw new Error('Finish or cancel the open action first. Your current work has not changed.');
  const previousFocus = document.activeElement;
  byId('dialog-title').textContent = title;
  byId('dialog-message').textContent = message;
  byId('dialog-accept').textContent = acceptLabel;
  byId('dialog-input-label').hidden = value === undefined;
  byId('dialog-input').required = value !== undefined;
  byId('dialog-input').value = value ?? '';
  dialog.returnValue = '';
  return new Promise(resolve => {
    dialog.addEventListener('close', () => {
      const result = { accepted: dialog.returnValue === 'accept', value: byId('dialog-input').value };
      previousFocus?.focus({ preventScroll: true });
      resolve(result);
    }, { once: true });
    dialog.showModal();
    byId(value === undefined ? 'dialog-cancel' : 'dialog-input').focus();
  });
}
async function confirmAction(message, acceptLabel = 'Replace this plan') {
  return (await ask({ title: 'Keep your changes?', message, acceptLabel })).accepted;
}

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = String(value);
  return node;
}
function icon(kind) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', { met: 'm4 10 4 4 8-8', blocked: 'm5 5 10 10M15 5 5 15', unknown: 'M7 7a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01', excluded: 'M5 10h10', arrow: 'M4 10h12m-5-5 5 5-5 5' }[kind]);
  svg.append(path);
  return svg;
}
function notice(message, error = false) {
  const box = byId('notice');
  box.textContent = message;
  box.className = `notice${error ? ' error' : ''}`;
  box.setAttribute('role', error ? 'alert' : 'status');
  box.hidden = false;
  if (error) box.focus();
}
function currentRoute() { return record.routes.find(route => route.id === selectedRoute); }
function currentStage() { return currentRoute().stages.find(stage => stage.id === selectedStage); }
function commit(candidate, message, applied = () => {}) {
  try {
    record = validateRecord({ ...candidate, revision: record.revision + 1 });
    applied();
    render();
    if (message) notice(message);
    return true;
  } catch (error) { notice(error.message, true); return false; }
}
function safeAction(fn) { return async event => { event.preventDefault(); if (importInProgress) return; try { await fn(event); } catch (error) { notice(error.message, true); } }; }

function setImportBusy(busy) {
  importInProgress = busy;
  byId('app-header').inert = busy;
  byId('workspace').inert = busy;
  byId('workspace').setAttribute('aria-busy', String(busy));
  byId('file-read-status').hidden = !busy;
}

function statusLine(status) {
  const line = element('span', `status-line ${status}`);
  const marker = element('span', `state-marker ${status}`);
  marker.setAttribute('aria-hidden', 'true');
  line.append(marker, element('span', '', STATUS[status]));
  return line;
}

function render() {
  byId('event-title').textContent = record.event.title;
  byId('event-meta').textContent = [record.event.location || 'Add arrival details for your visitors', record.event.date].filter(Boolean).join(' · ');
  byId('demo-label').hidden = !record.demo;
  byId('needs-help').textContent = record.demo ? 'Choose their needs for this visit. The example numbers are made up.' : 'Check these starting values with your visitor. Ask how much space they need.';
  byId('session-state').textContent = `Plan version ${record.revision} · Kept only in this tab. Download an editable plan before closing it.`;
  const checks = checksDraft || checkValues(record.requirements);
  byId('step-free').checked = checks.stepFree;
  byId('min-width').value = checks.minWidthCm;
  byId('include-toilet').checked = checks.includeToilet;
  const results = evaluateRecord(record);
  const count = results.filter(result => result.status === 'met').length;
  byId('overview').textContent = count ? `${count} ${count === 1 ? 'route matches' : 'routes match'} these needs, based on the organiser’s notes. See each part below.` : results.some(result => result.status === 'unknown') ? 'Something still needs checking. Select a route to see what to ask.' : 'Each route has a problem for these needs. Select one to see where.';
  byId('add-route').disabled = record.routes.length >= 4;
  const options = byId('route-options');
  options.replaceChildren();
  for (const result of results) {
    const button = element('button', 'route-option');
    button.id = `choose-${result.route.id}`;
    button.type = 'button';
    button.setAttribute('aria-pressed', String(result.route.id === selectedRoute));
    const name = element('span', 'route-option-name', result.route.name);
    name.append(icon('arrow'));
    button.append(name, statusLine(result.status));
    button.addEventListener('click', () => {
      selectedRoute = result.route.id;
      const next = result.stages.find(stage => stage.status === 'unknown' || stage.status === 'blocked') || result.stages[0];
      selectedStage = next.stage.id;
      render();
      byId(`choose-${selectedRoute}`).focus({ preventScroll: true });
    });
    options.append(button);
  }
  const result = results.find(item => item.route.id === selectedRoute);
  byId('selected-route-title').textContent = result.route.name;
  const resultBox = byId('route-result');
  resultBox.className = `route-result ${result.status}`;
  resultBox.replaceChildren(element('p', '', STATUS[result.status]));
  const firstReason = result.blockers[0] || result.unknowns[0];
  resultBox.append(element('p', '', firstReason ? `${firstReason.stage.title}: ${firstReason.message}` : 'The organiser’s notes match these needs at each included part of the route. Ask about anything else you need.'));
  if (result.blockers.length && result.unknowns.length) resultBox.append(element('p', '', `${result.unknowns.length} ${result.unknowns.length === 1 ? 'detail also needs' : 'details also need'} checking on this route.`));
  const chain = byId('route-chain');
  chain.replaceChildren();
  for (const stageResult of result.stages) {
    const { stage, status } = stageResult;
    const li = element('li', `chain-stage ${status}`);
    const button = element('button', 'stage-target');
    button.id = `edit-${stage.id}`;
    button.type = 'button';
    button.setAttribute('aria-pressed', String(stage.id === selectedStage));
    button.setAttribute('aria-controls', 'observation-editor');
    const stop = element('span', 'stage-stop');
    stop.append(icon(status));
    button.append(stop, element('span', 'stage-kind', stage.kind[0].toUpperCase() + stage.kind.slice(1)), element('span', 'stage-name', stage.title));
    button.append(element('span', 'stage-measurement', stage.widthCm === null ? 'Space not measured' : `${stage.widthCm} cm of space`));
    button.append(element('span', 'stage-status', { met: 'Details match', unknown: 'Needs checking', blocked: 'Does not match', excluded: 'Not included' }[status]));
    button.addEventListener('click', () => { selectedStage = stage.id; render(); byId(`edit-${stage.id}`).focus({ preventScroll: true }); });
    li.append(button);
    chain.append(li);
  }
  const next = byId('next-observation');
  next.replaceChildren();
  if (firstReason) {
    const paragraph = element('p');
    paragraph.append(element('strong', '', result.status === 'unknown' ? 'What to check next' : 'The first problem on this route'), document.createTextNode(`${firstReason.stage.title} · ${firstReason.message}`));
    const button = element('button', 'quiet', 'Add or change this detail');
    button.type = 'button';
    button.addEventListener('click', () => {
      selectedStage = firstReason.stage.id;
      render();
      byId('observation-editor').scrollIntoView({ behavior: 'auto', block: 'center' });
      byId(({ widthCm: 'stage-width', steps: 'stage-steps', availability: 'stage-availability', checkedOn: 'stage-date', note: 'stage-note' })[firstReason.field]).focus({ preventScroll: true });
    });
    next.append(paragraph, button);
  } else {
    next.append(element('p', '', 'These details match the selected needs. Preview the visitor card, and ask the organiser about anything else that matters.'));
  }
  fillStageEditor();
  renderDraftState();
  if (!byId('visitor-preview').hidden) renderPreview();
}

function fillStageEditor() {
  const stage = currentStage();
  const values = observationDrafts.get(stage.id) || stageValues(stage);
  byId('observation-context').textContent = `${currentRoute().name} · ${stage.kind}`;
  byId('stage-title').value = values.title;
  byId('stage-width').value = values.widthCm;
  byId('stage-steps').value = values.steps;
  byId('stage-availability').value = values.availability;
  byId('stage-date').value = values.checkedOn;
  byId('stage-date').max = localToday();
  byId('stage-note').value = values.note;
}

function renderPreview() {
  const root = byId('preview-content');
  root.replaceChildren();
  if (record.demo) root.append(element('p', 'demo-label', 'Fictional example — not a real venue'));
  root.append(element('h2', '', record.event.title), element('p', '', record.event.location || 'Location not added'), element('p', 'meta', `Event: ${record.event.date || 'date not added'} · Plan version ${record.revision}`));
  const checks = record.requirements;
  root.append(element('p', 'preview-requirements', `${checks.stepFree ? 'Needs a route with no steps' : 'Steps are not being checked'} · Needs at least ${checks.minWidthCm} cm of space to get through · ${checks.includeToilet ? 'Way to a toilet included' : 'Way to a toilet not checked'}. These needs were chosen for this visit; other visitors may need something different.`));
  for (const result of evaluateRecord(record)) {
    const section = element('section', 'preview-route');
    section.append(element('h3', '', result.route.name), statusLine(result.status));
    const list = element('ol');
    for (const { stage, status, reasons } of result.stages) {
      const li = element('li');
      li.append(element('strong', '', `${stage.title} — ${STATUS[status]}`));
      if (status !== 'excluded') {
        li.append(element('p', '', `Space to get through: ${stage.widthCm === null ? 'not measured' : `${stage.widthCm} cm`}. Steps: ${stage.steps ?? 'not known'}. ${stage.availability === 'unknown' ? 'Ask if this part is open.' : `This part is ${stage.availability}.`}`), element('p', '', `Checked: ${stage.checkedOn || 'date not added'}. ${stage.note || 'No note about how it was checked.'}`));
        reasons.forEach(reason => li.append(element('p', '', reason.message)));
      } else li.append(element('p', '', 'This part was not checked for this visit.'));
      list.append(li);
    }
    section.append(list);
    root.append(section);
  }
  const limits = element('div', 'preview-limits');
  limits.append(element('h3', '', 'Before you visit'), element('p', '', 'This card compares details entered by the organiser. Visitline has not inspected the venue and cannot confirm it is safe, meets legal standards or suits every access need. Ask about slopes, surfaces, assistance, hearing or sight support and emergency exits.'), element('p', '', record.event.contact || 'Ask the organiser about other needs and whether these details are still current.'), element('p', '', `This card shows plan version ${record.revision}. Later changes do not update a card you have already downloaded.`));
  root.append(limits);
}

function download(contents, filename, type) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
function filename(suffix) { return `${record.event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0,55) || 'visitline'}-r${record.revision}.${suffix}`; }
function replaceRecord(candidate, message) {
  record = validateRecord(candidate);
  observationDrafts.clear();
  checksDraft = null;
  eventDraft = false;
  selectedRoute = record.routes[0].id;
  selectedStage = record.routes[0].stages[0].id;
  byId('event-editor').hidden = true;
  render();
  notice(message);
}
async function mayDiscard() {
  return (record.demo && record.revision === 1 && !hasDrafts()) || await confirmAction('Replace this plan and any unfinished edits? To keep them, choose Cancel, finish your edits, and download an editable plan first.');
}

byId('observation-form').addEventListener('input', () => {
  const values = readStageValues();
  if (JSON.stringify(values) === JSON.stringify(stageValues(currentStage()))) observationDrafts.delete(selectedStage);
  else observationDrafts.set(selectedStage, values);
  renderDraftState();
});
byId('checks-form').addEventListener('input', () => {
  const values = readCheckValues();
  checksDraft = JSON.stringify(values) === JSON.stringify(checkValues(record.requirements)) ? null : values;
  renderDraftState();
});
byId('event-form').addEventListener('input', () => { eventDraft = true; renderDraftState(); });
byId('checks-form').addEventListener('submit', safeAction(() => {
  const candidate = structuredClone(record);
  candidate.requirements = { stepFree: byId('step-free').checked, minWidthCm: Number(byId('min-width').value), includeToilet: byId('include-toilet').checked };
  commit(candidate, 'Results updated for every route using these needs.', () => { checksDraft = null; });
}));
byId('observation-form').addEventListener('submit', safeAction(() => {
  const candidate = structuredClone(record);
  const stage = candidate.routes.find(route => route.id === selectedRoute).stages.find(stage => stage.id === selectedStage);
  Object.assign(stage, { title: byId('stage-title').value.trim(), widthCm: byId('stage-width').value === '' ? null : Number(byId('stage-width').value), steps: byId('stage-steps').value === '' ? null : Number(byId('stage-steps').value), availability: byId('stage-availability').value, checkedOn: byId('stage-date').value, note: byId('stage-note').value.trim() });
  commit(candidate, 'Detail added to this plan. The results and visitor card have been updated.', () => observationDrafts.delete(stage.id));
}));
byId('edit-event').addEventListener('click', () => {
  if (!eventDraft) {
    byId('event-name-input').value = record.event.title;
    byId('event-date-input').value = record.event.date;
    byId('event-location-input').value = record.event.location;
    byId('event-contact-input').value = record.event.contact;
  }
  byId('event-editor').hidden = false;
  byId('event-name-input').focus();
});
byId('cancel-event').addEventListener('click', safeAction(async () => {
  if (eventDraft && !await confirmAction('Discard the event details you have not saved in this plan?', 'Discard these edits')) return;
  eventDraft = false;
  byId('event-editor').hidden = true;
  renderDraftState();
  byId('edit-event').focus();
}));
byId('event-form').addEventListener('submit', safeAction(() => {
  const candidate = structuredClone(record);
  candidate.event = { title: byId('event-name-input').value.trim(), location: byId('event-location-input').value.trim(), date: byId('event-date-input').value, contact: byId('event-contact-input').value.trim() };
  if (commit(candidate, 'Event details updated. Download a new card if you shared an older one.', () => { eventDraft = false; })) byId('event-editor').hidden = true;
}));
byId('add-route').addEventListener('click', safeAction(() => {
  const candidate = structuredClone(record);
  const route = blankRoute(`r-${crypto.randomUUID().slice(0,8)}`, `Alternative route ${candidate.routes.length + 1}`);
  candidate.routes.push(route);
  const previousRoute = selectedRoute;
  const previousStage = selectedStage;
  selectedRoute = route.id;
  selectedStage = route.stages[0].id;
  if (!commit(candidate, 'Another route added. Add what you know about each part.')) { selectedRoute = previousRoute; selectedStage = previousStage; }
}));
byId('rename-route').addEventListener('click', safeAction(async () => {
  const originalRecord = record;
  const routeId = selectedRoute;
  const answer = await ask({ title: 'Name this route', message: 'Use a name that helps visitors distinguish the alternatives.', acceptLabel: 'Save route name', value: currentRoute().name });
  if (!answer.accepted) return;
  if (record !== originalRecord) { notice('The plan changed while this box was open. Select the route and try again.', true); return; }
  const candidate = structuredClone(record);
  candidate.routes.find(route => route.id === routeId).name = answer.value.trim();
  commit(candidate, 'Route name updated.');
}));
byId('new-event').addEventListener('click', safeAction(async () => { if (await mayDiscard()) { replaceRecord(newRecord(), 'New plan started. Add only the details you know.'); byId('edit-event').click(); } }));
byId('load-example').addEventListener('click', safeAction(async () => { if (await mayDiscard()) { replaceRecord(demoRecord(), 'Fictional example loaded. These are not measurements of a real venue.'); selectedRoute = 'courtyard'; selectedStage = 'courtyard-entrance'; render(); } }));
byId('preview-card').addEventListener('click', () => { byId('visitor-preview').hidden = false; renderPreview(); byId('visitor-preview').scrollIntoView({ behavior: 'auto', block: 'start' }); byId('close-preview').focus({ preventScroll: true }); });
byId('close-preview').addEventListener('click', () => { byId('visitor-preview').hidden = true; byId('preview-card').focus(); });
byId('save-record').addEventListener('click', safeAction(async () => { if (await mayExport()) { download(JSON.stringify(record, null, 2), filename('json'), 'application/json'); notice(`Download started for editable plan version ${record.revision}. Check your downloads before closing this tab. Open that file here to make changes later.`); } }));
byId('download-card').addEventListener('click', safeAction(async () => { if (await mayExport()) { download(visitorHtml(record), filename('html'), 'text/html'); notice(`Download started for visitor card version ${record.revision}. Open the file to read or print it. It includes the organiser’s notes and the chosen needs.`); } }));
byId('import-record').addEventListener('click', () => byId('record-file').click());
byId('record-file').addEventListener('change', async event => {
  if (importInProgress || byId('action-dialog').open) return;
  const input = event.currentTarget;
  const file = input.files[0];
  if (!file) return;
  setImportBusy(true);
  let failed = false;
  try {
    if (file.size > 204800) throw new Error('Choose an editable Visitline plan file smaller than 200 KiB.');
    const candidate = parseRecord(await file.text());
    if (await mayDiscard()) replaceRecord(candidate, `Plan version ${candidate.revision} opened. Its results have been checked again.`);
  } catch (error) { failed = true; notice(error.message, true); }
  finally {
    input.value = '';
    setImportBusy(false);
    byId(failed ? 'notice' : 'import-record').focus({ preventScroll: true });
  }
});

render();
