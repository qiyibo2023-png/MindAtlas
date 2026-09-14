# Router v2.0.1 clarification coverage fix

Parent milestone: `b40dca9acc6363d5081b3704807c8f9ab45e874f`.
Branch: `feature/symptom-router-v2`.
New local commit message: `fix: add mood ocd router clarification`.
No push, tag, history amendment, Router redesign or Differential v2 work.

## Scope

One question, `moodOcd`, is added to the existing deterministic registry. It distinguishes repetitive thinking consistent with low mood from unwanted, ego-dystonic intrusions linked to checking, reassurance, neutralizing or other compulsive responses. Options: Mood-leaning, OCD-leaning, both/mixed, not sure and prefer not to answer. Both candidate domains must be present. Information value is 50; existing tie ordering and the three-question budget remain unchanged.

The answer records `mood.moodCongruentRumination`, `ocd.intrusionCompulsionLink`, or both. These facts add source-attributed discriminating evidence and a bilingual explanation to existing candidates. They do not increase clinical routing ranks, fabricate denial of the other pattern or force a unique primary. Independent Mood and OCD support remains intact. Unknown/prefer adds no clinical evidence and stops clarification using the existing behavior. Safety is checked before entry, answers and navigation.

Runtime/type metadata is now `symptom-router-v2.0.1`. All new clinical content remains unreviewed. This is a coverage correction, not clinical validation. No validated assessment module or Safety threshold is changed. Six new bilingual keys use the existing central catalog.

## Verification

- Complete regression: **656/656** (634 previous checks, two additional automatic registry checks, 20 focused Mood–OCD checks).
- Translation completeness: **2,184 bilingual keys**, no missing or orphan references.
- Focused checks cover both benchmark languages, directional discrimination, both/unknown/prefer behavior, Safety interruption, three-domain candidate preservation, existing Mood–Anxiety priority, budget limits, single-domain exclusion, bilingual answers and state preservation.
- Browser: Chinese and English question rendering; all five answers; corresponding explanations; both candidate domains retained; question not repeated; language switch retains Router/Safety/Differential/assessment state; keyboard Enter and Tab, 3px visible focus and 48px minimum answer targets; 390×844 layout without horizontal overflow; acute Safety hides clarification and assessment navigation; no new console errors observed.

## Benchmark comparison

The 226 synthetic inputs and all expected labels are unchanged.

| Metric | v2.0.0 | v2.0.1 |
| --- | --- | --- |
| Clarification agreement | 224/226 | **226/226** |
| Primary expectation agreement | 226/226 | 226/226 |
| Top-two coverage | 88/88 | 88/88 |
| Acute Safety override | 14/14 | 14/14 |
| Unsupported flag agreement | 226/226 | 226/226 |
| Routing status agreement | 226/226 | 226/226 |
| Bilingual result parity | 113/113 pairs | 113/113 pairs |
| False-positive primary routes | 0/92 controls | 0/92 controls |

Confusion matrix unchanged. Both `mixed-mood-ocd-en` and `mixed-mood-ocd-zh` now select `moodOcd`. The benchmark report is regenerated; no labels were edited to improve agreement. The corpus remains synthetic, correlated and development-visible, with the existing limitations documented in `benchmarks/router-v1/REPORT.md`.

## Files and privacy

Source changes: Router schema/version, question registry, explanatory discrimination mapping, engine evidence enrichment, types and centralized catalog. Test changes: new `tests/router-mood-ocd.test.cjs`, full-suite registration and one synthetic browser fixture. Documentation: architecture, rule catalog, benchmark results/report and this checkpoint.

Generated output, work files, temporary preview servers and logs remain ignored. Synthetic fixtures contain no real user narratives. No credentials, secrets, environment files, backups or browser/session data are intended for the commit. Previous milestone documentation remains a historical record.
