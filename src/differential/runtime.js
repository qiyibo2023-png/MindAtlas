(function(D){'use strict';
D.store={enabled:false,selected:{mood:true,anxiety:true,ocd:true,router:true},clarifications:{rumination:'unknown',onlyObsessions:'unknown'},clarificationRevision:0,result:null,fingerprint:null};
D.gate=()=>GlobalSafety.guard('screen');
D.modules=()=>({mood:globalThis.Mood,anxiety:globalThis.Anxiety,ocd:globalThis.OCD});
D.collect=function(){const evidence=[],availability={},safety=GlobalSafety.current();let invalid=false;
 for(const [name,module]of Object.entries(D.modules())){let adapted;try{adapted=D.adapt(name,module?.store,module);}catch{adapted={evidence:[],ready:false,invalid:true};}availability[name]=adapted.ready;if(D.store.selected[name]){evidence.push(...adapted.evidence);invalid ||= adapted.invalid;}}
 if(D.store.selected.router)evidence.push(...D.adaptRouter(globalThis.SymptomRouter?.store.profile).filter(e=>e.domain==='unsupported'||D.store.selected[e.domain]));
 for(const [key,concept]of [['rumination','mood.rumination'],['onlyObsessions','anxiety.onlyObsessions']])if(D.store.selected[concept.split('.')[0]])evidence.push(D.fact(concept,D.store.clarifications[key],'clarification',[key],D.store.clarificationRevision,'user_clarification'));
 return {evidence,availability,invalid,safety};
};
D.current=function(){const input=D.collect();const fingerprint=JSON.stringify([input.evidence,input.availability,input.invalid,input.safety.signals,input.safety.assessmentStatus,D.store.selected]);
 if(fingerprint!==D.store.fingerprint){D.store.result=D.evaluate(input.invalid?null:input.evidence,input.safety.signals,{safetyFailed:input.safety.assessmentStatus==='unable_to_assess'});D.store.result.availability=input.availability;D.store.fingerprint=fingerprint;}
 return D.store.result;
};
D.open=function(){D.store.enabled=true;return 'differential';};
D.select=function(name,value){if(!Object.hasOwn(D.store.selected,name)||typeof value!=='boolean')return false;D.store.selected[name]=value;return true;};
D.clarify=function(key,value){if(!Object.hasOwn(D.store.clarifications,key)||![true,false,'unknown'].includes(value))return false;D.store.clarifications[key]=value;D.store.clarificationRevision++;return true;};
D.clear=function(){D.store.enabled=false;D.store.clarifications={rumination:'unknown',onlyObsessions:'unknown'};D.store.clarificationRevision=0;D.store.result=null;D.store.fingerprint=null;};
// An optional, explicitly opened comparison extends existing summaries without altering
// module results, scores, answer stores or original exports before opt-in.
for(const [name,module]of Object.entries(D.modules())){const original=module.summary;module.summary=function(...args){const base=original.apply(this,args);return D.store.enabled&&D.store.selected[name]?base+'\n\n'+(D.summaryForCurrent?D.summaryForCurrent(args[2]??0):D.summary(D.current(),args[2]??0)):base;};}
})(globalThis.Differential);
