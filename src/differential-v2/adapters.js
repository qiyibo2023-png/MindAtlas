(function(V,D,R){'use strict';
const mappings={'mood.depressedMood':'mood.low','mood.anhedonia':'mood.interest','mood.lowEnergy':'mood.energy','mood.guiltWorthlessness':'mood.worth','mood.sleepChange':'mood.sleep','mood.moodCongruentRumination':'mood.rumination','anxiety.excessiveWorry':'anxiety.excessive','anxiety.difficultToControlWorry':'anxiety.control','anxiety.physicalTension':'anxiety.tension','ocd.intrusiveThoughts':'ocd.intrusive','ocd.egoDystonic':'ocd.ego','ocd.intrusionCompulsionLink':'ocd.response','trauma.exposure':'trauma.exposure','trauma.reliving':'trauma.intrusion','trauma.avoidance':'trauma.avoidance','trauma.alertness':'trauma.arousal','trauma.negativeMood':'trauma.negative','adhd.developmental':'adhd.developmental','adhd.crossSetting':'adhd.crossSetting','eating.restriction':'eating.restriction','eating.weightFear':'eating.fear','eating.loss':'eating.loss','psychosis.perception':'psychosis.perception','psychosis.disorganization':'psychosis.disorganization','psychosis.negativeFeatures':'psychosis.negative'};
// A panic-like sensation is not mapped to recurrent, unexpected panic attacks.
Object.assign(mappings,{'mood.concentrationDifficulty':'mood.concentration','general.attention':'mood.concentration'});
// Individual ritual denials likewise cannot stand in for absence of all rituals.
V.adaptRouter=function(profile){
 if(profile===undefined||profile===null)return {evidence:[],ready:false,invalid:false};
 if(!R.validate(profile))return {evidence:[],ready:false,invalid:true};
 const evidence=[];
 for(const row of profile.evidence){
  const concept=mappings[row.path]||(Object.hasOwn(V.concepts,row.path)?row.path:null);if(!concept)continue;
  evidence.push(V.node(concept,row.value,{id:'router:'+row.id,source:'router',sourceType:row.source==='clarification'?'user_clarification':'free_text_extraction',temporality:({current:'current',recent:'current',historical:'history',hypothetical:'hypothetical',unclear:'unknown'})[row.context.temporality],subject:row.context.subject==='unclear'?'unknown':row.context.subject,certainty:row.context.certainty,quotationStatus:row.context.quotationStatus,questionIds:[row.path],engineVersion:R.version}));
 }
 return {evidence,ready:true,invalid:false};
};
V.adaptAssessment=function(name,store,module){
 let old;try{old=D.adapt(name,store,module);}catch{return {evidence:[],ready:false,invalid:true};}
 if(!old.ready||old.invalid)return {...old,evidence:[]};
 if(!old.evidence.every(D.validEvidence))return {evidence:[],ready:false,invalid:true};
 const state=store.state,evidence=old.evidence.map(V.fromLegacy).filter(n=>!(name==='ocd'&&n.concept==='unsupported.attention'));
 const add=(concept,value,paths,sourceType='structured_assessment')=>evidence.push(V.node(concept,value,{source:name,questionIds:paths,sourceType,revision:state.revision,engineVersion:module.version}));
 if(name==='mood')add('mood.concentration',D.truth(state.symptoms?.focus?.present),['symptoms.focus.present']);
 if(name==='ocd')add('ocd.traumaMemory',D.truth(state.obsessions?.trauma),['obsessions.trauma']);
 if(name==='ocd')add('unsupported.autism',D.truth(state.diff?.autism),['diff.autism']);
 if(name==='trauma')add('trauma.dissociation',D.any([D.truth(state.dissociation?.self),D.truth(state.dissociation?.world)]),['dissociation.self','dissociation.world']);
 if(name==='psychosis'){
  const present=module.modalities.filter(k=>state.perception?.[k]==='yes'&&state[k]?.time==='current');
  add('psychosis.awake',D.any(present.map(k=>D.truth(state[k]?.awake))),present.map(k=>k+'.awake'));
  add('psychosis.medication',D.truth(state.substance?.medication),['substance.medication'],'exclusion');
  add('psychosis.sudden',state.course?.onset==='sudden'?true:['gradual','stable'].includes(state.course?.onset)?false:'unknown',['course.onset'],'exclusion');
 }
 if(name==='eating'){add('eating.gi',D.truth(state.medical?.gi),['medical.gi'],'exclusion');add('eating.medication',D.truth(state.substance?.medication),['substance.medication'],'exclusion');}
 for(const contract of V.observationContracts.filter(o=>o.domain===name)){
  const value=contract.questionId.split('.').reduce((v,k)=>v?.[k],state);
  if(value!==undefined){add(contract.concept,value,[contract.questionId],contract.kind);if(['decline','prefer','remember'].includes(value))evidence[evidence.length-1].certainty='unknown';}
 }
 for(const node of evidence){
  if(node.concept==='trauma.exposure')node.temporality='history';
  if(['adhd.developmental','adhd.onset'].includes(node.concept)){node.sourceType='developmental_history';node.quality=V.quality(node.sourceType);}
  if(name==='psychosis'&&state.course?.time==='history'&&!['psychosis.current','psychosis.medical','psychosis.substance','psychosis.sleep','psychosis.culture','psychosis.grief'].includes(node.concept))node.temporality='history';
 }
 return {evidence,ready:true,invalid:evidence.some(n=>!V.validNode(n))};
};
V.collect=function(){
 const evidence=[],availability={},safety=GlobalSafety.current();let invalid=false;
 for(const [name,module]of Object.entries(D.modules())){
  const adapted=V.adaptAssessment(name,module.store,module);availability[name]=adapted.ready;
  if(D.store.selected[name]){evidence.push(...adapted.evidence);invalid ||= adapted.invalid;}
 }
 if(D.store.selected.router){const adapted=V.adaptRouter(globalThis.SymptomRouter?.store.v2?.profile);invalid ||= adapted.invalid;evidence.push(...adapted.evidence.filter(n=>n.domain==='unsupported'||D.store.selected[n.domain]));}
 for(const [key,concept]of [['rumination','mood.rumination'],['onlyObsessions','anxiety.onlyObsessions']])if(D.store.selected[concept.split('.')[0]]&&D.store.clarifications[key]!=='unknown')evidence.push(V.node(concept,D.store.clarifications[key],{source:'clarification',sourceType:'user_clarification',questionIds:[key],revision:D.store.clarificationRevision}));
 return {evidence,availability,invalid,safety};
};
})(globalThis.DifferentialV2,globalThis.Differential,globalThis.RouterV2);
