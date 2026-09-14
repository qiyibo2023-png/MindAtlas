# Cross-Disorder Differential v2

Development version: `cross-disorder-differential-v2.0.0`. All rules and processing
policies are **unreviewed**. Software verification is not clinical validation.
The pre-refactor findings are in [the audit](DIFFERENTIAL-V2-AUDIT.md).

## Runtime and migration

The active comparison page uses `DifferentialV2.render/current/evaluate` from
`src/differential-v2/`. The seven assessment engines and Router v2.0.1 are unchanged.
The v1 public API remains available for compatibility and its original regression
suite. Its declarative rules and stable assessment adapter contracts are reused;
the v2 evaluator does not invoke the chain of v1 evaluation wrappers.

`registry.js` registers Mood, Anxiety, OCD, Trauma, ADHD, Eating and Psychosis once.
Each registration has directions, evidence mapping, supporting and opposing rules,
discriminating features, explicit rule-outs, critical evidence, permitted
co-occurring domains and review metadata. Matching rules are deduplicated by ID.
No clinical decision depends on a translated label.

`schema.js` validates nodes; `contracts.js` registers categorical course/function
observations; `graph.js` selects evidence; `adapters.js` reads structured contracts;
`engine.js` compares directions; `runtime.js` caches by evidence/Safety fingerprint;
`ui.js` renders bilingual explanations and summaries. `types.d.ts` describes the
development interface. No Adaptive question-selection engine is implemented.

## Evidence and precedence

Each node retains a concept ID, value, domain, subject, time, source/type,
question IDs, revision, source-engine version, quality and sequence. Conflict links
are computed, never accepted from an input client. Extra properties and raw text
are rejected. Categorical values must be registered answer codes, not arbitrary
strings. Declined/uncertain recollections are not reliable positive facts.

The source hierarchy is explicit: Safety clarification (5), direct clarification
(4), structured assessment/developmental/function/course/exclusion data (3),
screener (2), extracted clue (1). This is a provenance policy, not a scale of
diagnostic certainty. Screeners and extracted clues alone cannot establish a
strong structured direction. Router recommendations and ranks are never evidence.

Within a temporal bucket, higher-priority evidence is selected. Conflicting values
at equal priority remain unknown. Revision numbers do not automatically erase an
independent response. Both original nodes, selected IDs, selected value and policy
remain available. A resolved weaker disagreement is not automatically treated as
an unresolved clinical conflict. Explicit broad-versus-exclusive worry and
incompatible eating-motive relationships also remain auditable contradictions.

Current, historical and episodic observations have separate maps. Historical
perceptions do not become current psychosis. Exposure history, ADHD developmental
onset and activation/bipolar-history assessment are explicitly longitudinal
concepts. Hypothetical, quoted, other-person, uncertain-time and uncertain reports
remain in the graph but cannot establish current personal symptoms. Typed course
and functional observations preserve severity, settings, baseline change and
persistence without turning them into additional symptom points.

## Comparison and uncertainty

The inherited conjunction rules retain their clinical anchors. Cross-domain
context alone is limited to weak support; independently assessed patterns can
coexist. Qualitative levels are insufficient/weak/supported/strong, not disease
probabilities. Missing requirements or unresolved rule-outs limit strong support.
Opposition and unresolved domain conflicts are explicit. Multiple strongest
directions remain primary; other supported directions and weaker alternatives are
retained. Co-occurrence combinations also include independently supported primary
directions, not just lower-ranked candidates.

Missing is distinct from false. Medical, substance, medication, sleep, neurological
and GI considerations are not silently cleared. Unsupported autism, substance,
somatic, sleep, personality, grief, body-image, hoarding and cognitive contexts
remain alternatives when reported; they are not new assessment modules.

Discriminators identify a needed concept, competing domains, a neutral explanation,
evidence references and whether it has already been asked. Unresolved conflicts
come first; competing domains precede general gaps; previously asked unresolved
items receive a lower default priority. Reliable known concepts are omitted.
This inventory is not a request to repeat questions or a question-selection policy.

`evidenceState` distinguishes insufficient evidence, continued discrimination and
reasonable saturation of the registered comparison. Saturation requires covered
critical evidence, addressed registered rule-outs and no unresolved discriminators;
it cannot mean all possible conditions have been ruled out.

## Safety and privacy contracts

