(function(V,D){'use strict';
V.version='cross-disorder-differential-v2.0.0';
V.reviewStatus='unreviewed';
V.domainIds=['mood','anxiety','ocd','trauma','adhd','eating','psychosis'];
V.concepts={...D.concepts};
V.sources={free_text_extraction:1,standardized_screener:2,structured_assessment:3,functional_impairment:3,duration:3,exclusion:3,developmental_history:3,user_clarification:4,safety_clarification:5};
V.contextConcepts=new Set(['trauma.exposure','adhd.developmental','adhd.onset','mood.activation','mood.bipolarKnown']);
V.quality=source=>V.sources[source]>=3?'direct':source==='standardized_screener'?'screening':'context';
const identifier=x=>typeof x==='string'&&/^[a-z0-9_.:-]{1,160}$/i.test(x);
const exact=(o,keys)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===keys.length&&keys.every(k=>Object.hasOwn(o,k));
V.node=function(concept,value,options={}){
 const source=options.source||concept.split('.')[0],sourceType=options.sourceType||'structured_assessment';
 return {id:options.id||source+':'+concept,concept,domain:concept.split('.')[0],value,certainty:value==='unknown'?'unknown':options.certainty||'reported',temporality:options.temporality||'current',subject:options.subject||'self',source,sourceType,provenance:{questionIds:options.questionIds||[concept],revision:options.revision||0,engineVersion:options.engineVersion||V.version,quotationStatus:options.quotationStatus||'direct_self_report'},quality:V.quality(sourceType),timestampOrSequence:options.revision||0,conflictsWith:[]};
};
V.validNode=n=>!!exact(n,['id','concept','domain','value','certainty','temporality','subject','source','sourceType','provenance','quality','timestampOrSequence','conflictsWith'])&&identifier(n.id)&&Object.hasOwn(V.concepts,n.concept)&&n.domain===n.concept.split('.')[0]&&[true,false,'unknown',...(V.valueOptions?.[n.concept]||[])].includes(n.value)&&['reported','uncertain','unknown'].includes(n.certainty)&&(n.value!=='unknown'||n.certainty==='unknown')&&['current','history','episodic','hypothetical','unknown'].includes(n.temporality)&&['self','other','unknown'].includes(n.subject)&&[...V.domainIds,'router','clarification','safety'].includes(n.source)&&Object.hasOwn(V.sources,n.sourceType)&&n.quality===V.quality(n.sourceType)&&Number.isSafeInteger(n.timestampOrSequence)&&n.timestampOrSequence>=0&&exact(n.provenance,['questionIds','revision','engineVersion','quotationStatus'])&&Array.isArray(n.provenance.questionIds)&&n.provenance.questionIds.length<=100&&n.provenance.questionIds.every(identifier)&&Number.isSafeInteger(n.provenance.revision)&&n.provenance.revision>=0&&identifier(n.provenance.engineVersion)&&['direct_self_report','quoted_speech','reported_speech','clinician_question','unclear'].includes(n.provenance.quotationStatus)&&Array.isArray(n.conflictsWith)&&n.conflictsWith.length===0;
V.fromLegacy=e=>V.node(e.concept,e.value,{id:e.id,source:e.sourceModule,sourceType:e.sourceType,temporality:e.temporality,questionIds:[...e.provenance.questionIds],revision:e.provenance.revision,engineVersion:e.provenance.engineVersion});
})(globalThis.DifferentialV2={},globalThis.Differential);
