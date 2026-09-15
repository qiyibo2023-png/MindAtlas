# Assessment Entry Flow v1 completion audit

Version `assessment-entry-flow-v1.0.0`; engineering verification on 2026-09-14. This report covers sections 1–80. Synthetic scenario metrics do not establish diagnostic accuracy or clinical validation.

## Problem and architecture

Previously, a short description could reach insufficient routing and leave rewriting the description as the apparent next step. EntryFlow now coordinates the existing Router, keeps session evidence, offers limited clarification and exposes useful exits. It neither replaces Router reasoning nor invokes Differential as an entry router. Adaptive remains downstream.

The eight-entry registry contains one broad concern-family selector and one small clarifier per supported domain. Choosing a family alone creates no symptom fact. Explicit follow-up answers add shared concept IDs with clarification provenance. Router v2's eligible high-information question takes precedence over the broad fallback, including the hardened Mood–OCD question. Route ranks, ordering, unsupported labels and benchmark expectations are unchanged.

## Complete state transition table

“Live check” means the existing shared Safety engine executes; it does not necessarily mean the user sees a Safety panel. Any user action below is denied while the shared gate blocks it. `Q` means either clarification state. The table includes synchronous evaluation states that are not separately displayed.

| State | Allowed incoming states / trigger | Allowed outgoing states / trigger | Evidence mutation | Safety behavior | Budget |
| --- | --- | --- | --- | --- | --- |
| ENTRY_DESCRIPTION | Initial load/reset; any nonblocked state via explicit Edit | SAFETY_EVALUATION on intentional submit; DIRECT_ASSESSMENT_SELECTION on manual selection | Opening Edit keeps facts; submitting replaces extracted symptom facts and previous entry sequence | Live check before action and before extraction; explicit Safety answers retained | Reset only on explicit new submission or clear |
| SAFETY_EVALUATION | ENTRY_DESCRIPTION or explicit new description submission | SAFETY_CLARIFICATION if blocked; ROUTER_EVALUATION otherwise | Replace extracted Safety signals; preserve explicit relevant answers unless contradicted by new information | Shared extraction and live evaluation run first; acute/failure prevents Router extraction | No answer increment |
| SAFETY_CLARIFICATION | Any active entry state on new required Safety interaction | Prior state on permitted acknowledgment/resume; initial state only through authoritative reset/clear | Safety answers update shared signals; Router profile, Q1 answer and entry budget retained | Acute remains interruptive across renders; incomplete and failed remain distinct; no ordinary acute Continue | No entry increment |
| ROUTER_EVALUATION | Initial permitted submission; Q answer; resumed Safety; additional text | ROUTER_CLARIFICATION if eligible; ENTRY_BROAD_CLARIFICATION if insufficient with useful question; ROUTE_RECOMMENDATION if supported; DIRECT_ASSESSMENT_SELECTION if exhausted/no useful question; UNSUPPORTED_NAVIGATION if unsupported | Existing Router calculates result from preserved normalized profile | Live gate consulted; new blocking information takes priority | Unchanged by evaluation |
| ROUTER_CLARIFICATION | ROUTER_EVALUATION selects eligible existing discriminator; Back; Safety return | ROUTER_EVALUATION on valid answer; DIRECT_ASSESSMENT_SELECTION on uncertainty/refusal/manual choice; STOPPED, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION, or prior Q on explicit action | Existing `RouterV2.answer` semantics and source/context retained | Live check before answer and next navigation | +1 on accepted answer; shared total limit 3 |
| ENTRY_BROAD_CLARIFICATION | Insufficient Router result; Back; Safety return | ROUTER_EVALUATION on valid answer; UNSUPPORTED_NAVIGATION on Other; DIRECT_ASSESSMENT_SELECTION on uncertainty/refusal/manual choice; STOPPED, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION or prior Q | Family is a preference; domain options add only previously unknown concepts; no inferred denials from uncertainty | Live check; waking perceptual report feeds existing hallucination signal | +1 on accepted answer; shared limit 3 |
| ROUTE_RECOMMENDATION | Sufficient/multiple results or best available candidates at limit | Supported assessment via user selection; prior Q on Back before limit; DIRECT_ASSESSMENT_SELECTION, STOPPED, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION; ROUTER_EVALUATION on added text | Navigation alone adds no diagnostic facts or Router preference | Always live-check selected route; ordinary controls hidden during acute state | No navigation increment |
| DIRECT_ASSESSMENT_SELECTION | User chooses directly; uncertainty/refusal; no useful question; exhausted insufficient sequence | Supported assessment, STOPPED, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION; prior Q on Back before limit; ROUTER_EVALUATION on added text | No manufactured recommendation; profile preserved | Shared gate plus central capability registry restrict routes | Unchanged |
| UNSUPPORTED_NAVIGATION | Unsupported Router result or explicit Other | Knowledge topic, DIRECT_ASSESSMENT_SELECTION, STOPPED, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION; prior Q before limit; ROUTER_EVALUATION on added text | No forced supported diagnosis or route | Shared Safety/medical pathway remains available | Unchanged |
| STOPPED | Explicit Stop or Explore information | Knowledge Library, DIRECT_ASSESSMENT_SELECTION, ENTRY_DESCRIPTION, SAFETY_CLARIFICATION; prior Q before limit; ROUTER_EVALUATION on added text | Session facts retained according to memory-only policy | Acute Safety still overrides navigation | Unchanged |

