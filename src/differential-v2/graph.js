(function(V){'use strict';
const unique=xs=>[...new Set(xs)];
// Historical observations only inform explicitly registered longitudinal concepts.
// Other historical observations stay in the graph, never becoming current symptoms.
V.normalize=function(input){
 const graph={valid:false,nodes:[],facts:{},contextFacts:{},historicalFacts:{},episodicFacts:{},provenance:{},contradictions:[],resolutions:[],alreadyCollectedEvidence:[],excludedEvidence:[]};
 if(!Array.isArray(input)||input.length>1000||!input.every(V.validNode)||new Set(input.map(n=>n.id)).size!==input.length)return graph;
 graph.valid=true;graph.nodes=input.map(n=>({...n,provenance:{...n.provenance,questionIds:[...n.provenance.questionIds]},conflictsWith:[]}));
 const eligible=n=>n.subject==='self'&&n.provenance.quotationStatus==='direct_self_report'&&n.certainty==='reported'&&n.value!=='unknown'&&!['hypothetical','unknown'].includes(n.temporality);
 graph.excludedEvidence=graph.nodes.filter(n=>!eligible(n)).map(n=>({id:n.id,reason:n.subject!=='self'?'subject':n.provenance.quotationStatus!=='direct_self_report'?'quotation':n.value==='unknown'?'unknown':n.certainty!=='reported'?'certainty':'temporality'}));
 const select=(rows,concept,bucket)=>{
  if(!rows.length)return {value:'unknown',selected:[],reliable:false};
  const priority=Math.max(...rows.map(n=>V.sources[n.sourceType])),top=rows.filter(n=>V.sources[n.sourceType]===priority),values=unique(top.map(n=>n.value));
  const value=values.length===1?values[0]:'unknown';
  // Revisions are provenance, not automatic permission to erase an independent answer.
  const resolved=value!=='unknown',selection={concept,bucket,value,selectedEvidenceIds:top.map(n=>n.id),policy:resolved?'highest_source_priority':'unresolved_equal_priority'};
  graph.resolutions.push(selection);
  if(unique(rows.map(n=>n.value)).length>1){
   for(const row of rows)row.conflictsWith=unique([...row.conflictsWith,...rows.filter(other=>other.value!==row.value).map(other=>other.id)]);
   graph.contradictions.push({concept,bucket,evidenceIds:rows.map(n=>n.id),selectedEvidenceIds:resolved?top.map(n=>n.id):[],selectedValue:value,resolved,policy:selection.policy});
  }
  return {value,selected:top,reliable:resolved&&priority>=3};
 };
 for(const concept of Object.keys(V.concepts)){
  const all=graph.nodes.filter(n=>n.concept===concept),rows=all.filter(eligible),current=rows.filter(n=>n.temporality==='current'),history=rows.filter(n=>n.temporality==='history'),episodic=rows.filter(n=>n.temporality==='episodic');
  graph.provenance[concept]=all.map(n=>n.id);
  const historySelection=select(history,concept,'history'),episodeSelection=select(episodic,concept,'episodic');
  graph.historicalFacts[concept]=historySelection.value;graph.episodicFacts[concept]=episodeSelection.value;
  const selection=select(V.contextConcepts.has(concept)?rows:current,concept,V.contextConcepts.has(concept)?'longitudinal':'current');
  graph.contextFacts[concept]=selection.value;
  graph.facts[concept]=selection.reliable?selection.value:'unknown';
  if(selection.reliable)graph.alreadyCollectedEvidence.push({concept,value:selection.value,evidenceIds:selection.selected.map(n=>n.id),temporality:unique(selection.selected.map(n=>n.temporality)),sourceTypes:unique(selection.selected.map(n=>n.sourceType))});
 }
 for(const rule of V.contradictionRules||[])if(Object.entries(rule.all).every(([k,v])=>graph.facts[k]===v)){
  const ids=unique(Object.keys(rule.all).flatMap(k=>graph.resolutions.filter(r=>r.concept===k&&['current','longitudinal'].includes(r.bucket)).flatMap(r=>r.selectedEvidenceIds)));
  graph.contradictions.push({concept:rule.concept,bucket:'relationship',ruleId:rule.id,contributingConcepts:Object.keys(rule.all),evidenceIds:ids,selectedEvidenceIds:[],selectedValue:'unknown',resolved:false,policy:'unresolved_relationship'});
  graph.facts[rule.concept]='unknown';graph.alreadyCollectedEvidence=graph.alreadyCollectedEvidence.filter(e=>e.concept!==rule.concept);
 }
 return graph;
};
})(globalThis.DifferentialV2);
