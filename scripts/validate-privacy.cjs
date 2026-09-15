const fs=require('node:fs'),path=require('node:path');
function violations(source,name){
 source=source.replace('document.title=t(...I18n.pair("platform.m_bd9bb6d8f606"))','');
 const rules={title:/document\s*\.\s*title\s*=/,thirdParty:/<(?:script|link)[^>]+(?:src|href)=["'](?:https?:|\/\/)|@import\s|url\(["']?https?:|\.src\s*=/i,browserStorage:/\b(?:localStorage|sessionStorage|indexedDB)\b|document\s*(?:\.\s*cookie|\[\s*['"]cookie['"])/,network:/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\b/,logging:/console\s*(?:\.\s*(?:log|error|warn|info|debug)|\[\s*['"](?:log|error|warn|info|debug)['"])/,urlState:/history\s*(?:\.\s*(?:pushState|replaceState)|\[\s*['"](?:pushState|replaceState)['"])|location\s*\.\s*(?:hash|search|pathname|href)\s*=/,tracking:/<iframe\b|<img[^>]+https?:/i};
 return Object.entries(rules).filter(([,re])=>re.test(source)).map(([rule])=>({file:name,rule}));
}
function validate(root=path.resolve(__dirname,'../src')){const hits=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(/\.(js|html|css)$/.test(p)&&!p.endsWith(path.join('i18n','catalog.js')))hits.push(...violations(fs.readFileSync(p,'utf8'),path.relative(root,p)));}}walk(root);if(hits.length)throw Error('Privacy boundary violation: '+JSON.stringify(hits));console.log('PASS privacy static boundary: no browser storage, network payload sinks, console state logging or URL-state writes.');return true;}
module.exports={validate,violations};if(require.main===module)validate();
