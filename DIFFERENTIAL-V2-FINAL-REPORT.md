# Differential v2 final implementation report

Version: cross-disorder-differential-v2.0.0. Clinical review: **unreviewed**.
Branch: `feature/cross-disorder-differential-v2`.
Verified parent/main baseline: `9e1c4d219fbe879b9891aa76d916492035d20130`.
Milestone message: `feat: upgrade cross-disorder differential to v2`.
Local commit only; no tag, push or next-module work. Resolve this document checkpoint with `git log -1 --format=%H -- DIFFERENTIAL-V2-FINAL-REPORT.md`.

## 1. Files created

- `DIFFERENTIAL-V2-ARCHITECTURE.md`
- `DIFFERENTIAL-V2-AUDIT.md`
- `DIFFERENTIAL-V2-FINAL-REPORT.md`
- `DIFFERENTIAL-V2-VALIDATION.md`
- `benchmarks/differential-v1/REPORT.md`
- `benchmarks/differential-v1/cases.cjs`
- `benchmarks/differential-v1/error-analysis-v1.0.0.json`
- `benchmarks/differential-v1/quality-audit-v1.0.0.json`
- `benchmarks/differential-v1/results-v1.0.0.json`
- `scripts/audit-differential-benchmark.cjs`
- `scripts/differential-benchmark.cjs`
- `scripts/verify-source-rebuild.cjs`
- `src/differential-v2/adapters.js`
- `src/differential-v2/contracts.js`
- `src/differential-v2/engine.js`
- `src/differential-v2/graph.js`
- `src/differential-v2/registry.js`
- `src/differential-v2/runtime.js`
- `src/differential-v2/schema.js`
- `src/differential-v2/style.css`
- `src/differential-v2/types.d.ts`
- `src/differential-v2/ui.js`
- `tests/differential-v2-boundaries.test.cjs`
- `tests/differential-v2-browser.js`
- `tests/differential-v2-finalization.test.cjs`
- `tests/differential-v2-harness.cjs`
- `tests/differential-v2-integration.test.cjs`
- `tests/differential-v2.test.cjs`

## 2. Files modified

- `README.md`
- `scripts/test-all.cjs`
- `src/adhd/ui.js`
- `src/app.js`
- `src/differential/runtime.js`
- `src/eating/ui.js`
- `src/i18n/catalog.js`
- `src/index.html`
- `src/psychosis/ui.js`
- `src/trauma/ui.js`

## 3. Seven-domain architecture

One registry/evaluator covers Mood, Anxiety, OCD, Trauma, ADHD, Eating and Psychosis; v1 API remains compatible.

## 4. Normalized evidence graph

Validated concept/value nodes with source, time and supporting/opposing relationships.

## 5. Provenance

Stable question IDs, engine version, revision, sequence, subject and quotation status.

## 6. Evidence quality

Direct reports, screening and extracted context are distinct; context alone cannot establish strong structured support.

## 7. Precedence

Safety clarification > direct clarification > structured evidence > screening > extraction.

## 8. Temporal reasoning

Current, historical, episodic, hypothetical and uncertain evidence stay distinct; longitudinal exposure/developmental concepts preserve history.

## 9. Course/episodicity

Typed observations preserve duration, persistence, baseline change, settings and impairment without adding artificial symptom points.

## 10. Supporting evidence

Matched rule IDs, concepts and evidence IDs explain qualitative support.

## 11. Opposing evidence

Less-consistent features retain provenance and bilingual explanations.

## 12. Missing evidence

Unknown is distinct from false/absent.

## 13. Discriminating evidence

Candidate features and unresolved competing explanations remain explicit.

## 14. Contradiction detection

Same-concept disagreement and registered incompatible relationships preserve both reports.

## 15. Contradiction resolution

Higher provenance can resolve weaker evidence; equal-priority disagreement remains unresolved.

## 16. Co-occurrence

Independent supported directions coexist; no mandatory single winner.

## 17. Rule-outs

Medical, substance, medication, sleep and domain-specific exclusions stay pending until addressed.

## 18. Unresolved discriminators

Stable needed-concept IDs, domains, reason, priority, provenance and alreadyAsked state; sparse intrusion/developmental coverage included.

## 19. Already-collected evidence

Reliable true and false values suppress repeat requests. Declined/uncertain answers do not create facts.

## 20. Saturation

insufficient / still_discriminating / reasonably_saturated represent registered evidence coverage, not diagnostic certainty; Safety/medical needs remain authoritative.

## 21. Medical/non-psychiatric alternatives

Neurological, medical, GI, sleep, substance and medication context is retained.

## 22. Unsupported alternatives

Autism, grief, somatic, personality, cognitive and other contexts stay alternatives, not new assessment modules.

## 23. Safety contract

Shared Safety controls interruption. Ten final representative cases match the existing engine; no thresholds changed.

