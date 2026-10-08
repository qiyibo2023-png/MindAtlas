# Mood scoring integrity and result explainability audit

Date: 2026-10-07. Baseline: `1832dbfca342187d027513c9dbaf2b389024c8bb` on `private-beta-readiness`. Clinical review status: **unreviewed**. This is an engineering audit, not diagnostic validation.

## Finding: PHQ-9 = 5/27 and qualified = 0/9

This combination is reproducible under the current rules without a propagation defect. A synthetic answer vector `[1,1,1,1,1,0,0,0,0]`, with positive follow-ups confirming at least two weeks and change from usual, produces:

- Total 5/27, band index 1.
- Five reported symptom areas, correctly carried forward as present with frequency `some`.
- Zero qualified areas: each fails the prototype's `daily` frequency condition.
- No carry-forward mismatch.

A different vector `[3,2,0,0,0,0,0,0,0]`, with the same duration/change responses, also totals 5 but qualifies one area. Thus the total alone cannot prove an error or identify which criteria excluded symptoms. The original observed session's item-level and follow-up answers were not available; this audit does not retrospectively certify that session. No real user narrative was requested or stored.

## Exact current rule path (unchanged)

| Stage | Implementation | Meaning / limitation |
| --- | --- | --- |
| Total | `src/mood/scoring.js`, `scorePHQ9` | Nine valid 0–3 items sum to 0–27. Missing/invalid items give a null total, not zero. Bands at 5/10/15/20 unchanged. |
| Carry-forward | `src/mood/data.js`, frozen `phqDomainMap`; `src/mood/state.js`, `update` / `seedSymptomsFromPHQ` | Interest, mood, sleep, energy, appetite, worth, focus, motor, death. 0 → absent; 1/2/3 → present and some/most/daily. Updates invalidate results and clear stale follow-ups for the edited domain. |
| Qualified | `src/mood/engine.js`, `qualified` | Present=yes AND changed=yes AND duration in 14to29/30to179/180plus AND frequency=daily, except death skips the frequency condition; motor additionally requires observed=yes. |
| Unknown | `unresolvedSymptoms` and validation | Missing or unknown required follow-up is unresolved; it is not proof of absence. Optional onset and severity are not qualification predicates. |
| Overall pattern | `episode` and later rule-outs | Five qualified areas, a core area, overall course duration, together=yes and impact are separate conditions. Other history and competing explanations also affect results. The count is not a diagnosis. |
| Safety | Existing shared Safety engine | Item 9 and other risks are assessed separately; a low score or zero qualified count cannot clear Safety. |

The low-level `setAnswer` function does not itself perform PHQ carry-forward; the interactive `update` path does. Existing synthetic tests can deliberately assemble independent fields. A synthetic mismatch test verifies that the new presentation detects inconsistent carried presence/frequency and asks for review without changing evidence. No defect was reproduced in the current interactive propagation path across nine positions and all four PHQ values.

## Clinical references and limitations

1. [Kroenke, Spitzer & Williams, 2001: original PHQ-9 study](https://pmc.ncbi.nlm.nih.gov/articles/PMC1495268/) ([DOI](https://doi.org/10.1046/j.1525-1497.2001.016009606.x)). The paper distinguishes summed severity from a symptom algorithm using item ratings of at least 2, with an item-9 exception. It also calls for clinical exclusion of other explanations. This supports distinguishing the two measures, **not** validating MindAtlas's custom predicate.
2. [NICE NG222 recommendations 1.2.6–1.2.7](https://www.nice.org.uk/guidance/ng222/chapter/Recommendations). Assessment should consider history, duration, course and functioning rather than symptom count alone. This supports contextual explanation, not any specific prototype threshold.

Sources checked on the audit date through indexed source text; direct page fetches returned a PMC browser challenge and NICE 403. No new systematic review or independent clinical adjudication was performed.

**Review-required differences:** PHQ rating 2 carries to `most`, but the prototype's non-death predicate accepts only `daily`. For example, five ratings of 2 yield total 10 with zero qualified areas despite the published PHQ symptom algorithm's different frequency boundary. MindAtlas also applies per-item duration and change gates, including a duration gate to item 9, and an observation gate to motor symptoms. These are not equivalent to the original PHQ algorithm, and their measurement/clinical validity has not been established here. They may undercount clinically relevant symptoms. All predicates and thresholds are intentionally unchanged pending explicit clinical review; no sensitivity, specificity, probability, diagnostic accuracy or clinical-validation claim is made.

## Presentation changes

`src/mood/explain.js` is a read-only presentation adapter, not another scoring engine. It reads the existing qualified list and reports:
- PHQ-reported area count versus prototype-qualified count;
- zero does not mean no symptoms, distress or need for support;
- missing information remains uncertain;
- per-area frequency/duration/change/observation reasons, inside native closed-by-default details;
- inconsistent carry-forward warning without automatic evidence repair;
- bilingual rule limitations and source links.

`src/mood/ui.js` inserts this explanation into consumer results. All new text is centralized in `src/i18n/catalog.js`. No raw narrative, persistent data, network collection or additional diagnostic inference is added. Qualification, scoring, Safety, Router and Differential logic are unchanged. Old detailed comparison content remains available.

## Regression evidence

17 new grouped checks in `tests/mood-integrity.test.cjs` cover the two score-5 cases, five score-2 items, all nine positions/four responses, explicit and unknown duration/change, motor observation, item-9 Safety, editing, missing PHQ, deliberate propagation inconsistency, totals 0–27 and band boundaries, bilingual explanations, closed details and actual language-switch handler state preservation.

The full suite includes existing Mood episode/duration/change/frequency tests. Summary/control harnesses now load the new presentation dependency; no assertions were removed or weakened. Only the intentionally edited Mood UI entry in the runtime hash fixture was refreshed. Clinical/scoring hashes remain untouched.

See `PRIVATE-BETA-QA-REPORT.md` and `PRIVATE-BETA-RELEASE-CHECKLIST.md` for final validation and remaining release gates. Browser checks are not inferred from VM rendering tests.
