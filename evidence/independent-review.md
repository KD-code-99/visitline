# Independent implementation review — pre-fix snapshot

Reviewed 2026-10-16. Environment actually used: Windows, Node v24.19.0; local date 2026-10-16. This is an independent source/document review plus Node execution, **not browser or assistive-technology reproduction**. No source changes, dependency installation, external requests, real venue data or shared-server/browser manipulation were performed. The report is an evidence supplement; `devpost/checklist.md` remains the parent's canonical checklist.

## Blockers before handoff

1. **Imported future observations can produce a positive result today.** `dist/core.mjs:18-20,59-60` validates real dates and their relation to the event but not their relation to today. The normal editor separately sets a today maximum (`dist/app.mjs:139`). Independently executed counterexample: start from `demoRecord()`, fill courtyard entrance width with 96, set event date to `2099-12-31` and every `checkedOn` to `2099-12-30`, then pass JSON through `parseRecord()`. Import succeeds; `evaluateRecord()[1].status` is `met`; `visitorHtml()` includes those future observations and the positive label. These are purported completed observations, so the form/import inconsistency weakens the evidence behind success. Apply a shared date rule at the import/commit boundary, with a deterministic date input for tests. This is a local correctness defect, not an externally demonstrated exploit.

2. **Common navigation silently loses unsaved observations.** Every `render()` repopulates the observation editor (`dist/app.mjs:127,131-140`) and visitor checks (`57-59`). Applying checks calls a commit/render (`194-197`), while stage and route buttons also render (`74-79,106`). In an independently executed minimal Node DOM harness, typing width 96 and a new note into the initially selected courtyard entrance, then applying width requirement 91, clears both observation drafts with no confirmation; exported JSON still has the null width. Switching to another stage similarly discards the draft. Preserve per-stage/check drafts or explicitly resolve them before a render discards them; distinguish applied inputs from drafts and make export behavior visible. This is execution of handlers with DOM stubs, not native UI evidence.

## Verified behavior and source checks

- `node --test`: **9 tests passed, 0 failed**, final exit 0. Existing tests cover blocker/unknown separation, stricter widths, toilet exclusion, provenance, malformed records, a 72-case table, escaping and JSON handoff.
- Additional independent Node computations passed: making any one of the four included courtyard stages lack width prevents success; a closed stage retains a separate missing-note reason; an excluded toilet's obstruction/unknowns do not affect the route and the card says it was not assessed; invalid calendar dates and observations after the event reject; edited JSON round trips preserve facts and judgments.
- The Node DOM harness confirmed committed width changes update the route result; applying width 100 updates an already-open preview to two incompatible route summaries; omitting the toilet at width 96 restores the courtyard result with a visible not-assessed stage. Invalid JSON preserves both the previous record and currently typed editor values. No actual browser downloads were verified.
- Hostile strings supplied to **all text fields** remained escaped in generated HTML. Source uses text nodes in the app (`dist/app.mjs:9-13`) and an encoder plus validated input in export (`dist/export.mjs:3-13`); export CSP disables scripts and assets. Source review of `server.mjs:9-20` found a loopback read-only static server with CSP, no-store, method and containment checks. Its HTTP behavior was not exercised by this reviewer.
- Dates from `2000-01-01` can still meet recorded checks. That is an explicit freshness limitation, not proof of a defect or a reason to invent an expiry window: observation dates and snapshot limitations are displayed (`dist/export.mjs:11,18`; `dist/app.mjs:158,167`). The product cannot establish current physical conditions.
- Row actions are specific native buttons, with selected state and editor association (`dist/app.mjs:66-79,93-106`). The next-observation action focuses the field associated with its stated cause (`112-121`). Error notices receive focus and an alert role (`24-30`); preview close restores focus (`238-239`); CSS defines visible focus and reduced motion (`dist/styles.css:12,143`). These are **source-supported patterns**, not a keyboard/screen-reader pass. No additional row-action defect was demonstrated.
- The no-app-persistence/no-upload claim matches the reviewed source: records live in a module variable; imports read a chosen local file; exports create local Blob downloads (`dist/app.mjs:5,171-179,240-252`). A focused `rg` scan found no storage, cookies, request APIs or unload handler in `dist/` or `server.mjs`. The UI says to download work (`dist/index.html:20,65`), and replacement is confirmed after edits (`dist/app.mjs:190-192`); refresh can still discard all work. This review does not claim to control browser/OS history, caches or downloaded files.

