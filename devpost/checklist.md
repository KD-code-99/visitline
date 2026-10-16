---
doc: checklist
status: draft
---
# Build and submission checklist

Canonical work ledger. Build mode: agent-led technical execution requested by user; personal learner checkpoints are recorded separately and will not be impersonated.

## Slices
- [x] **1. An observation changes an understandable route judgment**
  Becomes usable: A fictional event, visitor checks, connected route display and editable observations.
  Why now: Proves the unique mechanism before extra features.
  PRD ref: `prd.md > Connected route evaluation`, `Observation editing`
  Spec ref: `spec.md > Evaluation and record validation`, `Workspace`
  Build: Implement pure evaluation, validated editing and accessible rendering.
  Verify (mechanical): Hand-computable fixtures and actual browser scenario: stairs versus unknown width; record a width; tighten the requirement; close a segment.
  Mechanical outcome: Actual browser journey and hand-computable fixtures passed; the 100 cm need exposes both the 96 cm entrance and 95 cm toilet route. `docs/verification.md` records scope and limits.
  Learner check: User reported confusing technical wording. Plain-language changes were implemented and verified; successful user retest remains pending.
  Commit: `0fad8cc` (`Build connected access plans and portable visitor cards`).

- [x] **2. The same record survives a file handoff**
  Becomes usable: JSON download/import and a script-free offline visitor card.
  Why now: Makes the useful result portable and completes the actual host-to-visitor journey.
  PRD ref: `prd.md > Portable records`, `Visitor checks and preview`
  Spec ref: `spec.md > Safe export`, `Local serving`
  Build: Add bounded import, safe HTML export, snapshot revision, printing and run instructions.
  Verify (mechanical): Exact round trip, malformed-file preservation, hostile text encoding, standalone card, narrow viewport and keyboard journey.
  Mechanical outcome: Browser downloads and JSON reopen/cancel/accept passed; hostile text encoding, malformed-file preservation, clean-copy tests/startup and narrow viewport were checked. Browser policy blocked local-file HTML reopening; bytes and matching in-app preview were checked instead, with the limit documented.
  Learner check: User file/print retest pending.
  Commit: `0fad8cc` (same coherent implementation snapshot as slice 1).

## Hands-on Checkpoints
- [x] Early interface feedback received and recorded; user found the wording too technical
- [ ] Final user exploration and feedback completed

## Final Review
- [x] Independently review raw source and fixture outcomes; label reproduction separately
- [x] Address material review findings and rerun affected checks
- [ ] User confirms the proposed PoC is ready

## Code Tour and App Map
- [x] Generate and verify `devpost/app-map.html` from actual code; label an untoured route as reference only
- [ ] Offer a brief project-grounded learning activity; record what the user actually does
- [ ] Keep personal reflection in the ignored profile

## Shipping
- [x] Public-safe source, MIT license, setup instructions, scope/PRD/spec and disclosed skill-pack revision
- [x] Verify a clean source copy runs the demonstrated version
- [x] Generate and verify a 163.65-second English demo from genuine app captures, with its edited/synthetic narration method disclosed
- [ ] Public YouTube/Vimeo link, checked without authentication
- [x] Inspect exact Devpost form and exit survey
- [x] Obtain actual personal attestations and exit survey answers
- [x] Prepare clearly disclosed AI-assisted public copy at the entrant's explicit request
- [ ] Complete authorized submission and retain platform-created submitted status / URL

## Revisions
- The photo-protection promise was narrowed by primary threat-model evidence; QuietCase was retained as a reserve after distinctness review. A second research pass rejected several exact or close duplicates before choosing this prototype. No old application source was copied.
- The two small implementation slices were committed together as a working app, rather than inventing separate checkpoints after the fact. Individual plan approvals and learner actions have not been inferred from delegated implementation authority.
- Independent execution found future-date import, draft-loss and concurrent-dialog/import defects. Fixes and discriminating rechecks are retained in `evidence/independent-review.md`.
- Actual wording feedback changed the interface and exported card; no new feature or domain-model expansion was needed.
- Devpost registration succeeded with supplied personal answers. Platform created submission `1241207` / project `1486790`; its visible status is DRAFT, 1/5 steps. All actual prompts are in `devpost/submission-prompts.md`.
- Public repository: https://github.com/KD-code-99/visitline. Native GitHub publishing was used after CLI authentication was unavailable. Public implementation commit `84b367a` has exactly the same source tree as local implementation commit `0fad8cc`; publication history does not impersonate original local commit timestamps.
- Reference app map prepared from the actual implementation. No interactive code tour, learner edit or personal learning reflection has been claimed.
- The entrant explicitly requested the project name, pitch and generated demo. That direct request overrides the Skill Pack's human-only writing guideline for this session; AI assistance is disclosed rather than claiming learner-only authorship. `submission-draft.md` contains the actual copy.
- The Additional info form was saved successfully with the entrant's actual answers. A first technology explanation exceeded a newly observed 255-character limit; the replacement is 232 characters. Project overview was then saved as Visitline with its 105-character pitch. Platform now shows DRAFT, 3/5 steps done, at `/submissions/1241207-visitline/`; project preview is https://devpost.com/software/visitline.
- Sites deployment `appgdep_6ad28dff10608191b9cd570e684eb6f3` succeeded for exact local source commit `3b9dac33412cf5691692ebc2d0ab084cc3d300c2`. The owner-private URL is https://visitline-route-card.kaann-dmrc99.chatgpt.site; it is not represented as a judge-accessible public demo.
- Project details were saved and then reopened: 4,234 characters of story, HTML/CSS/JavaScript/Node.js tags, the public repository URL, and three captioned actual result screenshots. The preview visibly shows these and **INCOMPLETE SUBMISSION**. Devpost permits saving that draft with an empty video field; this does not waive the contest's required public demo.
- Generated `artifacts/visitline-demo/Visitline-demo.mp4` (ignored local artifact), English captions and upload instructions. Actual output: 163.65 seconds, 1920×1080, H.264/AAC, 5,446,845 bytes. Full decode passed; audio is present and unclipped. One rendered frame per scene was inspected, and a sequencing mismatch was corrected using a fresh genuine capture. Public evidence records method, timing and hashes; no continuous screen recording is claimed. Entrant upload remains the external dependency.
