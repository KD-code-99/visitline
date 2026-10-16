import { evaluateRecord, STATUS, validateRecord } from './core.mjs';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

export function visitorHtml(input) {
  const record = validateRecord(input);
  const e = escapeHtml;
  const requirement = `${record.requirements.stepFree ? 'Needs a route with no steps' : 'Steps are not being checked'}; needs at least ${record.requirements.minWidthCm} cm of space to get through; ${record.requirements.includeToilet ? 'way to a toilet included' : 'way to a toilet not checked'}.`;
  const routes = evaluateRecord(record).map(result => `<section><h2>${e(result.route.name)}</h2><p class="result ${result.status}">${e(STATUS[result.status])}</p><ol>${result.stages.map(({ stage, status, reasons }) => `<li><h3>${e(stage.title)}</h3><p><strong>${e(STATUS[status])}</strong></p>${status === 'excluded' ? '<p>This part was not checked for this visit.</p>' : `<p>Space to get through: ${stage.widthCm === null ? 'not measured' : `${e(stage.widthCm)} cm`}. Steps: ${stage.steps === null ? 'not known' : e(stage.steps)}. ${stage.availability === 'unknown' ? 'Ask if this part is open.' : `This part is ${e(stage.availability)}.`}</p><p>Checked: ${e(stage.checkedOn || 'date not added')}. Organiser’s note: ${e(stage.note || 'No note about how it was checked.')}</p>${reasons.length ? `<ul>${reasons.map(reason => `<li>${e(reason.message)}</li>`).join('')}</ul>` : ''}`}</li>`).join('')}</ol></section>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; script-src 'none'; base-uri 'none'; form-action 'none'"><title>${e(record.event.title)} — visitor route card</title><style>body{font:17px/1.6 system-ui,sans-serif;color:#193e36;background:#fffefa;max-width:850px;margin:40px auto;padding:0 24px}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.2}h1{font-size:36px}h2{font-size:28px;margin-top:36px}h3{font-size:18px;margin-bottom:4px}p,li{overflow-wrap:anywhere}p{margin:7px 0}.meta{color:#52675f}.requirements,.limits{border-top:1px solid #cbd3c8;border-bottom:1px solid #cbd3c8;padding:18px 0;margin:24px 0}.result{font-weight:650}.met{color:#22664f}.unknown{color:#80501c}.blocked{color:#923e35}ol>li{margin:22px 0}ul>li{margin:6px 0}.demo{font-weight:650;color:#80501c}@media print{body{margin:0;padding:0;color:#000}section{break-inside:avoid}}</style></head><body>
${record.demo ? '<p class="demo">FICTIONAL EXAMPLE — not information about a real venue</p>' : ''}
<h1>${e(record.event.title)}</h1><p class="meta">${e(record.event.location || 'Location not added')}</p><p class="meta">Event date: ${e(record.event.date || 'not added')} · Plan version ${record.revision}</p>
<div class="requirements"><h2>Needs for this visit</h2><p>${e(requirement)}</p><p>These needs were chosen for this visit. Other visitors may need something different.</p></div>
${routes}
<div class="limits"><h2>Before you visit</h2><p>This card compares details entered by the organiser. Visitline has not inspected the venue and cannot confirm it is safe, meets legal standards or suits every access need. Ask about slopes, surfaces, assistance, hearing or sight support and emergency exits.</p><p>Ask the organiser: ${e(record.event.contact || 'Check other needs and whether these details are still current.')}</p><p>This card shows plan version ${record.revision}. Later changes do not update a card you have already downloaded. Dates and missing details are shown above.</p></div>
<p class="meta">Created with Visitline. This file works on its own, with no scripts, online assets or tracking.</p></body></html>`;
}
