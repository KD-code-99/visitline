# Verification record

Checked 16 October 2026 on Windows with Node v24.19.0 and the Codex in-app browser. This records executed checks, not real venue verification or user-study results. The implementation snapshot is local commit `0fad8cca2f15d85844dc9cc3b0a6309a99873ce2`; public commit `84b367ae92d84e0c1e6af2852b884d7f6721adca` has the identical Git tree `00c9759ac03c217db2a819b8facbaa1a429f0c01`.

| Check actually performed | Result and artifact |
| --- | --- |
| Built-in Node tests, including a hand-computable 72-case oracle | 10 passed, 0 failed. A clean source copy passed without installing packages: `evidence/clean-source-tests.txt`. |
| Documented startup from that clean source copy | `node server.mjs` started; all seven browser assets, including the licensed font, returned HTTP 200: `evidence/clean-server.txt`. |
| Core journey in the real browser | Initially front entrance failed for steps; courtyard needed its missing measurement. Adding 96 cm and a fictional source note produced a match at 90 cm. Changing the need to 100 cm marked both the 96 cm entrance and 95 cm toilet route as mismatches. |
| Actual file downloads | Downloaded JSON and HTML, then inspected their bytes. Final plain-language files are `evidence/fixtures/plain-language-plan.json` and `plain-language-card.html`, version 3. Measurements, selected needs, reasons, date, demo label and limits agree. |
| Reopening a downloaded JSON plan | Real file chooser, cancel and accept tested. Cancel kept the existing version; accept loaded downloaded version 4 and its 100 cm need. Historical fixture: `browser-roundtrip.json`. |
| Rejected future-date import | Actual browser import of `reject-future.json` rejected, preserving the current version and unfinished 97 cm draft. The shared boundary also has a deterministic regression test. |
| Draft preservation | Actual browser: stage changes and applying the other form retained unfinished width/note/check values. Results continued to use saved-in-plan values until the relevant form was applied. |
| Modal behavior and keyboard | Browser verified rename cancel/accept, Escape dismissing export confirmation, focus returning to the initiating control, next-detail action focusing the related field, and preview close restoring focus. This was selected keyboard activation, not a complete assistive-technology audit. |
| Responsive rendering | Inspected actual desktop and phone screenshots. At a 320 px viewport, content/client width both measured 305 px after the scrollbar; route stops formed a vertical connected line. The width field stayed inside the form. A 390 px layout was also inspected earlier. |
| HTTP boundary | Six initial assets returned 200 with restrictive CSP; missing and encoded traversal paths returned 404; POST returned 405. Font subsequently returned `font/ttf` and a valid TrueType signature. |
| Independent challenge | A separate agent executed Node counterexamples, identified four correctness issues, and checked their fixes. `evidence/independent-review.md` retains pre-fix findings, resolutions, hashes and reproduction limits. Its work is source/Node review, not independent browser reproduction. |

## Rejected branches and fixes

- Future imported observations initially passed. A shared current-date rule now rejects them; dates on or before today still work.
- Rerendering initially lost unfinished form values. Per-part drafts now survive navigation and independent form updates.
- Native browser confirmation blocked the test browser. The user cancelled it; the app now uses accessible HTML dialogs. No browser policy was bypassed.
- Deferred imports could race rename or export and resolve two confirmations with one acceptance. Import is now serialized through file reading and confirmation; competing controls are inert; shared dialogs reject a second request; rename checks its original record/route identity. Both counterexamples passed the reviewer's focused recheck.
- A parent verification regex initially expected a differently capitalized fictional label. Correcting the regex passed; this was a check error, not an app defect.
- The first clean-copy command lacked its parent directory; creating the ignored `.state/` directory resolved it. The first static-root path also had a separator error; the real HTTP and clean-server checks passed after correction.
- The design detector ran once and reported a cramped `visitor-preview` section. This was not reproduced: CSS gives it 28 px padding, 18 px on mobile. The finding remains recorded as a detector false positive, not an independent visual approval.

## Limits and remaining human work

Browser policy blocked `file://` reopening of a downloaded card. It was not bypassed; its bytes and the matching in-app preview were inspected. A human can open/print the actual downloaded HTML to check that environment. Screen-reader behavior, physical route continuity, real venue facts, disabled-user benefit, customer demand and superiority to existing products remain unvalidated.

The user reported that technical wording was confusing. Labels, explanations, confirmations and exported cards were simplified; the browser journey and 10 tests passed afterward. A successful user retest has not yet been reported.

Registration succeeded and Devpost created draft submission `1241207` / project `1486790`, now titled Visitline with preview https://devpost.com/software/visitline. Additional info and project overview were saved; the platform shows DRAFT, 3/5 steps done. The entrant explicitly requested AI-assisted public copy and generated narration; authorship is disclosed. The required public video link remains pending upload. See `devpost/checklist.md` for the authoritative remaining work.

## Final visual review and hosting

A fresh independent visual reviewer inspected genuine desktop/phone captures and matching/nonmatching result states, plus source and persisted design documents. Its bounded disposition was ship, with no material visual fix. It did not independently interact with the app, certify fidelity to an approved design, or establish motion, screen-reader behaviour or a formal visual-world workshop. Those process gates remain unverified. The reviewer also caught a recording continuity issue in independently captured versions; the matching and changed-needs states were recaptured in order as versions 2 and 3 before video assembly.

The Sites deployment succeeded for local source commit `3b9dac33412cf5691692ebc2d0ab084cc3d300c2` at https://visitline-route-card.kaann-dmrc99.chatgpt.site. It remains owner-private. Deployment ID: `appgdep_6ad28dff10608191b9cd570e684eb6f3`; saved version: `appgprj_6ad28379f5a48191ab90a09e0e853a1f~appgver_2861759684a88191880a908ed4076888`. Publishing required selecting installed Git Bash instead of a WSL stub and setting GNU tar's `--force-local` option for the Windows archive path; the unmodified helper then pushed and packaged the exact source successfully. Documentation-only changes after that source snapshot do not alter the deployed app.

## Generated demo, 17 October local time

The entrant requested generated narration and a video to upload to their own channel. An edited sequence of genuine browser-state JPEGs was encoded with a local FFmpeg binary from the official PyPI imageio-ffmpeg package; Microsoft Zira Desktop generated the disclosed synthetic English voice. Source captures remain unchanged. Chapter text and a disclosure footer are outside the app image. The method does not claim continuous recording or real venue data.

Actual final file: 163.65 seconds, 1920×1080 at 24 fps, H.264/AAC, 5,446,845 bytes; SHA-256 `6739770b67a1e1b0446977097478f6058039b17efa1853a792fced3f875da6ea`. FFmpeg decoded the complete output without error. Audio RMS measured −23.49 dBFS with no clipped samples at the checked 16 kHz mono conversion. One rendered frame per scene was inspected for legibility, content and state consistency. An initial front-route capture showed a later courtyard result; it was recaptured at plan version 1 and the affected segment/final mux rechecked. These are media checks, not a completed public upload or an independent listening study.

The actual project story, tags, repository link and three captioned screenshots were saved and confirmed on the Devpost preview. It says **INCOMPLETE SUBMISSION**; the video field remains empty. The form saved other details without a video URL, which does not waive the published submission requirement. Evidence: `demo-verification.json`, `demo-production.json`, and the generated transcript. No app source changed during this media/documentation work, so the earlier app tests were not rerun unnecessarily.
