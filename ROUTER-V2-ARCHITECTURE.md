# Symptom Router v2

Development version: `symptom-router-v2.0.0`. All added routing, clarification and extraction rules are **unreviewed**. Engineering verification is not clinical validation.

## Runtime and compatibility

The live free-text entry uses `RouterV2` through `SymptomRouter.submit/resume/render/bind`. Safety executes before symptom extraction. An acute or failed safety check never produces an actionable Router result. Every clarification and assessment launch checks the shared Safety gate again.

`src/router-v2/registry.js` registers Mood, Anxiety, OCD, Trauma, ADHD, Eating and Psychosis in one engine. Each domain carries evidence requirements, opposing and discriminating features, explanation keys and clarification IDs. Rule ranks are qualitative ordering, never diagnostic scores or probabilities. A tie between supported patterns preserves multiple routes. Additional symptoms do not break ties by raw count. Isolated low mood, attention difficulty or perceptual experience cannot establish a strong primary recommendation.

The old `SymptomRouter.extract/route` APIs remain explicit v1 compatibility endpoints. Existing hash-protected v1 source and its tests are unchanged. They are not the live entry's decision engine. The unchanged Differential v1 receives a normalized v1 profile projection; complete v2 context and conflict provenance remain in `store.v2`. This avoids silently changing existing Differential rules. A future Differential v2 can consume the full versioned profile.

## ClinicalSymptomProfileV2

See `src/router-v2/types.d.ts` and the runtime validator in `schema.js`. Stable dotted concept IDs are independent of language. Facts are `true`, `false` or `unknown`; evidence stores IDs, concept, value, source and structured context, never excerpts. Context distinguishes self/other/unclear, current/recent/historical/hypothetical/unclear, affirmation/denial/uncertainty, quotation/report/question status and certainty. The course object retains broad duration, frequency and severity; general fields retain functional, school, work and relationship impact, attention, onset and contextual links.

Validation rejects unexpected properties, malformed values, unknown paths, invalid provenance and facts inconsistent with normalized evidence. Text is limited to 4,000 characters and evidence to 500 rows. Overflow fails rather than truncates. The v1 projection contains normalized facts rather than a truncated evidence log. Deprecated v1 unsupported flags for now-supported domains stay unknown in v2.

## Extraction and limits

The extractor reuses the established phrase extractors and shared ExperienceContext segmentation per clause, then normalizes one shared fact set. Chinese and English are lexical alternatives, not separate clinical engines. Quoted clinician questions and a subsequent denial do not become personal symptom endorsements. Other-person, hypothetical and historical symptoms cannot become current positives. Historical trauma exposure can contextualize current reliving; exposure alone does not support a trauma route. Conflicting known evidence remains visible internally; an explicit clarification takes precedence without erasing the extraction record.

Telephone and explicitly figurative inner-voice contexts are separated from psychosis routing. Sleep transition, cultural, trauma and substance context lower Psychosis relevance. Recent onset lowers the developmental ADHD interpretation. Sudden cognitive change prioritizes medical review, while acute medical signals remain under Global Safety authority.

This is bounded local phrase processing. It cannot reliably understand every idiom, scope ambiguity, long narrative, medication effect or medical mimic. Course is qualitative, not a diagnostic duration calculation. Missing facts are not denials. No network model, profile storage or narrative persistence is added.

## Clarifications

Eighteen registered questions cover Mood–Anxiety, OCD–GAD, OCD–PTSD, OCD–Psychosis, ADHD–Mood/Anxiety/PTSD/Bipolar, Eating–Mood/OCD/Anxiety, AN–ARFID context, BN–BED compensation, Psychosis–PTSD/Dissociation/Mood, sleep–Psychosis and attention onset/context.

Selection uses eligible candidate domains, required evidence, unknown discriminators and deterministic ordinal information value. One question is shown at a time. Answers update the same concept IDs and rerun routing. Maximum three questions; stop on uncertainty, prefer-not-to-answer, user stop, sufficient discrimination, multiple legitimate directions, unsupported domain, insufficient information or Safety interruption. This is a small fixed clarification mechanism, not Adaptive Assessment. Selecting an alternative assessment never fabricates clinical evidence.

## Safety coverage corrections

`shared/contextual-safety-coverage.js` fixes literal coverage for explicit current severe confusion, severe breathing difficulty and Chinese intent to harm others, and removes the explicit inner-voice metaphor from command interpretation. It uses existing signal IDs and unchanged Safety rules/thresholds. Negative, third-person, historical and hypothetical controls and independent suicidal intent have regression tests. Metadata defaults to `unreviewed`; review is required before clinical use.

## Presentation, privacy and future integration

All new copy belongs to the `rv2` namespace in the central catalog. Switching language changes neither answers, route, Safety nor Differential state. Unsupported topics link to the existing bilingual knowledge panels with specific labels. UI uses semantic headings, fieldsets, native buttons, visible focus and at least 48px touch targets. Acute safety screens suppress Router controls and ordinary navigation.

No new disorder assessment, Differential v2, tracking, account, care navigation or remote inference was added. Future consumers should use the validated profile, evidence IDs and stable result contract, retain shared Safety priority, and register copy centrally.

## Verification and benchmark

Run `node scripts/test-all.cjs`, then `node scripts/router-benchmark.cjs`. The latter writes a reproducible report to ignored `work/`. The checked-in benchmark report records the exact checkpoint output; it is not an automatically updated production asset. See `benchmarks/router-v1/REPORT.md` and `CHECKPOINT-ROUTER-V2.md`.
