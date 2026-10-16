# Visitline submission copy

AI-assisted copy prepared at the entrant's explicit request on 16 October 2026. This is factual project copy, not a claim that the entrant wrote it unaided or completed unobserved learning activities. Personal survey answers are kept out of this public file. The required public video URL is still pending upload.

## Project name

Visitline

## Elevator pitch

See each part of a visit, flag missing access details, and share a clear plan before visitors leave home.

## About the project

### Inspiration

A reassuring label at the entrance cannot explain a whole visit. A person may still need to know whether they can reach a seat or a toilet, and whether a missing measurement is simply unknown or already too narrow for their needs.

Euan's Guide's 2025 Access Survey, published in March 2026, reported that 47% of respondents had difficulty finding access information and 42% had avoided venues because of missing information. This was a self-selected survey of over 4,000 people, not a population estimate. It supports taking the information gap seriously; it does not establish demand for this particular app.

Visitline explores a small organiser-side workflow: record what is known, keep the gaps visible, and share the details behind a route decision. Existing access guides and services already do valuable work. This prototype focuses on preparing an event-specific plan from an organiser's observations.

### What it does

An organiser records arrival, entrance, seating and the way to a toilet, with alternative routes when needed. For the selected visit, they choose whether there must be no steps and how much space is needed to get through.

The working example makes the distinction visible. The front entrance has three steps. The courtyard has no steps, but its doorway has not been measured. Entering a fictional 96 cm measurement changes that route to a match for the selected 90 cm need. Raising the need to 100 cm then identifies both the 96 cm doorway and the 95 cm toilet route.

The visitor card carries the chosen needs, measurements, dates, notes, missing details and limitations. An editable JSON plan can be downloaded and reopened. The separate HTML card contains no scripts or remote resources and can be read or printed. Downloaded snapshots do not update themselves.

### How it was built

The app was created in a new project folder during the hackathon period using the Devpost Learn Skill Pack and AI-assisted research, planning, implementation and review. The repository includes substantive scope, product requirements and technical specification documents, a build checklist, an app map and verification evidence. The Skill Pack revision and the limits of the learner checkpoints are recorded rather than marking unobserved activities complete.

The implementation uses HTML, CSS and JavaScript, with Node.js for the local static server and built-in tests. It needs no runtime model API, account, database or package installation. Working records stay in the current tab until a file is downloaded.

### Challenges and learning from the build

The important logic was distinguishing a known obstacle from an unknown fact without hiding either behind a single positive badge. A hand-computable test matrix checks those cases. Independent source and Node review also exposed future-date imports, lost unfinished edits and overlapping import/confirmation actions; those issues were corrected and rechecked.

The entrant's interface feedback was direct: technical wording was confusing. Labels, explanations and the visitor card were rewritten in plain language, followed by fresh browser checks. The build produced ten passing automated tests, a clean-copy startup check and actual browser checks of the core journey, downloads, JSON reopening, draft preservation, selected keyboard actions and narrow layouts.

The key design lesson from the build was to expose why a route result changed and use ordinary words to explain it. This is an AI-assisted project; the evidence records technical checks, and testing with disabled visitors remains a next step.

### What is next

The next useful step is a small study with real organisers and disabled visitors: can they prepare and understand a plan, and which missing details matter most? Physical measurements, screen-reader behaviour, real-world benefit and customer demand remain unvalidated. Visitline compares entered observations; it does not inspect venues, certify accessibility, establish legal compliance or guarantee a safe visit.

### Sources

- [Euan's Guide Access Survey overview](https://www.euansguide.com/news/access-survey-results-overview)
- [Public source, planning and verification](https://github.com/KD-code-99/visitline)

## Built with

HTML, CSS, JavaScript, Node.js. AI-assisted development is disclosed in the story. No runtime model API is used.

## Main technology requirement

Actual form answer (232 characters; the form enforces a 255-character maximum):

Devpost Learn Skill Pack guided flipped-interaction questions, scope/PRD/spec, a bounded build and an app map. My feedback prompted plainer wording. AI assisted implementation and copy; 10 tests and browser checks verified the core.

The longer provenance is in the README and checklist. Individual learner approvals and a completed code tour are not claimed. The first, longer field answer was rejected by Devpost's 255-character validation and replaced before saving.

## Links

- Source: https://github.com/KD-code-99/visitline
- License: https://github.com/KD-code-99/visitline/blob/main/LICENSE
- Required public YouTube/Vimeo demo: pending entrant upload of the generated MP4.
- Owner-private hosted preview: https://visitline-route-card.kaann-dmrc99.chatgpt.site (not a public judging link).
