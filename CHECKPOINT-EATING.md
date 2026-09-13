# Eating Disorders v1 local checkpoint

Branch: `feature/eating-disorders-assessment-v1`. Verified baseline: `e44a63b86003d0a5e89f0353b7ff1813ed6f8222`, merged ADHD main. Internal module version: `eating-disorders-assessment-v1.0.0`. Intended local commit: `feat: add eating disorders assessment v1`. No remote push or Git tag is part of this task.

## Delivery report

1. **Created files:** 15 files, listed below.
2. **Modified files:** 14 files, listed below. Existing clinical engine files remain unchanged.
3. **Schema:** revisioned structured fields separate safety, current medical danger, eating behaviors, motivation, course, impairment and contextual causes. Unknown is retained; no body weight, height or BMI is collected.
4. **Workflow:** adult entry, shared Safety, short medical pre-check groups, overview, restriction, weight/shape, binge/loss, compensation, exercise, ARFID drivers, course, function, physical effects, medical/substance/access causes, contextual comparison, results and optional summary.
5. **Restriction:** persistent restriction and recurrence assessed separately; isolated occurrence does not satisfy persistence.
6. **AN-like:** weight/shape-driven restriction, fear, overvaluation, impact and course support a restrictive direction without a body-size rule or formal AN diagnosis.
7. **Binge/loss:** amount and loss of control are independent; subjective amount remains uncertain and overeating alone is insufficient.
8. **BN-like:** recurrent binge/loss plus recurrent compensation and overvaluation; restriction with binge/purge features is retained.
9. **BED-like:** recurrent binge/loss, distress and absence of regular compensation; unknown compensation cannot produce high consistency.
10. **ARFID-like:** restriction with sensory, low-interest or consequence-fear drivers, consequences and no primary weight/shape motive; mixed motives remain uncertain.
11. **Compensation:** vomiting, medication misuse, fasting, exercise and other compensation are structured yes/no/unknown questions with no procedural descriptions.
12. **Body image:** fear, preoccupation, overvaluation, checking, avoidance and motivation are distinct; unrelated appearance-defect concern flags BDD rather than an Eating diagnosis.
13. **Medical risk:** current severe symptoms map to existing shared signals. Non-acute physical/compensatory/nutritional concerns show a medical-review notice above ordinary results.
14. **Safety:** one shared engine; medical and suicide emergencies interrupt immediately, hide normal navigation and focus emergency headings. Secondary safety domains persist internally. Invalid structured safety input fails closed.
15. **Router:** Eating is the sixth registered domain. Combinations of specific signals are required; evidence insufficiency does not make a supported domain unavailable. Safety still executes before routing.
16. **Differential:** four Eating pattern candidates use the same shared engine, provenance and source-selection mechanism. Existing five-domain evidence can coexist.
17. **Eating vs Mood:** depression-linked appetite loss retains Mood; low appetite alone does not imply Eating pathology.
18. **Eating vs Anxiety:** choking/vomiting fear retains a specific-fear assessment direction, not automatic GAD or automatic ARFID.
19. **Eating vs OCD:** contamination obsessions plus rituals can make OCD assessment more relevant; independent OCD and Eating evidence can coexist.
20. **Eating vs PTSD:** trauma-linked appetite/eating disruption preserves Trauma context rather than automatic primary Eating attribution.
21. **Eating vs ADHD:** irregular meals retain executive-function context with weak ADHD support; no developmental ADHD inference is manufactured. Independently completed ADHD evidence can coexist.
22. **AN vs ARFID:** primary motivation discriminates; conflicting/mixed motives cap both module and shared comparison confidence.
23. **BN vs BED:** regular compensation distinguishes the two; uncertainty or contradictory frequencies remain visible.
24. **BDD:** `eating.bdd` is an assessment flag, not a newly implemented BDD module or diagnosis.
25. **Medical/GI:** pain, nausea, swallowing and other medical causes, medication/substance contributions and food access remain unresolved where appropriate.
26. **Bilingual:** 1869 complete central keys, language-independent IDs, presentation-only switching across all stores and screens.
27. **New tests:** 80 Eating checks, including all 25 requested scenarios, cross-domain comparisons, mixed Router scenarios, negative extraction, medical mappings, uncertainty, privacy, i18n and state preservation.
28. **Total regression:** 439 checks across 16 suites passed. Existing 359 checks retained with domain-registration expectations updated to six. Mood17; Anxiety15; OCD16; Trauma41; ADHD49; Safety56; SafetyUX30; SafetyRouting1; Safety extraction10; Router39; Differential42; i18n39; summary2; controls1; static1; Eating80.
29. **Browser:** final 176 scenario/language/viewport combinations passed at 1280x900 and 390x844. No horizontal overflow, header overlap or raw Eating translation keys; switching preserves all module/Safety/Router/Differential stores. Actual keyboard flow completed through 20 transitions; empty-form errors focus their labeled alert. Router-to-Eating, result explanation, optional summary, and immediate medical/suicide interruption were exercised. Desktop and mobile screenshots inspected; no console warnings/errors. New source-link touch target corrected to 48px. Labels, semantic headings, visible focus and native controls checked; this is not a comprehensive assistive-technology certification.
30. **Limitations:** original unvalidated questions and heuristic recurrence/persistence, adult-only self-report, no objective nutrition/medical data, no full diagnostic criteria, conservative lexical extraction and uncertain causality. Low consistency does not exclude care needs.
31. **Clinician review:** all new module, medical-adapter, extraction, Router and Differential rules are `unreviewed`; implementation tests do not constitute clinical validation. See `EATING-IMPLEMENTATION-CATALOG.md` for exact architecture, rule groups and sources.
32. **Next step:** independent clinical review of this milestone, followed by a separately scoped Psychosis Assessment v1 specification emphasizing reality-testing context, medical/substance alternatives and shared Safety. No Psychosis development began.

## Exact intended files

Created:
- EATING-IMPLEMENTATION-CATALOG.md
- CHECKPOINT-EATING.md
- scripts/preview-eating.cjs
- src/eating/data.js
- src/eating/engine.js
- src/eating/medical.js
- src/eating/extraction.js
- src/eating/integration.js
- src/eating/router.js
- src/eating/ui.js
- src/eating/types.d.ts
- tests/eating-browser.js
- tests/eating-fixtures.js
- tests/eating.test.cjs
- tests/fixtures/runtime-eating-v1.0.0.json

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
- tests/adhd.test.cjs
- tests/router.test.cjs

The two existing test changes update the exact domain inventory and replace the obsolete assertion that Eating is unsupported with explicit assertions that it is registered while insufficient evidence still yields no primary route. Other clinical assertions remain intact.

Excluded: generated `dist/`, ignored `work/` outputs and authoring helper, caches, environment files, credentials, logs, temporary browser/session data and backup archives. All test descriptions/states are synthetic; no real eating-disorder records or user narratives were used. Historical manifests and existing backups are preserved. Browser fixtures are test-only and absent from production runtime.

## Reproduce

`node scripts/test-all.cjs` rebuilds and runs all suites plus translation completeness. `node scripts/verify-baseline.cjs` compares source and generated output with the Eating manifest (75 runtime files). `node scripts/preview-eating.cjs` exposes synthetic fixtures locally on port 4179; production uses the existing `node scripts/serve.cjs` on 4173.

The commit hash and final working-tree state are reported after the local commit. No hash or remote synchronization is claimed in advance.
