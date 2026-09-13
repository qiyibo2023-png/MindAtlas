# Symptom Router v1 local acceptance checkpoint

## Scope and baseline

Canonical Git repository, branch `feature/symptom-router-v1`, based on verified bilingual/Safety commit `1198cbcc30c4d9ff91738644ff8e6dc117c779cb`. No alternative output, backup or historical source was used. No new disorder or differential/longitudinal/adaptive module was developed.

## Implementation report

1. **Created:** `src/router/schema.js`, `extraction.js`, `rules.js`, `engine.js`, `runtime.js`, `ui.js`, `types.d.ts`; `tests/router.test.cjs`, `tests/router-safety-extraction.test.cjs`; `tests/fixtures/runtime-router-v1.0.0.json`; `ROUTER-RULE-CATALOG.md`; this report.
2. **Modified:** `src/app.js`, `src/index.html`, `src/style.css`, `src/i18n/catalog.js`, `src/safety/ui.js`, `src/safety/extraction.js`; `scripts/test-all.cjs`, `scripts/validate-i18n.cjs`, `scripts/verify-baseline.cjs`; `tests/fixtures/extraction-i18n-patch.json`; `README.md`, `I18N.md`, `VERSION-CONTROL.md`.
3. **Profile:** typed and runtime-validated independent `ClinicalSymptomProfile`: Mood, Anxiety, OCD, general functional concerns, unsupported flags, course and observation-level subject/time/polarity. Missing information is unknown, not false. No Safety fields or raw text are embedded.
4. **Extraction:** one local bilingual phrase extractor, clause context, explicit negation, uncertainty and conflict handling. Third-person/historical/hypothetical observations do not establish current self symptoms. First-person entry fragments default to self/current. Excessively many observations fail visibly rather than silently truncating.
5. **Rules:** nine versioned deterministic rules with review status, supporting feature IDs and central explanation keys. Relevance tier precedes supporting-feature count; an exact tie asks for user clarification. No probabilities or hidden LLM decisions.
6. **Routes:** only Mood, Anxiety and OCD are registered. Starting a route opens the existing module without prefilling answers or scores.
7. **Multiple routes:** relevant candidates remain visible; primary ordering is documented. Secondary assessments are labeled as potentially relevant, not diagnosed comorbidities.
8. **Uncertainty:** one broad concern question offers three domains, something else and not sure. User choice changes the next assessment, not extracted facts. Invalid profiles show a processing error and edit/manual-selection options.
9. **Safety:** submission calls the shared Safety Engine first. Acute/failure blocks extraction; nonacute structured profiles wait behind existing guidance. Resume, rendering and module start recheck Safety. Existing acknowledgment does not convert unknowns to no.
10. **OCD harm thoughts:** unwanted thoughts and rituals may support OCD relevance without inferring actual desire or intent. Harm-specific questions remain in Safety. Answering actual harm intent yes immediately interrupts navigation. Two concrete extraction defects exposed by required examples were corrected: explicit first-person plan-to phrasing and intrusive thoughts of stabbing. No Safety rule or threshold changed; reversible deltas retain the original hash checks.
11. **Unsupported concerns:** trauma, attention/hyperactivity, eating behaviors and possible psychotic concerns produce an unavailable-area notice. No unsupported module or diagnosis is created; unrelated supported routes are not forced.
12. **Bilingual parity:** existing 39 i18n checks pass; Router includes three full Chinese/English profile-and-result equality cases, mixed input, bilingual error/clarification rendering and bidirectional state-preservation checks. Catalog: 1,243 complete keys, including 28 Router messages.
13. **New tests:** 39 Router checks plus 10 focused Safety extraction checks.
14. **Regressions:** all **227 checks in 12 suites pass**: Mood 17, summary 2, controls 1, Anxiety 15, OCD 16, Safety 56, existing routing 1, Safety UX 30, i18n 39, Router 39, focused extraction 10, static assembly 1. Original 178 checks remain intact. Build/catalog validation is an additional gate.
15. **Browser:** 24 desktop/mobile matrix cases passed at 1280px and 390x844; six bilingual entry paths, multi-route, insufficient input, acute suicide/medical, intrusive-harm bridge and unsupported concerns. Additional Chinese acute checks, keyboard language switching with visible focus, edit/reset of description, clarification choice, alternate Anxiety start and actual-harm-intent interruption passed. No horizontal overflow or new console warnings/errors observed.
16. **Limits:** pattern coverage is bounded; complex negation, quotation, pronouns, temporal scope and unusual paraphrases can be missed. This is assessment navigation, not clinical validation. Raw text is transient; only structured state remains in memory. No analytics, persistence or remote AI is added.
17. **Clinical review:** all nine Router rules are `unreviewed`. Thresholds, extraction dictionaries, explanation wording and tie policy require qualified bilingual clinical review. Tests demonstrate implementation behavior, not diagnostic accuracy.
18. **Next step:** resolve the Git transport credential blocker, then rerun the final gate and complete the authorized checkpoint. Clinical review should precede expansion. No subsequent platform milestone has been started.

## Git synchronization blocker

Official remote remains `origin` at `https://github.com/qiyibo2023-png/MindAtlas.git`.
The pre-push remote-history check `git fetch origin` failed with:

```text
fatal: unable to access 'https://github.com/qiyibo2023-png/MindAtlas.git/': schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS (0x8009030e)
```

Automatic Git synchronization stopped immediately, before staging/committing. The existing baseline commit and feature branch are intact. No Router commit or tag was created; no force push, authentication workaround or history rewrite was attempted. Local HEAD is still the baseline above; working tree contains the intended Router changes and is not clean. Remote synchronization is **NOT VERIFIED**. The exact candidate paths and exclusion review are recorded in the external acceptance report.

Reproduction: `node scripts/test-all.cjs`, then `node scripts/verify-baseline.cjs`. Browser: run `node scripts/serve.cjs` and open localhost:4173. Historical manifests and backups remain preserved.
