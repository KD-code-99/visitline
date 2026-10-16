---
doc: checklist
status: draft
---
# Build and submission checklist

Canonical work ledger. Build mode: agent-led technical execution requested by user; personal learner checkpoints are recorded separately and will not be impersonated.

## Slices
- [ ] **1. An observation changes an understandable route judgment**
  Becomes usable: A fictional event, visitor checks, connected route display and editable observations.
  Why now: Proves the unique mechanism before extra features.
  PRD ref: `prd.md > Connected route evaluation`, `Observation editing`
  Spec ref: `spec.md > Evaluation and record validation`, `Workspace`
  Build: Implement pure evaluation, validated editing and accessible rendering.
  Verify (mechanical): Hand-computable fixtures and actual browser scenario: stairs versus unknown width; record a width; tighten the requirement; close a segment.
  Learner check: Pending; agent tests do not count as learner feedback.
  Commit: `Build the event access-chain prototype`

- [ ] **2. The same record survives a file handoff**
  Becomes usable: JSON download/import and a script-free offline visitor card.
  Why now: Makes the useful result portable and completes the actual host-to-visitor journey.
  PRD ref: `prd.md > Portable records`, `Visitor checks and preview`
  Spec ref: `spec.md > Safe export`, `Local serving`
  Build: Add bounded import, safe HTML export, snapshot revision, printing and run instructions.
  Verify (mechanical): Exact round trip, malformed-file preservation, hostile text encoding, standalone card, narrow viewport and keyboard journey.
  Learner check: Pending.
  Commit: `Add portable visitor cards and verified record round trips`

## Hands-on Checkpoints
- [ ] User explores the early mechanism and provides actual observations
- [ ] Final user exploration and feedback completed

## Final Review
- [ ] Independently review raw source and fixture outcomes; label reproduction separately
- [ ] Address material review findings and rerun affected checks
- [ ] User confirms the proposed PoC is ready

## Code Tour and App Map
- [ ] Generate and verify `devpost/app-map.html` from actual code; label an untoured route as reference only
- [ ] Offer a brief project-grounded learning activity; record what the user actually does
- [ ] Keep personal reflection in the ignored profile

## Shipping
- [ ] Public-safe source, MIT license, setup instructions, scope/PRD/spec and disclosed skill-pack revision
- [ ] Verify a clean source copy runs the demonstrated version
- [ ] Record actual complete behavior in a 60–179 second English demo
- [ ] Public YouTube/Vimeo link, checked without authentication
- [ ] Inspect exact Devpost form and exit survey
- [ ] Obtain actual learner-written public copy and missing personal attestations
- [ ] Complete authorized submission and retain platform-created submitted status / URL

## Revisions
- The photo-protection promise was narrowed by primary threat-model evidence; QuietCase was retained as a reserve after distinctness review. A second research pass rejected several exact or close duplicates before choosing this prototype. No old application source was copied.
