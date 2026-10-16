---
name: Visitline
description: A quiet paper-and-ink workspace built around a continuous visit line.
colors:
  paper: "#f7f5ee"
  white: "#fffefa"
  ink: "#193e36"
  muted: "#52675f"
  line: "#cbd3c8"
  green: "#22664f"
  green-tint: "#e6f0e5"
  amber: "#80501c"
  amber-tint: "#fbefd8"
  red: "#923e35"
  red-tint: "#f8e9e2"
  focus: "#235c9b"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.85rem, 2.8vw, 2.3rem)"
    fontWeight: 450
    lineHeight: 1.15
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.8rem"
    fontWeight: 450
    lineHeight: 1.2
  title:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "1.15rem"
    lineHeight: 1.3
  body:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  label:
    fontFamily: "'Segoe UI', Arial, sans-serif"
    fontSize: ".9rem"
    fontWeight: 600
rounded:
  none: "0"
  label: "3px"
  field: "4px"
  control: "5px"
  dialog: "6px"
  circle: "50%"
spacing:
  "4": "4px"
  "8": "8px"
  "10": "10px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "44": "44px"
components:
  button-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-primary-hover:
    backgroundColor: "#2c574b"
  button-quiet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-quiet-hover:
    backgroundColor: "#e8ece3"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 0"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    width: "100%"
  label-demo:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.amber}"
    rounded: "{rounded.label}"
    padding: "5px 11px"
  route-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "15px 16px"
  route-option-selected:
    backgroundColor: "{colors.white}"
    padding: "14px 15px"
  route-result:
    rounded: "{rounded.label}"
    padding: "13px 16px"
  route-result-met:
    backgroundColor: "{colors.green-tint}"
    textColor: "#174d39"
  route-result-unknown:
    backgroundColor: "{colors.amber-tint}"
    textColor: "#6e4419"
  route-result-blocked:
    backgroundColor: "{colors.red-tint}"
    textColor: "#81342c"
  observation-editor:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "{spacing.24}"
  dialog:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "{spacing.28}"
---

# Design System: Visitline

## Overview

**Creative North Star: "The Continuous Visit Line"**

Visitline uses a continuous visit line as its organising image: arrival, entrance, seating and toilet remain connected so a reader can locate the part that matches, needs checking or causes a problem. Warm paper, dark green ink, restrained borders and modest corners keep the workspace calm while the route carries the most distinctive geometry.

A self-hosted serif gives the name and major headings a human, editorial character; familiar system sans-serif text carries controls, measurements and explanations. The interface uses plain-English needs, parts and plan wording following the user's feedback that technical wording can be confusing. Density follows the authoring task: a compact needs column beside a broader route workspace, then a single column on smaller screens.

The North Star is a descriptive name for the implemented metaphor, authored under the user's delegated concept and implementation choices. No visual-world workshop, user-selected visual composition, generated mockup or human approval of a visual world is recorded. There is no confirmed visual anti-reference.

This is a source-led record of the functional prototype, extracted from `PRODUCT.md`, `dist/styles.css`, `dist/index.html` and `dist/app.mjs` on 2026-10-16. Desktop and mobile renders were inspected during implementation, but no persisted screenshot paths were supplied to this documentation pass. No independent screenshot review or visual audit is claimed. The accessibility requirements in `PRODUCT.md` are requirements, not evidence of universal accessibility or completed conformance testing. This document is not a ship verdict.

**Key Characteristics:**

- A connected route with explicit part-by-part results.
- Warm paper and near-white working surfaces with dark green ink.
- Self-hosted Newsreader headings paired with system sans-serif controls.
- State words reinforced by symbols, fill, border style and color.
- Flat surfaces, modest corners and visible keyboard-focus outlines.

## Colors

The palette uses green ink on warm paper, with semantic green, amber and red reserved for the recorded results. The frontmatter preserves the twelve existing CSS color variables; component-local literal colors remain in the extracted component definitions and sidecar snippets. No tonal ramp is defined in the source.

### Primary

- **Green Ink** (`ink`): body text, headings, wordmark, primary actions and selection outlines.
- **Matching Green** (`green`, `green-tint`): matching results, the filled small marker, outlined route stops and positive notices.
- **Focus Blue** (`focus`): the visible keyboard-focus outline. It is an interaction color, not a result state.

### Secondary

- **Checking Amber** (`amber`, `amber-tint`): unconfirmed details, unfinished edits and the fictional-example label. These uses explain uncertainty rather than decoration.

