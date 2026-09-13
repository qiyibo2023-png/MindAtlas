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
