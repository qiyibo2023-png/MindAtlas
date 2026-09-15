# Adaptive Assessment v1

Version: `adaptive-assessment-v1.0.0`. Every question and policy is `unreviewed`.
This is an original deterministic follow-up selector, not a diagnostic instrument.

## Integration and contracts

`src/adaptive/schema.js` defines the version, six-question default and registry.
`registry.js` holds 36 registered questions: 13 comparison families, developmental/
course/impact questions and targeted domain-specific rule-outs. A neutral generic
contradiction question is instantiated only for a registered Boolean concept.
`engine.js` selects and stops; `runtime.js` connects the shared stores;
`ui.js` presents one question or the final comparison, using centralized i18n.
`types.d.ts` documents the output shape.

The entry button is on the existing Differential v2 comparison page. Completed
assessment results and Router evidence flow through the existing Differential
adapters. Adaptive consumes `DifferentialV2.adaptiveContract`, including status,
candidates, support/opposition, missing facts, rule-outs, discriminators,
contradictions, collected evidence, Safety and evidenceState. Router candidate
domains are a small tie-priority input, never a diagnosis or a replacement for
structured evidence. Differential v2 core rules and Router v2.0.1 are unchanged.

Output contains adaptiveStatus, nextQuestion, whyThisQuestion,
competingDirections, expectedInformationValue, rankedQuestions, questionsAsked,
questionBudgetRemaining, stopReason, safetyState and engineVersion. Internal
priority scores are auditable but never displayed as clinical probabilities.

## Selection policy

Safety is evaluated first on every refresh and again before accepting an answer.
Acute or technical failure blocks ordinary questions; incomplete Safety requires
shared clarification. The existing guard and panel retain control of interruption,
resources and navigation. An optional new-safety text field runs the shared
extractor and interrupts immediately for an acute signal; raw text is not stored.
No safety threshold, extraction rule, or crisis resource is changed.

After Safety, explicit user stop and budget are honored. Reliable known primary
concepts are skipped, including false answers. Question IDs and all attempted
target concepts prevent repetitions even after unsure/decline. A single targeted
contradiction clarification is the explicit exception; uncertainty is preserved
if equal-priority direct reports still conflict.

Eligible questions must address active competing directions or an explicit sparse
context supported by Differential. Registry targets must intersect unresolved
information, apart from registered perception/activation/interest context checks.
Restriction motive requires restriction; compensation requires binge plus loss of
control; sleep-perception questions require an actual perception clue. A generic
medical-history loop is not introduced.

Priority = registered clinical-question priority + 10 per active compared domain
+ 20 for a matching unresolved discriminator + 2 for Router-domain alignment.
A contradiction gets 200. Equal values use stable question-ID order. These values
are engineering priorities, not Bayesian entropy, calibrated diagnostic weights,
or evidence of clinical validity. Independent review of priorities is required.

Two independently strong domains do not prompt peripheral exploration solely to
force a winner. A supported multi-domain result stops when no eligible useful
question remains. Reasonably saturated evidence stops without consuming the rest
of the budget. Sleep-only perception context with no other major psychosis facts
ends that ordinary sequence while keeping uncertainty. Unsupported context with
no independently supported core domain stops rather than forcing a core route.

## Answers, provenance and boundaries

Boolean updates use existing Differential concept IDs and `user_clarification`
provenance, stable question ID, engine version and sequence. Every accepted answer
reruns Differential. No Adaptive diagnostic scoring is added. Unknown/prefer/mixed
options without an explicit fact add no positive or negative fact; their attempt
remains in the structured answer ledger. Compound answers only update unresolved
targets, preserving already reliable facts. Contradiction questions may add a new
explicit report; they do not delete old evidence or arbitrarily resolve ties.

Pre-trauma presence maps to `adhd.onlyTrauma`, not childhood onset. Developmental
onset before 12 is asked separately where useful. Pre-mood timing similarly maps
to `adhd.onlyMood`. Preserved openness to alternatives maps to false for the
existing *limited insight* concept, not to a psychosis diagnosis. Both-pattern
options retain independent support without forcing a primary direction.

A new user-requested sequence retains prior structured Adaptive evidence, so known
facts are not asked again. Explicit comparison/Safety reset clears Adaptive too.
There is no persistence, analytics, network submission or raw-text archive.

## Budget and stopping

Default six questions, configurable 1–8 through the API. All submitted options,
including unknown/prefer, consume one turn. This is a UX boundary, not a clinical
threshold. stop_sufficient, stop_multiple_supported, stop_insufficient, stop_user,
stop_budget, stop_safety and stop_unsupported preserve the Differential output.
The final screen explains stopping, supported directions, outstanding information,
answered questions and a professional follow-up suggestion. Stopping never means
all conditions are ruled out.

## Bilingual and accessibility design

Stable concepts, IDs and structured answers are language independent. All new copy
is in the strict shared catalog. The current unsubmitted radio selection is an
in-memory draft, preserved through language switching, along with answers, budget,
Safety, graph and result. No new Chinese/English engines exist.

Semantic fieldsets/legends, native radios, visible focus, status progress,
explanation disclosures, labeled summaries and 44px-plus targets support access.
Mobile layout was inspected at 390×844. Browser fixtures are synthetic, separate
from source deployment. Targeted browser checks are not WCAG certification.

## Verification and limits

Run the full suite, all three benchmark runners, both benchmark audits and the
source-independent rebuild. Adaptive Benchmark has 183 independent synthetic
trajectories with English/Chinese counterparts (366 localized runs); see its
versioned report for eligible denominators and error-review framework.

Developmental history and multiple settings, intrusive thoughts versus compulsive
responses, and medical/substance context are professional review boundaries:
[NICE ADHD](https://www.nice.org.uk/guidance/ng87/chapter/recommendations),
[NICE OCD](https://www.nice.org.uk/guidance/cg31/chapter/Recommendations),
[NICE psychosis](https://www.nice.org.uk/guidance/cg178/chapter/Recommendations).
These references do not validate our question wording, selection weights or labels.

Known limitations: deterministic coverage is finite; most benchmark trajectories
are short; no independent clinical label adjudication, prospective patient study,
probability calibration or broad cultural/language extraction validation exists.
Some questions add interpretive context without immediately changing a rank;
Adaptive never invents aggregate diagnostic facts from one response. Equal-priority
contradictions may remain unresolved after clarification and should be reviewed
professionally. All 36 registered questions, generated conflict questions and 13
processing policies remain unreviewed.
