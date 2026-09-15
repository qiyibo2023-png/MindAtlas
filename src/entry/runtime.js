(function(E,R,V,G){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const empty=()=>({active:false,state:'ENTRY_DESCRIPTION',question:null,answers:[],history:[],used:0,family:null,evidenceVersion:0,safetyEvaluation:null,safetyAnswers:{},returnState:null,editing:false});
E.store=empty();E.clear=()=>{E.store=empty();};
const reset=G.reset;G.reset=function(){reset();E.clear();};
const clear=R.clear;R.clear=()=>{clear();E.clear();};
const answerSafety=G.answer;
G.answer=(path,value)=>{const unchanged=value!=='unknown'&&E.store.active&&G.paths.includes(path)&&[true,false,'unknown'].includes(value)&&G.get(G.store.signals,path)===value,ack=G.store.ack;answerSafety(path,value);if(unchanged)G.store.ack=ack;if(E.store.active&&G.paths.includes(path)&&[true,false,'unknown'].includes(value)){E.store.safetyAnswers[path]=value;if(!unchanged)E.store.evidenceVersion++;}};
// Use shared concept IDs, rather than question wording, to suppress already
// answered alternatives. Corrections remain available through Back or Edit.
E.entryQuestion=function(q,profile){
 if(!V.validate(profile))return null;
 if(q.id==='entryBroad')return q;
 const options=q.options.filter(o=>{const facts=Object.entries(o.effects);return !facts.length||(facts.some(([p])=>profile.facts[p]==='unknown')&&facts.every(([p,v])=>profile.facts[p]==='unknown'||profile.facts[p]===v));});
 return options.some(o=>Object.keys(o.effects).length)?{...q,options}:null;
};
E.checkSafety=function(){
 const result=G.current();
 const fingerprint=G.fingerprint(result),previous=E.store.safetyEvaluation;
 if(!previous||previous.evidenceVersion!==E.store.evidenceVersion||previous.result.fingerprint!==fingerprint)E.store.safetyEvaluation={evidenceVersion:E.store.evidenceVersion,evaluatedAt:Date.now(),relevantResolvedSignals:G.paths.filter(p=>G.get(result.signals,p)!=='unknown'),result:{urgency:result.urgency,assessmentStatus:result.assessmentStatus,fingerprint}};
 return R.gate(); // Always consult the live shared engine, including module evidence.
};
E.reconcile=function(){
 const s=E.store;if(!s.active)return;
 const gate=E.checkSafety();
 if(gate.show){if(!s.state.startsWith('SAFETY_'))s.returnState=s.state;s.state='SAFETY_CLARIFICATION';return;}
 if(s.state==='SAFETY_CLARIFICATION')s.state=s.returnState||'ROUTER_EVALUATION';
 if(['DIRECT_ASSESSMENT_SELECTION','STOPPED','UNSUPPORTED_NAVIGATION','ENTRY_DESCRIPTION'].includes(s.state))return;
 const r=R.store.result;if(!r)return;
 if(r.routingStatus==='unsupported'){s.state='UNSUPPORTED_NAVIGATION';s.question=null;return;}
 if(s.used>=E.maxQuestions){s.state=r.candidateRoutes.length?'ROUTE_RECOMMENDATION':'DIRECT_ASSESSMENT_SELECTION';s.question=null;return;}
 if(r.clarification){s.state='ROUTER_CLARIFICATION';s.question=r.clarification;return;}
 if(r.routingStatus!=='insufficient'){s.state='ROUTE_RECOMMENDATION';s.question=null;return;}
 // Known candidate families skip the broad family question; no repeated factual questions.
 const family=s.family||(r.candidateRoutes.length===1?r.candidateRoutes[0].domain:null);
 const q=E.entryQuestion(E.questions[family]||E.questions.broad,R.store.v2?.profile);
 const already=q&&s.answers.some(a=>a.id===q.id);
 if(!q||already){s.state='DIRECT_ASSESSMENT_SELECTION';s.question=null;return;}
 s.state='ENTRY_BROAD_CLARIFICATION';s.question=q;
};
const resume=R.resume;
R.resume=function(){const destination=resume();if(E.store.active){E.reconcile();return destination==='library'?'router':destination;}return destination;};
E.submit=function(raw){
 const prior=E.store.active?clone(E.store.safetyAnswers):{};
 R.clear();E.store.active=true;E.store.state='SAFETY_EVALUATION';E.store.safetyAnswers=prior;E.store.evidenceVersion=1;
 // Intentional replacement removes stale extracted symptoms. Explicit Safety answers
 // remain unless the new description supplies a positive conflicting Safety signal.
 const parsed=G.validateExtraction(G.extract(raw));G.store.signals=parsed.signals;G.store.failed=!parsed.valid;
 for(const [p,v]of Object.entries(prior))if(G.get(parsed.signals,p)==='unknown')G.put(G.store.signals,p,v);
 const live=G.current();if(G.store.ack!==G.fingerprint(live))G.store.ack=null;
 if(live.requiresInterruption||live.assessmentStatus==='unable_to_assess'){E.store.state='SAFETY_CLARIFICATION';E.checkSafety();return 'safety';}
 try{const profile=V.extract(raw);R.store.v2={profile,session:V.session()};R.store.profile=V.toLegacy(profile);}catch{R.store.v2={profile:null,session:V.session()};R.store.profile=null;}
 R.store.pending=true;E.store.state='ROUTER_EVALUATION';return R.resume();
};
R.submit=E.submit;
E.respond=function(id,value){
 if(!E.store.active||E.checkSafety().show||E.store.used>=E.maxQuestions||!['ROUTER_CLARIFICATION','ENTRY_BROAD_CLARIFICATION'].includes(E.store.state))return false;
 const q=E.store.question,o=q?.options.find(o=>o.value===value);if(q?.id!==id||!o)return false;
 const s=E.store;
 s.history.push({profile:clone(R.store.v2),answers:clone(s.answers),family:s.family,question:clone(q),state:s.state});
 if(s.state==='ROUTER_CLARIFICATION'){
  const updated=V.answer(R.store.v2.profile,R.store.v2.session,id,value);R.store.v2=updated;
 }else{
  if(id==='entryBroad'&&E.questions[value])s.family=value;
  const p=R.store.v2.profile;
  if(!V.validate(p)){s.history.pop();s.state='DIRECT_ASSESSMENT_SELECTION';return false;}
  for(const [path,v]of Object.entries(o.effects))if(p.facts[path]==='unknown')p.evidence.push({id:'clarification:'+id+':'+path,path,value:v,source:'clarification',context:{subject:'self',temporality:'current',polarity:v?'affirmed':'denied',quotationStatus:'direct_self_report',certainty:'reported'}});
  V.normalize(p);
 }
 s.answers.push({id,value});s.used++;s.evidenceVersion++;s.question=null;s.state=value==='other'?'UNSUPPORTED_NAVIGATION':['unknown','prefer'].includes(value)?'DIRECT_ASSESSMENT_SELECTION':'ROUTER_EVALUATION';
 // Route-family selection alone is not a Safety signal. Explicit waking
 // perceptual experience is passed to the existing shared Safety rule.
 if(id==='entryPsychosis'&&value==='awake')G.put(G.store.signals,'psychosis.hallucinations',true);
 if(o.effects?.['psychosis.realityDifficulty']===true)G.put(G.store.signals,'psychosis.impairedRealityTesting',true);
 R.store.profile=V.toLegacy(R.store.v2.profile);R.resume();return true;
};
E.back=function(){if(E.checkSafety().show||!E.store.history.length||E.store.used>=E.maxQuestions)return false;const h=E.store.history.pop();R.store.v2=h.profile;R.store.profile=V.toLegacy(h.profile.profile);R.store.result=V.evaluate(h.profile.profile,h.profile.session,G.current());Object.assign(E.store,{answers:h.answers,family:h.family,question:h.question,state:h.state});E.store.evidenceVersion++;return true;};
E.action=function(action){if(E.checkSafety().show)return 'safety';const states={direct:'DIRECT_ASSESSMENT_SELECTION',stop:'STOPPED',knowledge:'STOPPED',edit:'ENTRY_DESCRIPTION'};if(!states[action])return 'router';E.store.state=states[action];E.store.editing=action==='edit';return action==='knowledge'?'library':'router';};
E.start=function(domain){if(E.checkSafety().show)return 'safety';const row=TopicCapabilities.assessments().find(c=>c.assessmentDomain===domain);return row?TopicCapabilities.route(row):'router';};
// Additional free text is ephemeral and can only add evidence; edit explicitly replaces it.
E.addText=function(raw){
 const parsed=G.validateExtraction(G.extract(raw)),merged=G.merge([G.store.signals,parsed.signals]);G.store.signals=merged.signals;G.store.failed=G.store.failed||!parsed.valid||merged.invalid;E.store.evidenceVersion++;
 const gate=E.checkSafety();if(gate.result.requiresInterruption||gate.result.assessmentStatus==='unable_to_assess'){E.reconcile();return 'safety';}
 const next=V.extract(raw),p=R.store.v2?.profile;
 if(V.validate(p)&&V.validate(next)){for(const row of next.evidence)p.evidence.push({...row,id:'e'+(p.evidence.length+1000)});V.normalize(p);R.store.profile=V.toLegacy(p);}
 E.store.state='ROUTER_EVALUATION';
 return R.resume();
};
const respond=V.respond;V.respond=(id,value)=>E.store.active?E.respond(id,value):respond(id,value);
})(EntryFlow,SymptomRouter,RouterV2,GlobalSafety);
