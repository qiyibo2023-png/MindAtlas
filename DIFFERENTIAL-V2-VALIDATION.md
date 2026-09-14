# Differential v2 implementation validation

Branch: `feature/cross-disorder-differential-v2`.
Unchanged baseline HEAD: `9e1c4d219fbe879b9891aa76d916492035d20130`.
This is a development verification record, not clinical approval.

## Automated checks

- Existing baseline: 656 checks retained, including all 42 Differential v1 checks.
- Added: 45 evidence graph/engine checks, 44 real-adapter and UI parity checks,
  34 clinical-boundary checks, and 44 final interface/Safety/readiness checks.
- Complete regression suite: **823 checks passing**.
- Translation validation: **2,237 complete bilingual keys**, no missing/orphan keys.
- Router Benchmark v1: **226/226** primary and clarification agreement;
  Safety override **14/14**; bilingual parity **113/113**; no mismatch records.
- Differential Benchmark v1: **264 localized cases**, structured bilingual parity
  **132/132**. See the dedicated benchmark report for all metrics and denominators.
- Source-independent rebuild: copied only canonical `src/` and build/translation
  scripts to a fresh ignored directory; generated all **103 runtime files** with
  byte parity. No pre-existing `dist/`, archive or backup was used.

Commands: `node scripts/test-all.cjs`, `node scripts/router-benchmark.cjs`,
`node scripts/differential-benchmark.cjs`, `node scripts/verify-source-rebuild.cjs`.
Detailed local outputs are in ignored `work/`; no real assessment data is used.

## Browser and accessibility checks

Checked through the local synthetic fixture page, with real structured assessment
adapters. Desktop viewport: 1280 pixels wide. Mobile: 390 × 844.

Scenarios: all seven individual domains; Mood–Anxiety, Mood–OCD, Trauma–OCD,
Trauma–Anxiety, Trauma–Mood, ADHD–Mood, ADHD–Trauma, Eating–OCD,
Psychosis–OCD, Psychosis–Trauma, Psychosis–Mood; Mood–Trauma–ADHD;
contradictory direct reports; missing duration; unsupported grief; acute suicide;
acute medical concern. This is 24 scenario selections, not 24 independent patients.

- Chinese and English rendering checked on mobile for every scenario.
- All 24 language switches preserved the view and in-memory assessment, Router,
  Safety and Differential state.
- No horizontal page overflow or raw translation keys in inspected scenarios.
- No browser warning/error logs observed during this fixture run.
- Both acute scenarios showed alert content and suppressed ordinary comparison.
- Why/uncertainty/provenance, course/function context and structured summary inspected.
- Keyboard Enter opened a native disclosure; Tab moved to its labeled checkbox.
  Both showed a 3px focus outline. Expanded sections survived language switching.
- Visible comparison buttons, disclosures and source labels met the 44px target
  check. Sampled visible comparison text had minimum contrast approximately 6:1.
- Viewport override restored after testing.

This is targeted browser/a11y verification, not a comprehensive screen-reader audit
or WCAG certification. The fixture page is not part of deployment output.

## Known limits and remaining checkpoint work

All clinical rules remain `unreviewed`. The model is a deterministic comparison of
available information, not a diagnostic instrument. Source precedence, saturation,
causal distinctions and benchmark labels need independent professional review.

Sections 93–111 are reconciled. The checkpoint is local only; no push or tag. All newly added rules require independent clinical review.
