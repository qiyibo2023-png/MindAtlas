# Adaptive Assessment v1 final report

Version: `adaptive-assessment-v1.0.0`. Review: **unreviewed**.
Branch: `feature/adaptive-assessment-v1`.
Verified canonical main baseline: `f46115949214e17c1ffa2888cebf4a4c5ca294eb`.
Local milestone message: `feat: add adaptive assessment v1`.
No push or tag. The checkpoint hash is available through `git log -1 --format=%H -- ADAPTIVE-V1-FINAL-REPORT.md`.

## 1. Files created

- `ADAPTIVE-V1-ARCHITECTURE.md`
- `ADAPTIVE-V1-FINAL-REPORT.md`
- `benchmarks/adaptive-v1/REPORT.md`
- `benchmarks/adaptive-v1/cases.cjs`
- `benchmarks/adaptive-v1/error-analysis-v1.0.0.json`
- `benchmarks/adaptive-v1/patterns.cjs`
- `benchmarks/adaptive-v1/quality-audit-v1.0.0.json`
- `benchmarks/adaptive-v1/results-v1.0.0.json`
- `scripts/adaptive-benchmark.cjs`
- `scripts/audit-adaptive-benchmark.cjs`
- `src/adaptive/engine.js`
- `src/adaptive/registry.js`
- `src/adaptive/runtime.js`
- `src/adaptive/schema.js`
- `src/adaptive/style.css`
- `src/adaptive/types.d.ts`
- `src/adaptive/ui.js`
- `tests/adaptive-browser.js`
- `tests/adaptive-fixtures.cjs`
- `tests/adaptive-harness.cjs`
- `tests/adaptive-integration.test.cjs`
- `tests/adaptive-trajectories.test.cjs`
- `tests/adaptive.test.cjs`

## 2. Files modified

- `README.md`
- `scripts/test-all.cjs`
- `src/app.js`
- `src/differential-v2/ui.js`
- `src/i18n/catalog.js`
- `src/index.html`

## 3. Adaptive architecture

A bounded question selector consumes the existing Differential contract and returns to the same engine after each structured answer; no independent diagnosis engine.

## 4. Input contract

Differential status, candidates, support/opposition, missing facts, rule-outs, discriminators, contradictions, collected evidence, Safety, evidenceState and engine version. Router domain alignment is optional priority context.

## 5. Output contract

Status, next question, explanation key, competing directions, auditable information priority, asked count, remaining budget, stop reason, Safety and version.

## 6. Question registry

36 centrally registered bilingual questions plus generic registered-concept contradiction clarifications. Thirteen required comparison families are covered; all have review metadata.

## 7. Selector logic

Safety and stop guards first; exclude known or previously attempted targets; require relevant active/sparse context; choose deterministic priority then stable ID.

## 8. Information-value model

Registry priority + active-domain relevance + unresolved-discriminator contribution + small Router alignment term; conflict clarification precedes normal questions. No probability/entropy claim.

## 9. Duplicate protection

Track question and targeted concepts, including unknown/decline attempts. Reliable true and false facts are skipped. User-requested new sequences retain prior structured facts.

## 10. Contradiction handling

Neutral targeted clarification adds provenance without deleting original reports. Equal-priority conflicts can remain unresolved and are not repeatedly asked.

## 11. Budget

Default six submitted questions; API allows 1–8. Budget is an engineering limit, not a clinical threshold; remaining uncertainty stays visible.

## 12. Saturation stopping

Uses Differential evidenceState and unresolved distinctions; stops without spending unused budget.

## 13. Multiple-supported stopping

Retains independently supported directions and avoids peripheral low-utility exploration just to force one winner.

## 14. Insufficient stopping

No eligible useful question yields an explicit insufficient/no-eligible-question state, not a guessed diagnosis.

## 15. User stopping

Stop for now is available during questions; not sure and prefer-not-to-answer are always available.

## 16. Unsupported stopping

Unsupported contexts with no independently supported core pattern stop and suggest professional assessment.

## 17. Safety stopping

Shared Safety runs before selection and answer acceptance. New acute text immediately removes ordinary questions/navigation. Technical failures and incomplete Safety are handled before ordinary questions.

## 18. Evidence updates

