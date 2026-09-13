(function(I){'use strict';
const catalog=Object.create(null);
I.locales=Object.freeze(['zh-CN','en']);
I.index=locale=>{if(locale===0||locale==='zh-CN'||locale==='zh')return 0;if(locale===1||locale==='en')return 1;throw Error('Unsupported locale');};
I.register=function(namespace,messages){
 const entries=Array.isArray(messages)?messages:Object.entries(messages);
 for(const [id,pair] of entries){
  const key=namespace+'.'+id;
  if(Object.hasOwn(catalog,key))throw Error('Duplicate translation key: '+key);
  if(!Array.isArray(pair)||pair.length!==2||pair.some(v=>typeof v!=='string'||!v.trim()))throw Error('Incomplete translation: '+key);
  const placeholders=s=>[...s.matchAll(/\{([a-zA-Z][\w]*)\}/g)].map(m=>m[1]).sort().join(',');
  if(placeholders(pair[0])!==placeholders(pair[1]))throw Error('Translation placeholder mismatch: '+key);
  catalog[key]=Object.freeze(pair.slice());
 }
};
I.pair=key=>{if(!Object.hasOwn(catalog,key))throw Error('Missing translation: '+key);return catalog[key];};
I.text=(pair,locale)=>{if(!Array.isArray(pair)||pair.length!==2||pair.some(v=>typeof v!=='string'||!v.trim()))throw Error('Invalid bilingual message');return pair[I.index(locale)];};
I.select=(zh,en,locale)=>I.text([zh,en],locale);
I.t=function(key,locale,values={}){return I.text(I.pair(key),locale).replace(/\{([a-zA-Z][\w]*)\}/g,(_,id)=>{if(!Object.hasOwn(values,id))throw Error('Missing message argument: '+id);return String(values[id]);});};
I.keys=()=>Object.keys(catalog).sort();
I.formatPair=(key,values)=>[0,1].map(locale=>I.t(key,locale,Object.fromEntries(Object.entries(values).map(([id,value])=>[id,Array.isArray(value)?I.text(value,locale):value]))));
// A presentation-only transaction never changes the locale of a clinical engine.
I.presentationOnly=false;
I.present=function(draw){I.presentationOnly=true;try{return draw();}finally{I.presentationOnly=false;}};
I.boolean=(value,locale)=>I.t(value===true?'common.yes':value===false?'common.no':'common.unknown',locale);
I.captureView=function(doc){
 const controls=Array.from(doc.querySelectorAll('input, textarea')).filter(e=>!e.readOnly&&!['radio','checkbox','button','submit'].includes(e.type));
 return {drafts:controls.filter(e=>e.id).map(e=>({id:e.id,value:e.value,invalid:e.getAttribute('aria-invalid')})),
  details:Array.from(doc.querySelectorAll('details')).map(e=>e.open),focus:doc.activeElement?.id,
  selection:doc.activeElement?.selectionStart==null?null:[doc.activeElement.selectionStart,doc.activeElement.selectionEnd]};
};
I.restoreView=function(doc,snapshot){
 for(const item of snapshot.drafts){const e=doc.getElementById(item.id);if(e){e.value=item.value;if(item.invalid)e.setAttribute('aria-invalid',item.invalid);}}
 Array.from(doc.querySelectorAll('details')).forEach((e,i)=>{if(i<snapshot.details.length)e.open=snapshot.details[i];});
 const active=snapshot.focus?doc.getElementById(snapshot.focus):null;active?.focus();
 if(active&&snapshot.selection&&active.setSelectionRange)try{active.setSelectionRange(...snapshot.selection);}catch{}
};
})(globalThis.I18n=globalThis.I18n||{});

I18n.terms=Object.freeze({ocd:'terminology.ocd',obsessions:'common.obsessions',compulsions:'common.compulsions',mentalCompulsions:'terminology.mentalCompulsions',intrusiveThoughts:'terminology.intrusiveThoughts',anhedonia:'common.anhedonia',functionalImpairment:'common.impairment',differentialDiagnosis:'common.differential',manicEpisode:'terminology.manicEpisode',hypomanicEpisode:'terminology.hypomanicEpisode',suicidalIdeation:'terminology.suicidalIdeation',selfHarm:'terminology.selfHarm',psychoticSymptoms:'terminology.psychoticSymptoms',medicalEmergency:'terminology.medicalEmergency'});
I18n.term=(id,locale)=>I18n.t(I18n.terms[id],locale);