Safety runs first. Acute interruption or technical Safety failure returns
`safety_interrupted` without ordinary candidates. Incomplete Safety information
remains a pending rule-out, while the existing Safety guard controls the UI.
Suicidality does not create Mood evidence. Intrusive thought interpretation remains
owned by the shared Safety Engine. No Safety escalation threshold was changed.

Assessment adapters require current generated results and stable question IDs.
Stale results are excluded. The Router adapter reads its v2 evidence log with
subject, time, quotation and clarification provenance. The legacy Router projection
is not used by the active v2 comparison. There is no new storage, logging,
telemetry, network submission or raw free-text archive. State stays in memory.

`adaptiveContract(result)` returns a detached machine-readable snapshot containing
status, candidates, gaps, discriminators, contradictions, reliable collected
evidence, Safety state and saturation. It cannot mutate the live result. Full audit
results additionally retain the graph and candidate/evidence relationships.

## Presentation and review boundary

All new copy is in the centralized English/Simplified Chinese catalog. Switching
language changes presentation only. Summaries include supporting/opposing evidence,
co-occurrence, provenance, course/function context, uncertainty, rule-outs, Safety
and version. Technical IDs stay out of ordinary explanations. The mobile comparison
uses a non-sticky header so navigation cannot cover most of the reading viewport.

Review is still required for every inherited rule's use in v2, new partial support,
source hierarchy, contradiction policies, consistency limits, co-occurrence,
discriminator priorities and saturation. These are an original deterministic
research prototype, not a validated diagnostic instrument or clinician substitute.

Reference checks informing review boundaries:

- [NICE ADHD assessment recommendations](https://www.nice.org.uk/guidance/ng87/chapter/recommendations)
  support preserving developmental history, impairment and multiple settings.
- [NICE adult psychosis assessment recommendations](https://www.nice.org.uk/guidance/cg178/chapter/recommendations)
  support retaining medical, prescribed-drug, substance and affective context.
- [VA National Center for PTSD: acute stress disorder](https://www.ptsd.va.gov/professional/treat/essentials/acute_stress_disorder.asp)
  supports keeping recent post-trauma symptoms distinct from established PTSD.

These sources do not validate MindAtlas's rule weights, evidence priorities or
benchmark labels. Independent clinician review and broader evaluation remain needed.

## Verification

Run `node scripts/test-all.cjs`, `node scripts/differential-benchmark.cjs`,
`node scripts/router-benchmark.cjs` and `node scripts/verify-source-rebuild.cjs`.
The new suite separates graph, real-adapter/UI parity, and clinical-boundary tests.
The dedicated benchmark is described in `benchmarks/differential-v1/REPORT.md`.
Browser controls in `tests/differential-v2-browser.js` contain synthetic data only
and are excluded from `src/` and deployment.

The final specification is reconciled through section 111. The authorized milestone is local only. No tag or remote synchronization is included.

## Explicit future-facing contracts

Safety remains the authority for suicide, self-harm, violence, dangerous commands, medical emergencies, eating-related instability, delirium/confusion, mania, severe self-care loss and withdrawal. Differential cannot downgrade it or suppress pending safety clarification through saturation. Representative cases compare directly against GlobalSafety.evaluate.

Router supplies evidence nodes, not diagnostic authority. Structured assessment adapters supply registered facts and typed observations with source/question provenance, not translated result labels. Neither contract changes existing assessment scores or Router ordering.

The detached Adaptive contract exports engineVersion, differentialStatus, candidateDirections, supportingEvidence, opposingEvidence, missingEvidence, unresolvedRuleOuts, unresolvedDiscriminators, contradictions, alreadyCollectedEvidence, safetyState, evidenceState and evidenceStateReasons. Sparse intrusion can expose neutralization and trauma-memory questions even before a competing domain is supported; concentration context can expose developmental onset without itself ranking ADHD. Reliable true and false answers suppress repeat requests. Seven sparse readiness scenarios and their inverse/parity cases are covered in differential-v2-finalization.test.cjs.

A future Adaptive Assessment should consume this snapshot through a version-checked boundary, prioritize unresolved Safety/medical needs first, and select registered bilingual questions only for unresolved concepts. Maintain a bounded asked/declined inventory and provenance-preserving answer adapter; recompute Safety before comparison after each response. Treat saturation as a registered-evidence stopping aid, never diagnostic certainty. This task implements only the export contract, not that selector or workflow.
