# Differential v1 local checkpoint

Branch: `feature/cross-disorder-differential-v1`. Started clean at verified merged Router baseline `5731384`, including Router commit `db17bb720561bb86db4ec288d5c23cdbc18b680a`. Local commit only; no release tag or push is part of this checkpoint.

## Delivery and acceptance report

1. Created `src/differential/{schema,adapters,normalize,rules,engine,runtime,ui}.js`, `types.d.ts`; synthetic Differential tests/fixtures/browser controls; local preview harness; Differential runtime manifest and this checkpoint/rule catalog.
2. Modified shared app assembly, index, styles and central i18n catalog; test runner, release verifier, README, I18N and version-control notes. No validated module or Router/Safety source changed.
3. Ten-field normalized evidence with tri-state facts, stable concepts, temporality and source provenance; schema checked at runtime.
4. Safety first; clarification > structured/function/duration/exclusion > screener > extraction. Contradictions retained; screeners/text alone never trigger primary patterns.
5. Separate deterministic engine with 16 versioned, unreviewed conjunction rules; no language-dependent clinical engine.
6. OCD/GAD, OCD/depressive rumination, Mood/Anxiety, bipolar evaluation vs unipolar, panic/medical, chronic course and existing Anxiety patterns; intrusive thoughts/intent via shared Safety.
7. Same-rank conflicts resolve unknown; lower-rank conflicts remain visible and constrain support. Broad worry versus obsession-only scope conflicts explicitly.
8. Missing duration, impairment, exclusions and history remain explicit. Stale/cleared results are excluded; malformed evidence never partially ranks.
9. Multiple equal primary directions plus secondary/alternative patterns; OCD/Mood/GAD co-occurrence without causal inference or fake probabilities.
10. Safety guard before display and authoritative engine boundary; acute/medical interruptions suppress comparisons. Source selection never filters Safety.
11. Central catalog has 1,368 complete Chinese/English keys. Language switching preserves stores, result identity, scores, safety and current page.
12. 42 new Differential checks, including all 18 requested scenarios, summary integration, invalidation, source precedence, privacy and immutable baseline hashes.
13. Final suite: 269/269 checks passed in 13 suites, both in the canonical tree and a clean source-only export. Original 227 checks retained unchanged: Mood 17; summary 2; controls 1; Anxiety 15; OCD 16; Safety 56; safety routing 1; Safety UX 30; i18n 39; Router 39; Router safety extraction 10; static assembly 1.
14. Browser acceptance: 11 synthetic scenarios in both languages at 1280×900 and 390×844 (44 scenario/language/viewport checks). OCD/GAD, Mood/Anxiety, OCD/Mood, bipolar flag, missing data, conflict, suicide, medical, intrusive harm/self thoughts and unsupported trauma checked. No horizontal overflow, raw rule IDs or undefined UI. Language switching preserved state throughout. All three result-page entry buttons opened comparison with keyboard Enter; disclosure keyboard focus visible. No browser error/warning logs observed.
15. Educational prototype, not a diagnosis. Qualitative support is uncalibrated. Unknowns and unsupported domains require professional assessment. No new persistent data store, network call or raw user-text summary.
16. Every rule remains `unreviewed`; independent clinical review required. See `DIFFERENTIAL-RULE-CATALOG.md` for criteria, effects, precedence, uncertainty and source limitations.
17. Recommended next step: clinician review and approved question/coverage design for a future Adaptive Assessment phase. That phase is **not implemented or started** here.

## Reproduction and privacy

Run `node scripts/test-all.cjs`, then `node scripts/verify-baseline.cjs`. `node scripts/preview-differential.cjs` serves synthetic browser fixtures on loopback port 4176. It is not copied into deployment output.

Commit only source, tests, portable hash manifest, scripts and documentation listed above. Exclude `dist/`, `work/`, caches, local logs, environment files, credentials, browser sessions, original attachments, backups and real mental-health data. Historical canonical backups and manifests are retained. Test narratives are explicitly synthetic. Deploy only the rebuilt `dist/` directory, never the repository root.
