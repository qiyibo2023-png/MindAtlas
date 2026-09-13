# ADHD Assessment v1 implementation catalog

Version: `adhd-assessment-v1.0.0`. All new rules are **unreviewed**. This is an educational research prototype for adults aged 18 or older, not a diagnosis, validated screening scale, or clinical decision service.

## Architecture and schema

`src/adhd/data.js` declares questions, choices and section order using centralized i18n keys. `engine.js` owns revisioned structured state and qualitative assessment; `ui.js` renders the same state in either language; `integration.js` registers evidence with the existing Differential engine and merges explicit safety answers through the existing Global Safety Engine; `router.js` registers the fifth supported assessment. `types.d.ts` records the result contract. Clinical IDs and answer values are language independent.

State separates intro, inattention, hyperactivity/impulsivity, developmental history, onset, symptom settings, setting-specific impact, functional impact, compensation, course, sleep, medical, substance, context and safety. Results retain revision, facts, counts, missing evidence, conflicts, alternative explanations and unresolved exclusions. `score` is null; no diagnostic probability is calculated.

## Workflow and reasoning

1. Adult scope and voluntary consent, followed by six short groups of shared safety questions.
2. Nine original inattention items: sustained attention, mistakes, listening, task completion, organization, effort, losing things, distraction and forgetting.
3. Nine original activity/impulsivity items, including internal restlessness. Ordinary impulsivity does not imply an emergency.
4. Early school, organization, task and activity history plus feedback. Corroborating records are optional; none are uploaded. Cannot remember and prefer not to answer remain unknown.
5. Onset before 12, adolescence, adulthood or unknown; sudden change is assessed separately. Conflicting childhood history and adult onset are surfaced.
6. Work, school, home and social symptoms are independent of impact. Two symptom settings support pervasiveness; a single narrow context does not. Selecting no removes that setting's stale impact answer.
7. Eleven functional areas and compensatory effort. Low visible impairment plus high compensation is unresolved rather than automatically reassuring.
8. Six-month persistence and longstanding versus episodic, recent, situational or fluctuating course.
9. Sleep, medical, medication/substance and contextual alternatives.
10. Explainable result, optional five-domain comparison and optional readable clinician-style summary.

Each original symptom group counts answers of often or very often. A count of five supports the current-symptom fact; unknown answers retain an upper bound. This is a **custom heuristic**, not an ASRS score or a reproduction of a validated diagnostic algorithm. Stronger ADHD compatibility additionally requires positive developmental history, childhood onset, multiple settings, impairment, persistence, independence from contextual explanations, and assessed sleep/medical/substance considerations. Current symptoms alone have weak shared Differential support and cannot establish an ADHD primary direction. Unknown qualifying facts prevent strong support. Contrary facts lower consistency; conflicts and exclusions remain visible.

## Shared integrations and review catalog

All entries below default to `unreviewed`; successful tests are implementation verification only.

- `ADHD_DEVELOPMENTAL_PATTERN_001`: module-level conjunction and uncertainty handling, version `adhd-assessment-v1.0.0`.
- ADHD Router developmental-pattern rule: early history plus at least two specific features. Router relevance is not disease probability. Generic concentration difficulty is insufficient.
- `DIFF_ADHD_CURRENT_001`: weak current-symptom evidence only.
- Developmental Differential rule: the qualifying conjunction supports ADHD assessment direction.
- Five contextual Differential rules: mood-linked, worry-linked, OCD-linked, trauma-linked and episodic activation evidence retain the corresponding competing direction and oppose an independent ADHD explanation.
- Three confounder Differential rules: sleep, medical and substance contributions remain unresolved and oppose premature ADHD inference.

Exact machine-readable IDs, premises and review metadata live in `engine.js`, `integration.js` and `router.js`. Existing Safety thresholds and original clinical engines are unchanged. Safety collection includes ADHD regardless of optional comparison selection; explicit suicidal/violent intent, medical emergencies and dangerous activation are evaluated by the common engine. Clearing ADHD does not erase established shared acute danger. No separate ADHD safety engine exists.

The shared Differential can retain independently assessed co-occurring Mood, Anxiety, OCD and Trauma evidence. Worry-driven distraction favors Anxiety; ritual-driven delay favors OCD; post-trauma concentration problems retain Trauma; depression-only cognitive symptoms retain Mood; episodic increased energy/decreased need for sleep prompts bipolar assessment. These contextual rules suggest assessment directions and do not diagnose the competing conditions. Sleep problems and sudden cognitive change cannot be presumed to be ADHD.

## Privacy, bilingual behavior and accessibility

No personal narrative is requested. No uploads, telemetry, answer storage, network inference or browser storage are introduced. Test narratives are synthetic. Refresh removes in-memory answers. Optional summaries contain structured answers and remain on the page; users choose whether to share them elsewhere.

All new copy is in the central catalog. Both languages use identical fields, scoring and safety state. Switching language preserves the current page, answers, revisions and derived results. Native labeled selects, visible focus, semantic headings, error alerts, explicit unknown choices and responsive touch controls are used. Placeholder options remain visibly unselected until the user answers. ADHD locally corrects the legacy shared field renderer's error-description token without changing that shared file.

## Evidence and limitations

[NICE NG87 recommendations](https://www.nice.org.uk/guidance/ng87/chapter/recommendations) inform the separation of developmental history, impairment, settings and professional assessment; rating scales alone are not sufficient for diagnosis. Care copy recommends professional assessment and practical support rather than prescribing treatment.

The [Harvard ASRS resource](https://rckessler.scholars.harvard.edu/adult-adhd-self-report-scales-asrs) provides the instrument and permissions route. This project does not implement ASRS, claim ASRS validation, or substitute these original questions for it. Sources checked 2026-09-13; not a real-time evidence service.

The lexical Router is deliberately conservative for negation, other-person reports, hypothetical and recent-only descriptions. It can miss nuanced language and is not a comprehensive NLP extractor. Custom frequency cutoffs, conjunctions, causal attribution questions, comorbidity explanations, localized wording and care messages require independent clinician review and empirical validation. Childhood recollection can be inaccurate. Adult self-report cannot replace collateral history, physical evaluation or specialist assessment. No pediatric assessment is implemented. No new treatment, diagnostic probability or fully diagnostic alternative-condition engine is introduced.
