# Router v2 local checkpoint

Branch: `feature/symptom-router-v2`.
Verified parent baseline: `8477a65dd792114d99fd5da9601783cc9faa347d` (seven-domain main).
Milestone message: `feat: upgrade symptom router to v2`.
No release tag or remote push is part of this checkpoint.

## Delivered

Unified seven-domain routing, validated ClinicalSymptomProfileV2, structured context/provenance, ordinal candidate evidence, explicit ambiguity and unsupported statuses, eighteen bilingual clarification definitions with bounded stopping, medical-mimic review and shared Safety-first integration. The existing assessment and Differential v1 logic is retained. See `ROUTER-V2-ARCHITECTURE.md`, `ROUTER-RULE-CATALOG.md`, and the benchmark report for implementation and clinical-review details.

## Validation

634 regression checks passed: the original 538 plus 96 Router v2 checks. Original suites: Mood 17, Anxiety 15, OCD 16, Safety 56, Safety routing 1, Safety UX 30, i18n 39, Router v1 39, Router/Safety extraction 10, Differential 42, Trauma 41, ADHD 49, Eating 80, Psychosis 99, Summary 2, Controls 1 and Static assembly 1.

Translation validation: 2,178 complete bilingual keys; no missing references, orphan keys or new untranslated inline copy. Seven equivalent language scenarios compare complete normalized facts as well as structured routing results. Clarification option keys and review metadata are checked. State-preservation tests and browser checks cover presentation switching.

The source-only export, containing src/scripts/tests/benchmarks/package.json and no dist or Git history, rebuilt successfully and passed the same 634 checks. Runtime build copies 93 canonical source files with byte parity verification.

## Browser verification

Verified using isolated local synthetic fixture controls, excluded from production, and the actual free-text form:

| Flow | Result |
| --- | --- |
| Seven domain recommendations in Chinese and English | Pass |
| Mixed Mood/Anxiety, one clarification first | Pass |
| Sleep clarification changes Psychosis recommendation | Pass |
| Unknown/prefer-not-to-answer stops questions | Pass |
| Explicit stop retains current directions | Pass |
| Insufficient and unsupported presentations | Pass |
| Unsupported knowledge topic opens the matching dialog | Pass |
| Actual entry runs Safety before Router | Pass |
| Safety Continue resumes Router result | Pass, mouse and keyboard individually verified |
| Editing clears previous Router evidence and reruns entry | Pass |
| User-selected Anxiety alternative opens existing assessment | Pass |
| Acute suicide and medical paths hide ordinary navigation and Router | Pass |
| Language switching on results and Router/Safety clarification | State preserved |
| 390×844 mixed, eating, psychosis, insufficient, unsupported, suicide and medical | No horizontal overflow |
| Desktop layout | Pass |
| Keyboard Tab/Enter, focus, semantic groups and touch targets | Pass |
| New browser console errors | None observed |

During automation, a batched click navigated unexpectedly while the viewport/scroll changed. The same real entry, language switch and Continue actions were repeated individually and by keyboard; both completed correctly. Temporary diagnostic controls were kept only under ignored work, not runtime or the commit.

## Benchmark and interpretation

226 synthetic cases / 113 language pairs. Primary expectation agreement 226/226; top-two coverage 88/88 eligible single-route cases; acute Safety override 14/14; unsupported flag agreement 226/226; routing-status agreement 226/226; clarification agreement 224/226; bilingual output parity 113/113; false-positive primary routes 0/92 insufficient controls.

Two Mood+OCD language cases expect an additional clarification; the engine retains both supported directions and stops as multiple legitimate routes. These discrepancies are retained in `benchmarks/router-v1/results.json`, not hidden by changing expectations. The confusion matrix and category counts are in the report. This corpus uses controlled context variations of a limited set of symptom patterns and was used during development. Its high agreement is not an independent accuracy estimate, clinical validation or a guarantee on real narratives.

## Intended files and exclusions

Created: `src/router-v2/{schema,registry,questions,extraction,engine,runtime,ui}.js`, `src/router-v2/types.d.ts`, `src/shared/contextual-safety-coverage.js`, `tests/router-v2.test.cjs`, `tests/router-v2-harness.cjs`, `tests/router-v2-browser.js`, `scripts/router-benchmark.cjs`, `benchmarks/router-v1/{cases.cjs,results.json,REPORT.md}`, this checkpoint and `ROUTER-V2-ARCHITECTURE.md`.

Modified: `src/index.html`, `src/i18n/catalog.js`, `src/style.css`, `scripts/test-all.cjs`, `README.md`, `ROUTER-RULE-CATALOG.md`.

Excluded: generated dist, work reports/logs/export/debug servers, node_modules, caches, local browser/session data, backups, archives, credentials and environment files. No real personal or mental-health narrative is used in the synthetic corpus. Existing canonical backups remain untouched. The checked-in results JSON is an intentional reproducible benchmark artifact, not a sensitive runtime log.

## Clinical review and next milestone

Every new routing, clarification and extraction rule requires bilingual clinical review and defaults to unreviewed. Independent clinician-authored and held-out narrative benchmarks are the next validation need. Recommended Differential v2 work: consume versioned evidence without losing context, distinguish independent from linked symptoms, retain contradictions and uncertainty, and explain multiple legitimate directions without probability claims. Differential v2 is not implemented here.
