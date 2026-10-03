# Private Beta QA report

Date: 2026-10-02 (America/Toronto). Inspected starting commit: `ef00e93` on `private-beta-readiness`; final remediation commit is the commit containing this report.

## Automated outcome

- `npm test`: PASS, 34 suites, 1,291 PASS-labelled checks plus the analytics contract assertions.
- `npm run build`: PASS, including static assembly and 2,552-key centralized translation validation.
- Router, Differential and Adaptive benchmark commands: PASS.
- Entry scenario suite, Privacy static validator and isolated source rebuild: PASS.
- Added 14 bilingual seven-domain result-shell/state-preservation checks and a consumer-home check.
- Added analytics field-value injection, timestamp injection, clarification bounds, bounded memory and unsanitized event-bus rejection checks.

## Failures and remediation

A — Real regressions: new inline bilingual copy blocked the build and therefore all tests. Moved copy to the existing catalog; removed two obsolete unreferenced copy entries without relaxing the validator.

A — Module coupling: new UI instrumentation required application-level `track` and `PrivateBeta` globals in independently usable assessment modules. Optional analytics/presentation integration now preserves standalone module behavior; existing clinical assertions remain intact.

D — Privacy regression: allowlisted analytics keys accepted arbitrary values, caller timestamps and unsanitized DOM event payloads. Added finite value enums, internal timestamps, bounded clarification counts, removed DOM event dispatch, and preserved disabled network upload. Clear-session clears the telemetry buffer. Rendering/language changes no longer generate repeated completion events for the same assessment revision.

D — Product omission: the shared result component existed but was not connected to six assessments. Connected the consumer summary/next-step shell, with existing full clinical detail retained in expandable content. Scoring/Safety rules were not changed.

B — Intentional UI compatibility: Knowledge Library is no longer the default screen and Home adds a fifth navigation entry. Its test now explicitly navigates to Library and still asserts all 18 cards, 10 supported CTAs and semantic buttons. Navigation-source assertion allows instrumentation while retaining stable title/referrer checks. Four presentation-only runtime hashes were refreshed after review; clinical engine hashes and assertions remain unchanged.

No C-class test defects were identified. No failing assertion was deleted, Safety threshold loosened, or psychometric score changed.

## Safety and synthetic scenarios

Existing Safety, contextual extraction, UX, clinical domain and bilingual tests pass. The Safety matrix remains an engineering regression matrix, not clinical validation. Clinical engine/rule files have no remediation diff. Launch-region resources have not been freshly verified.

`node scripts/private-beta-personas.cjs` runs the six specified personas in both languages (12 entry smoke runs). Low mood, worry, harm-OCD, reduced sleep/impulsivity and mixed input reach Safety clarification without being treated as confirmed acute intent. The explicit suicide-intent/plan cases interrupt in both languages. These are engine/markup entry checks, NOT completed questionnaire/browser journeys. Mania/ambiguous extraction still requires clarification; no claim of automatic diagnosis or complete natural-language detection is made.

## Browser and usability gates

| Combination | Status |
|---|---|
| Desktop Chinese | UNVERIFIED |
| Desktop English | UNVERIFIED |
| Mobile Chinese | UNVERIFIED |
| Mobile English | UNVERIFIED |

Attempted supported Playwright Edge launch with `chromiumSandbox:true`; failed before page load with `browserType.launch: spawn EPERM`. No available node_repl/browser-control tool exposes an alternative supported interactive runtime. No sandbox protections were disabled. Prior host validation of Longitudinal Tracking is not evidence for this branch.

Full Enter → Safety → Router → Assessment → Result → Next Step dogfooding, mobile overflow/touch targets, dialogs, keyboard/focus behavior and visual hierarchy require actual browser validation. Approximate completion-time copy remains an estimate, not measured usability data.

## Privacy and limitations

Telemetry is an in-memory engineering buffer with no network uploader/provider. Allowed metadata remains finite, and raw answers, free text, scores and clinical summaries are excluded. Domain usage is still potentially sensitive; no production collection is approved. Service, analytics, research and model-training purposes remain separate under existing governance. No real health data was used in tests. Generated output, work logs and local environment files are excluded from the commit.

Do not merge or invite participants yet. PR remains draft pending browser QA, full synthetic walkthroughs and launch-region resource verification. The target is engineering/usability readiness for a small Private Beta, not clinical validation or diagnostic accuracy. No new product phase, disorder, account, chatbot, longitudinal or Differential/Adaptive feature is introduced.

## Synchronization and browser retry

Validated implementation commit `4940008161f00c81491d5927078368b5f89141ec` was pushed to `origin/private-beta-readiness` and verified using remote refs. The Git credential-helper shell failure was avoided using the existing authenticated GitHub CLI credential in process-local Git configuration only; no credential file or global configuration change was made.

The browser retry again failed before page load: `browserType.launch: spawn EPERM`, using Playwright `chromium.launch({channel:'msedge',headless:true,chromiumSandbox:true})`. No supported interactive browser/node_repl tool is exposed in this session. The four browser combinations remain NOT TESTED, not application failures.

Manual work still required for **each** Desktop Chinese, Desktop English, Mobile Chinese and Mobile English combination:
- Home → natural-language Router → Safety clarification → assessment → result → next-step navigation.
- Synthetic acute Safety interruption and accessible emergency actions.
- Language switching mid-assessment and on results without lost answers/position.
- Viewport overflow, wrapping, touch targets, progress, details and dialogs.
- Tab/Shift+Tab, visible focus, activation and focus return; console errors.
- Complete the six synthetic dogfooding journeys; earlier smoke checks cover entry only.

No implementation or automated expectation changed during this synchronization follow-up. Full automated tests were not rerun because the implementation is unchanged. PR #14 must remain Draft; launch-region resources also remain unverified. No merge was performed.
