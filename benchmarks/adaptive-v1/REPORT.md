# MindAtlas Adaptive Assessment Benchmark v1

Version: mindatlas-adaptive-benchmark-v1.0.0. Engine: adaptive-assessment-v1.0.0.
Review status: **unreviewed**. Synthetic evidence only.

The dataset contains **183 independent trajectories / 366 localized runs**:
183 English and 183 Simplified Chinese. Bilingual copies are not independent
patients. Cases cover all 13 required comparison families, known true/false,
unknown/decline, medical/substance context, contradictions, Safety emergence,
user/budget/unsupported/insufficient/saturation/multiple stops and multi-turn paths.

## Measured results

| Metric | Passed / eligible |
| --- | --- |
| nextQuestionAgreement | 314/314 |
| top2Coverage | 296/296 |
| duplicateAvoidance | 550/550 |
| stopDecisionAgreement | 314/314 |
| evidenceUpdateCorrectness | 234/234 |
| safetyInterruption | 38/38 |
| knownEvidenceAvoidance | 52/52 |
| unsupportedStop | 12/12 |
| multiTurnSelection | 10/10 |
| bilingualParity | 183/183 |

Unnecessary questions: **0/550** inspected presentations.
Mean presented questions per bounded trajectory: **1.503**.
Mean answered questions: **0.639**.
Current mismatch records: **0**.

## Method and denominators

Expected questions and updates are authored separately in cases.cjs/patterns.cjs;
no runtime registry or selector is imported to generate expected labels.
Question agreement excludes 52 localized known-evidence cases that assert a
forbidden repeated question instead of prescribing a unique replacement.
Top-two coverage excludes terminal initial states. Stop decisions cover specified
ask/stop transitions, so prematurely stopping ordinary answer trajectories fails.
Known-evidence and unsupported/Safety metrics have explicit eligible subsets.

Duplicate and unnecessary checks include first questions and inspected follow-up
presentations. An unnecessary question targets reliable known evidence, lies
outside the current comparison/context, appears after saturation, or disagrees
with the authored high-value question where specified. This is an operational
fixture measure of relevance, not empirical information gain or clinical entropy.
Mean questions describes these bounded benchmark trajectories, many of which
stop recording after one answer and the next decision; it is not mean session
length in real users. Dedicated trajectory tests also exercise longer loops.

## Versioned audit and error review

results-v1.0.0.json stores all metrics and overlapping category counts.
quality-audit-v1.0.0.json verifies 183 distinct trajectories, evidence-ID invariance,
no runtime benchmark imports/IDs, and required difficult categories. It records
the case-file SHA-256. error-analysis-v1.0.0.json retains a review framework even
with zero mismatches, plus actual development issues and their fixes. No benchmark
labels were changed automatically to improve performance.

Run node scripts/adaptive-benchmark.cjs and node scripts/audit-adaptive-benchmark.cjs.
Detailed temporary reports remain in ignored work/.

## Limitations

These synthetic trajectories are not clinical validation. Priority values and
labels are author-designed and require independent clinician adjudication. Short,
structured cases do not prove broad natural-language, cultural or prospective
patient performance. Leakage checks cannot exclude conceptual overfitting.
A question can clarify important context without immediately changing candidate
rank; the selector never fabricates aggregate diagnostic evidence from one answer.
