import test from 'node:test';
import assert from 'node:assert/strict';
import { demoRecord, parseRecord, evaluateRecord } from '../dist/core.mjs';
import { escapeHtml, visitorHtml } from '../dist/export.mjs';

test('the offline card contains exact results, selected checks and the fictional-data flag', () => {
  const record = demoRecord();
  const html = visitorHtml(record);
  assert.match(html, /FICTIONAL EXAMPLE/);
  assert.match(html, /Needs checking/);
  assert.match(html, /There are 3 steps/);
  assert.match(html, /needs at least 90 cm of space/);
  assert.match(html, /Plan version 1/);
  assert.match(html, /Later changes/);
  assert.doesNotMatch(html, /<script\b|<iframe\b|<img\b|<link\b|\son\w+=/i);
});

test('hostile imported text remains text in the card, including attribute-breaking strings', () => {
  const record = demoRecord();
  record.event.title = '<img src=x onerror=alert(1)>';
  record.routes[0].stages[0].note = '</style><script>alert(1)</script> & "quoted"';
  const html = visitorHtml(parseRecord(JSON.stringify(record)));
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(html, /&lt;\/style&gt;&lt;script&gt;/);
  assert.doesNotMatch(html, /<script\b|<img\b/i);
  assert.equal(escapeHtml('\'"<&>'), '&#39;&quot;&lt;&amp;&gt;');
});

test('JSON handoff reproduces an edited event and complete route judgments', () => {
  const original = demoRecord();
  original.routes[1].stages[1].widthCm = 96;
  original.revision = 7;
  const received = parseRecord(JSON.stringify(original));
  assert.deepEqual(evaluateRecord(received), evaluateRecord(original));
  assert.match(visitorHtml(received), /Plan version 7/);
  assert.match(visitorHtml(received), /96 cm/);
});
