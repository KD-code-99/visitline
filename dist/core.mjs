export const STAGES = ['arrival', 'entrance', 'seating', 'toilet'];
export const STATUS = {
  met: 'These details match',
  unknown: 'Needs checking',
  blocked: 'Does not meet these needs',
  excluded: 'Not checked for this visit',
};

function object(value, keys, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path} must be an object.`);
  const extras = Object.keys(value).filter(key => !keys.includes(key));
  if (extras.length) throw new Error(`${path} contains unsupported fields: ${extras.join(', ')}.`);
  for (const key of keys) if (!(key in value)) throw new Error(`${path}.${key} is missing.`);
}
function text(value, max, path, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`${path} must be ${required ? 'nonempty text' : 'text'} of at most ${max} characters.`);
}
function date(value, path) {
  text(value, 10, path);
  if (value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) throw new Error(`${path} must be a real date in YYYY-MM-DD form.`);
}
function number(value, min, max, path, nullable = false, integer = false) {
  if (nullable && value === null) return;
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) throw new Error(`${path} must be ${integer ? 'a whole number' : 'a number'} from ${min} to ${max}${nullable ? ', or blank' : ''}.`);
}

export function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function validateRecord(record, { today = localToday() } = {}) {
  object(record, ['schemaVersion', 'revision', 'demo', 'event', 'requirements', 'routes'], 'Record');
  if (record.schemaVersion !== 1) throw new Error('This file was made for a different version of Visitline. Your current plan has not changed.');
  number(record.revision, 1, 1000000, 'Revision', false, true);
  if (typeof record.demo !== 'boolean') throw new Error('The fictional-example flag must be true or false.');
  object(record.event, ['title', 'location', 'date', 'contact'], 'Event');
  text(record.event.title, 100, 'Event title', true);
  text(record.event.location, 180, 'Location');
  text(record.event.contact, 200, 'Host contact note');
  date(record.event.date, 'Event date');
  object(record.requirements, ['stepFree', 'minWidthCm', 'includeToilet'], 'Visitor checks');
  for (const key of ['stepFree', 'includeToilet']) if (typeof record.requirements[key] !== 'boolean') throw new Error(`${key} must be true or false.`);
  number(record.requirements.minWidthCm, 1, 500, 'Minimum clear width');
  if (!Array.isArray(record.routes) || record.routes.length < 1 || record.routes.length > 4) throw new Error('A record needs between one and four routes.');
  const identities = new Set();
  function identity(value, path) {
    if (typeof value !== 'string' || !/^[a-zA-Z0-9-]{1,40}$/.test(value) || identities.has(value)) throw new Error(`${path} needs a unique letters/numbers/hyphens ID.`);
    identities.add(value);
  }
  for (const route of record.routes) {
    object(route, ['id', 'name', 'stages'], 'Route');
    identity(route.id, 'Route');
    text(route.name, 100, 'Route name', true);
    if (!Array.isArray(route.stages) || route.stages.length !== STAGES.length) throw new Error('Each route must include arrival, entrance, seating and toilet stages.');
    route.stages.forEach((stage, i) => {
      object(stage, ['id', 'kind', 'title', 'widthCm', 'steps', 'availability', 'checkedOn', 'note'], 'Stage');
      identity(stage.id, 'Stage');
      if (stage.kind !== STAGES[i]) throw new Error('Visit stages must stay in arrival, entrance, seating, toilet order.');
      text(stage.title, 100, 'Stage title', true);
      number(stage.widthCm, 0.1, 10000, 'Recorded clear width', true);
      number(stage.steps, 0, 1000, 'Recorded steps', true, true);
      if (!['open', 'closed', 'unknown'].includes(stage.availability)) throw new Error('Passage availability must be open, closed or unknown.');
      date(stage.checkedOn, 'Observation date');
      if (stage.checkedOn > today) throw new Error('The check date is in the future. Enter the date this was actually checked. Your current plan has not changed.');
      if (record.event.date && stage.checkedOn && stage.checkedOn > record.event.date) throw new Error('The check date is after the event. Please check both dates.');
      text(stage.note, 600, 'Observation note');
    });
  }
  return structuredClone(record);
}

export function parseRecord(source, options) {
  if (typeof source !== 'string' || new TextEncoder().encode(source).length > 204800) throw new Error('Choose an editable Visitline plan file smaller than 200 KiB.');
  let parsed;
  try { parsed = JSON.parse(source); } catch { throw new Error('This is not a valid JSON plan file. Choose a file downloaded with Download editable plan. Your current plan has not changed.'); }
  return validateRecord(parsed, options);
}

export function evaluateStage(stage, requirements) {
  if (stage.kind === 'toilet' && !requirements.includeToilet) return { status: 'excluded', reasons: [], stage };
  const reasons = [];
  function reason(status, field, message) { reasons.push({ status, field, message }); }
  if (stage.availability === 'closed') reason('blocked', 'availability', 'The organiser says this part is closed.');
  if (stage.availability === 'unknown') reason('unknown', 'availability', 'Ask the organiser whether this part is open.');
  if (stage.widthCm === null) reason('unknown', 'widthCm', 'The organiser still needs to measure the space to get through.');
  else if (stage.widthCm < requirements.minWidthCm) reason('blocked', 'widthCm', `There is ${stage.widthCm} cm of space. This visitor needs at least ${requirements.minWidthCm} cm.`);
  if (requirements.stepFree) {
    if (stage.steps === null) reason('unknown', 'steps', 'Ask the organiser how many steps there are.');
    else if (stage.steps > 0) reason('blocked', 'steps', `There ${stage.steps === 1 ? 'is 1 step' : `are ${stage.steps} steps`}. This visitor needs a route with no steps.`);
  }
  if (!stage.checkedOn) reason('unknown', 'checkedOn', 'Add the date when this was checked.');
  if (!stage.note.trim()) reason('unknown', 'note', 'Add a note about what was checked and how.');
  const status = reasons.some(r => r.status === 'blocked') ? 'blocked' : reasons.length ? 'unknown' : 'met';
  return { status, reasons, stage };
}

export function evaluateRoute(route, requirements) {
  const stages = route.stages.map(stage => evaluateStage(stage, requirements));
  const status = stages.some(s => s.status === 'blocked') ? 'blocked' : stages.some(s => s.status === 'unknown') ? 'unknown' : 'met';
  return { route, status, stages, blockers: stages.flatMap(s => s.reasons.filter(r => r.status === 'blocked').map(r => ({ ...r, stage: s.stage }))), unknowns: stages.flatMap(s => s.reasons.filter(r => r.status === 'unknown').map(r => ({ ...r, stage: s.stage }))) };
}

export function evaluateRecord(record) {
  return record.routes.map(route => evaluateRoute(route, record.requirements));
}

export function blankRoute(id, name = 'Main entrance route') {
  return { id, name, stages: STAGES.map(kind => ({ id: `${id}-${kind}`, kind, title: { arrival: 'Arrival point', entrance: 'Entrance', seating: 'Route to seating', toilet: 'Route to toilet' }[kind], widthCm: null, steps: null, availability: 'unknown', checkedOn: '', note: '' })) };
}

export function newRecord(event = { title: 'My event', location: '', date: '', contact: '' }) {
  return { schemaVersion: 1, revision: 1, demo: false, event, requirements: { stepFree: true, minWidthCm: 90, includeToilet: true }, routes: [blankRoute('main')] };
}

export function demoRecord() {
  const record = newRecord({ title: 'An evening at the makers hall', location: 'Fictional community hall · demonstration only', date: '2026-10-24', contact: 'Example host: ask about any access needs outside these checks.' });
  record.demo = true;
  const front = blankRoute('front', 'Through the front entrance');
  const courtyard = blankRoute('courtyard', 'Through the courtyard');
  for (const route of [front, courtyard]) route.stages.forEach((stage, index) => {
    stage.widthCm = [140, 96, 110, 95][index];
    stage.steps = 0;
    stage.availability = 'open';
    stage.checkedOn = '2026-10-16';
    stage.note = 'Made-up example: the organiser measured the narrowest space someone can get through.';
  });
  front.stages[1].steps = 3;
  front.stages[1].title = 'Front door and steps';
  front.stages[1].note = 'Made-up example: there are three steps at the front door, with no ramp on this route.';
  courtyard.stages[1].widthCm = null;
  courtyard.stages[1].title = 'Courtyard doorway';
  courtyard.stages[1].note = 'Made-up example: there are no steps here. The organiser has not measured the doorway yet.';
  record.routes = [front, courtyard];
  return record;
}
