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
