(function(D){'use strict';
const unique=a=>[...new Set(a)];
D.evaluate=function(evidence,safetySignals,options={}){
 const safe=GlobalSafety.evaluate(safetySignals,{failed:options.safetyFailed===true||GlobalSafety.paths.some(path=>![true,false,'unknown'].includes(GlobalSafety.get(safetySignals,path)))});
 const result={status:'insufficient',primaryDirections:[],secondaryDirections:[],possibleCooccurringPatterns:[],alternatives:[],unsupportedDomainFlags:[],unresolvedRuleOuts:[],contradictions:[],missingEvidence:[],safetyState:{urgency:safe.urgency,assessmentStatus:safe.assessmentStatus,requiresInterruption:safe.requiresInterruption,primaryDomain:safe.primaryDomain,intrusiveInterpretation:safe.intrusiveInterpretation},reasoning:{supporting:[],opposing:[],discriminatingFeatures:[]},engineVersion:D.version,candidates:[],matchedRules:[],evidence:[],provenance:{},blocked:false};
 if(safe.requiresInterruption||safe.assessmentStatus==='unable_to_assess'){result.blocked=true;return result;}
 const normalized=D.normalize(evidence);if(!normalized.valid){result.missingEvidence=['invalid_evidence'];return result;}
 result.evidence=evidence.map(e=>({...e,provenance:{...e.provenance,questionIds:[...e.provenance.questionIds]}}));result.provenance=normalized.provenance;result.contradictions=normalized.contradictions;
 const f=normalized.facts,context=normalized.contextFacts;
 if(f['anxiety.broad']===true&&f['anxiety.onlyObsessions']===true)result.contradictions.push({concept:'anxiety.onlyObsessions',evidenceIds:[...normalized.provenance['anxiety.broad'],...normalized.provenance['anxiety.onlyObsessions']],selectedEvidenceIds:[],selectedValue:'unknown',policy:'unresolved'});
 const candidates=Object.entries(D.directions).map(([id,d])=>({id,domain:d.domain,labelKey:d.label,consistency:'insufficient',level:0,supporting:[],opposing:[],discriminatingFeatures:[],missingEvidence:d.required.filter(k=>f[k]==='unknown'),unresolvedRuleOuts:[]}));
 const candidate=id=>candidates.find(c=>c.id===id);
 for(const rule of D.rules){if(!Object.entries(rule.all).every(([id,v])=>f[id]===v))continue;result.matchedRules.push(rule.id);const reason={key:rule.explanationKey,concepts:Object.keys(rule.all),evidenceIds:unique(Object.keys(rule.all).flatMap(k=>normalized.provenance[k]))};
  for(const effect of rule.effects){const c=candidate(effect.direction);if(effect.support){c.level=Math.max(c.level,effect.support);c.supporting.push(reason);c.discriminatingFeatures.push(reason);}if(effect.oppose)c.opposing.push(reason);}
 }
 // Retain weak/context-only evidence without promoting a screener or free text to a diagnosis.
 for(const [direction,keys]of [['ocd',['ocd.intrusive','ocd.rituals']],['mood',['mood.low','mood.interest','mood.contextSymptoms']],['gad',['anxiety.broad','anxiety.excessive']]]){
  const c=candidate(direction),present=keys.filter(k=>f[k]===true);if(present.length&&!c.level){c.level=1;c.supporting.push({key:'differential.partialPattern',concepts:present,evidenceIds:unique(present.flatMap(k=>normalized.provenance[k]))});}
 }
 for(const [id,key]of [['mood','screen.mood'],['gad','screen.anxiety']])if(context[key]===true)candidate(id).supporting.push({key:'differential.screenerContext',concepts:[key],evidenceIds:normalized.provenance[key]});
 for(const c of candidates){
  const prefix=c.domain;for(const k of [prefix+'.medical',prefix+'.substance',...(prefix==='mood'?['mood.stressor']:[])])if(f[k]!==false)c.unresolvedRuleOuts.push(k);
  const req=D.directions[c.id].required;for(const k of req.filter(k=>f[k]===false))c.opposing.push({key:'differential.negativeEvidence',concepts:[k],evidenceIds:normalized.provenance[k]});
  if(c.opposing.length&&c.level>1)c.level=1;
  if((c.missingEvidence.length||c.unresolvedRuleOuts.length)&&c.level===3)c.level=2;
  if(result.contradictions.some(x=>x.concept.startsWith(prefix+'.'))&&c.level>1)c.level=1;
  c.consistency=['insufficient','weak','supported','strong'][c.level];
 }
 // Stable order is presentation only; ties are retained as simultaneous primary directions.
 candidates.sort((a,b)=>b.level-a.level);result.candidates=candidates;
 const supported=candidates.filter(c=>c.level>=2),best=supported[0]?.level;
 result.primaryDirections=supported.filter(c=>c.level===best).map(c=>c.id);result.secondaryDirections=supported.filter(c=>c.level!==best).map(c=>c.id);
 result.alternatives=candidates.filter(c=>(c.level<2)&&(c.supporting.length||c.opposing.length)).map(c=>c.id);
 if(candidate('ocd').level>=2&&(candidate('mood').level>=1||f['mood.contextSymptoms']===true))result.possibleCooccurringPatterns.push({directions:['ocd','mood'],key:'differential.ocdMoodCoexist'});
 if(candidate('ocd').level>=2&&candidate('gad').level>=2)result.possibleCooccurringPatterns.push({directions:['ocd','gad'],key:'differential.ocdGadCoexist'});
 if(candidate('mood').level>=2&&candidate('gad').level>=2)result.possibleCooccurringPatterns.push({directions:['mood','gad'],key:'differential.moodAnxietyCoexist'});
 if(safe.intrusiveInterpretation.harm)result.reasoning.discriminatingFeatures.push({key:'differential.harmBoundary',concepts:[],evidenceIds:[]});
 if(safe.intrusiveInterpretation.self)result.reasoning.discriminatingFeatures.push({key:'differential.selfBoundary',concepts:[],evidenceIds:[]});
 result.unsupportedDomainFlags=Object.keys(context).filter(k=>k.startsWith('unsupported.')&&context[k]===true);
 const relevant=candidates.filter(c=>c.level>0||c.supporting.length);result.missingEvidence=unique(relevant.flatMap(c=>c.missingEvidence));result.unresolvedRuleOuts=unique(relevant.flatMap(c=>c.unresolvedRuleOuts));
 if(!relevant.length)result.missingEvidence.push(evidence.some(e=>['mood','anxiety','ocd'].includes(e.sourceModule))?'unresolved_comparison':'completed_assessment');
 if(candidate('ocd').level>0&&candidate('mood').level>0&&f['mood.rumination']==='unknown')result.missingEvidence.push('mood.rumination');
 if(safe.assessmentStatus!=='assessed')result.unresolvedRuleOuts.push('safety_clarification');
 result.reasoning.supporting=relevant.flatMap(c=>c.supporting);result.reasoning.opposing=relevant.flatMap(c=>c.opposing);result.reasoning.discriminatingFeatures.push(...relevant.flatMap(c=>c.discriminatingFeatures));
 result.status=result.contradictions.length?'conflicted':supported.length&&!result.missingEvidence.length&&!result.unresolvedRuleOuts.length&&!result.unsupportedDomainFlags.length?'sufficient':'insufficient';
 return result;
};
})(globalThis.Differential);
