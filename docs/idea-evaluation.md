# Concept selection and its limits

Research date: 16 October 2026. Decision status: **prototype the event access-chain interaction**. No actual customer evaluation or prediction of winning has been established. The contest rubric is in [contest-research.md](contest-research.md).

## Starting hypothesis: hidden photo instructions

The user identified a serious need: control over harmful reuse of a person's likeness. The proposed mechanism and the prevalence of harm need separate judgments.

ImageProtector is directly relevant prior art. It optimizes near-invisible perturbations against open-weight vision-language models to induce image-analysis refusals. The published paper assumes access to model gradients; closed-source application is outside its evaluated scope. Its Table 3 reports 10.2 GPU-minutes per image for exact probing questions and 45.6 for similar/general questions in one LLaVA setup. This does not establish prevention of image generation or authority to block a conversation. No neural defense was executed here. [ACL 2026 paper, Sections 3–5 and Limitations](https://aclanthology.org/2026.acl-long.72.pdf)

PhotoGuard and DiffusionGuard demonstrate model-specific defenses against diffusion editing. They support the existence of this research direction, with threat-model and robustness limits. They do not support a universal stop instruction. [PhotoGuard](https://proceedings.mlr.press/v202/salman23a.html), [DiffusionGuard](https://proceedings.iclr.cc/paper_files/paper/2025/hash/43b77cef2a83a25aa27d3271d209e4fd-Abstract-Conference.html)

The 2026 Henry et al. study surveyed 7,230 adults in Australia, the UK and US in July–August 2024. It reports 7.0% self-reported AI image-based sexual-abuse victimization; among affected respondents, 55.0% gathered evidence and 33.0% did not know of StopNCII. These are region- and definition-dependent survey findings, not a global market estimate. They motivated a response-organizer alternative, not proof of demand for a new app. [Original study, published 8 September 2026](https://www.tandfonline.com/doi/full/10.1080/10447318.2026.2723677)

## Alternatives challenged

| Candidate | Need evidence | Material overlap / decision |
| --- | --- | --- |
| QuietCase: image-abuse action notebook | Survey evidence above; official removal workflows are confusing and distinct | Chayn already provides guided takedown assistance; evidence collection has extensive precedent. Keep as reserve; no compelling innovation advantage established. [Chayn](https://tools.chayn.co/), [Sherloc research](https://pages.cs.wisc.edu/~srstephenso2/publications/chi26-sherloc.pdf) |
| General image/screenshot redaction | Documented privacy concerns | Image Scrubber, Signal and commercial redactors already cover local editing; some advertise exact-export verification. Reject a generic implementation. [Image Scrubber](https://github.com/everestpipkin/image-scrubber), [Signal](https://signal.org/blog/blur-tools/) |
| Renter before/after dossier | Deposit documentation matters | RentProof already advertises matched photographs, PDF, offline/no-account operation. Reject the broad journey as closely duplicated. [RentProof](https://apps.apple.com/us/app/rentproof-rental-inspection/id6787016051) |
| Multi-dish cooking timeline | Primary HCI work documents coordination difficulties | Existing products already schedule backward, handle appliance conflicts and reschedule. Reject this proposed mechanism. [The Cooking Planner](https://www.thecookingplanner.com/), [Time 2 Table](https://time2table.com/) |
| Quantity-aware grocery pack planner | CMA identifies unit-price, cash, storage and overbuying issues | Calcworld already documents mixed-pack target-quantity and budget plans. A leftover constraint alone is insufficient evidence of a strong distinction. [CMA](https://www.gov.uk/government/publications/unit-pricing-analysis-and-consumer-research/summary-of-consumer-research-and-unit-pricing-analysis), [Calcworld](https://calcworld.co/cost-per-unit-calculator/) |
| Code counterexample studio | A 32-student/160-task study found difficulty comparing specifications and code | Visual execution and minimized examples already exist. An intention-first educational version remains a reserve. [Study](https://doi.org/10.1145/3696630.3731663), [Counterexample Studio](https://github.com/dicnunz/counterexample-studio) |
| Event access-chain authoring | Previsit information and continuous routes are documented needs | Retain the narrow event-specific authoring, missing-information propagation and visitor-card workflow for a discriminating prototype. Personalised routing itself is already established. |

These are bounded documentation comparisons, not proof of feature absence throughout the market. No numerical winning score or first-in-market claim is justified.

## Current front-runner: Visitline (working title)

Specific audience: a small event host preparing access information for visitors with stated mobility requirements. The proposed job is to explain whether the **recorded** route from arrival through entrance and seating to a toilet satisfies those requirements, and exactly where information is absent or incompatible.

Euan's Guide's 2025 survey, published 12 March 2026, includes over 4,000 respondents, 88% identifying as disabled. It reports that 47% had difficulty locating previsit information and 42% avoided venues without it. This is a relevant self-selected survey, not a representative prevalence or a test of Visitline. [Original overview](https://www.euansguide.com/news/access-survey-results-overview)

Scope's event guidance requests entrance location, room setup, dimensions, surfaces and toilet details. The NSW toolkit explicitly asks for a continuous path through the event. This supports evaluating connected segments rather than a single venue badge; it does not license us to set universal physical-access thresholds. [Scope guidance](https://business.scope.org.uk/toolkit/accessible-event-planning-toolkit/sending-more-information-before-the-event/), [NSW toolkit](https://www.nsw.gov.au/sites/default/files/2023-07/Toolkit-for-Accessible-and-Inclusive-Events.pdf)

Closest products: Sociability supplies detailed, personalised venue information; AccessAble produces professional access guides; AccessMap provides personalised route constraints; WelcoMe supports visit preparation and access preferences. Our prototype must earn its distinction through the tiny host-to-visitor authoring and change-impact loop, not by claiming to invent accessible routing. [Sociability](https://www.sociability.app/), [AccessAble](https://www.accessable.co.uk/), [AccessMap](https://www.accessmap.app/), [WelcoMe](https://www.wel-co.me/)

## Discriminating experiment

Use a clearly fictional event with two routes. One has stairs; the other lacks an entrance-width observation. The visitor requests step-free access and a stated clear width. The app must show **incompatible** and **unconfirmed** separately. Record the missing measurement, then change the visitor requirement or close a route segment. Every dependent conclusion must update. Export and reopen a visitor card and source file containing exactly the same observations and limitations.

An independent reviewer will challenge the fixture outcomes and the interaction. This can verify the mechanism and usability obstacles observed by that reviewer. It cannot establish improved real-world access, disabled-user benefit, regulatory compliance or a winning probability. If the interaction is merely a longer checklist, revise or reject it before expanding scope.

## Independent review already performed

A separate agent challenged the photo-protection and response-organizer claims using primary sources. This was **document review**, not independent reproduction, survivor research or a neural-defense benchmark. It rejected universal protection, conversation blocking, portrait hashing as future-edit prevention, and legal-proof exports. No real abusive imagery or third-party private data was used.
