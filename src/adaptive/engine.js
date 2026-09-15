(function(A,V,G){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x)),unique=a=>[...new Set(a)];
A.newSession=function(evidence,signals,options={}){
 const valid=Array.isArray(evidence)&&evidence.every(V.validNode);
 return {version:A.version,sequence:Number.isSafeInteger(options.sequence)?options.sequence:0,budget:Number.isInteger(options.budget)&&options.budget>=1&&options.budget<=8?options.budget:A.defaultBudget,baseEvidence:valid?clone(evidence):[],invalid:!valid,answers:[],evidence:[],signals:clone(signals||G.empty()),userStopped:false,safetyStopped:false,routerDirections:Array.isArray(options.routerDirections)?options.routerDirections.filter(x=>V.domainIds.includes(x)):[],result:null,differential:null};
};
A.select=function(c,s){
 const out={adaptiveStatus:'stop_insufficient',nextQuestion:null,whyThisQuestion:null,competingDirections:[],expectedInformationValue:null,rankedQuestions:[],questionsAsked:s.answers.length,questionBudgetRemaining:Math.max(0,s.budget-s.answers.length),stopReason:'insufficient',safetyState:c?.safetyState||null,engineVersion:A.version,reviewStatus:A.reviewStatus};
 const stop=(status,reason=status.slice(5))=>({...out,adaptiveStatus:status,stopReason:reason});
 if(!c||c.engineVersion!==V.version||!Array.isArray(c.alreadyCollectedEvidence)||!Array.isArray(c.unresolvedDiscriminators))return stop('stop_insufficient','invalid_contract');
 if(c.safetyState.requiresInterruption||c.safetyState.assessmentStatus==='unable_to_assess'||s.safetyStopped)return stop('stop_safety');
 if(c.safetyState.assessmentStatus!=='assessed')return stop('stop_safety','safety_clarification');
 if(s.userStopped)return stop('stop_user');
 if(s.answers.length>=s.budget)return stop('stop_budget');
 const known=new Map(c.alreadyCollectedEvidence.map(e=>[e.concept,e.value])),active=new Set(c.candidateDirections.filter(d=>d.level>0).map(d=>d.domain));
 const supported=c.candidateDirections.filter(d=>d.level>=2),conflicts=c.contradictions.filter(x=>!x.resolved),unknown=new Set([...c.missingEvidence,...c.unresolvedRuleOuts,...c.unresolvedDiscriminators.map(d=>d.conceptNeeded)]);
 const asked=new Set(s.answers.map(a=>a.questionId)),attempted=new Set(s.answers.flatMap(a=>a.targets));
 if(!supported.length&&(s.unsupportedAlternatives?.length||c.alreadyCollectedEvidence.some(e=>e.concept.startsWith('unsupported.')&&e.value===true)))return stop('stop_unsupported');
 if(active.size===1&&active.has('psychosis')&&known.get('psychosis.awake')===false&&known.get('psychosis.sleep')===true&&!['psychosis.belief','psychosis.qualified','psychosis.disorganization','psychosis.negative'].some(k=>known.get(k)===true))return stop('stop_insufficient','sleep_context');
 if(c.evidenceState==='reasonably_saturated'&&!conflicts.length&&!c.unresolvedDiscriminators.length)return stop(unique(supported.map(d=>d.domain)).length>1?'stop_multiple_supported':'stop_sufficient');
 const candidates=[];
 for(const q of A.registry){
  if(asked.has(q.id)||known.has(q.conceptTarget)||q.targets.some(k=>attempted.has(k)))continue;
  let relevant=q.domainsCompared.every(d=>active.has(d));
  if(q.id==='adhd_trauma')relevant=active.has('adhd')&&(active.has('trauma')||known.get('trauma.exposure')===true);
  if(q.id==='ocd_gad'||q.id==='trauma_ocd')relevant=active.has('ocd');
  if(q.id==='childhood_onset')relevant=active.has('adhd')||known.get('mood.concentration')===true;
  if(q.id==='adhd_activation')relevant=active.has('adhd')&&(known.get('mood.activation')===true||c.candidateDirections.some(d=>d.id==='bipolar'&&d.level>0));
  if(q.id==='compensation')relevant=known.get('eating.binge')===true&&known.get('eating.loss')===true;
  if(q.id==='restriction_motive')relevant=known.get('eating.restriction')===true;
  if(q.id==='psychosis_sleep')relevant=known.get('psychosis.perception')===true;
  if(q.id==='mood_adhd')relevant=active.has('adhd')&&(known.get('mood.low')===true||known.get('mood.interest')===true);
  if(q.id==='ocd_gad'&&active.has('trauma'))relevant=active.has('anxiety');
  if(q.id==='reality_testing')relevant=active.has('psychosis')&&(known.get('psychosis.dissociation')===true||known.get('trauma.dissociation')===true);
  if(!relevant)continue;
  if(unique(supported.filter(d=>d.level===3).map(d=>d.domain)).length>=2&&!q.domainsCompared.some(d=>supported.some(c=>c.domain===d))&&q.kind!=='ruleout')continue;
  const discriminator=c.unresolvedDiscriminators.filter(d=>q.targets.includes(d.conceptNeeded));
  const need=q.targets.some(k=>unknown.has(k));
  if(!need&&q.id!=='reality_testing'&&q.id!=='adhd_activation'&&q.id!=='mood_anxiety')continue;
  if(q.kind==='ruleout'&&!c.unresolvedRuleOuts.includes(q.conceptTarget))continue;
  const activeCompared=q.domainsCompared.filter(d=>active.has(d)).length;
  const reasons=[q.kind,discriminator.length?'unresolved_discriminator':'critical_context'];
  const score=q.priority+activeCompared*10+(discriminator.length?20:0)+(s.routerDirections.some(d=>q.domainsCompared.includes(d))?2:0);
  candidates.push({...q,informationValue:score,priorityReasons:reasons});
 }
 for(const conflict of conflicts){
  const key=conflict.concept,id='clarify_'+key;
  if(asked.has(id)||!Object.hasOwn(V.concepts,key)||V.valueOptions?.[key])continue;
  candidates.push({id,conceptTarget:key,targets:[key],domainsCompared:[key.split('.')[0]],questionKey:'adaptive.q_conflict',whyKey:'adaptive.why_conflict',answerOptions:[{value:'yes',labelKey:'adaptive.yes',evidenceUpdates:{[key]:true}},{value:'no',labelKey:'adaptive.no',evidenceUpdates:{[key]:false}},{value:'unknown',labelKey:'adaptive.unknown',evidenceUpdates:{}},{value:'prefer',labelKey:'adaptive.prefer',evidenceUpdates:{}}],informationValue:200,priorityReasons:['unresolved_contradiction'],version:A.version,reviewStatus:A.reviewStatus,kind:'contradiction'});
 }
 candidates.sort((a,b)=>b.informationValue-a.informationValue||a.id.localeCompare(b.id));
 if(!candidates.length)return stop(unique(supported.map(d=>d.domain)).length>1?'stop_multiple_supported':'stop_insufficient',supported.length?'no_eligible_question':'insufficient');
 const q=candidates[0];return {...out,adaptiveStatus:'ask',nextQuestion:q,whyThisQuestion:q.whyKey,competingDirections:q.domainsCompared,expectedInformationValue:{kind:'deterministic_priority',score:q.informationValue,reasons:q.priorityReasons},rankedQuestions:candidates.map(x=>({id:x.id,score:x.informationValue})),stopReason:null};
};
A.refresh=function(s,signals=s.signals,options={}){
 if(!s||s.version!==A.version)throw Error('Invalid adaptive session');
 s.signals=clone(signals);const safety=G.evaluate(s.signals,{failed:options.safetyFailed===true});
 if(safety.requiresInterruption||safety.assessmentStatus==='unable_to_assess')s.safetyStopped=true;
 s.differential=V.evaluate(s.invalid?null:[...s.baseEvidence,...s.evidence],s.signals,{safetyFailed:options.safetyFailed===true});
 s.unsupportedAlternatives=s.differential.unsupportedAlternatives;s.result=A.select(V.adaptiveContract(s.differential),s);return s.result;
};
A.answer=function(s,id,value,signals=s.signals){
 const result=A.refresh(s,signals),q=result.nextQuestion;
 if(result.adaptiveStatus!=='ask'||!q||q.id!==id)return false;
 const option=q.answerOptions.find(a=>a.value===value);if(!option)return false;
 const known=new Set(s.differential.alreadyCollectedEvidence.map(e=>e.concept));
 const updates=Object.entries(option.evidenceUpdates||{}).filter(([k])=>!known.has(k)||q.kind==='contradiction');
 const seq=s.answers.length+1;
 for(const [concept,v]of updates)s.evidence.push(V.node(concept,v,{id:'adaptive:'+s.sequence+':'+seq+':'+concept,source:'clarification',sourceType:'user_clarification',questionIds:[q.id],revision:seq,engineVersion:A.version}));
 s.answers.push({questionId:q.id,targets:[...q.targets],value,evidenceUpdates:Object.fromEntries(updates)});
 A.refresh(s,signals);return true;
};
A.stop=function(s){s.userStopped=true;return A.refresh(s);};
A.acceptSafetyText=function(s,text){const extraction=G.validateExtraction(G.extract(text));const merged=G.merge([s.signals,extraction.signals]);if(!extraction.valid||merged.invalid){s.safetyStopped=true;}return A.refresh(s,merged.signals);};
})(globalThis.Adaptive,globalThis.DifferentialV2,globalThis.GlobalSafety);
