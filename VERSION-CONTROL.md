# Local baseline: safety-engine-v1.0.0

This directory is the Git repository root. Only its `src/` is authoritative. The older parent project, parent dist, ZIP copies and hosting settings are not source inputs. No remote is configured by this migration.

The baseline includes Mood, Anxiety, OCD, the shared Global Safety Engine and bilingual UX hardening. The original source migration changed no runtime bytes or safety thresholds. Subsequent bilingual hardening centralizes presentation and fixes a bounded extraction synonym bug; see I18N.md. No Symptom Router or new disorder module is added.

## Reproduce

```sh
node scripts/build.cjs
node scripts/validate-static.cjs
node scripts/verify-baseline.cjs
node scripts/test-all.cjs
```

Node v24.19.0 was used; no packages are required. Full tests rebuild and generate their own synthetic fixtures. All 139 existing checks plus the bilingual suite cover modules, safety, routing, assembly and UX. Release parity checks the current bilingual source/output manifest. The original 37-file pre-migration manifest is retained as historical evidence.

## Commit boundary

Commit `.gitignore`, `.gitattributes`, `package.json`, `README.md`, this document, `I18N.md`, `SAFETY-RULE-CATALOG.md`, and all files under `src/`, `scripts/`, `tests/`.

Exclude `dist/`, `work/`, dependencies, archives/backups, environment files, secrets, private keys, logs, local hosting/agent settings and OS metadata. Never add real assessment answers or user exports as fixtures. Review every staged change: ignore rules are not a secret detector. The exact committed-path candidate list is supplied in the external migration report.

## Preserved backups

These archives remain outside the repository in its parent output directory.

| Archive | SHA-256 |
| --- | --- |
| MindAtlas-Canonical-Before-Safety-20260913.zip | 30D09976D1E696395E035F317DFE90952B362FBB79EF1F3AAF7A3B311933409A |
| MindAtlas-Before-Safety-UX-20260913.zip | BD4E9F0524FC7C8BCC1D85230B5C433517EA1AB2DC50697C3904B2E20504800C |
| MindAtlas-Before-Source-Migration-20260913.zip | 4CDEC2321A1A9997C7197694EBEF9C842FCAB3DE6511F721DC80D179AA329298 |

Both existing archives were fully decompressed to check readability. The original canonical backup also matches its previously recorded hash. Newly recorded checksums provide future integrity references, not historical proof.

## Commit and tag

Creating the baseline commit and annotated tag requires the owner's Git name and email. Do not invent an identity. After staged review and configuring that identity locally:

```sh
git commit -m "Establish safety-engine-v1.0.0 canonical source baseline"
git tag -a safety-engine-v1.0.0 -m "Global Safety Engine v1.0.0 with UX hardening"
```

No push is part of this preparation. Passing implementation tests does not establish clinical validity; consult the safety review catalog.
## Official remote and current milestone

The user-designated private remote is now `origin` at
`https://github.com/qiyibo2023-png/MindAtlas.git`. The existing branch remains
`codex/safety-engine-v1.0.0`; no repository was reinitialized. The current requested
commit message is `feat: complete bilingual architecture and clinical parity`.
The earlier source-migration baseline instructions are historical. See
`CHECKPOINT-BILINGUAL.md` for the completed verification and author-identity blocker.

## Symptom Router feature milestone

The historical sections above describe baseline preparation. Router v1 is developed on `feature/symptom-router-v1`, based on verified bilingual commit `1198cbcc30c4d9ff91738644ff8e6dc117c779cb`. Official origin is unchanged. The milestone commit is `feat: add explainable symptom router v1`; the version tag is `symptom-router-v1.0.0`. Fetch and reject unexpected divergence before normal push. Create the tag only after a successful branch push; never move existing tags, force-push or auto-merge to stable. The final synchronization result is recorded in the external acceptance report.

`verify-baseline.cjs` now validates the Router release manifest; the original bilingual and migration manifests remain unchanged. Runtime modifications are limited to Router, its i18n and UI integration, and the documented Safety extraction defect correction.

## Differential v1 local milestone

Work occurs on `feature/cross-disorder-differential-v1` from merged baseline `5731384`. The required commit message is `feat: add cross-disorder differential layer v1`. This checkpoint requires local commit only: no push, no release tag. `runtime-differential-v1.0.0.json` verifies current source/build parity; historical Router, bilingual and migration manifests remain unchanged. See CHECKPOINT-DIFFERENTIAL.md for the acceptance gate.

## Trauma v1 local checkpoint

The canonical `feature/ptsd-trauma-assessment-v1` branch starts at merged Differential baseline `d4aae5f`. Required local commit: `feat: add PTSD trauma assessment v1`. No push or release tag during this task. The current release verifier uses `runtime-trauma-v1.0.0.json`; historical manifests and backups remain unchanged.

## ADHD checkpoint (supersedes historical module inventory above)

Development branch: `feature/adhd-assessment-v1`; metadata version: `adhd-assessment-v1.0.0`. Local commit only; no push or Git tag during this task. The current release verifier uses `tests/fixtures/runtime-adhd-v1.0.0.json`; prior manifests remain preserved. The canonical source tree alone rebuilds the runtime. All new rules are unreviewed. See `CHECKPOINT-ADHD.md` for the intended file inventory and verification.

## Eating local milestone

Branch: `feature/eating-disorders-assessment-v1`, based on merged ADHD main commit `e44a63b86003d0a5e89f0353b7ff1813ed6f8222`. Local commit only: `feat: add eating disorders assessment v1`. Internal version `eating-disorders-assessment-v1.0.0`; no tag or push during this task. Current source/dist verification uses `tests/fixtures/runtime-eating-v1.0.0.json`. Historical manifests and backups remain intact. See `CHECKPOINT-EATING.md` for validation and file inventory.
