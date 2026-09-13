# MindAtlas / 心理健康双语评估

Canonical source for the completed Mood, Anxiety and OCD modules, shared Global Safety Engine and Chinese/English UX hardening.

The platform now uses a centralized, strict bilingual catalog. Language changes
presentation only. See [the i18n contract, audit and clinical limits](I18N.md).

这是教育性评估原型，不是医疗诊断。测试通过不代表临床有效性或安全性已获验证。
This educational prototype is not a medical diagnosis. Independent clinical review remains required.

## Run locally

Node.js is the only prerequisite (tested with v24.19.0). No dependencies or installation are needed.

```sh
node scripts/build.cjs
node scripts/test-all.cjs
node scripts/serve.cjs
```

Open http://127.0.0.1:4173/. With npm installed, `npm run build`, `npm test`, and `npm start` are equivalent. The full test command rebuilds first and runs the original 139 checks plus bilingual and Router/Safety-extraction suites.

## Structure

- `src/`: authored HTML, CSS, JavaScript and data. Edit here.
- `src/mood/`, `src/anxiety/`, `src/ocd/`: completed assessment modules.
- `src/safety/`: shared rules, schema, adapters, runtime, resources and bilingual UI.
- `src/router/`: independent symptom schema, bilingual extraction, auditable rules, runtime and UI.
- `src/shared/`: shared controls and assessment utilities.
- `scripts/`: deterministic build, static server and verification tools.
- `tests/`: synthetic regression tests, portable hash fixtures and browser harness.
- `dist/`: generated deployment output. Never edit or commit.
- `work/`: generated synthetic fixtures and local test reports. Never commit.

Build copies every source file byte-for-byte and removes stale generated files. Deploy only `dist/`, never the project root. Assessment state stays in page memory. Do not commit real answers, exported user summaries, credentials or logs.

Normal entry runs the shared safety check. Clarification, technical failure and urgency levels have distinct bilingual UI. Acute states interrupt ordinary assessment navigation; intrusive thoughts remain distinct from actual desire, intent, plan and preparation. Symptom Router v1 now recommends Mood, Anxiety and OCD assessment pathways after Safety guidance. It supports multiple candidates, clarification and user choice; it does not diagnose. See [Router rules and limits](ROUTER-RULE-CATALOG.md).

See [baseline and version control](VERSION-CONTROL.md) and [safety rule review catalog](SAFETY-RULE-CATALOG.md).

For the optional synthetic browser harness, run `node scripts/preview-safety-ux.cjs` after building and open http://127.0.0.1:4174/. This is a development tool, not a public page.

## Differential v1

The optional cross-disorder comparison is available after current assessment results. See [checkpoint](CHECKPOINT-DIFFERENTIAL.md) and [auditable rule contract](DIFFERENTIAL-RULE-CATALOG.md). The complete suite now contains 269 checks, including 42 Differential checks. Authored code is in `src/differential/`; no additional disorder modules or Adaptive Assessment engine are included.

## PTSD / Trauma v1

The fourth assessment domain is available through navigation and the shared Router. It uses original structured questions, not a PCL-5 score. See [Trauma checkpoint](CHECKPOINT-TRAUMA.md) and [clinical implementation catalog](TRAUMA-IMPLEMENTATION-CATALOG.md). Full regression suite: 310 checks; new Trauma suite: 41 checks.

## ADHD local development milestone

The current source includes ADHD as the fifth adult assessment domain. See `ADHD-IMPLEMENTATION-CATALOG.md` and `CHECKPOINT-ADHD.md` for custom-assessment boundaries, review status, integrations and verification. Source remains `src/`; `dist/` is generated. Run `node scripts/test-all.cjs` for every regression and translation validation. The browser-only synthetic harness is `node scripts/preview-adhd.cjs` on port 4178 and is excluded from production runtime. No ASRS instrument is implemented.

## Eating Disorders v1

Eating Disorders is the sixth supported adult assessment domain. See `EATING-IMPLEMENTATION-CATALOG.md` for four original qualitative patterns, medical-first shared Safety integration, Router/Differential behavior and unreviewed clinical status. `CHECKPOINT-EATING.md` records validation and intended files. The synthetic browser harness is `node scripts/preview-eating.cjs` on port 4179; it is not deployed. No body weight or validated screening score is collected.
