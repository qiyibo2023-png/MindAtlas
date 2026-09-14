// Verify a rebuild without access to an existing dist directory.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const taskRoot=process.cwd(),work=path.join(taskRoot,'work');fs.mkdirSync(work,{recursive:true});
const isolated=fs.mkdtempSync(path.join(work,'differential-source-rebuild-'));
fs.cpSync(path.join(taskRoot,'src'),path.join(isolated,'src'),{recursive:true});
fs.mkdirSync(path.join(isolated,'scripts'));
for(const name of ['build.cjs','validate-i18n.cjs'])fs.copyFileSync(path.join(taskRoot,'scripts',name),path.join(isolated,'scripts',name));
assert(!fs.existsSync(path.join(isolated,'dist')));
const builder=require(path.join(isolated,'scripts/build.cjs'));builder.build();
assert.deepEqual(builder.inventory(path.join(isolated,'dist')),builder.inventory(path.join(taskRoot,'src')));
console.log('PASS source-independent rebuild: isolated source and build scripts reproduce every runtime byte.');
