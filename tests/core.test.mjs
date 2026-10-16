import test from 'node:test';
import assert from 'node:assert/strict';
import { demoRecord, newRecord, validateRecord, parseRecord, evaluateRecord, evaluateRoute } from '../dist/core.mjs';

test('stairs and an unmeasured door remain distinct in the matched example', () => {
  const record = validateRecord(demoRecord());
  const [front, courtyard] = evaluateRecord(record);
  assert.equal(front.status, 'blocked');
  assert.equal(front.blockers[0].stage.kind, 'entrance');
  assert.equal(courtyard.status, 'unknown');
  assert.equal(courtyard.unknowns[0].field, 'widthCm');
  record.routes[1].stages[1].widthCm = 96;
  assert.equal(evaluateRecord(record)[1].status, 'met');
});

test('changing one requirement reevaluates all relevant stops, including the toilet', () => {
  const record = demoRecord();
  record.routes[1].stages[1].widthCm = 96;
  record.requirements.minWidthCm = 100;
  const result = evaluateRecord(record)[1];
  assert.equal(result.status, 'blocked');
  assert.deepEqual(result.blockers.map(x => x.stage.kind), ['entrance', 'toilet']);
  record.requirements.minWidthCm = 96;
  record.requirements.includeToilet = false;
  assert.equal(evaluateRecord(record)[1].status, 'met');
  assert.equal(evaluateRecord(record)[1].stages[3].status, 'excluded');
});

test('boundary width passes, closed passage fails, and provenance remains necessary', () => {
  const record = demoRecord();
  const route = record.routes[1];
  route.stages[1].widthCm = 90;
  assert.equal(evaluateRoute(route, record.requirements).status, 'met');
  route.stages[1].availability = 'closed';
  route.stages[1].checkedOn = '';
  const result = evaluateRoute(route, record.requirements);
  assert.equal(result.status, 'blocked');
  assert.equal(result.unknowns.length, 1, 'a known blocker must not hide a missing observation date');
});

test('fresh records remain unconfirmed and JSON round trips preserve every fact', () => {
  const record = newRecord();
  assert.equal(evaluateRecord(record)[0].status, 'unknown');
  assert.deepEqual(parseRecord(JSON.stringify(record)), record);
  const clone = validateRecord(record);
  clone.event.title = 'Changed copy';
  assert.equal(record.event.title, 'My event');
});

test('future observations reject at the shared boundary, including imported records', () => {
  const record = demoRecord();
  record.event.date = '2099-12-31';
  record.routes[1].stages[1].widthCm = 96;
  assert.doesNotThrow(() => validateRecord(record, { today: '2026-10-16' }));
  record.routes[1].stages[1].checkedOn = '2026-10-17';
  assert.throws(() => validateRecord(record, { today: '2026-10-16' }), /future/);
  assert.throws(() => parseRecord(JSON.stringify(record), { today: '2026-10-16' }), /future/);
  record.routes.forEach(route => route.stages.forEach(stage => { stage.checkedOn = '2099-12-30'; }));
  assert.throws(() => parseRecord(JSON.stringify(record)), /future/);
  assert.doesNotThrow(() => validateRecord(record, { today: '2099-12-30' }));
});

test('malformed versions, numbers, stage order and duplicate identities fail visibly', () => {
  const mutations = [
    r => { r.schemaVersion = 2; },
    r => { r.extra = true; },
    r => { r.requirements.minWidthCm = Infinity; },
    r => { r.routes[0].stages[0].widthCm = 0; },
    r => { r.routes[0].stages[0].steps = 0.5; },
    r => { r.routes[0].stages[0].checkedOn = '2026-02-30'; },
    r => { r.routes[0].stages[0].checkedOn = '2026-10-25'; },
    r => { r.routes[0].stages.reverse(); },
    r => { r.routes[0].id = r.routes[1].id; },
    r => { r.event.title = ''; },
    r => { r.routes = []; },
  ];
  for (const mutate of mutations) {
    const record = demoRecord();
    mutate(record);
    assert.throws(() => validateRecord(record));
  }
  assert.throws(() => parseRecord('{bad'), /valid JSON/);
  assert.throws(() => parseRecord(' '.repeat(204801)), /200 KiB/);
});

test('an independent tabular oracle agrees over all small width/step/availability combinations', () => {
  const record = demoRecord();
  const route = record.routes[1];
  let checked = 0;
  for (const width of [null, 80, 90, 100]) for (const steps of [null, 0, 1]) for (const availability of ['unknown', 'open', 'closed']) for (const stepFree of [false, true]) {
    const candidate = structuredClone(route);
    candidate.stages[1] = { ...candidate.stages[1], widthCm: width, steps, availability };
    const requirements = { ...record.requirements, stepFree };
    const obstruction = availability === 'closed' || (width !== null && width < 90) || (stepFree && steps !== null && steps > 0);
    const incomplete = availability === 'unknown' || width === null || (stepFree && steps === null);
    const expected = obstruction ? 'blocked' : incomplete ? 'unknown' : 'met';
    assert.equal(evaluateRoute(candidate, requirements).status, expected, JSON.stringify({ width, steps, availability, stepFree }));
    checked++;
  }
  assert.equal(checked, 72);
});
