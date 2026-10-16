---
doc: prd
status: draft
---
# Visitline — product requirements

Implements `scope.md > The Unique Kernel` as a focused browser tool.

## The Core Journey
1. Choose the explicitly fictional example or start a new event.
2. Read the visitor checks: step-free, minimum clear width and whether a toilet route is required. Example thresholds are illustrative, not standards.
3. Inspect alternative connected routes. Each shows its own result and the recorded reason.
4. Open a segment and record what the host knows: clear width, number of steps, open/closed/unknown, observation date and note. Leave unknowns blank.
5. See all affected conclusions update. A compatible width alone cannot conceal stairs, a closed passage or another missing observation.
6. Preview the visitor card, download editable JSON, reopen it and print/download an offline HTML card.

## Screens and Layout
One workspace: an event header; a compact visitor-check panel; alternative-route list; the selected route's stage chain; an observation editor; and a visitor-preview area. A first-use panel explains the mechanism and offers the fictional example. On narrow screens these form a single column. An ordered text route accompanies the visual chain.

## Look and Feel
Agent-proposed: an event information sheet with strong typography, generous reading space, dark green ink, warm paper and three restrained status colors. Status always has text. Native form controls, visible keyboard focus and reduced-motion support are required. No photographs, simulated venue logos or invented testimonials.

## Features and Behavior

### Connected route evaluation
- Evaluate every included segment against the selected checks.
- Return three statuses: `incompatible`, `unconfirmed`, `meets recorded checks`.
- Show all reasons. A known incompatibility takes summary precedence while unknowns remain visible.
- Do not call the venue safe, compliant or universally accessible.
- Toilet segments are evaluated when the visitor requests a toilet route; explicitly show when they are omitted from the assessment.

### Observation editing
- Each route contains arrival, entrance, seating and toilet stages, each with editable segment observations.
- Numbers must be finite and nonnegative; widths must be positive when supplied. Dates cannot be after the recorded event date when one exists.
- A blank value remains unknown. An observation date and note are required before a relevant segment can meet recorded checks.
- Editing a record increments the event revision; the export identifies that revision.
- Source information is user-entered, not independently verified by the app.

### Visitor checks and preview
- Minimum clear width is supplied by the visitor; the app supplies no medical or regulatory threshold.
- Changing checks updates every route without rewriting observations.
- Preview includes selected requirements, stage results, measurements, notes, dates, record revision and scope limits.
- The fictional example remains visibly labelled in every export until the host deliberately starts a new event.

### Portable records
- Download one versioned JSON record; import validates structure, sizes, number ranges, enums and text limits before replacing current work.
- An invalid import must leave the current record untouched.
- Standalone HTML export has escaped content, no scripts, remote fonts, images, analytics or automatic links from user text.
- No records are uploaded. Work remains in memory unless downloaded; explain this before users enter data.

## States and Boundaries
- Empty: invite the example or a new record; do not invent venue information.
- Incompatible: identify the exact recorded obstruction for the selected checks.
- Unconfirmed: name missing facts without treating them as a physical barrier.
- Meets recorded checks: every included fact is present and passes; scope is limited to supplied observations and requirements.
- Invalid input/import: explain the field; preserve the last valid record and the user's editable input.
- Unsaved: show that refresh can discard work. Allow deliberate discard; never force a download.
- Export: creates a snapshot. Later local edits do not update an already downloaded card.

## Product Decisions
All product choices here are agent proposals grounded in `docs/idea-evaluation.md`; the user expressly delegated evidence-based selection. Individual approval and hands-on learner review remain pending. No user preference or successful customer outcome is invented.

## What We're Building
The journey above, meaningful evaluator and export/import tests, actual desktop/mobile browser verification, a code map, and a real demonstration of the complete loop.

## Deferred From the POC
Contacting venues, publishing real access statements, collecting personal access profiles, claiming compliance and recruiting disabled research participants. These need different authorization and evidence.

## Open Questions
Does the connected presentation help a reviewer understand what is known and unknown? Test with fictional fixtures before expanding. Actual customer demand for this particular app remains unvalidated.
