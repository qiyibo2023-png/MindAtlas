# Eating Disorders Assessment v1 — implementation and rule catalog

Internal version: `eating-disorders-assessment-v1.0.0`. Population: adult self-report, 18+. All new rules and adapters are **unreviewed**. This original structured educational assessment is not a validated screener, diagnostic service or treatment prescription.

## Architecture

- `src/eating/data.js`: original questions, stable IDs, answer values and section order. All labels/options reference the centralized i18n catalog.
- `engine.js`: revisioned state, three-valued facts, four qualitative patterns, missing/conflicting evidence and medical-review notice.
- `medical.js`: explicit current symptoms mapped to existing Global Safety signals; shared collection/guard/reset integration.
- `extraction.js`: bounded shared Safety extraction additions for current dehydration, hydration failure, bleeding, fainting and basic intake concerns.
- `integration.js`: existing shared Differential registration, evidence provenance, competing and co-occurring directions.
- `router.js`: sixth-domain registration, structured extraction and explainable route selection.
- `ui.js`: native forms, explainable results and optional structured summary in either language.
- `types.d.ts`: state and result contract.

The shared clinical engines remain authoritative. There is no separate Eating suicide engine or separate cross-disorder comparison engine. Original Mood, Anxiety, OCD, Trauma and ADHD engine files and original Safety rule thresholds are unchanged.

## State and workflow

State separates `intro`, `safety`, `medicalNow`, `overview`, `restriction`, `shape`, `binge`, `compensation`, `exercise`, `arfid`, `course`, `function`, `physical`, `medical`, `substance` and `context`, plus revision. Stable IDs are identical in Chinese and English. Missing and unsure/prefer-not-to-answer values are not false.

The sequence is adult scope and voluntary entry; short groups of shared Safety questions; three groups of current medical questions; overview; restriction; weight/shape motivation; amount and loss of control; compensation; exercise flexibility; sensory/low-interest/consequence-fear avoidance; frequency/course; twelve functional areas; physical consequences; medical/substance/access factors; contextual comparison; result and optional summary. Positive medical danger is evaluated immediately, before the next question or ordinary result. No weight, height, BMI, calorie record, food list, procedural purging description or narrative is collected.

## Four pattern models

| Pattern | Qualifying evidence | Important uncertainty |
|---|---|---|
| Restrictive / AN-like | Repeated persistent restriction, primary weight/shape motivation, fear of gain, overvaluation, functional impact, persistence, independence and coherent answers | No weight criterion is assessed; therefore this is not an anorexia diagnosis |
| Binge / compensatory / BN-like | Larger episode plus loss of control, recurrent episodes, recurrent compensation, overvaluation, persistence, independence and coherence | Body size is not used; restriction with binge/purge features remains visible |
| Binge / loss-of-control / BED-like | Larger episode plus loss of control, recurrent episodes, marked distress, no regular compensation, persistence, independence and coherence | Overeating alone is insufficient; subjective amount leaves the larger-episode fact unknown |
| ARFID-like | Persistent restriction/avoidance, sensory/low-interest/consequence-fear driver, no primary weight/shape motive, nutritional or functional consequences, persistence, independence and coherence | Fear of choking/vomiting also retains specific-fear assessment; mixed motives remain unresolved |

Frequency categories distinguish none, isolated, repeated-less-than-weekly and about-weekly-or-more. Repeated/weekly values support recurrence. One month or more plus persistent/recurring course supports the prototype's persistence context. **These are custom descriptive rules, not formal diagnostic-duration criteria.** No formal BN/BED frequency threshold, BMI cutoff or validated scale scoring is claimed. Score is null; probabilities are not displayed.

Each pattern exposes support, opposing and missing facts. Qualifying anchors allow partial support; contrary facts lower it, unknown qualifying facts prevent high consistency, medical/substance exclusions prevent high module consistency, and conflicting frequency/motivation prevents high consistency in both the module and shared comparison. The common Differential engine additionally treats reported medical/substance causes as opposing premature primary eating interpretation. Module labels and cross-disorder ranking serve different purposes and are not diagnostic probabilities.

## Medical and Safety integration

`EATING_MEDICAL_*` maps each explicit current question to existing signals. Fainting/near-fainting requiring assessment, severe weakness, severe dehydration or inability to keep fluids down, acute chest/cardiac symptoms, severe breathing difficulty, altered consciousness/severe confusion/seizure, and major bleeding/vomiting blood feed existing medical-danger signals. Basic inability to eat or drink uses shared self-care signals; shared rules determine elevated versus acute action. No new numeric escalation threshold is introduced. All nine mappings require clinical review.

