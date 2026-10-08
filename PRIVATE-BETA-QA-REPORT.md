# Private Beta QA report

Date: 2026-10-07 (America/Toronto)
Branch: `private-beta-readiness`

## Automated engineering validation

- `npm run build`: PASS on the user's Windows host after the browser-QA remediation changes.
- i18n validation: PASS, 2,556 complete bilingual keys at the observed build.
- Static assembly: PASS, 130 runtime files built; 117 local assets verified; JavaScript parsed.
- `npm test`: PASS on the user's Windows host after the Private Beta changes. Earlier full run recorded 34 suites / 1,291 PASS-labelled checks; subsequent remediation retained a passing full suite.
- Safety regression suite: PASS. No Safety thresholds were intentionally loosened.
- Analytics privacy contract: strict allowlist; network upload remains disabled.

## Manual browser QA actually performed

### Desktop + Chinese — PASS for tested golden-path scope
Observed in a real browser:
- Consumer-first Home renders without obvious overflow.
- Natural-language low-mood persona enters Safety clarification and then Router.
- Safety clarification conservatively asks unresolved structured questions.
- Router clarification is bounded and usable.
- Mood assessment opens and PHQ-9 renders correctly.
- Mood title was changed from AI-first positioning to “情绪与抑郁症状评估”.
- PHQ-9 safety wording was made more neutral.
- PHQ-9 → depressive-symptom carry-forward was verified after remediation: prior presence/frequency answers display as read-only context rather than requiring duplicate selection.

Issues found and remediated during QA:
1. Safety clarification redraw caused disruptive page movement — viewport/focus preservation added.
2. Router fallback returned the user to a seven-domain choice despite a leading candidate — presentation now offers a reasonable first assessment while preserving diagnostic uncertainty and alternative choice.
3. Mood assessment over-emphasized “AI-assisted” positioning — changed to consumer-facing symptom-assessment language.
4. PHQ item-9 copy sounded mechanically trigger-oriented — replaced with neutral safety-support wording.
5. Post-PHQ symptom collection duplicated information — PHQ presence/frequency is now carried forward and shown read-only.

### Desktop + English — PASS for smoke scope
Observed:
- Mood assessment renders in English without obvious overflow.
- Chinese → English switching during an in-progress assessment preserves current step and PHQ-derived state.
- PHQ carry-forward labels and values render in English.
- No material Chinese UI copy was observed except the native month-input locale presentation.

### Mobile + Chinese — PASS for responsive assessment scope
Observed at approximately 400px responsive viewport:
- Step 3 cards fit the viewport.
- Chinese text wraps correctly.
- PHQ carry-forward cards stack correctly.
- Month input remains within the card.
- No material horizontal content overflow was observed in the inspected assessment screen.

### Mobile + English — PASS for responsive assessment/state scope
Observed at approximately 400px responsive viewport:
- Long English symptom headings wrap.
- Carry-forward cards remain within viewport.
- Chinese → English switch preserves assessment state.
- No material horizontal content overflow was observed in the inspected assessment screen.

Known P2: native `input type=month` placeholder follows browser/OS locale and may display Chinese year/month markers in the English UI. This is not an assessment-state or catalog error.

## Canada launch-region Safety resources — VERIFIED

Manual source verification was performed against current Canadian official/public poison-centre information:
- Emergency: 911
- Suicide Crisis Helpline: call/text 988, 24/7
- Poison-X outside Quebec: 1-844-764-7669
- Quebec poison centre: 1-800-463-5060

The configured values match the verified launch-region resources. Resource verification is not clinical validation.

## Scope limitations / gates not claimed

The manual browser session did **not** fully execute all seven assessments end-to-end in all four language/device combinations. Automated tests cover the broader assessment engines; manual QA used representative golden/smoke paths to identify visual and workflow defects.

The following are not fully manually verified and remain release-review items:
- a complete Result → Next Step browser journey after the latest remediation;
- manual acute-Safety browser walkthrough in both languages;
- exhaustive keyboard/Shift+Tab/focus-return/dialog testing;
- console-error inspection across every representative page;
- complete browser journeys for all six synthetic personas.

