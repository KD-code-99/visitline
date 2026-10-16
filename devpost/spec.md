---
doc: spec
status: draft
---
# Visitline — technical plan

## How This Works, In Plain Language
The host records facts about each part of a route. A small checker compares them with the visitor's chosen requirements. The page draws the connected result and explains each mismatch or missing fact. Files can carry the record and a readable snapshot to another session; a server never needs the record.

## The Core Journey Through the System
Form input → validated event record → pure route evaluator → text/diagram rendering → escaped HTML or versioned JSON download. Import validates a complete candidate before replacing the current record. Implements `prd.md > The Core Journey`.

## Stack
Browser-native HTML/CSS/JavaScript modules; Node 22+ for the local static server and built-in test runner. No third-party runtime dependencies, paid APIs or model downloads. This is an agent recommendation under delegated implementation authority, not a reported learner stack preference.

References: [HTML](https://html.spec.whatwg.org/), [Node test runner](https://nodejs.org/api/test.html), [Node HTTP](https://nodejs.org/api/http.html).

## Where It Runs and How Someone Tries It
Run `node server.mjs`, open `http://127.0.0.1:4187`, choose the fictional example. Tests: `node --test`. Static deployment is optional; the required public source and 1–3 minute video remain separate deliverables. No API key is needed.

## Look and Feel
Carry `prd.md > Look and Feel` into a readable workspace. Diagram and text use the same evaluator output; color is never the sole state indicator. At 320px, routes stack rather than clipping. Print styles remove editing controls while retaining observations and scope.

## Components
### Evaluation and record validation — `dist/core.mjs`
One small public interface validates records and computes route judgments with explicit reasons. No DOM, storage, network or wall-clock dependency in the evaluator. Implements connected evaluation and observation bounds.

### Safe export — `dist/export.mjs`
Generate script-free offline HTML from the same record and evaluation. Encode every user-supplied string. JSON carries a schema version, fictional-data flag, revision, event metadata, requirements and routes. Implements portable records.

### Workspace — `dist/app.mjs`, `dist/index.html`, `dist/styles.css`
Keep one in-memory event and separate drafts for unfinished forms. Render user text with DOM text nodes. Event handlers validate edits, update a copy, evaluate and render. File import is bounded to 200 KiB and blocks competing edits through reading/confirmation. HTML dialogs protect replacement/export decisions. No local/session storage, cookies, fetch calls or third-party asset requests. The font is self-hosted with its license. Implements editing, preview and states.

### Local serving — `server.mjs`
Serve only files below `dist/`, bind loopback, reject traversal and unsupported methods. Add a restrictive CSP. No write endpoint. This process serves source assets, not user event records.

## Data Model
Schema version 1. Event: title, optional date, revision, `demo` flag. Requirements: stepFree boolean, minWidthCm positive number, includeToilet boolean. Up to four routes; each has stable ID, name and four stages. A stage has ID/kind/title, widthCm nullable, steps nullable, availability `open|closed|unknown`, checkedOn date or blank, note text. Limits prevent oversized and malformed imports. Stored observations are host-reported; the app does not authenticate them.

## File Structure
```
dist/             # complete unbundled browser application
  core.mjs        # validation and evaluation
  export.mjs      # offline visitor card
  app.mjs         # DOM and interactions
  styles.css
  index.html
tests/            # independent fixture and boundary checks
server.mjs
devpost/          # skill-generated planning and learning artifacts
docs/             # primary-source research and verification notes
evidence/         # actual sanitized verification outputs
```

## Important Failure Modes
- Missing fact accidentally becomes a positive claim → retain nulls and require all relevant observations.
- User text becomes active HTML → textContent in the app; explicit encoding and script-free export.
- Bad import destroys work → validate completely before assignment; bounded file read.
- A saved card drifts from later edits → revision and snapshot labels on every card.
- A future imported date claims a completed check → shared validation rejects dates after today, including imports.
- Another form update discards unfinished work → separate drafts survive navigation and independent saves; downloads use the saved-in-plan version and explain pending edits.
- An import races another action → hold a busy transaction through file reading and confirmation; reject overlapping dialogs and stale rename state.

## What Was Simplified and Why
Fixed visit stages keep the proof of concept small. The evaluator checks only step-free status, clear width, availability and recorded observation completeness. It does not substitute for professional assessment or cover all access needs. No AI inference is presented as a measurement.

## Decisions and Open Issues
The load-bearing uncertainty is whether unknown propagation and cause visibility improve comprehension. The first prototype test will challenge those, separately from correctness tests. No genuine learner uncertainty about a technical tool has yet been reported; do not invent one. Scope/PRD/spec approval remains pending, and this is not a claim that all classroom checkpoints are complete.
