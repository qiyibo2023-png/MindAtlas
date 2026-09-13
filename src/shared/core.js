(function(S){'use strict';
S.get=(obj,path)=>path.split('.').reduce((v,k)=>v?.[k],obj);
S.validAnswer=function(q,v){if(v===undefined||v==='')return !!q.optional;if(q.type==='month'){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(v))return false;return v<=new Date().toISOString().slice(0,7)&&v>='1900-01';}return q.options.some(o=>o[0]===v);};
S.set=function(state,path,value){const s=JSON.parse(JSON.stringify(state)),keys=path.split('.');let o=s;keys.slice(0,-1).forEach(k=>o=o[k]||(o[k]={}));o[keys.at(-1)]=value;s.revision=(s.revision||0)+1;s.updatedAt=new Date().toISOString();return s;};
S.missing=(questions,s)=>questions.filter(q=>!S.validAnswer(q,S.get(s,q.id))).map(q=>q.id);
S.score=(answers,n)=>{const items=Array.from({length:n},(_,i)=>answers?.[i]);const valid=v=>v!==null&&v!==undefined&&['0','1','2','3'].includes(String(v));return {items,answered:items.filter(valid).length,complete:items.every(valid),total:items.every(valid)?items.reduce((a,v)=>a+Number(v),0):null};};
})(globalThis.Assessment=globalThis.Assessment||{});
