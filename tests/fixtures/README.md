# Portable test fixtures

`safety-core-hashes.json` records the seven unchanged safety core files from before UX hardening. Paths are portable filenames only.

`runtime-v1.0.0.json` records all 37 canonical runtime files before source migration. `node scripts/verify-baseline.cjs` checks this historical release snapshot. Future intentional changes may differ from this release; do not casually update safety-core hashes.

Assessment test cases are synthetic. The test runner creates all transient fixtures under ignored `work/`; no existing work directory is required.

The original `runtime-v1.0.0.json` is retained as historical migration evidence.
The default release verification now uses `runtime-bilingual-v1.0.0.json` for the
subsequent intentional i18n work. `extraction-i18n-patch.json` documents the only
permitted extraction delta against the preserved original safety-core hashes.