There is **no normal insufficient → ENTRY_DESCRIPTION transition**. Repeated evaluation and repeated uncertainty are tested. Every nonacute visible state has at least one actionable exit. A technical Safety failure retains the existing retry/reset and help UI; it is not falsely treated as an ordinary routing failure.

## Evidence, duplicate protection and navigation

- Original structured evidence retains denials, uncertainty, subject and temporal context through clarification, routing and assessment selection. Raw original text is not saved for editing.
- Registry `conceptIds` derive from shared field IDs. Fully known alternatives are filtered; contradictory known facts cannot be silently overwritten by a partial entry option. Only new concepts are appended. Existing Router discriminator eligibility uses its own known-concept checks.
- Back is an explicit replay/correction action: it restores the prior profile/question/answers, never refunds the monotonic budget, and cannot operate after the limit. Deliberately revisiting a question with Back is excluded from involuntary-duplicate metrics.
- Three accepted questions across Entry and Router end clarification deterministically. Uncertainty/refusal may stop sooner with choices. No extra question is asked simply to force a unique route.
- `EntryFlow.start` validates actual supported routes using TopicCapabilities. A manual choice neither changes Router ranks nor claims the Router recommended it. Existing facts remain available downstream; assessment-specific time frame and severity answers are not fabricated from routing preferences.
- Explore information sets STOPPED and navigates to Knowledge. It is not a failed assessment. Facts remain in memory until an intentional replacement, clear or reload. No profile is stored.
- Editing is explicit. Submission invalidates the stale extracted symptom profile, reruns Safety and Router, and starts a new bounded sequence. Additional text instead merges evidence and reevaluates without returning to description.
- Autism, sleep, substance/addiction, personality, somatic, grief/adjustment and cognitive concerns are covered by synthetic unsupported scenarios using the existing Router benchmark examples. They are not forced into the seven supported assessments.

## Safety evaluation versus visible interruption

`EntryFlow.checkSafety()` always consults the live shared engine, including direct module evidence. The remembered evaluation (`evidenceVersion`, `evaluatedAt`, resolved paths and fingerprint/result) is metadata, not an allowlist or permanent cached clearance. The existing acknowledgment fingerprint includes urgency, failure, matched rules and positive signals. New positives, escalation or processing failure still invalidate it. Ordinary Entry answers leave acknowledgment and resolved Safety answers intact. Repeating an identical resolved boolean Safety answer does not reopen an unchanged panel; an unknown answer still follows existing clarification behavior.

Tests cover initial replacement, broad/domain answers, direct module answers, Adaptive answers and newly entered text. A dedicated Q2 return test preserves the original low-energy evidence, Q1 answer, Q2 identity and budget exactly. Real browser checks additionally enter a passive death wish at Q2, resolve the targeted Safety questions, and return to Q2. Acute rendering never resumes ordinary entry on its own; existing recovery/reset remains authoritative.

Two concrete coverage defects found during completion were corrected in the **shared** contextual Safety extractor, version `contextual-safety-coverage-v1.0.1`:

1. Explicit current first-person Chinese intent to kill other people now maps to the existing `harmToOthers.intent` signal.
2. “I wish I were/was dead” maps to existing `suicide.passiveDeathWish`, without inventing suicidal intent.

Subject, present-time, polarity, question and quotation guards remain. Negative, historical, third-party, hypothetical and intrusive-thought examples are tested. No rule threshold changed; both patches remain **unreviewed** and need clinician review.

## UX, bilingual and privacy audit

All new strings are centralized paired i18n keys. Neither locale nor language switching modifies answers, evidence, budget, active question or route. The interface presents routing rather than diagnosis, explains uncertainty without blaming the user, and makes refusal/stop available. State and urgency use wording and semantics, not color alone.

Progress is an atomic polite status region, not a diagnostic percentage. Questions use fieldset/legend and native buttons. Headings, labels, Back and exits are keyboard accessible; the tested focus outline is 3px, and entry options are at least 48px tall. Both English and Chinese wrap at 390×844 without horizontal overflow (content width 375). Desktop 1280×900 also has no overflow (content width 1265).

