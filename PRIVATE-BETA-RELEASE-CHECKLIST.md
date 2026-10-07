# MindAtlas Private Beta Release Checklist

## Product flow
- [x] Home makes the primary path obvious within ~10 seconds
- [x] Natural-language entry → Safety → Router → Assessment works
- [x] Router asks no more than 3 clarification questions
- [ ] All seven assessment domains manually started/completed/returned from (automated coverage exists; exhaustive browser verification not performed)
- [x] Results distinguish screening from diagnosis
- [x] Every result provides an actionable next-step path in implementation/tests
- [ ] Latest manual browser golden path completed through Result → Next Step

## Analytics
- [x] Funnel event schema implemented: session_start, router_start, router_complete, assessment_start, assessment_complete, result_view, next_step_click
- [x] Analytics allowlist rejects answers, free text, scores, safety content, identifiers
- [x] No network analytics collection enabled

## Safety
- [x] Full automated safety suite passes
- [x] Synthetic safety matrix documented/reviewed as an engineering regression matrix
- [ ] Manual acute Safety browser walkthrough completed in both EN and ZH
- [x] Canada launch-region emergency/crisis/poison resources verified

## Privacy
- [x] Screening != diagnosis language visible
- [x] Service consent is separate from analytics/research/model-training purposes
- [x] Automated privacy/static checks pass for sensitive storage/analytics constraints
- [x] Clear-session behavior covered by automated privacy tests

## QA
- [x] Desktop Chinese representative golden-path QA
- [x] Desktop English smoke/state-preservation QA
- [x] Mobile Chinese responsive assessment QA
- [x] Mobile English responsive/state-preservation QA
- [ ] Exhaustive keyboard/focus/dialog and console-error review
- [x] npm test passes
- [x] npm run build passes
- [x] No known unexplained automated regression failures

## Internal dogfooding
Automated/synthetic persona coverage exists for low mood, generalized worry, harm-OCD boundary, mania signal, ambiguous mixed symptoms and acute Safety. Complete browser journeys for all six personas have not been manually executed.

## Human Private Beta
Do not claim clinical validation or diagnostic accuracy. Before inviting 10–20 ordinary users, close the remaining unchecked release-review gates above or explicitly accept/document them as non-blocking with rationale.

## Assessment UX Optimization v2 follow-up — 2026-10-07
- [x] Latest remote partial remediation retained before editing
- [x] Stable Safety clarification batch and selected values; Continue reevaluates
- [x] Original structured-response correction preserves progress without acute bypass
- [x] Mood PHQ mapping, visible validation and Step 3 → 4 handler tests in ZH/EN
- [x] Conditional history distinguishes explicit No, Unknown and not asked
- [x] Full regression: 35 files / 1,317 PASS-labelled checks; 25 new UX checks
- [x] Existing Safety, privacy and bilingual regression suites pass
- [x] Router, Differential and Adaptive benchmarks: zero errors
- [x] Build, 2,566-key i18n validation and source-independent rebuild pass
- [ ] Current UX v2 Desktop Chinese real-browser walkthrough
- [ ] Current UX v2 Desktop English real-browser walkthrough
- [ ] Current UX v2 Mobile Chinese real-browser walkthrough at 390 x 844
- [ ] Current UX v2 Mobile English real-browser walkthrough at 390 x 844
- [ ] Current UX v2 acute interruption, correction, keyboard/focus, touch targets, overflow and console review
- [ ] Clinician review of conditional-history branching

Current browser launch failed with `spawn EPERM`; these unchecked items are NOT TESTED, not PASS. Earlier host QA above has narrower historical scope. Keep PR #14 Draft; do not merge or claim release acceptance from engineering tests alone.
