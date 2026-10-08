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

## Safety consistency and clinical boundary follow-up — 2026-10-07

Baseline: `8bb3f3a2f02faa96adb812ded46aca71089efa03`. The clinical qualification and PHQ-9 predicates remain byte-identical to that baseline.

### Reproduced presentation discrepancy

Mood's `r.safety` is a module-context snapshot. `GlobalSafety.current()` merges current facts from every active assessment and shared safety answers. They can differ legitimately: a complete Mood questionnaire still leaves some global critical fields unknown; conversely another assessment may have answered those fields. A cached Mood result can also predate later clarification. Rendering the snapshot's generic incomplete warning inside Results while the entry guard used live global status created conflicting presentation. Completion was never proof of safety clearance. The original host session is unavailable; these causes were reproduced with synthetic states, not assumed from its screenshot text.

### Authoritative presentation contract

The global engine remains the only authority for current urgency, assessment status and interruption. Module snapshots remain available for assessment provenance but no longer drive the live Mood result Safety message. A new presentation/return-flow module reads the existing global result; it neither merges alternative evidence nor reclassifies risk.

- Acute: global interruption replaces ordinary Mood UI and result navigation, including direct Mood rendering.
- Unable to assess: processing failure replaces ordinary results with the existing fail-safe panel.
- Elevated: retain prompt-support guidance; incomplete status, if also present, remains explicit with unanswered questions.
- Incomplete: show a prominent result-level explanation and the actual critical/follow-up questions still unresolved. Completion does not silently turn unknowns into negatives.
- Assessed, non-acute: explain that current available information does not trigger acute interruption, without guaranteeing safety. Attention findings remain visible when applicable.
- Clarification: the existing global question UI reevaluates shared evidence. A temporary return target/step restores Mood progress only once status is assessed and non-interrupting. If a new acute answer occurs during clarification, the original-response correction path retains all other risks before permitting return. Pending critical questions are still offered when an elevated rule has no domain-specific follow-up.
- Displayed/exported Mood summaries can receive the same live global snapshot. Stored assessment results are not retroactively mutated or relabeled as clinically cleared.

### Clinical boundary

The consumer heading no longer presents the exploratory leading disorder name as the result headline. Detailed rule comparisons remain accessible in a closed-by-default section labeled as neither diagnosis nor clinical triage. Both languages explicitly call the qualified count exploratory and not clinically validated. Consumer urgency/support guidance comes from Global Safety; otherwise the next step is general professional discussion based on needs, not standalone custom-rule triage. All qualification, scoring, Safety thresholds and routing rules are unchanged. Independent clinical review of the predicate differences described above is still required.

New behavioral tests cover genuine unresolved completion, stale/fresh local-versus-global evidence, resolved status in both languages, independent other-module acute priority, failed processing, elevated unresolved status, actual clarification Continue, correction with independent risk, saved-step restoration, summary consistency and unchanged scoring/qualification. Browser launch remains blocked by `spawn EPERM`; these tests are not clinical or real-browser validation.
