# ADHD Assessment v1 local checkpoint

## Outcome and review boundary

ADHD is the fifth implemented assessment domain for adults aged 18+. Module version: `adhd-assessment-v1.0.0`. Branch: `feature/adhd-assessment-v1`, based on verified Trauma baseline `0ea48bb`. Intended local commit: `feat: add ADHD assessment v1`. No push or tag is part of this checkpoint. Implementation testing is not clinical validation; all new rules remain unreviewed.

## Required delivery report

1. Created files: listed in the inventory below.
2. Modified files: listed below; original Mood, Anxiety, OCD, Trauma and core Safety rules are unchanged.
3. Schema: revisioned structured state with independent current symptoms, development, onset, settings, impact, compensation, course, confounders and safety.
4. Workflow: consent/adult scope, shared Safety, inattention, activity/impulsivity, history, onset, settings, function, course, sleep, medical/substance, alternatives, results and optional summary.
5. Inattention: nine original frequency items, separate count and uncertainty.
6. Hyperactivity/impulsivity: nine original items including internal restlessness; ordinary impulsivity is not acute risk.
7. Developmental history: school and early task/organization/activity patterns plus optional corroboration.
8. Onset: childhood, adolescent, adult and unknown; sudden change and contradictory history retained.
9. Cross-setting: work, school, home, social symptoms and impacts modeled separately; two settings support pervasiveness.
10. Impairment: eleven functional areas, independent of symptom count.
11. Compensation: substantial effort with low visible impact remains unresolved.
12. Persistence: six-month and longstanding course; episodic/recent/situational changes do not satisfy trait-like persistence.
13. Sleep: restriction, insomnia, irregularity, daytime sleepiness, breathing concern and timing are retained as potential alternatives.
14. Medical/substance: contributions and sudden change remain unresolved; actual emergencies use shared Safety.
15. ASRS: not implemented or claimed. Original counts have a null scale score and no probability. Professional assessment is recommended.
16. Safety: shared collection, immediate interruption, preserved secondary signals and fail-safe behavior; ordinary impulsivity never directly escalates.
17. Router: fifth-domain registration; early history plus multiple specific features; generic concentration alone insufficient. Persistent-worry phrase now routes Anxiety.
18. Differential: same shared engine; current-only ADHD evidence weak, developmental conjunction stronger; independently assessed co-occurring directions retained.
19. Comparisons: depression-only concentration, worry, ritual-driven delay, post-trauma cognition and episodic activation each retain their corresponding alternative; no full alternative diagnosis is asserted.
20. Explainability: supporting, opposing, missing, contradictory and exclusion evidence; qualitative result; optional structured clinician-style summary.
21. Bilingual: centralized keys, equivalent IDs/states and presentation-only switching across questions, Safety, Router and results.
22. Tests: ADHD 49 passed, including the twenty requested scenarios, mixed-domain routing, unknowns, safety, bilingual and rendering regressions.
23. Full suite: 359 passed across 15 suites; original 310 retained. Mood17, Anxiety15, OCD16, Trauma41, Safety56, SafetyUX30, SafetyRouting1, extraction10, Router39, Differential42, i18n39, summary2, controls1, static1, ADHD49. The existing Router registration count assertion changes from four to five; clinical assertions are not removed or weakened.
24. Browser: 132 final scenario/language/viewport checks passed at 1280x900 and 390x844; 20 additional checks passed after the navigation height fix. No overflow, raw ADHD translation keys, unlabelled assessment controls or state changes. Actual keyboard form completion, error focus, Router-to-ADHD CTA and immediate suicidal-intent interruption verified. Console error/warning log empty. English desktop and Chinese mobile screenshots inspected. Navigation wrapping, native controls and semantic alert/headings checked; no claim of a complete assistive-technology certification.
25. Limitations/review: custom unvalidated cutoffs and causal heuristics, self-report/recall limitations, conservative lexical extraction, adult-only scope. All module, Router and Differential additions require independent clinical review. See the implementation catalog for sources and rule details.
26. Recommended next step: clinical review and pilot evaluation of this milestone before planning the separately scoped Eating Disorders assessment. No subsequent module was started.

## Exact intended file inventory

Created:
- ADHD-IMPLEMENTATION-CATALOG.md
- CHECKPOINT-ADHD.md
- scripts/preview-adhd.cjs
- src/adhd/data.js
- src/adhd/engine.js
- src/adhd/integration.js
- src/adhd/router.js
- src/adhd/types.d.ts
- src/adhd/ui.js
- tests/adhd-browser.js
- tests/adhd-fixtures.js
- tests/adhd.test.cjs
- tests/fixtures/runtime-adhd-v1.0.0.json

Modified:
- I18N.md
- README.md
- VERSION-CONTROL.md
- package.json
- scripts/test-all.cjs
- scripts/verify-baseline.cjs
- src/app.js
- src/differential/types.d.ts
- src/differential/ui.js
- src/i18n/catalog.js
- src/index.html
- src/style.css
- tests/router.test.cjs

Intentionally excluded: generated dist, ignored work (test outputs, temporary authoring helpers and source-export verification), caches, local hosting metadata, credentials, environment files and backup archives. Existing backups and historical manifests are preserved. Synthetic test fixtures are intentionally included; they are not real user records. Browser-only fixtures are not included in the production runtime.

## Reproduction

`node scripts/test-all.cjs` rebuilds and runs all 15 suites, including translation completeness (1674 keys). `node scripts/verify-baseline.cjs` checks 67 runtime files against the ADHD source manifest. `node scripts/preview-adhd.cjs` exposes synthetic browser fixtures locally on port 4178; `node scripts/serve.cjs` serves the production build on port 4173.

The final commit hash and working-tree status are reported after the local checkpoint; no commit hash is fabricated within this pre-commit document.