Browser checks cover all 27 section-53 categories, including seven domain flows, vague/short input, uncertainty/refusal/other, manual assessment, knowledge escape, budget, multi-route, edit, Back, nonacute return, newly emerging acute Safety, deletion and bilingual switching. Existing evidence preservation is checked structurally in automated tests; browser checks verify the visible step/progress and controls. No new browser console errors were observed. Temporary test tabs were closed and viewport override reset.

EntryFlow is in the Privacy inventory under Router evidence and in the startup-snapshot clear list. Raw text is only transient input/DOM draft. No persistent storage, clinical telemetry, URLs with answers, long-term profiles or raw logs were introduced. No Entry event logger or network sink exists. Optional in-memory metadata and the synthetic scenario report contain IDs/states, not patient narratives. Existing privacy tests and static sink checks pass.

## Results and metric definitions

The separate scenario suite has **29 paired scenarios / 58 localized runs**. It includes seven successful route flows, one-symptom input, ambiguity, seven unsupported domains, uncertainty, budget, manual choice, knowledge/stop, edit, Safety return and three acute emergence paths.

| Development metric | Result | Definition |
| --- | --- | --- |
| Involuntary restarts | 0 | Unexpected ENTRY_DESCRIPTION after an event other than explicit edit/new entry |
| Dead ends | 0 | Nonacute rendered state lacking an actionable entry or Safety control |
| Duplicate questions | 0 | Automatic reappearance of an answered question, or a known-only entry alternative; intentional Back replay excluded |
| Unnecessary repeated Safety UI | 0 | Reopened nonacute gate for an already acknowledged unchanged fingerprint |
| Route completions | 20 | Localized runs ending with route recommendations; includes multiple-route outcomes |
| Budget exhaustion | 2 | Localized runs reaching the three-answer cap |
| Bilingual parity | 29/29 | Matching final facts, answers, budget, route ordering and Safety urgency for each language pair |

Metrics are scoped to these deterministic synthetic scenarios, **not** all possible users or clinical validation. `docs/entry-flow-metrics.json` is the summary; rerun `node scripts/entry-scenarios.cjs` for traces in ignored `work/`.

- Full regression: **1,221/1,221** (1,075 old + 146 Entry/completion checks). The 146 include the 58 localized scenario assertions.
- Safety core/routing/UX: **87/87**; Safety extraction regression **10/10**, plus new coverage/context tests in Entry audit. All seven disorder module suites pass.
- Privacy: **106/106** existing checks plus Entry deletion checks and static boundary validation.
- Router benchmark unchanged: primary/clarification/status/unsupported 226/226; top-two 88/88; Safety 14/14; bilingual 113/113; false positives 0/92.
- Differential benchmark unchanged: primary/direction/Safety/status 264/264; co-occurrence 114/114; contradictions 28/28; bilingual 132/132; false forced winners 0/114.
- Adaptive benchmark unchanged: next/stop 314/314; top-two 296/296; duplicate avoidance 550/550; updates 234/234; Safety 38/38; bilingual 183/183.
- Translation completeness: **2,421 paired keys**. Source-independent isolated rebuild: **121 runtime files**, byte-identical to source assembly.

## Files and checkpoint

Created (10): `src/entry/registry.js`, `src/entry/runtime.js`, `src/entry/ui.js`, `src/entry/style.css`, `tests/entry.test.cjs`, `tests/entry-audit.test.cjs`, `scripts/entry-scenarios.cjs`, `ASSESSMENT-ENTRY-FLOW-V1.md`, `docs/entry-flow-metrics.json`, `docs/entry-flow-completion-report.md`.

Modified (9): `README.md`, `scripts/test-all.cjs`, `src/i18n/catalog.js`, `src/index.html`, `src/privacy/policy.js`, `src/privacy/runtime.js`, `src/shared/contextual-safety-coverage.js`, `docs/privacy-data-inventory.json`, `docs/privacy-data-inventory.md`.

Only those 19 intended source/test/documentation files belong in the local checkpoint. Generated `dist/`, scratch scripts/logs under `work/`, backups, ZIP files, environment files and browser data are excluded. No existing benchmark cases or assertions were weakened. The branch is `feature/assessment-entry-flow-v1`, based on verified local main `bb49a9caf001f1783f0aecc9678215cc2619c6e2`. Commit message: `feat: add progressive assessment entry flow`. No tag or push is part of this checkpoint.

## Limitations and next step

The extractor remains deterministic and cannot understand every paraphrase. Family choice is not diagnostic evidence; the brief follow-ups cannot establish disorders. Early uncertainty can lead to direct selection instead of more questions. Back does not refund budget, and original prose cannot be restored because it is not retained. A source rebuild and test pass are engineering evidence, not clinical approval or legal compliance. The new question mappings and two extraction corrections require independent clinical review.

Recommended next milestone: **Personal Profile v1**, as a separate explicitly authorized task, beginning with consent, retention and deletion requirements. It has not been started.
