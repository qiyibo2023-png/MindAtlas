const fs=require('fs'),vm=require('vm');
module.exports=function(){const c={lang:1,esc:s=>String(s).replaceAll('<','&lt;')};vm.createContext(c);for(const m of fs.readFileSync('dist/index.html','utf8').matchAll(/<script src="([^"]+)"/g))if(m[1]!=='app.js')vm.runInContext(fs.readFileSync('dist/'+m[1],'utf8'),c,{filename:m[1]});return c;};
