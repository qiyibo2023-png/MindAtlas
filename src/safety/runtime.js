(function(G){'use strict';
G.store={signals:G.empty(),failed:false,ack:null,region:'other',audit:[],lastAudit:null};
G.collect=function(){const signals=[G.store.signals];let failed=G.store.failed;const sources=[];
for(const [name,obj]of [['mood',globalThis.Mood],['anxiety',globalThis.Anxiety],['ocd',globalThis.OCD]]){
 if(!obj?.store||!obj.store.state||typeof obj.store.state!=='object'){failed=true;continue;}
 const state=obj.store.state;if(!Number.isInteger(state.revision)||state.revision<0){failed=true;continue;}if(state.revision===0)continue;const a=G.adapt(name,state,name==='mood'?G.phqSafety(state):{});signals.push(a.signals);failed ||= a.failed;sources.push({module:name,revision:state.revision});
}
const merged=G.merge(signals);const result=G.evaluate(merged.signals,{failed:failed||merged.invalid});return {...result,sources,signals:merged.signals};};
// Resolving unknowns to negative answers does not restart an acknowledged interruption.
// Every new positive fact, escalation, or processing failure still invalidates acknowledgment.
G.fingerprint=r=>JSON.stringify([r.urgency,r.assessmentStatus==='unable_to_assess',r.triggeredRules,G.paths.filter(p=>G.get(r.signals,p)===true)]);
G.current=function(){let r;try{r=G.collect();}catch{r={...G.evaluate(G.empty(),{failed:true}),signals:G.empty(),sources:[]};}const key=G.fingerprint(r);if(key!==G.store.lastAudit){G.store.audit.push(...r.auditEvents);G.store.audit=G.store.audit.slice(-60);G.store.lastAudit=key;}return r;};
G.guard=function(target){const r=G.current();const module=['screen','anxiety','ocd'].includes(target);return {result:r,show:r.requiresInterruption||((module||target==='safety')&&r.requiresGuidance&&G.store.ack!==G.fingerprint(r))||target==='safety'||target==='urgent'};};
G.submitText=function(raw){const parsed=G.validateExtraction(G.extract(raw));G.store.signals=parsed.signals;G.store.failed=!parsed.valid;G.store.ack=null;return G.current();};
G.acceptExtraction=function(raw){const parsed=G.validateExtraction(raw);G.store.signals=parsed.signals;G.store.failed=!parsed.valid;G.store.ack=null;return G.current();};
G.answer=function(path,value){if(!G.paths.includes(path)||![true,false,'unknown'].includes(value)){G.store.failed=true;return;}G.put(G.store.signals,path,value);G.store.ack=null;};
G.acknowledge=function(){const r=G.current();if(r.requiresInterruption||r.assessmentStatus==='unable_to_assess')return false;G.store.ack=G.fingerprint(r);return true;};
G.reset=function(){Mood.clear();Anxiety.clear();if(globalThis.OCD)OCD.clear();G.store={signals:G.empty(),failed:false,ack:null,region:G.store.region,audit:[],lastAudit:null};};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