### Tertiary

- **Problem Red** (`red`, `red-tint`): details that do not match the chosen needs and error notices.

### Neutral

- **Warm Paper** (`paper`): the page canvas and excluded route-stop background.
- **Near White** (`white`): working forms, selected route choices, visitor preview and dialogs.
- **Muted Green Gray** (`muted`): supporting copy, context and excluded-part text.
- **Quiet Divider** (`line`): section boundaries, control edges and container borders.

**The State Has Words Rule.** Every result keeps a visible text label. Color and shape reinforce the label; neither replaces it.

## Typography

**Display Font:** self-hosted Newsreader, with Georgia and serif fallbacks.
**Body Font:** Segoe UI, with Arial and sans-serif fallbacks.

The source declares Newsreader from `dist/assets/fonts/Newsreader.ttf`, with normal style, a weight range of 200–800 and `font-display: swap`. No remote font service is referenced. Serif headings provide character while sans-serif controls keep the working content familiar.

### Hierarchy

- **Display:** the event heading uses the frontmatter's fluid display role and a maximum width of 30 characters. Headings request balanced wrapping.
- **Headline:** section headings use the headline role. The needs heading is smaller (1.55rem), and the sharing heading uses an intermediate size (1.6rem).
- **Title:** smaller headings use the title role. The stylesheet does not explicitly set a weight for all third-level headings; do not infer a separate designed weight scale.
- **Body:** the body role carries prose and controls. General paragraphs are limited to 72 characters; supporting text uses smaller local sizes.
- **Label:** form labels use the label role. Help and context text commonly use a smaller size (.82rem); labels retain normal sentence case.
- **Measurements:** number fields and route measurements use tabular numerals. The needs width input is emphasized (1.45rem, weight 500).
- **Wordmark:** Newsreader at the section-heading size, reduced on narrow screens. Its small sans-serif tagline is hidden at the first layout breakpoint.

These roles are extracted from CSS; they do not form a fixed-ratio type scale.

## Layout

The desktop layout separates a compact needs column from a wider route workspace. The header is centred within a maximum width (1440px); the main workspace has its own maximum width (1352px). Both use broad horizontal gutters (44px) at full width. The workspace grid pairs a fixed needs column (238px) with the remaining space and a generous gap (42px). A divider on the needs column establishes the boundary.

Route choices use two equal columns. The selected route then shows a result summary and a continuous four-part line. Forms use two equal columns with full-width rows where needed. General paragraphs remain narrow enough for reading rather than filling every container.

The spacing entries in the frontmatter are recurring literal distances extracted from CSS. The source has no spacing custom-property scale, and it also contains task-specific values outside this set. Do not treat these entries as a newly imposed grid.

Responsive behavior follows the actual CSS:

- **At 1000px and below:** gutters narrow, the needs column reduces (210px), the workspace gap reduces (28px), and heading groups may wrap.
- **At 760px and below:** the header wraps, plan controls span the width, and the workspace becomes one column. Needs controls use a compact two-column arrangement, the standalone legend is hidden, and route choices remain in two columns. Result text and route-part labels remain present.
- **At 520px and below:** the connected route becomes vertical, with each stop placed left of its text. The stylesheet includes a final override that preserves this treatment after the other responsive rules.
- **At 380px and below:** page gutters narrow again, form fields become one column, and the needs action spans both columns.
- **For print:** the editor workspace and controls are hidden while the visitor preview becomes the page content, without its container border. The body requests white paper and black text. This documents the print rules, not a verified printed output or the separately generated download stylesheet.

## Elevation & Depth

Depth is conveyed by near-white working surfaces against the paper canvas and by single-pixel borders. There are no box-shadow declarations. The native modal adds a translucent green-ink backdrop; a file-opening status message is fixed near the bottom of the viewport. Selected route stops and keyboard focus use outlines rather than a shadow.

**The Flat Surface Rule.** Use borders and surface color to separate the current workspace. The implemented system has no box shadows.

Buttons transition background and text color over a short interval (.16s), using the browser's default easing. There is no separate motion scale. Reduced-motion preferences disable transitions and request automatic scrolling.

## Shapes

Corners are modest: small labels and result summaries use the label radius; fields use the field radius; ordinary buttons, route choices and the observation editor use the control radius. The native dialog is slightly softer. Text actions and route-part button surfaces have square corners.

