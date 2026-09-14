# Router Benchmark v1 checkpoint report

Synthetic corpus; 226 cases in 113 paired scenarios. All labels and new rules are unreviewed. No real user text or patient data.

Run `node scripts/router-benchmark.cjs` after rebuilding. No benchmark-derived disease probability is shown to users.

## Metrics

| Metric | Result |
| --- | --- |
| primary | 226 / 226 |
| top2 | 88 / 88 |
| safetyOverride | 14 / 14 |
| unsupported | 226 / 226 |
| clarification | 226 / 226 |
| status | 226 / 226 |
| bilingualParity | 113 / 113 |
| falsePositive | 0 / 92 |

Primary agreement includes null-primary expectations; top-two coverage uses only cases with expected primary domains. Safety override uses 14 acute cases. False positives use 92 insufficient controls. Bilingual parity compares primary/candidate routes, status, urgency, unsupported flags and selected clarification. Unit tests separately compare normalized clinical facts for all seven domains.

## Confusion matrix

Rows are single expected primary domains; columns are actual primary domains. Null results have their own column. Mixed/unsupported/Safety cases are excluded.

| Expected | mood | anxiety | ocd | trauma | adhd | eating | psychosis | none |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mood | 14 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| anxiety | 0 | 12 | 0 | 0 | 0 | 0 | 0 | 0 |
| ocd | 0 | 0 | 14 | 0 | 0 | 0 | 0 | 0 |
| trauma | 0 | 0 | 0 | 12 | 0 | 0 | 0 | 0 |
| adhd | 0 | 0 | 0 | 0 | 12 | 0 | 0 | 0 |
| eating | 0 | 0 | 0 | 0 | 0 | 12 | 0 | 0 |
| psychosis | 0 | 0 | 0 | 0 | 0 | 0 | 12 | 0 |

## Category counts (overlapping tags)

- mood: 34
- pure: 14
- impairment: 14
- navigation: 14
- negation-unrelated: 14
- uncertainty-general: 14
- other-unrelated: 14
- anxiety: 26
- ocd: 30
- trauma: 28
- adhd: 26
- eating: 26
- psychosis: 30
- other: 14
- historical: 14
- hypothetical: 14
- quoted: 14
- clinician-question: 14
- negation: 14
- vague: 14
- unsupported: 18
- autism: 2
- substance: 2
- sleep: 4
- somatic: 2
- personality: 2
- cognitive: 2
- grief: 2
- bdd: 2
- hoarding: 2
- safety: 14
- suicide: 2
- medical: 2
- violence: 2
- overdose: 2
- command: 2
- confusion: 2
- breathing: 2
- mixed: 12
- culture: 2
- idiom: 2
- technical: 2
- medical-mimic: 2
- mixed-language: 4

## Error analysis

Router v2.0.1: no benchmark discrepancies. The two prior Mood+OCD cases now select `moodOcd`. Benchmark inputs and labels are unchanged. Clarification agreement improves from 224/226 to 226/226; every other metric and the confusion matrix are unchanged. This is clarification coverage, not evidence of clinical validation. See `../../CHECKPOINT-ROUTER-V2.0.1.md`.

## Limitations

The corpus is intentionally synthetic and development-visible. Many cases are controlled contextual transformations of seven base patterns; they are correlated rather than independent clinical observations. It covers bilingual phrasing, mixed language, context and Safety, but not the full diversity of narratives, literacy, dialects, comorbidity or medical mimics. High agreement cannot estimate clinical sensitivity/specificity or external validity. No accuracy threshold was invented, and residual errors are disclosed. Independent clinician review and a substantially more diverse held-out corpus are required before any clinical claims.