Stable existing concepts, Boolean facts and clarification provenance only. Unknown/decline add no fabricated fact. Pre-trauma onset is not misrepresented as childhood onset.

## 19. Differential rerun

Every accepted answer invokes Differential v2. Original module stores/scores and Router ordering remain unchanged. Adaptive facts also appear in the ordinary comparison.

## 20. Bilingual parity

Stable IDs with centralized catalog; submitted answers, unsubmitted radio drafts, step, budget, Safety, graph and stopped state survive language switching.

## 21. Adaptive tests

101 unit checks, 8 multi-turn/boundary checks and 8 UI/runtime integration checks = 117 new automated checks.

## 22. Benchmark dataset

183 independent synthetic trajectories / 366 English–Chinese localized runs. All required categories and difficult stop/known/contradiction/Safety cases included.

## 23. Next-question agreement

314/314 eligible decisions.

## 24. Top-two question coverage

296/296 eligible decisions.

## 25. Duplicate avoidance

550/550 inspected question presentations; explicit known-evidence protection 52/52.

## 26. Stop-decision agreement

314/314 specified transitions.

## 27. Safety-interruption accuracy

38/38 eligible localized trajectories.

## 28. Unsupported stop

12/12 eligible localized trajectories.

## 29. Bilingual benchmark parity

183/183 complete structured trajectory pairs.

## 30. Average questions

1.503 presented / 0.639 answered per bounded benchmark trajectory; not a measured average real-user session length.

## 31. Unnecessary-question rate

0/550 inspected presentations under the documented operational definition.

## 32. Error analysis

Zero current benchmark mismatches. Versioned framework preserves classifications and expected/actual details. Actual development fixes include radio-draft preservation, peripheral multiple-supported stopping and retaining facts across new sequences. Labels were not changed to conceal failures.

## 33. Full regression

940/940 checks passing, including all previous 823. Router primary/clarification 226/226, top-two 88/88, Safety 14/14, bilingual 113/113. Differential primary/coverage 264/264, bilingual 132/132; no benchmark mismatches.

## 34. Browser validation

23 fixture scenarios checked at desktop and 390×844 mobile; Chinese/English switching preserves state. Actual Mood → Differential → Adaptive entry, draft submission, stop summary, restarted sequence and acute text emergence verified. No horizontal overflow, raw translation keys or new console warnings/errors observed.

## 35. Accessibility

Native radio groups/legends, labels, status progress, keyboard Space and Enter, explanation disclosures and 3px focus outline verified. Visible Adaptive targets meet 44px minimum. Chinese/English wrapping and Safety alert/hidden ordinary navigation checked. Targeted validation, not full WCAG/screen-reader certification.

## 36. Independent rebuild

110 runtime files reproduced from isolated canonical source/build scripts with byte parity. Translation validator passes 2,333 bilingual keys. No old dist/archive input used.

## 37. Privacy audit

Only implementation, central translations, synthetic fixtures/benchmark, tests and documentation included. No real user records/narratives, secrets, credentials, environment files, machine paths, logs, caches or backups staged. No new persistent raw-text storage or analytics.

## 38. Known limitations

Finite deterministic coverage and author-designed priorities; mostly short synthetic benchmark paths; no prospective clinical or broad cultural evaluation. Some answers clarify context without changing a rank. Persistent direct-report contradictions remain transparent.

## 39. Clinical review

All 36 questions, generated contradiction questions and 13 policy families remain unreviewed. Software and benchmark success are not clinical validation.

## 40. Recommended next milestone

Independent clinician review of question semantics and priorities, followed by representative usability evaluation. Further platform modules require a separate task; none were started.

## Audit records and excluded files

See ADAPTIVE-V1-ARCHITECTURE.md and benchmarks/adaptive-v1/REPORT.md. Versioned metrics, quality audit and error analysis are beside the benchmark. Evidence update correctness is 234/234; multi-turn selection is 10/10. Both benchmark leakage audits pass.

Excluded under existing .gitignore: dist/, work/, node_modules/, caches, logs, environment/credential files and backups/archives. Canonical backups were not altered. Temporary browser fixture servers and tabs were closed; the user preview is separate. No non-ignored untracked files are intended to remain after the checkpoint.
