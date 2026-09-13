// Copy authored source without transformation; preserve reviewed runtime bytes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
function inventory(dir, prefix = '') {
  return fs.readdirSync(dir, {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(entry => {
    const relative = prefix + entry.name, absolute = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw Error('Symlinks are not permitted: ' + relative);
    if (entry.isDirectory()) return inventory(absolute, relative + '/');
    if (!entry.isFile()) throw Error('Unsupported source entry: ' + relative);
    return [{path:relative, sha256:crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex')}];
  });
}
function build() {
  const source = path.join(root, 'src'), output = path.join(root, 'dist');
  require('./validate-i18n.cjs').validate(source);
  const expected = inventory(source);
  if (!expected.some(f=>f.path==='index.html')) throw Error('Source index.html missing');
  // Verify the exact generated directory before recursive replacement.
  if (path.dirname(output)!==root || path.basename(output)!=='dist') throw Error('Unsafe output path');
  if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw Error('Output must not be a symlink');
  fs.rmSync(output, {recursive:true, force:true});
  fs.cpSync(source, output, {recursive:true});
  if (JSON.stringify(inventory(output))!==JSON.stringify(expected)) throw Error('Build differs from source');
  console.log('Built ' + expected.length + ' runtime files from src; byte parity verified.');
}
module.exports = {build, inventory};
if (require.main===module) build();