Therefore this report supports substantial Private Beta browser readiness but does not claim clinical validation, diagnostic accuracy, or exhaustive accessibility certification.

## Privacy

Analytics remains an in-memory engineering buffer with no network uploader/provider. Raw answers, free text, scores, safety content and identifiers are excluded by the analytics contract. Service, analytics, research and model-training purposes remain conceptually separate.

## Current recommendation

Automated build/tests and the representative desktop/mobile bilingual browser checks pass. Remaining unverified items above should be treated as final release-review gates. Do not describe MindAtlas as clinically validated or diagnostically accurate.

## Assessment UX Optimization v2 — 2026-10-07

This follow-up starts from remote `9f3202b79656cdb617f19189ee935b2ca2e06549`, preserving its partial remediation. Engineering checks below apply to this change; earlier host observations above do not validate these new workflows.

### Defects, causes and changes
- Safety clarification: negative answers no longer redraw the form; a cached batch keeps question order stable through language changes and retains selected answers. Continue explicitly reevaluates the batch. Acute answers still interrupt immediately. Empty completed batches cannot suppress later clarification.
- Accidental Safety selection: a transient recovery controller identifies the original structured response and assessment step. A secondary review control edits that response through the original module update path. It neither clears other Safety evidence nor overrides the engine. Resume requires an assessed, non-interrupting result with no unresolved critical signals. Existing assessment answers and Router state are retained. Raw narrative editing is not added; correction is available only when the original structured response is identifiable.
- Mood Step 3: the renderer and validator now share one visible-question selector and the frozen nine-item PHQ-to-domain mapping. PHQ edits refresh carried presence/frequency and remove stale domain follow-ups; optional onset remains optional. The actual Continue handler advances Step 3 to Step 4 in both languages. PHQ-9 scoring is unchanged.
- Conditional Mood history: explicit broad medical and medication/substance questions control detailed history; mania, chronic-course and stress gates clear stale dependent answers. Yes, No, Unknown and not asked remain distinct. Unknown stays unresolved rather than becoming No. Past mania and direct Safety questions remain available. These prototype branching decisions require clinician review.
- Downstream integration: Differential's existing input adapter now recognizes an explicit negative broad gate instead of treating skipped detail as missing. Explicit unknown detail is retained. No Differential rules/ranking changes were made.

### Validation
- `npm test`: PASS, 35 test files / 1,317 PASS-labelled checks, including 25 new UX checks. These counts are engineering assertions, not independent clinical cases.
- New checks: nine PHQ mappings, positive/negative follow-ups, optional onset, five gate state/cleanup cases, exposure categories, original-response recovery in ZH/EN, independent acute evidence, unknown/failure blocking, stable clarification, actual Step 3 Continue in ZH/EN, batch reevaluation and subsequent concerns.
- Existing Safety: PASS (56 core, 30 UX, routing integration and 10 extraction checks). Privacy: PASS (46 policy + 60 completion checks and analytics allowlist). Bilingual suite: 39 checks PASS.
- Router benchmark: 226/226 primary, clarification and status; 113/113 bilingual pairs; zero errors.
- Differential benchmark: 264/264 primary/status/Safety priority; zero errors.
- Adaptive benchmark: 314/314 next-question/stop decisions; 183/183 bilingual pairs; zero errors.
- `npm run build`: PASS; 2,566 complete bilingual keys, 131 generated runtime files, 118 referenced local assets.
- Source-independent rebuild: PASS; source and build scripts reproduce runtime bytes without an existing dist.
- Prior test assertions retained. One newly upstream-added cross-VM empty-array comparison uses an array spread so strict comparison tests its contents correctly. Runtime hash fixture refreshed only for intentionally edited Mood data/state/scoring/engine/UI and Safety UI; Safety core, extraction, resources, Router rules and other assessment hashes remain unchanged.

### Browser QA for this update
Playwright attempted Microsoft Edge launch and failed before a page opened: `browserType.launch: spawn EPERM`. No browser/node_repl automation tool is exposed in this execution environment. VM handler tests are not browser QA.

