# Differential Benchmark v1

Engine: `cross-disorder-differential-v2.0.0`; review status: **unreviewed**.
Run `node scripts/differential-benchmark.cjs` from the canonical project.
Detailed metrics and mismatches are written to `work/differential-benchmark-v1.json`
and `work/differential-benchmark-errors.json`. Reports contain synthetic evidence only.

The dataset contains **264 localized cases / 132 independent structured scenarios**.
Each scenario has an English/Simplified Chinese pair with identical stable facts.
The count must not be interpreted as 264 independent clinical observations.

Coverage includes seven pure patterns, every two-domain combination, all 35
three-domain combinations, and per-domain missing, unknown, historical, conflict,
precedence and medical-rule-out variations. Curated boundaries cover rumination,
obsession-linked worry, recent trauma, exposure without symptoms, developmental
attention difficulties, activation with perceptual experiences, poor insight,
dissociation, sleep transitions, eating motives/compensation, medication/medical
context, unsupported alternatives and acute Safety.

## Current measured results

| Metric | Result |
| --- | --- |
| Primary-direction agreement | 264/264 |
| Acceptable direction coverage | 264/264 |
| Independently supported co-occurrence retention | 114/114 eligible localized cases |
| Safety-state/priority agreement | 264/264 |
| Contradiction detection with provenance | 28/28 eligible cases |
| Missing critical evidence | 12/12 eligible cases |
| Rule-out retention | 20/20 eligible cases |
| Required unresolved discriminators | 4/4 eligible cases |
| Differential status | 264/264 |
| Unsupported context retention | 18/18 eligible cases |
| Structured bilingual parity | 132/132 pairs |
| False single-winner outcomes | 0/114 eligible localized cases |
| Current mismatch records | 0 |

Primary agreement uses expected domains and explicit no-primary constraints, not
exact translated strings or fixed ordering of equivalent candidates. Acceptable
coverage additionally checks supported domains against permitted outcomes.
Co-occurrence retention is scored where the fixture independently supports multiple
primary domains. A direction being *acceptable* does not mean the fixture requires
that direction to become supported despite missing critical evidence.

The JSON report includes a seven-domain interaction table: expected domain →
retained supported domain. Cross-domain entries in mixed cases are intentional;
this is not a single-ground-truth diagnostic confusion matrix.

## First-run error analysis and correction

The first run retained its unmodified case labels. Raw first-run reports remain in
ignored `work/differential-benchmark-first-run.json` and
`work/differential-benchmark-first-errors.json`.

| Cases | Observation | Classification and action |
| --- | --- | --- |
| `missing-adhd-en`, `missing-adhd-zh` | Current attention evidence with developmental onset missing remained weak. The runner counted an acceptable co-occurring direction as mandatory support. | Metric-contract implementation issue; weak/unresolved ADHD is appropriate here. Restrict the retention metric to independently supported multi-domain fixtures. No clinical rule or label changed for these cases. |
| `missing-eating-en`, `missing-eating-zh` | Restriction with missing weight motive had no partial direction, so the motive was omitted from missing information. The same metric issue also applied. | Engine coverage bug plus metric-contract issue. Preserve a weak restrictive/ARFID alternative from restriction alone, with motive unresolved. This does not establish an eating diagnosis. Add dedicated boundary coverage. Labels remain unchanged. |

## Limits

These are synthetic structured scenarios, not a clinical validation dataset.
Combinatorial cases exercise independent-pattern retention; they do not establish
causality or estimate real-world prevalence. Bilingual pairs verify presentation
independence of structured reasoning, not the accuracy of unrestricted natural
language extraction. Existing Router extraction/parity tests remain separate.
The small denominators for specific discriminators and rule-outs are explicit;
perfect scores on these fixtures must not be generalized to clinical accuracy.
The rule hierarchy, benchmark expectations and hard cases all require clinician review.

## Versioned artifacts and category audit

Benchmark version: `mindatlas-differential-benchmark-v1.0.0`. The measured report is `results-v1.0.0.json`; the persistent zero-mismatch review framework is `error-analysis-v1.0.0.json`; leakage/triviality checks are `quality-audit-v1.0.0.json`. These are synthetic development audit artifacts.

| Category | Localized cases |
| --- | --- |
| bilingualPairs | 132 |
| pureDomain | 14 |
| pairwise | 42 |
| multiDomain | 70 |
| contradiction | 28 |
| missingEvidence | 14 |
| unknownEvidence | 14 |
| safety | 6 |
| medical | 18 |
| medication | 2 |
| substance | 2 |
| sleep | 4 |
| hardBoundary | 30 |

English: 132; Simplified Chinese: 132. Category tags overlap, and bilingualPairs counts pairs rather than localized cases. Counts are computed from canonical fixtures, not inferred from metric denominators.

The audit found no fixture imports or exact case IDs in the eight v2 runtime JavaScript files, no deployed benchmark script, 132 distinct English structured scenarios, and unchanged decisions after replacing every evidence ID in all 132 scenarios. Hard, missing, conflict, mixed, Safety and non-psychiatric cases are present. This cannot exclude all conceptual overfitting. Synthetic labels and deterministic rules require external review; linguistic/cultural diversity is limited and no prospective clinical validation exists. Small eligible discriminator and missing-evidence subsets remain a coverage limitation despite passing targeted readiness tests outside this benchmark.