The signature geometry is the connected route. Large stops are circles, including the blocked state; symbols distinguish a check, question mark, cross or exclusion dash. Small legend and route-choice markers use a filled circle for matching information, a dashed circle for unknown information, and a small squared marker for a problem. Do not describe the large blocked stop as square.

Most boundaries are single-pixel lines. A selected route choice has a stronger border (2px), offset by reduced padding so its size stays stable. The selected route stop has a dark outline (3px, with a 4px offset); keyboard focus uses the blue outline with the same thickness and offset.

## Components

### Buttons

Firm, modest controls with sentence-case action labels.

- **Default:** transparent background, green-ink text, quiet divider border and the control radius; the frontmatter records its padding.
- **Primary:** ink background and near-white text, with optional inline SVG and a small gap. Hover lightens the ink to the extracted component-local color.
- **Quiet:** near-white background and a border; hover uses a pale gray-green fill.
- **Text action:** underlined text, no border or background, square corners and compact padding.
- **States:** visible focus is blue. Disabled buttons reduce opacity (.55) and use a not-allowed cursor. Standard buttons have a minimum height (44px); the session-line text action is an implemented smaller exception (32px). The needs action has a compact local padding override.

### Inputs / Fields

Near-white fields with a muted green-gray stroke, modest field corners and a minimum height (44px). Form labels stack above help text and fields. Checkboxes retain native interaction with green-ink accent color. The width input includes a separate `cm` label and space for it inside the field.

Inputs, selects, textareas and disclosure summaries use the shared visible-focus treatment. Textareas resize vertically. Native required, numeric, date and length constraints exist in the markup; no custom field-error appearance is defined. Error feedback appears in the separate notice component.

### Navigation

The header contains a line-symbol wordmark and a wrapping group of plan actions: New plan, Try an example and Open a plan. These actions use quiet-button styling. They are operations rather than an active-page tab system; no navigation active state is implemented. On mobile the action group spans the width and shares its available space.

### Labels / Chips

The fictional-example label is a small amber-tinted rectangle with a fine border and modest label corners. A neutral label identifies the organiser's editor. These labels carry information; they are not selectable filter chips.

### Cards / Containers

The observation editor and visitor preview are near-white, bordered working surfaces. The editor uses the control radius and generous padding; the preview keeps square corners. Event details use the same near-white surface and border. No container lifts on hover.

Route-choice buttons act as compact selectable cards. Their names, arrow and explicit result line stay together. Selection strengthens the border and changes the surface to near-white; `aria-pressed` carries the state in the markup.

### Result Summaries / Notices

A route summary uses a tinted result background, a strong result sentence and a smaller causal explanation. Error and success notices use explicit message text and a colored border. Unfinished-edit notes use the amber family and explain which save action applies. Do not style an unknown result as a positive result.

### Continuous Visit Line

The ordered route connects arrival → entrance → seating → toilet. Each part exposes its kind, name, available measurement and result words. A part is a button tied to the shared detail editor; selecting it preserves the route context and adds the dark stop outline.

Matching, unknown and blocked parts use a check, question mark and cross, respectively. Unknown stops also have a dashed border. A part excluded from the selected checks has a muted stop, dash and “Not included” label. Exclusion is separate from a matching result.

The line becomes vertical on narrow screens; it keeps the same order and retains the causal relationship between parts. The next-step area identifies a problem or unconfirmed detail and offers a concrete edit action. The current implementation's shape is documented here without asserting a universally approved visual identity.

### Dialog / Visitor Preview

A native modal uses a near-white surface, fine border and a restrained backdrop; it returns focus to the invoking control in the app code. The visitor preview is a reading surface with route headings, ordered details, chosen needs and limits. These are source-observed behaviors; this documentation pass did not independently execute them or review the exported file.

## Do's and Don'ts

### Do:

- **Do** preserve the connected order of the visit parts when adapting the route diagram.
- **Do** show state words with the existing marker, symbol and border treatments.
- **Do** keep selected-route borders and selected-part outlines distinct from the blue keyboard-focus outline.
- **Do** use plain-English needs, parts and plan wording, with concrete action labels.
- **Do** keep observation forms and visitor-preview surfaces near-white against the paper canvas.

### Don't:

- **Don't** show a positive result for information that still needs checking.
- **Don't** rely on green, amber or red alone to explain a result.
- **Don't** add drop shadows to the current flat containers.
- **Don't** turn the modest corner values into pill-shaped controls.
- **Don't** treat this source-led documentation as evidence of design approval or an accessibility audit.

