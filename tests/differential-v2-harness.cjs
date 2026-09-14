const fs=require('node:fs'),vm=require('node:vm');
module.exports=function(){
 const c={lang:1,esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;')};vm.createContext(c);
 for(const m of fs.readFileSync('src/index.html','utf8').matchAll(/<script src="([^"]+)"/g))if(m[1]!=='app.js')vm.runInContext(fs.readFileSync('src/'+m[1],'utf8'),c,{filename:m[1]});
 if(!c.DifferentialV2)throw Error('Differential v2 is missing from canonical source assembly');
 return c;
};
