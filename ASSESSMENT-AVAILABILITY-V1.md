# Assessment availability & topic capability UI v1

Internal version: `assessment-availability-ui-v1.0.0`.
Baseline: `9d77ba2f9fb24088f660366d63e46f4797a8e795` (canonical main,
including Adaptive Assessment v1). Branch: `feature/assessment-availability-ui-v1`.

## Product boundaries and exact mappings

The library contains 18 educational topics. Seven parent domains offer structured
assessments; three additional cards navigate into those existing domains. These
are assessments, not formal diagnoses. Education-only topics remain meaningful
and may need professional evaluation.

| Topic ID / topic | Capability | Assessment view / parent |
|---|---|---|
| depression / Depression | Full assessment | screen / Mood |
| bipolar / Bipolar | Assessment pathway | screen / Mood, differential and mania safety context; no standalone comprehensive Bipolar assessment |
| gad / Generalised anxiety | Full assessment | anxiety / Anxiety |
| panic / Panic | Assessment pathway | anxiety / Anxiety |
| social-anxiety / Social anxiety and phobias | Assessment pathway | anxiety / Anxiety |
| ocd / OCD | Full assessment | ocd / OCD |
| body-dysmorphia-hoarding | Information & navigation | None; OCD-related differential context, no dedicated full assessment |
| ptsd / PTSD | Full assessment | trauma / Trauma |
| adjustment-grief | Information & navigation | None; professional evaluation context |
| psychosis / Schizophrenia & psychosis | Full assessment | psychosis / Psychosis / Severe Mental Health Assessment; no schizophrenia diagnosis claim |
| adhd / ADHD | Full assessment | adhd / ADHD |
| autism / Autism | Educational information | None; outside the supported full assessment set |
| eating / Eating disorders | Full assessment | eating / Eating Disorders |
| somatic / Somatic concerns | Information & navigation | None; medical evaluation context |
| sleep / Insomnia and sleep | Information & navigation | None; differential and medical context |
| substance / Substance use and addiction | Medical guidance / safety | None; urgent-help navigation, shared intoxication/overdose/withdrawal safety handling |
| personality / Personality-related difficulties | Educational information | None; professional evaluation guidance |
| cognitive / Cognitive changes and delirium | Medical guidance / safety | None; urgent-help navigation, not an ordinary psychiatric self-test |

## Registry and rendering

`src/capabilities/registry.js` is the immutable product-metadata registry. Stable
topic IDs map to the existing editorial array through explicit `topicIndex` and
`titleKey` fields. Tests verify the association for every topic, protecting against
silent reordering. `fullAssessmentAvailable` is true only for seven canonical
parent cards. Pathways have a valid parent domain and route, but do not count as
additional full engines. `route()` cannot create ordinary assessment CTAs for
education, differential/navigation, or medical/safety capability types.

`routerSupported`, `differentialSupported`, and `adaptiveSupported` mean mapping
to a supported assessment domain, not merely recognition of a concern. False
does not mean the concern is clinically irrelevant or that unsupported-domain
recognition is absent. `safetyRelevant` denotes shared safety relevance, not a
positive safety finding. Product metadata is never passed into any clinical engine.

`src/capabilities/ui.js` generates badges, explanations, card/detail CTAs, the
deduplicated seven-domain directory, and the uncertain-start prompt. Card search
rebinding preserves working CTAs. Detail CTAs close the dialog before navigating.
All assessment navigation uses the existing application and Global Safety guards.
The symptom-description CTA focuses the existing Safety-first free-text form;
it does not call Router directly or bypass safety clarification.

The header has four regular entries: Knowledge, Assessments, Care & prevention,
and Evidence. The seven module buttons are available in the generated directory.
The former separate Mood/Anxiety promotional panels are replaced by this directory.
Acute safety still suppresses ordinary navigation. Clinical rules, assessment
states, Router ranks, Differential comparisons, and Adaptive priorities are unchanged.

## Bilingual and accessibility design

All new copy is in the central `capability` i18n namespace. Obsolete navigation
and promotional keys were removed rather than retaining unused translations.
Locale changes affect presentation only; IDs, routes, order and availability are
stable. The complete catalog has 2,351 paired keys and passes missing-key,
orphan-key, placeholder, and inline-copy validation.

Cards are articles with separate educational and assessment buttons, without
nested buttons. Badges use words rather than color alone. CTA accessible names
include their parent domain. The card focus outline is 3px; touch targets are at
least 44px. Mobile cards use one column, and the mobile header is non-sticky to
avoid obscuring focused content. Long English and Chinese text wraps within cards.

## Validation record

- Complete canonical suite: **969/969** (940 existing + 29 capability tests).
- All existing Mood, Anxiety, OCD, Trauma, ADHD, Eating, Psychosis, Safety,
  extraction, bilingual, summary/control/static assembly and reasoning tests pass.
- Router Benchmark v1 unchanged: primary/clarification 226/226, top-two 88/88,
  Safety 14/14, bilingual 113/113, false positives 0/92.
- Differential Benchmark unchanged: primary and acceptable coverage 264/264,
  co-occurrence 114/114, contradiction 28/28, rule-out retention 20/20;
  bilingual 132/132; no errors.
- Adaptive Benchmark unchanged: 183 trajectories / 366 localized runs;
  next-question and stopping 314/314, top-two 296/296, duplicate avoidance
  550/550, evidence updates 234/234, Safety 38/38, bilingual 183/183; no errors.
- Isolated source rebuild reproduces all **113 runtime files** byte for byte.
- Browser: all 18 card badges/routes inspected in Chinese and English; all seven
  parent module entries exercised; Bipolar enters Mood through shared safety
  clarification; Autism detail has no assessment CTA and preserves the same
  topic when switching language. Router CTA focuses the existing text field,
  and a synthetic worry example proceeds through Safety to an Anxiety direction.
- Desktop 1280px and mobile 390×844: no horizontal/card/badge overflow. Mobile
  touch-target inspection found no capability buttons below 44px. Keyboard Tab
  focuses the Bipolar CTA with the visible 3px outline. No new console errors.

## Files and checkpoint scope

Created: `src/capabilities/registry.js`, `src/capabilities/ui.js`,
`src/capabilities/style.css`, `tests/capabilities.test.cjs`, this document.

Modified: `src/app.js`, `src/index.html`, `src/i18n/catalog.js`,
`scripts/test-all.cjs`, `README.md`.

Generated `dist/`, ignored `work/` logs and migration helpers are excluded. No
clinical-engine files, benchmark cases/labels, backups, credentials, user data,
or browser-session artifacts belong to the commit. The checkpoint is local only;
no release tag is created by this task.

## Future expansion and limitations

To add a topic, first add its editorial content and central bilingual strings,
then exactly one registry row and explicit tests. Mark full capability only after
the actual module and its integrations are independently implemented and tested.
Add pathways by mapping to an existing parent, never by inventing a diagnosis
route. Update the explanatory counts and documentation when the domain set grows.
Run the complete suite and all three benchmarks, plus bilingual browser checks.

Capability availability is product metadata, not clinical validation. Existing
clinical-review limitations remain in force. Accessibility checks are focused
browser/keyboard checks, not a comprehensive assistive-technology certification.
The registry uses the current editorial-array adapter; future data restructuring
must preserve stable topic IDs. Next recommended milestone: **Privacy & Data
Governance v1**, as a separate task; it has not been started here.