## 24. Router contract

Read evidence nodes and provenance; never use route ranks/labels as diagnostic evidence. Router v2.0.1 unchanged.

## 25. Assessment contract

Use current generated results, stable question contracts and revisions; exclude stale results without changing assessment scores.

## 26. Adaptive readiness

Detached versioned export includes candidates, support/opposition, gaps, rule-outs, discriminators, contradictions, collected facts, Safety and saturation reasons. Seven sparse cases plus known-value inverse and parity tests pass.

## 27. UI

Bilingual qualitative directions, Why, provenance, conflict and uncertainty disclosures; no diagnostic probabilities.

## 28. Summary

Optional in-memory structured summary includes course/function, evidence, co-occurrence, provenance, uncertainty, Safety and version.

## 29. Bilingual parity

Identical structured output and state preservation; 2,237 complete bilingual catalog keys.

## 30. Benchmark size

264 localized cases / 132 independent structured pairs; not 264 independent patients.

## 31. Category distribution

English 132, Chinese 132; pure 14, pairwise 42, three-domain 70, contradiction 28, missing 14, unknown 14, Safety 6, medical 18, medication 2, substance 2, sleep 4, hard 30. Tags overlap.

## 32. Primary agreement

264/264.

## 33. Acceptable coverage

264/264.

## 34. Co-occurrence retention

114/114 eligible.

## 35. Safety agreement

264/264.

## 36. Contradiction agreement

28/28 eligible, including resolved precedence.

## 37. Missing-evidence agreement

12/12 eligible; sparse readiness tests are additional.

## 38. Rule-out retention

20/20 eligible.

## 39. Discriminator agreement

4/4 eligible; small denominator remains a limitation.

## 40. False single winner

0/114 eligible.

## 41. Bilingual benchmark

132/132 full structured-output pairs.

## 42. Leakage audit

PASS: no runtime fixture imports, exact case IDs or deployed benchmark; 132 distinct English scenarios; decisions unchanged for all 132 after evidence-ID replacement. Versioned SHA-256 audit included.

## 43. Benchmark limitations

Synthetic author-created labels, combinatorial coverage, limited language/culture diversity, no prospective validation; conceptual overfitting cannot be excluded. Persistent zero-error framework and first-run review retained.

## 44. Router regression

226/226 primary and clarification; top-two 88/88; Safety 14/14; bilingual 113/113; false positives 0/92; no mismatches.

## 45. Complete regression

823/823: existing 656 plus 167 new Differential checks. All seven domains, Safety/extraction, Router, v1 Differential, summary, controls, bilingual and static assembly pass.

## 46. Browser

24 synthetic scenarios at desktop 1280px and mobile 390×844; Chinese/English switching preserves state. Reasons, summary, missing/conflict, multi-direction and Safety interruption inspected. No horizontal overflow, raw dv2 keys or warning/error logs observed.

## 47. Accessibility

Native disclosure keyboard interaction, labeled checkbox focus with 3px outline, visible comparison targets at least 44px, headings and Safety alerts checked. Earlier sampled contrast approximately 6:1 minimum. Targeted review, not full screen-reader/WCAG certification.

## 48. Source rebuild

103 runtime files reproduced from isolated source/build scripts with byte parity, without old dist/backups.

## 49. Privacy

Intended source, synthetic fixtures, tests and audit reports reviewed; no real user narratives, secrets, credentials, .env, session data, machine absolute paths or temporary artifacts included.

## 50. Known limitations

Deterministic scope, precedence, causal boundaries, discriminator priorities and saturation remain provisional. Existing synthetic fixtures can carry secondary flags; those facts are retained. No clinical confidence calibration.

## 51. Clinician review

All v2 domain rules, graph policies, partial support, consistency limits, co-occurrence, discriminator priorities and saturation remain unreviewed, including inherited rule use. Software success is not clinical approval.

## 52. Future Adaptive architecture

Consume a version-checked detached contract using a registered bilingual question bank, bounded asked/declined inventory and provenance-preserving answer adapter. Recompute Safety before comparison after every response; prioritize urgent Safety/medical needs. Saturation is not diagnosis. No Adaptive selector/workflow is implemented.

## Supporting records and exclusions

See DIFFERENTIAL-V2-ARCHITECTURE.md, DIFFERENTIAL-V2-AUDIT.md, DIFFERENTIAL-V2-VALIDATION.md and benchmarks/differential-v1/REPORT.md. Machine-readable metrics, error-review framework and quality audit are versioned beside the benchmark. Benchmark labels were not changed to hide failures.

Excluded: dist/, work/, node_modules/, coverage/, local runtime/session files, backups/archives and environment/credential files under the existing .gitignore. Existing canonical backups remain untouched. No non-ignored untracked files are intended to remain after the local checkpoint.