Shared positive signals take precedence when sources are merged, including when the same signal is addressed in generic and eating-specific questions. Safety remains active regardless of comparison-source opt-in. Invalid structured safety answers produce unable-to-assess behavior. Clearing Eating cannot erase acute facts already recorded by the shared engine. Normal negative answers do not replace an earlier general safety answer with unknown merely because other specific questions remain unanswered.

Non-acute physical consequences, nutritional concerns, compensation or medical contributors show a prominent medical-assessment recommendation before the ordinary result cards. This warning is not an additional urgency score. Acute states retain ordinary-navigation removal, emergency resources and immediate focus. Medical and suicide findings can coexist internally.

`EATING_SHARED_MEDICAL_EXTRACTION_001` extends the existing extraction function. It does not store raw text and does not change escalation rules. The lexical additions are conservative about other-person, historical, hypothetical and negated statements; they cannot reliably understand all natural language. Structured current-safety questions and the independent urgent-help action remain necessary.

## Shared Differential and Router

`DIFF_EATING_{RESTRICTIVE,BULIMIA,BED,ARFID}_{PARTIAL,FULL}` register four candidate directions in the existing engine. `DIFF_EATING_CONTEXT_{MOOD,ANXIETY,OCD,TRAUMA,ADHD}` retain contextual alternatives. Anxiety context maps to specific-fear assessment, not automatically GAD. ADHD/executive-function context has only weak support and cannot substitute for developmental history. Other contextual support indicates an assessment direction, not a diagnosis of Mood/OCD/PTSD. Five independently completed modules can contribute co-occurring evidence alongside Eating. `DIFF_EATING_MEDICAL` and `DIFF_EATING_SUBSTANCE` retain unresolved causal concerns. A non-weight/shape appearance concern yields `eating.bdd`, an unsupported BDD assessment flag, without adding a BDD module.

`ROUTER_EATING_PATTERN_001` requires restriction plus weight-gain fear, binge plus loss plus compensation, or avoidance plus sensory/consequence fear plus intake impact. Appetite alone, dieting, preference, temporary nausea or isolated overeating do not automatically route. A bounded depression-related appetite-loss phrase retains both explicitly stated Mood facts. Current Safety extraction still executes before Router extraction. Eating is registered even when routing evidence is insufficient; it is no longer labeled an unsupported domain. Low-evidence routes remain unresolved and other supported assessment choices remain available.

## Clinical review metadata

The four `EATING_*_001` pattern records, nine `EATING_MEDICAL_*` adapters, shared extraction record, Router rule and fifteen Differential rules all default to `unreviewed`. Module version is carried in integration metadata. Before any clinical use, reviewers must assess question wording and translations, adult scope, descriptive recurrence/persistence assumptions, medical mapping, causal questions, pattern anchors/strength, co-occurrence interpretation, lexical exclusions and care language. Passing implementation tests is not clinical validation.

## Privacy, i18n and accessibility

Only structured answers remain in page memory. No storage API, analytics, answer upload, external model call or actual user record is introduced. Optional summaries stay on-page; sharing is outside this workflow. Weight/height collection was intentionally omitted. Test text is synthetic. Build output excludes fixtures and test controls.

All new strings use centralized `eatingUI` / `eatingEvidence`; the catalog has 1869 bilingual keys. Switching language only changes presentation, including step, results, summary, Safety, Router and Differential screens. Native labels and selects, semantic headings, error alerts with focus, visible keyboard focus, minimum 48-pixel module action targets and wrapped layouts are used. Medical notice uses text and border rather than color alone.

## Evidence and limitations

[NICE NG69 recommendations](https://www.nice.org.uk/guidance/ng69/chapter/recommendations) support assessing medical needs independently and avoiding a single BMI measure as the basis for care. The guideline calls for acute medical care for severe dehydration and other serious physical compromise. This prototype does not reproduce physiologic admission thresholds or replace examination, blood tests or ECG.

[NIMH eating-disorder information](https://www.nimh.nih.gov/health/publications/eating-disorders) describes the different restriction, binge/compensation and avoidance patterns and the role of professional care. It informs high-level educational framing, not validation of this algorithm. Sources checked 2026-09-13; no real-time evidence service is claimed.

Limitations: adult-only self-report; unvalidated original questions and qualitative rules; no physical measurements or clinician collateral; uncertain causal attribution; incomplete natural-language coverage; no full DSM/ICD diagnosis; no treatment/medication protocol; no pediatric assessment. Subthreshold, mixed and medically driven patterns may need care despite low consistency. The UI supplies no calorie targets, weight-loss strategy, procedural purging information or medication-change instructions.
