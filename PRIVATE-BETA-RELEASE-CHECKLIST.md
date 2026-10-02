# MindAtlas Private Beta Release Checklist

## Product flow
- [ ] Home makes the primary path obvious within ~10 seconds
- [ ] Natural-language entry → Safety → Router → Assessment works
- [ ] Router asks no more than 3 clarification questions
- [ ] All seven assessment domains can be started, completed, and returned from
- [ ] Results distinguish screening from diagnosis
- [ ] Every result provides an actionable next-step path

## Analytics
- [ ] Funnel events: session_start, router_start, router_complete, assessment_start, assessment_complete, result_view, next_step_click
- [ ] Analytics allowlist rejects answers, free text, scores, safety content, identifiers
- [ ] No network analytics collection is enabled until provider + consent/privacy review is approved

## Safety
- [ ] Full automated safety suite passes
- [ ] Synthetic matrix reviewed
- [ ] EN/ZH manual acute + non-acute walkthroughs completed
- [ ] Regional resources verified for launch region

## Privacy
- [ ] Screening != diagnosis language visible
- [ ] Service consent is separate from analytics/research/model-training purposes
- [ ] No sensitive values in URL, localStorage, sessionStorage, cookies, analytics events
- [ ] Clear-session behavior verified

## QA
- [ ] Desktop Chinese
- [ ] Desktop English
- [ ] Mobile Chinese
- [ ] Mobile English
- [ ] Keyboard/focus and modal behavior checked
- [ ] npm test passes
- [ ] npm run build passes
- [ ] No unexplained regression failures

## Internal dogfooding
Run complete Enter → Next Step flows for: low mood, generalized worry, harm-OCD intrusive thought, reduced-sleep/mania signal, ambiguous mixed symptoms, and an acute safety case.

## Human Private Beta
Only after all release gates above pass: invite 10–20 ordinary users for usability testing. This phase evaluates comprehension, completion, navigation and trust—not diagnostic accuracy.