## Differentiation and wording

The implemented kernel is more useful than a venue badge: it connects each necessary stage, keeps missing evidence distinct from a known mismatch, explains the first cause, and lets changing requirements update alternatives and a portable snapshot. Its differentiation remains **bounded and unvalidated with users**. The source/document review supports a working host-to-visitor authoring experiment, not first-in-market novelty, disabled-user benefit or likely hackathon success. Existing products in `docs/idea-evaluation.md:33-43` overlap with personalised information/routing; this reviewer did not re-open external sources. The strongest next product experiment is whether someone unfamiliar with the fixture can explain why stairs and an unmeasured door produce different outcomes, then predict a stricter-width result.

The visible terms “meets recorded checks”, “information needed”, visitor-selected requirements and explicit safety/compliance limits appropriately bound the claim (`dist/core.mjs:2-6`; `dist/index.html:29,36`; `dist/export.mjs:16-18`). The future-date issue must be fixed before relying on the positive label. Recorded routes assume the host has represented a continuous route; the software cannot verify that the individual stages physically connect. No all-needs access, navigation or compliance claim is supported.

## Execution record and limits

Actually executed from the project root: `node --test`; an inline stdin script via `node --input-type=module` for evaluator/import/export counterexamples and hashes; two runs of an inline minimal DOM harness via the same Node command; focused `rg` scans; numbered local source/document reads. The first DOM-harness run failed an **overbroad reviewer assertion** that no stage would say “meets” when the whole route failed. Individual passing stages correctly retain that label. The assertion was corrected to inspect route summaries; the second run exited 0. This was a harness error, not an application failure. An `rg --files evidence` probe found that the evidence directory did not yet exist; this report creates it.

No desktop/mobile layout, native form constraint validation, real keyboard use, print output, successful download/reopen in a browser, complete accessibility assessment, external novelty validation or customer research was executed here. Parent verification is still required. These results apply only to the hashes below; implementation changes make the affected conclusions stale until reviewed.

Next permitted discriminating checks: after the two fixes, reject the 2099 import without replacing the current record; preserve an unsaved stage/check draft across navigation and applying another form; verify the exported snapshot states which applied inputs it includes. Confirm those cases in the real browser alongside the existing green tests.

## Snapshot SHA-256

```text
b8f1cb61bf0eca55dc70fb8ac0f3b41b924dae3e1106a07a5a6dfc52875e6983  dist/core.mjs
4b1dc074933deb631cc23ddb022006bdc858758674f64bac8c63cd29f3d092e3  dist/export.mjs
447076bf9164afc1ec17d6153232a1df1746f22e1f2dccddab7b5f6c5c5a37e7  dist/app.mjs
dbb35b5c258dbe70663479e92d89c4e1e7bbc3aed16e64ac550e96bf10083c5b  dist/index.html
56c69eaf513a573d3f1dad6ee4d46baf52130b68168c8d0c80e676f11d217b5e  server.mjs
```

## Post-fix review — 2026-10-16

This section supersedes the two original blocker judgments **only for the post-fix hashes below**; earlier evidence is retained. Actually reran `node --test`: **10 passed, 0 failed**, exit 0. Ran an independent stdin script with `node --input-type=module`, using the same Windows/Node environment, a minimal DOM fixture, manually simulated dialog close events and deliberately deferred local-file reads. The script exited 0. No browser was used, and no application source or canonical checklist was edited.

### Original blockers resolved in independent computation

- The exact 2099 observation import now rejects through the shared validator (`dist/core.mjs:27-32,64-66,73-77`). The real editor and validator use `localToday()`. The harness confirmed invalid future imports leave the applied revision and a pending observation draft unchanged.
- Stage drafts survive switching stages and applying checks; a check draft survives committing an observation. The individual commits apply and clear only their own drafts (`dist/app.mjs:8-31,107-110,183-193,250-271`). Draft/result/export distinctions are visibly stated (`dist/index.html:21,35,59`). A simulated accepted export contained applied width 96 while draft width 97 remained in the editor; cancel produced no download. These checks resolve the original silent-loss counterexample.

