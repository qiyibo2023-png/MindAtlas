# Psychosis / Severe Mental Health Assessment v1 — implementation catalog

Internal version: `psychosis-assessment-v1.0.0`. Adult self-report, 18+. Status: **unreviewed**. This is an original structured educational prototype, not a validated screener, formal diagnosis or schizophrenia probability calculator. Successful tests do not establish clinical validity.

## Architecture and state

- `src/psychosis/data.js`: stable question IDs and conditional modality sections; no experience-content fields. Entry includes a structured presenting concern.
- `engine.js`: three-valued facts, contextual consistency, missing/conflicting evidence, independent impairment and medical-review notice.
- `safety.js`: explicit current Safety answers, shared collection, immediate guards and reset integration. No separate risk engine.
- `router.js`: seventh registered domain; contextual extraction from the shared `ExperienceContext` representation.
- `integration.js`: registration with the existing shared Differential evidence normalizer, provenance and rules. No separate comparison engine.
- `ui.js`: native labeled selects, validation, optional explanations and structured summary; presentation language does not change answers.
- `types.d.ts`: state/result contract.
- `src/shared/experience-context.js`: transient sentence/context analysis and structured observations.
- `src/shared/contextual-safety.js`: contextual filtering before the existing bounded Safety extractor and clause-local command interpretation.

## Workflow and interpretation

Entry and current Safety precede the experience sections. The six perception gates separately expose auditory, visual, tactile, smell/taste, presence and distortion questions. Each selected modality records current versus historical timing, recurrence, awake/sleep context, conviction, capacity to consider alternatives, distress, impact, trauma and substance timing. Deselecting a modality clears only its dependent answers.

Belief categories are neutral reports, not assertions that a concern is false. Conviction and alternative-explanation capacity have separate fields. New thought/speech/behavior changes are distinguished from longstanding differences. Motivation, expression, speech, social and pleasure changes are nonspecific and cannot independently establish a strong psychosis direction. Function is compared with the person's own baseline. Duration is recorded without using a schizophrenia duration threshold.

Context checks cover Mood episodes, activation, trauma re-experiencing, dissociation with preserved reality testing, OCD rituals/neutralization, anxiety, developmental differences, sleep transition/deprivation, substances/withdrawal, medication changes, medical/neurological change, community context and grief. Unknown remains unknown. A positive predominant contextual alternative caps an independent psychosis interpretation; independently completed assessments can still retain co-occurring directions.

The qualitative pattern requires a qualified core experience, current course, distress or functional impact, contextual independence and coherent answers for its strongest level. Perception can qualify through recurrent awake externally located experiences; belief qualification additionally requires strong conviction and limited alternative-explanation capacity. These are prototype assessment-relevance rules, not diagnostic criteria. Functional decline can matter despite little distress. Isolated sleep-transition experiences, distress alone, ordinary doubt, cultural belief alone, dissociation alone and negative-like features alone do not produce a strong psychosis interpretation.

## Shared Safety and contextual extraction

All original Safety rule thresholds remain unchanged. Explicit dangerous commands, intent and current medical/self-care concerns are forwarded to the same shared Safety schema. A command does not fabricate actual desire, intent, plan or preparation. Existing command-to-harm escalation is retained as a preventive interruption; it is not a determination that the person wants violence. The control question asks about actual control difficulty rather than fear of an unwanted thought.

The shared contextual layer protects other-person reports, clinician questions, multi-sentence quotations, negation, historical and hypothetical content. First-person intent toward a relational target must remain first-person evidence. Command content is evaluated within its own clause, so a benign command cannot be combined with an unrelated feared harm image. Context parsing is bounded and transient. It is still lexical and can miss complex language; it is not a general clinical language model. Safety unknown/failure behavior remains active.

Sudden serious confusion/disorientation is a medical Safety signal, not inferred dissociation. Medical/substance alternatives do not generate a causal diagnosis. The routine result recommends timely professional/primary-care assessment, appropriate early-intervention services, optional support and prescriber review without recommending prescription changes.

## Shared Differential and Router

Router requires recurring current perceptual evidence plus fixed-belief evidence or awake functional decline. Sleep, doubt and explicit contextual alternatives inhibit the high route. A single voice mention remains insufficient. Structured assessments and explicit clarification outrank free text through the existing normalizer; contradictory lower-quality evidence remains auditable. Router facts do not establish a formal diagnosis.

Differential adds a Psychosis candidate beside all six existing domains, retains Mood/activation/OCD/Trauma/Anxiety/developmental alternatives and preserves independently supported existing candidates. Explanations show translated concepts, supporting/opposing evidence, missing details and rule-outs rather than rule IDs or quoted narratives. Evidence from an edited result is invalidated.

## Review catalog

All rules below default to `unreviewed`; clinical review must address false positives, omissions, bilingual equivalence and escalation implications.

- `PSYCHOSIS_CONTEXTUAL_PATTERN_001`: qualifier composition, impairment, contextual alternatives and consistency caps.
- `ROUTER_PSYCHOSIS_CONTEXTUAL_001`: seventh-domain recommendation and context exclusions.
- `DIFF_PSYCHOSIS_QUALIFIED_PARTIAL`, `DIFF_PSYCHOSIS_CONTEXTUAL_FULL`: shared candidate support.
- `DIFF_PSYCHOSIS_DEPRESSION_RETAINED`, `DIFF_PSYCHOSIS_ACTIVATION_RETAINED`: retention of mood relationships.
- `DIFF_PSYCHOSIS_CONTEXT_*`: OCD, Trauma, Mood/Bipolar, Anxiety and ADHD context.
- `DIFF_PSYCHOSIS_ALTERNATIVE_*`: sleep, culture, grief, medical, substance and dissociation.
- `ExperienceContext` and contextual Safety extraction: subject, quotation, timing, denial and command-clause handling, including explicit relational-target intent.

## Privacy, accessibility and bilingual behavior

No raw narrative questions, religion/ethnicity fields, analytics, network requests, local storage or experience logs are added. Raw text is transient; Router observations, evidence and audit records contain structured fields only. Tests use clearly designated synthetic fixtures. Browser fixtures are outside `src/` and never included in production builds.

All labels/options/results use central catalog keys. Clinical state contains stable IDs independent of language. Keyboard focus, semantic headings, labels/error descriptions, large touch targets and wrapping reuse the platform conventions. Acute screens hide assessment navigation and ordinary Continue actions.

## Evidence and limits

Clinical context was checked against [NICE CG178 recommendations](https://www.nice.org.uk/guidance/cg178/chapter/recommendations) and [NIMH Understanding Psychosis](https://www.nimh.nih.gov/health/publications/understanding-psychosis), accessed 2026-09-13. They support considering clinical course, functioning, medical/medication/substance and wider context, with professional assessment. They do not validate this questionnaire or its rules.

No clinician approval, sensitivity/specificity study, service availability guarantee or diagnostic validation is claimed. Cultural interpretation cannot be resolved by a binary answer. The questionnaire can still be lengthy, and bounded text patterns cannot cover every expression. Specialist clinical review and usability review are required before use beyond a research/educational prototype.

The shared transient Router normalizer also recognizes the equivalent phrase "worry all the time about" so mixed Anxiety evidence is retained; the frozen original Router extractor and its clinical rules remain unchanged.
