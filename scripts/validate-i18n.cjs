const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function validate(root=path.resolve(__dirname,'../src')){
 const c={};vm.createContext(c);
 vm.runInContext(fs.readFileSync(path.join(root,'i18n/runtime.js'),'utf8'),c);
 const register=c.I18n.register;c.I18n.register=(namespace,entries)=>{if(!Array.isArray(entries))throw Error('Catalogs must use duplicate-safe entry lists');register(namespace,entries);};
 vm.runInContext(fs.readFileSync(path.join(root,'i18n/catalog.js'),'utf8'),c);
 const retained=/^safety\/(schema|rules|engine|adapters|extraction|runtime|resources)\.js$/;
 const files=[];function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else if(e.name.endsWith('.js'))files.push(p);}}visit(root);
 const used=new Set();const namespaces=[...new Set(c.I18n.keys().map(k=>k.split('.')[0]))];
 for(const file of files){const name=path.relative(root,file).replaceAll('\\','/'),code=fs.readFileSync(file,'utf8');if(name==='i18n/catalog.js')continue;
  for(const m of code.matchAll(/I18n\.(?:t|pair|formatPair)\(\s*['"]([^'"]+)['"]/g))c.I18n.pair(m[1]);
  for(const m of code.matchAll(/['"]([\w]+\.[\w.]+)['"]/g))if(namespaces.includes(m[1].split('.')[0])){c.I18n.pair(m[1]);used.add(m[1]);}
  if(name.startsWith('i18n/'))continue;
  // Reviewed bilingual safety metadata and bilingual extraction patterns remain
  // beside immutable clinical rules. Their exact allowed bytes are tested.
  if(!retained.test(name)&&/[\u3400-\u9fff]/.test(code))throw Error('Inline Chinese outside catalog: '+name);
  if(!retained.test(name)&&/(?<!\.)(?:\bT|\btx|\bt)\(\s*['"]/.test(code))throw Error('Inline translation call: '+name);
  for(const m of code.matchAll(/>([^<>{}$]+)</g)){const text=m[1].trim();if(/^[A-Za-z][A-Za-z0-9 /.,·()—:-]*$/.test(text)&&text!=='PHQ-9')throw Error('Untranslated literal markup in '+name+': '+text);}
 }
 const orphans=c.I18n.keys().filter(key=>!used.has(key));if(orphans.length)throw Error('Orphan translation keys: '+orphans.join(', '));
 console.log('PASS i18n catalog: '+c.I18n.keys().length+' complete bilingual keys; source references and inline-copy checks passed.');
 return c.I18n.keys().length;
}
module.exports={validate};if(require.main===module)validate();
