# Demo and upload checklist

At the entrant's explicit request, an AI-assisted English demo has been generated from genuine working-app captures. The rules require a public YouTube/Vimeo demonstration under three minutes. A local MP4 or hosted app does not replace that public link.

The actual file is `artifacts/visitline-demo/Visitline-demo.mp4` in the local workspace (excluded from source control), with `Visitline-demo.srt`, `UPLOAD.md`, original captures and a production manifest. The output is **163.65 seconds**, **1920×1080**, H.264 video and AAC audio. `evidence/demo-verification.json` records the full decode, audio measurements and frame review. `evidence/demo-production.json` records source hashes and exact scene timing. The AI-assisted transcript is in `devpost/demo-narration.md`.

This is an edited sequence of actual browser states with synthetic narration, not a continuous screen recording. Fictional venue data and the AI voice are labeled in the video. Review found an out-of-order front-route capture; it was replaced with a fresh initial-state capture and the final file was checked again.

Remaining: the entrant uploads the MP4 to their channel, supplies its public YouTube/Vimeo URL, and the uploaded playback/access is checked before final submission. No public video URL or submitted status is claimed yet.

The original technical shot plan is retained below; actual timing follows the production manifest.

| Approximate time | Actual behavior to show |
| --- | --- |
| 0–20 seconds | Show the fictional example and selected needs. Select the front route's three steps, then the courtyard's unmeasured doorway. Explain the difference in your words. |
| 20–50 seconds | In the courtyard doorway, enter 96 cm and an explicitly fictional note about how it was measured. Choose Save this detail. Show the changed route result. |
| 50–80 seconds | Change Space needed to get through to 100 cm, then Update results. Show both the 96 cm doorway and 95 cm toilet route changing. |
| 80–115 seconds | Preview the visitor card; download the editable plan and visitor card. Show the chosen needs, dates, explanation and limits. |
| 115–145 seconds | Briefly show the substantive scope/PRD/spec and explain your actual use of the Skill Pack. State what the prototype does not verify. |

The generated demo contains only the project, fictional data and factual chapter text. It contains no private tabs, credentials or real venue measurements. Still confirm that the uploaded copy plays without signing in and retains its English narration and captions.