| Current UX v2 browser scope | Chinese | English |
| --- | --- | --- |
| Desktop | NOT TESTED | NOT TESTED |
| Mobile (390 x 844) | NOT TESTED | NOT TESTED |

Manual release gates: Home → Router → Assessment → Result → Next Step; stable clarification and visible selected values; accidental trigger correction and restored step; genuine acute interruption; PHQ Step 3 → 4; gate editing; language switching; no unexpected state loss; keyboard/focus, touch targets, wrapping/overflow and console errors. Keep PR #14 Draft pending these checks. No clinical validation or diagnostic accuracy is claimed.

### Files and boundaries
Runtime: `src/safety/ui.js`, new `src/safety/ux-recovery.js`, `src/index.html`, `src/mood/{data,state,scoring,engine,ui}.js`, `src/differential/adapters.js`, `src/i18n/catalog.js`.
Tests/build registration: new `tests/assessment-ux-v2.test.cjs`, `tests/mood.test.cjs`, `tests/fixtures/runtime-router-v1.0.0.json`, `scripts/test-all.cjs`.
Documentation: this report and `PRIVATE-BETA-RELEASE-CHECKLIST.md`.
No new storage, external analytics, disorders or account features. Generated dist, ignored work logs/debug scripts and synthetic test output are excluded from the commit. New recovery state contains response identifiers/step only, not duplicate raw narratives. Clinical review of branching and manual browser release gates remain outstanding.

## Mood scoring integrity / result explainability — 2026-10-07

Baseline: `1832dbfca342187d027513c9dbaf2b389024c8bb`. Full rule trace, references, synthetic vectors and limitations: [Mood audit](docs/mood-scoring-integrity-audit.md).

- Finding: PHQ-9=5/27 with qualified=0/9 is expected for five several-day responses under the current custom frequency rule. All five areas carry forward correctly. Another score-5 vector qualifies one area. The reported total alone cannot establish a propagation defect; the original session's item-level answers were unavailable.
- Clinical limitation: the prototype's daily-frequency and per-item gates are not the published PHQ symptom algorithm. Qualification may omit clinically relevant symptoms. No thresholds, qualification rules, PHQ-9 scoring or Safety rules changed. Independent clinician review remains required.
- Consumer results now distinguish PHQ-reported areas from stricter prototype-qualified areas, explain that zero is not absence of distress, and identify uncertainty. Per-area exclusion reasons, rule limitations and source links are in closed-by-default bilingual details. A detected carry-forward mismatch asks for review and does not modify answers.
- New `src/mood/explain.js`; integration in `src/mood/ui.js` / `src/index.html`; 25 new centralized i18n entries. New `tests/mood-integrity.test.cjs` registered in `scripts/test-all.cjs`; summary/control test harnesses load the new dependency. Only the edited UI runtime hash is refreshed. New audit documentation and the two release documents updated.
- `npm run build`: PASS (132 runtime files, 119 referenced assets). Translation completeness: PASS, 2,591 keys. Source-independent rebuild: PASS.
- `npm test`: PASS, 36 files / 1,334 PASS-labelled checks. New Mood integrity suite: 17 grouped checks, including nine-item/all-value mapping, totals 0–27, both score-5 examples, score-2 rule limitation, exclusion/unknown reasons, editing, Safety, bilingual rendering and actual language-switch handler state preservation.
- Existing Mood, Safety, extraction, Privacy, summary, controls, Router, Differential and Adaptive regressions remain passing. No assertions weakened or skipped.
- Real browser QA for this update: Desktop ZH **NOT TESTED**, Desktop EN **NOT TESTED**, Mobile ZH **NOT TESTED**, Mobile EN **NOT TESTED**. Edge launch retried and blocked before a page opened: `browserType.launch: spawn EPERM`. Automated markup/handler checks are not real-browser, visual or accessibility validation.
- Remaining gates: manual result explanation/readability and details interaction at desktop/390×844 in both languages; keyboard/focus/overflow; existing end-to-end/Safety release gates; clinical review of the custom qualification predicate and item-9 duration requirement. Keep PR #14 Draft; no merge or clinical-validation claim.
