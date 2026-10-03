# MindAtlas Private Beta Release Checklist

## Product flow
- [ ] Home makes the primary path obvious within ~10 seconds
- [ ] Natural-language entry → Safety → Router → Assessment works
- [ ] Router asks no more than 3 clarification questions
- [ ] All seven assessment domains can be started, completed, and returned from
- [x] Results distinguish screening from diagnosis
- [x] Every result provides an actionable next-step path

## Analytics
- [ ] Funnel events: session_start, router_start, router_complete, assessment_start, assessment_complete, result_view, next_step_click
- [x] Analytics allowlist rejects answers, free text, scores, safety content, identifiers
- [x] No network analytics collection is enabled until provider + consent/privacy review is approved

## Safety
- [x] Full automated safety suite passes
- [ ] Synthetic matrix reviewed
- [ ] EN/ZH manual acute + non-acute walkthroughs completed
- [ ] Regional resources verified for launch region

## Privacy
- [x] Screening != diagnosis language visible
- [x] Service consent is separate from analytics/research/model-training purposes
- [ ] No sensitive values in URL, localStorage, sessionStorage, cookies, analytics events
- [ ] Clear-session behavior verified

## QA
- [ ] Desktop Chinese
- [ ] Desktop English
- [ ] Mobile Chinese
- [ ] Mobile English
- [ ] Keyboard/focus and modal behavior checked
- [x] npm test passes
- [x] npm run build passes
- [x] No unexplained regression failures

## Internal dogfooding
Run complete Enter → Next Step flows for:
- Low mood: "最近什么都不想做，很累。" / "I have not wanted to do much lately and feel exhausted."
- Generalized worry: "我一直担心很多事情，很难停下来。" / "I keep worrying about many things and cannot switch it off."
- Harm-OCD boundary: "脑子里反复出现伤害别人的画面，但我不想伤害任何人。" / "I keep getting images of hurting someone, but I do not want to hurt anyone."
- Mania signal: "最近只睡两小时也精力很多，花钱和开车都比平时冲动。" / "I sleep two hours and still feel full of energy; I have been spending and driving much more impulsively."
- Ambiguous mixed symptoms: "我就是觉得不太对，睡不好，也很难集中。" / "I just feel off, sleep poorly, and cannot focus."
- Acute safety: use the canonical synthetic suicide/medical cases in the safety matrix; do not use a real beta participant for edge-case probing.

## Human Private Beta
Only after all release gates above pass: invite 10–20 ordinary users for usability testing. This phase evaluates comprehension, completion, navigation and trust—not diagnostic accuracy.

Verification scope and remaining browser gates: see PRIVATE-BETA-QA-REPORT.md. Checked presentation items are automated markup checks, not visual browser approval.

Synchronization follow-up: implementation commit `4940008161f00c81491d5927078368b5f89141ec` is verified on GitHub. Browser launch retry still returns `spawn EPERM`; all four browser QA combinations and keyboard/visual checks remain unchecked. See the QA report for the exact manual checklist. Do not merge or invite participants on the strength of automated results alone.