### New concrete blockers: asynchronous operations share mutable state

1. **An old rename dialog can rename a route in a newly imported record.** Reproduced with controlled scheduling: start a valid import whose `file.text()` promise is pending; from the pristine demo open Rename for the courtyard and type a name; resolve the import. `mayDiscard()` bypasses confirmation for the still-pristine applied record and replaces it while the rename dialog remains open (`dist/app.mjs:235-247,319-326`). Accepting the old dialog then constructs a candidate from the new record and uses the new `selectedRoute` (`305-310`). The incoming first/front route receives the intended courtyard name. The same record/route identity must remain valid after awaiting a dialog, or the operation must cancel/restart. This is a deterministic Node handler reproduction of an asynchronous ordering; its timing in a real browser was not measured.

2. **One dialog acceptance can authorize both export and replacement.** Reproduced: retain an observation draft; start a deferred import; click Download editable record so its confirmation opens; resolve the file read. `mayDiscard()` calls `ask()` on the same already-open dialog, replacing the displayed message and adding a second `close` listener (`dist/app.mjs:30-55,246-247,316,325-326`). One simulated accepted close resolves both promises. The harness observed one download **and** imported-record replacement, clearing the original draft. `ask()` has no active-request queue/identity guard, and export reads mutable `record` after the await. Serialize the whole import/read/confirm transaction and other modal actions, or use explicit operation tokens/captured snapshots with stale-state checks. Each confirmation must authorize exactly the action described by its own message.

### Dialog behavior supported, with native verification outstanding

Source uses `<form method="dialog">`, separate cancel/accept values, and `formnovalidate` on Cancel (`dist/index.html:69`). `ask()` resets `returnValue` on each open, makes only rename input required, initially focuses Cancel or the rename input, and restores prior focus on close (`dist/app.mjs:34-52`). Under simulated close events: Cancel and the empty Escape-style return value did not rename; Accept did rename; focus returned to the initiator. Canceling event-detail discard retained its draft and editor; accepting hid it and returned focus to Edit event details. This supports the application callback logic, **not actual native form submission, Escape dispatch, focus trapping, constraint validation, assistive technology, successful downloads or the parent's blocked browser session**. Those native checks remain a handoff dependency.

Optional scope remains unchanged: old observations have no invented expiry window; market/customer differentiation and physical route continuity are not verified by these implementation tests. Next discriminating check: repeat both deferred-import sequences after transaction guards are added, then verify native dialog accept/cancel/Escape and download behavior in an unblocked browser. Do not treat the green unit suite as resolving these asynchronous blockers.

### Post-fix SHA-256

```text
8a847cd06ddfde19bfd90ae55081e0c75b78819991d9394428b6adb52f579853  dist/core.mjs
ffc67ff62eb4898ee19d1d9757213f76e169e23ef06445e18e46265f35fb904f  dist/app.mjs
d8e44cb24702272d588df27fed32421071431c5433733ab3c50d1af0b3b1580f  dist/index.html
4b1dc074933deb631cc23ddb022006bdc858758674f64bac8c63cd29f3d092e3  dist/export.mjs
56c69eaf513a573d3f1dad6ee4d46baf52130b68168c8d0c80e676f11d217b5e  server.mjs
```

## Async-fix focused recheck — 2026-10-16

**Both asynchronous blockers above are resolved for the hashes below in the independent Node reproduction.** Source review and one focused stdin script via `node --input-type=module` were executed; the script exited 0. This pass intentionally did not rerun or broaden the unit suite. The previously independently observed 10/10 result remains recorded against its earlier snapshot; the parent separately reported 10/10 after these changes.

- Repeated the deferred-import/rename counterexample. Import sets its busy flag before `file.text()`, makes header/workspace inert, sets `aria-busy`, and `safeAction` declines Rename while the read is pending (`dist/app.mjs:94-102,332-348`). After completion, the incoming record retains revision 11 and both original route names; busy state clears. Reversing the order also passes: when Rename is already open, the import handler returns before calling the file's `text()` method (`333`). Rename applies only to the intended courtyard. Source additionally captures record identity and route ID across the await and aborts a stale rename (`315-323`).
- Repeated the deferred-import/export counterexample with a pending observation draft. Export declines while import is busy. After the read, exactly one replacement dialog listener exists and workspace remains inert through the decision. Cancel keeps the original record and width-96 draft, performs no download, and clears busy state. A subsequent accepted import replaces only the record and produces no export. This removes the previous single-acceptance/double-action result.
- A second attempted `ask()` while the shared dialog is open leaves its original message and single close listener unchanged and returns an error notice; the guard runs before modifying the dialog or adding a listener (`dist/app.mjs:35-37`). The status element and dialog are outside the inert workspace (`dist/index.html:18-19,70`).

