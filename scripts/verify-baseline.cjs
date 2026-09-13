// Release-specific check: deliberately separate from tests for future source edits.
const assert = require('node:assert/strict');
const path = require('node:path');
const {inventory} = require('./build.cjs');
const baseline = require('../tests/fixtures/runtime-router-v1.0.0.json');
for (const folder of ['src','dist']) assert.deepEqual(inventory(path.resolve(__dirname,'..',folder)), baseline, folder+' differs from the Router baseline');
console.log('PASS release parity: source and rebuilt runtime match the Router baseline; original bilingual and migration manifests are retained separately.');
