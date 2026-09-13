(function(D){'use strict';
D.normalize=function(evidence){
 if(!Array.isArray(evidence)||evidence.length>500||evidence.some(e=>!D.validEvidence(e))||new Set(evidence.map(e=>e.id)).size!==evidence.length)return {valid:false,facts:{},contextFacts:{},contradictions:[],provenance:{}};
 const facts={},contextFacts={},contradictions=[],provenance={};
 for(const concept of Object.keys(D.concepts)){
  const rows=evidence.filter(e=>e.concept===concept),known=rows.filter(e=>e.value!=='unknown');
  const strong=known.filter(e=>D.sourceRanks[e.sourceType]>=3),pool=strong.length?strong:known;
  const rank=pool.length?Math.max(...pool.map(e=>D.sourceRanks[e.sourceType])):0,top=pool.filter(e=>D.sourceRanks[e.sourceType]===rank);
  const values=[...new Set(top.map(e=>e.value))],chosen=values.length===1?values[0]:'unknown';
  facts[concept]=strong.length?chosen:'unknown';contextFacts[concept]=chosen;provenance[concept]=rows.map(e=>e.id);
  if(new Set(known.map(e=>e.value)).size>1)contradictions.push({concept,evidenceIds:known.map(e=>e.id),selectedEvidenceIds:top.map(e=>e.id),selectedValue:chosen,policy:strong.length&&values.length===1?'higher_quality_preferred_requires_review':'unresolved'});
 }
 return {valid:true,facts,contextFacts,contradictions,provenance};
};
})(globalThis.Differential);