No new blocker was demonstrated in this focused scope. The harness simulated close events and inspected inert properties; it did **not** execute browser inert enforcement, native dialog submit/cancel/Escape, actual focus trapping or actual downloads. Those browser checks remain the parent's separate verification dependency. All prior product/freshness/real-world-evidence limitations still apply.

### Async-fix SHA-256

```text
8a847cd06ddfde19bfd90ae55081e0c75b78819991d9394428b6adb52f579853  dist/core.mjs
bdd17e808d32c3590cf48e0063556f36549d62cf607e8132c1f3393b07bf52c4  dist/app.mjs
b3d48921973c950c3711a1d90bdb16bbc01a0a2092eccc814065c43fc068f0f0  dist/index.html
4b1dc074933deb631cc23ddb022006bdc858758674f64bac8c63cd29f3d092e3  dist/export.mjs
56c69eaf513a573d3f1dad6ee4d46baf52130b68168c8d0c80e676f11d217b5e  server.mjs
```

## Plain-language copy review — 2026-10-16

**No blocker found in the wording/output changes reviewed.** Source review covered the revised labels, explanations, draft/export messages and bounds in `core.mjs`, `app.mjs`, `export.mjs` and `index.html`. “These details match” remains a comparison of the organiser's notes with chosen needs (`dist/app.mjs:124,151`); “Needs checking” remains separate from a known mismatch (`dist/core.mjs:2-6,84-100`), and the toilet omission stays explicit. The narrower-space guidance is concrete (`dist/index.html:54,60`), while notes, dates and other needs remain visible. The preview and exported card still state that Visitline has not inspected the venue and cannot confirm safety, legal standards or every access need (`dist/app.mjs:231`; `dist/export.mjs:18`). The new language does not establish real-world comprehension; that still needs user evaluation.

Actually executed one focused stdin script via `node --input-type=module`, exit 0: the unchanged fixture produced blocked/unknown, adding width 96 produced met, excluding the toilet produced excluded, and generated HTML contained the corresponding new labels plus fictional-data, stale-card and safety/legal/all-needs limits. Hostile strings in every text field remained encoded with no active script/image/iframe/link markup; script-blocking export CSP remains present. The app still uses text nodes (`dist/app.mjs:61-64`); export still validates and escapes user strings (`dist/export.mjs:3-13`). The same-origin Newsreader URL and `.ttf` MIME are present in CSS/server source; the standalone card keeps system fonts and introduces no online font dependency. No browser/font rendering or actual download was executed, and the full unit suite was not rerun in this focused copy check; the parent reported 10/10.

### Copy-review SHA-256

```text
d309d876aeeda8e5f0edafd8d0bb90bf5eec149bf1146ae4d4dd77d6db378ea0  dist/core.mjs
5b670618c7565936bc39ab065416d942208010457fa949e5c879bf983acc48ae  dist/app.mjs
1f146851bf35f564182a993d408dcdb883e43bd984067c5857117065e284555d  dist/export.mjs
21afd5cf89c07e60e10e77ed98cca23c0d819723b13bb55759848b5078545578  dist/index.html
f35d68a0c284c1dbffa69140bbdb7dfd2b9cc2d17e07fda020b929f7e28e91f4  dist/styles.css
fc88bb99b2e19411b4c5a8c76f9e8b8dd8eb40cb14042fbfb6f1e0d056b4a942  server.mjs
702af3a9d12bfedd7af2e8c58c343188b53374ce7b565d8e11113e2241be4349  tests/export.test.mjs
8a08d13f8a6c0d51be379a60af84f945f65369a67e509ee3c3bdcc421254d7c1  dist/assets/fonts/Newsreader.ttf
```
