(function(V,G){'use strict';
const unique=xs=>[...new Set(xs)];
V.evaluate=function(evidence,safetySignals,options={}){
 const safe=G.evaluate(safetySignals,{failed:options.safetyFailed===true||G.paths.some(p=>![true,false,'unknown'].includes(G.get(safetySignals,p)))});
 const result={engineVersion:V.version,reviewStatus:V.reviewStatus,differentialStatus:'insufficient',candidateDirections:[],primaryDirections:[],cooccurringDirections:[],alternatives:[],unsupportedAlternatives:[],missingEvidence:[],unresolvedRuleOuts:[],unresolvedDiscriminators:[],contradictions:[],alreadyCollectedEvidence:[],matchedRules:[],evidenceState:'insufficient',evidenceStateReasons:[],safetyState:{urgency:safe.urgency,assessmentStatus:safe.assessmentStatus,requiresInterruption:safe.requiresInterruption,primaryDomain:safe.primaryDomain,intrusiveInterpretation:safe.intrusiveInterpretation},blocked:false,evidenceGraph:null};
 if(safe.requiresInterruption||safe.assessmentStatus==='unable_to_assess'){result.blocked=true;result.differentialStatus='safety_interrupted';return result;}
 const graph=V.normalize(evidence);result.evidenceGraph=graph;
 if(!graph.valid){result.missingEvidence=['invalid_evidence'];return result;}
 const f=graph.facts;result.contradictions=graph.contradictions;result.alreadyCollectedEvidence=graph.alreadyCollectedEvidence;
 const reason=(rule,concepts)=>({ruleId:rule?.id||null,key:rule?.explanationKey||'differential.partialPattern',concepts,evidenceIds:unique(concepts.flatMap(k=>graph.resolutions.filter(x=>x.concept===k&&['current','longitudinal'].includes(x.bucket)).flatMap(x=>x.selectedEvidenceIds)))});
 const candidates=[...V.domains.values()].flatMap(domain=>domain.directions.map(d=>({id:d.id,domain:domain.id,labelKey:d.label,consistency:'insufficient',role:'unresolved',level:0,supportingEvidence:[],opposingEvidence:[],discriminatingEvidence:[],missingEvidence:d.required.filter(k=>f[k]==='unknown'),unresolvedRuleOuts:domain.ruleOuts.filter(k=>f[k]!==false),provenanceSummary:[]})));
 const rules=[...new Map([...V.domains.values()].flatMap(d=>[...d.supportingRules,...d.opposingRules]).map(r=>[r.id,r])).values()];
 for(const rule of rules){
  if(!Object.entries(rule.all).every(([k,v])=>f[k]===v))continue;
  result.matchedRules.push(rule.id);const why=reason(rule,Object.keys(rule.all));
  for(const effect of rule.effects){const c=candidates.find(c=>c.id===effect.direction);if(!c)continue;if(effect.support){c.level=Math.max(c.level,effect.support);c.supportingEvidence.push(why);c.discriminatingEvidence.push(why);}if(effect.oppose)c.opposingEvidence.push(why);}
 }
 for(const c of candidates){
  const domain=V.domains.get(c.domain),direction=domain.directions.find(d=>d.id===c.id);
  const partialAnchors=({mood:['mood.low','mood.interest','mood.contextSymptoms'],gad:['anxiety.broad','anxiety.excessive'],ocd:['ocd.intrusive','ocd.rituals'],trauma:['trauma.intrusion','trauma.avoidance','trauma.arousal'],adhd:['adhd.current'],psychosis:['psychosis.perception','psychosis.belief','psychosis.disorganization','psychosis.negative'],eating_restrictive:['eating.restriction'],eating_arfid:['eating.restriction'],eating_bulimia:['eating.binge'],eating_bed:['eating.binge']})[c.id]||[];
  const present=partialAnchors.filter(k=>f[k]===true);
  if(!c.level&&present.length){c.level=1;c.supportingEvidence.push(reason(null,present));}
  // Context-only extraction and screeners stay explicitly weak, even in aggregate.
  const weak=partialAnchors.filter(k=>graph.contextFacts[k]===true&&f[k]==='unknown');
  if(!c.level&&weak.length){c.level=1;c.supportingEvidence.push({...reason(null,weak),key:'differential.screenerContext'});}
  for(const concept of direction.required.filter(k=>f[k]===false))c.opposingEvidence.push({...reason(null,[concept]),key:'differential.negativeEvidence'});
  // A contextual relationship can leave a direction supported, rather than erase it.
  const opposition=c.opposingEvidence.some(r=>r.concepts.some(k=>!['psychosis.independent','psychosis.mood','psychosis.bipolar'].includes(k)));
  if(opposition)c.level=Math.min(c.level,1);
  if(c.level===3&&(c.missingEvidence.length||c.unresolvedRuleOuts.length))c.level=2;
  const conflict=graph.contradictions.some(x=>!x.resolved&&x.concept.startsWith(c.domain+'.'));
  if(conflict)c.level=Math.min(c.level,1);
  c.consistency=['insufficient','weak','supported','strong'][c.level];
  c.provenanceSummary=unique([...c.supportingEvidence,...c.opposingEvidence].flatMap(r=>r.evidenceIds)).map(id=>{const n=graph.nodes.find(n=>n.id===id);return {id,concept:n.concept,source:n.source,sourceType:n.sourceType,temporality:n.temporality,quality:n.quality,questionIds:[...n.provenance.questionIds]};});
 }
 candidates.sort((a,b)=>b.level-a.level);
 const relevant=candidates.filter(c=>c.level>0),supported=relevant.filter(c=>c.level>=2),best=supported[0]?.level;
 result.primaryDirections=supported.filter(c=>c.level===best).map(c=>c.id);result.cooccurringDirections=supported.filter(c=>c.level!==best).map(c=>c.id);
 result.possibleCooccurringPatterns=[];
 for(let i=0;i<supported.length;i++)for(let j=i+1;j<supported.length;j++)if(V.domains.get(supported[i].domain).cooccurrenceRules.includes(supported[j].domain))result.possibleCooccurringPatterns.push({directions:[supported[i].id,supported[j].id],reviewStatus:V.reviewStatus});
 result.alternatives=relevant.filter(c=>(c.level<2)).map(c=>c.id);
 for(const c of candidates)c.role=result.primaryDirections.includes(c.id)?'primary':result.cooccurringDirections.includes(c.id)?'cooccurring':c.level?'alternative':'unresolved';
 result.candidateDirections=candidates;
 result.missingEvidence=unique(relevant.flatMap(c=>c.missingEvidence));result.unresolvedRuleOuts=unique(relevant.flatMap(c=>c.unresolvedRuleOuts));
 result.unsupportedAlternatives=Object.keys(f).filter(k=>k.startsWith('unsupported.')&&graph.contextFacts[k]===true);
 const active=new Set(relevant.map(c=>c.domain));
 for(const spec of V.discriminatorRegistry){
  const applicable=spec.whenAny?spec.whenAny.some(k=>f[k]===true):spec.domainsCompared.every(d=>active.has(d));
  if(!applicable||f[spec.conceptNeeded]!=='unknown'||result.unresolvedDiscriminators.some(d=>d.conceptNeeded===spec.conceptNeeded))continue;
  const rows=graph.nodes.filter(n=>n.concept===spec.conceptNeeded),conflict=graph.contradictions.some(x=>x.concept===spec.conceptNeeded&&!x.resolved);
  const alreadyAsked=rows.some(n=>V.sources[n.sourceType]>=3),competing=spec.domainsCompared.length>1;
  result.unresolvedDiscriminators.push({...spec,priority:conflict?1:(competing?2:3)+(alreadyAsked?1:0),priorityFactors:[...(conflict?['unresolved_conflict']:[]),...(competing?['competing_domains']:[]),...(alreadyAsked?['already_asked']:[])],alreadyAsked,evidenceIds:rows.map(n=>n.id)});
 }
 result.unresolvedDiscriminators.sort((a,b)=>a.priority-b.priority||a.id.localeCompare(b.id));
 if(!relevant.length)result.missingEvidence.push('completed_assessment');
 if(safe.assessmentStatus!=='assessed')result.unresolvedRuleOuts.push('safety_clarification');
 const unresolvedConflict=graph.contradictions.some(x=>!x.resolved);
 const pending=result.missingEvidence.length||result.unresolvedRuleOuts.length||result.unresolvedDiscriminators.length||result.unsupportedAlternatives.length;
 result.differentialStatus=unresolvedConflict?'conflicted':supported.length?pending?'partially_sufficient':'sufficient':'insufficient';
 result.evidenceState=result.differentialStatus==='sufficient'?'reasonably_saturated':supported.length||unresolvedConflict?'still_discriminating':'insufficient';
 result.evidenceStateReasons=result.evidenceState==='reasonably_saturated'?['registered_critical_evidence_available','registered_ruleouts_addressed','no_unresolved_discriminators']:[...(result.missingEvidence.length?['missing']:[]),...(result.unresolvedRuleOuts.length?['ruleouts']:[]),...(result.unresolvedDiscriminators.length?['discriminators']:[]),...(unresolvedConflict?['conflicts']:[]),...(result.unsupportedAlternatives.length?['unsupported']:[])];
 graph.relationships=candidates.flatMap(c=>[['supporting',c.supportingEvidence],['opposing',c.opposingEvidence]].flatMap(([kind,reasons])=>reasons.map(reason=>({kind,direction:c.id,domain:c.domain,concepts:reason.concepts,evidenceIds:reason.evidenceIds,ruleId:reason.ruleId}))));
 return result;
};
V.adaptiveContract=r=>JSON.parse(JSON.stringify({version:V.version,engineVersion:r.engineVersion,differentialStatus:r.differentialStatus,candidateDirections:r.candidateDirections,supportingEvidence:r.candidateDirections.flatMap(c=>c.supportingEvidence),opposingEvidence:r.candidateDirections.flatMap(c=>c.opposingEvidence),missingEvidence:r.missingEvidence,unresolvedRuleOuts:r.unresolvedRuleOuts,unresolvedDiscriminators:r.unresolvedDiscriminators,contradictions:r.contradictions,alreadyCollectedEvidence:r.alreadyCollectedEvidence,safetyState:r.safetyState,evidenceState:r.evidenceState,evidenceStateReasons:r.evidenceStateReasons}));
})(globalThis.DifferentialV2,globalThis.GlobalSafety);
