# Visitline

A working proof of concept for turning event-host observations into a portable visitor route card. It keeps an **unmeasured doorway** distinct from **recorded stairs**, explains the cause at each stage, and recalculates alternatives when a visitor changes their checks.

The supplied event is fictional. No real venue has been assessed. The project is being prepared for [Build With AI: Basics](https://learn-ai-basics.devpost.com/); submission and user research are not complete.

## Run

Install Node.js 22 or later, then run from this folder:

```sh
node server.mjs
```

Open **http://127.0.0.1:4187** in a current browser. No package installation, API key or account is needed. The server binds to this computer only. Stop it with Ctrl+C.

```sh
node --test
```

The browser application is the complete, unbundled `dist/` folder. Serve that folder from a static HTTPS host to deploy it; opening `index.html` as a file is not the supported authoring workflow because it imports JavaScript modules. Downloaded visitor cards are standalone HTML files and can be opened without a server.

## Try the mechanism

1. In the fictional example, compare the front route's three steps with the courtyard's unmeasured doorway. Both matter, for different reasons.
2. Select the courtyard entrance. Enter **96 cm** under **Space to get through**, replace its note with an explicitly fictional measurement/source, then choose **Save this detail**. The courtyard's entered details match the chosen needs.
3. Change **Space needed to get through** to **100 cm** and choose **Update results**. The 96 cm doorway and 95 cm toilet route both fail that comparison. Individual passing parts remain visible.
4. Preview the visitor card. Download its HTML and the editable JSON plan. Reopen the JSON through **Open a plan** to resume that version.

Use **New plan** for an empty plan. Unknown facts stay unknown. There are four fixed parts per route—arrival, entrance, seating and toilet—and up to four alternative routes.

## What the result means

- **These details match:** every included part satisfies the selected width, step and availability checks, with a date and note about how it was checked.
- **Needs checking:** at least one required fact is missing, without a known problem taking priority.
- **Does not meet these needs:** at least one included part has a known mismatch with the chosen needs. Missing information is still shown separately.
- **Not checked for this visit:** the visitor excluded the toilet route; the software makes no judgment about it.

These are comparisons with host-entered facts, not verified accessibility, safety or legal-compliance assessments. The app cannot verify that the recorded stages physically connect. Surfaces, slopes, assistance, sensory requirements and emergency exits are outside this prototype. Width requirements are visitor-selected; the example's 90 cm value is not a universal standard. Observation dates are visible, future dates reject, and there is no invented expiry window. Confirm current conditions and other needs with the host.

## Files, drafts and privacy

The app keeps records and unfinished form edits in memory. Applying one form does not apply another. Results, previews and downloads use the **last applied revision**; a pending-edit notice explains the difference. Refreshing or closing the tab discards its memory. Download an editable record and check your downloads before leaving.

The application has no account, analytics, remote API, upload endpoint, browser storage or third-party asset request. Import reads the file you choose locally. Downloads include entered notes and contact details, so review them before sharing. This does not control browser/OS history, extensions, screenshots or downloaded files. A hosting provider may receive ordinary page requests; event records are not sent by the app.

JSON import validates a complete candidate before replacing the existing record, rejects unsupported fields/versions and files over 200 KiB, and recomputes results. The visitor card is a script-free snapshot with a revision, selected checks, dates, reasons and limitations. It does not update after the host changes another copy. Printing the downloaded card uses the browser's print function.

## Project guide

| File | Responsibility |
| --- | --- |
| `dist/core.mjs` | Record validation, date boundary and route evaluation |
| `dist/app.mjs` | Forms, in-memory drafts, diagrams, preview and file handoff |
| `dist/export.mjs` | Escaped, script-free visitor HTML |
| `dist/styles.css` | Responsive layout, state shapes and focus styles |
| `server.mjs` | Read-only loopback static server and security headers |
| `tests/` | Hand-computable fixtures, boundary cases and export checks |
| `devpost/` | Actual project planning and delivery checklist |
| `docs/` | Contest research, alternatives and evidence limitations |
| `evidence/` | Sanitized execution evidence and independent review |

## Planning and provenance

This project started in an empty folder during the contest period. The planning commit precedes application implementation. No source from the unrelated pre-existing application in the parent workspace was reused.

The [Devpost Learn Skill Pack](https://github.com/challengepost/learn-ai-basics) was installed locally at revision `a0f065781873e8a7ed9a9a705a8dafa6a0810439`. Its Start, Scope, PRD, Spec and Build workflows informed the substantive planning files and ordered slices. Local skill copies and the personal learner profile are excluded from this repository. The user delegated research and implementation choices to the coding agent; planning approval, personal learning responses and final human exploration are recorded as pending where they have not happened.

AI assistance researched alternatives, proposed the architecture, wrote implementation and tests, and performed source/browser checks. An independent agent challenged source and executed Node counterexamples; its report distinguishes that work from real browser reproduction. No interviews, disabled-user testing, real venue measurements, efficacy study, winner prediction or universal novelty claim is represented as completed.

Application code is MIT licensed. The self-hosted Newsreader font is separately licensed under the SIL Open Font License 1.1; its license and pinned source are in `dist/assets/fonts/`. External research is cited rather than redistributed as application assets.
