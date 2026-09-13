(function(D){'use strict';
const get=(s,path)=>path.split('.').reduce((v,k)=>v?.[k],s);
const threshold=v=>['2','3'].includes(v)?true:['0','1','na'].includes(v)?false:'unknown';
const duration=(v,positive,negative)=>positive.includes(v)?true:negative.includes(v)?false:'unknown';
D.adapt=function(name,store,module){
 const s=store?.state,r=store?.result;
 if(!s||!Number.isInteger(s.revision)||s.revision<0)return {evidence:[],ready:false,invalid:true};
 // Only current generated assessment results enter the comparison. Editing invalidates them.
 if(!r||r.revision!==s.revision||s.revision===0)return {evidence:[],ready:false,invalid:false};
 if(s.intro?.agree!=='yes')return {evidence:[],ready:false,invalid:false};
 const available=module.questions.filter(q=>module!==globalThis.Mood||Mood.visible(q,s));
 if(available.some(q=>get(s,q.id)!==undefined&&!Assessment.validAnswer(q,get(s,q.id))))return {evidence:[],ready:false,invalid:true};
 const evidence=[],push=(concept,value,paths,type='structured_assessment',time='current')=>evidence.push(D.fact(concept,value,name,paths,s.revision,type,time,module.version));
 const yn=(concept,path,type,time)=>push(concept,D.truth(get(s,path)),[path],type,time);
 const group=(concept,paths,type='structured_assessment')=>push(concept,D.any(paths.map(p=>D.truth(get(s,p)))),paths,type);
 if(name==='mood'){
  for(const [id,key]of [['mood','low'],['interest','interest'],['energy','energy'],['worth','worth'],['sleep','sleep']])yn('mood.'+key,'symptoms.'+id+'.present');
  push('mood.duration',duration(s.course?.duration,['14to29','30to179','180plus'],['under14']),['course.duration'],'duration');yn('mood.together','course.together','duration');
  push('mood.impact',D.any([...Mood.functionalDomains.map(row=>row[0]),'distress'].map(f=>threshold(s.function?.[f]))),[...Mood.functionalDomains.map(row=>'function.'+row[0]),'function.distress'],'functional_impairment');
  const maniaPaths=['mania.period','mania.pastMania'];const historyKnown=s.mania?.period==='no'&&s.mania?.pastMania==='no';
  const features=['elevated','irritable','energy','activity','sleep','grandiose','speech','racing','spending','driving','sexual','otherRisk'];
  const activation=s.mania?.pastMania==='yes'?true:s.mania?.period==='no'?false:D.all([D.truth(s.mania?.period),D.any(['elevated','irritable'].map(k=>D.truth(s.mania?.features?.[k]))),D.any(['energy','activity'].map(k=>D.truth(s.mania?.features?.[k]))),D.any(['sleep','grandiose','speech','racing','spending','driving','sexual','otherRisk'].map(k=>D.truth(s.mania?.features?.[k])))]);
  push('mood.activation',activation,[...maniaPaths,...features.map(f=>'mania.features.'+f)],'structured_assessment','history');
  push('mood.bipolarKnown',historyKnown?true:activation===true?false:'unknown',maniaPaths,'exclusion','history');
  push('mood.chronic',D.all([D.truth(s.course?.chronic),duration(s.course?.years,['2plus'],['under1','1to2']),duration(s.course?.remission,['under2'],['over2'])]),['course.chronic','course.years','course.remission'],'duration');
  group('mood.medical',[...Mood.questions.filter(q=>q.id.startsWith('medical.conditions.')).map(q=>q.id),'medical.temporal'],'exclusion');
  push('mood.substance',duration(s.substance?.temporal,['start','stop','dose','increase','reduce'],['none']),['substance.temporal'],'exclusion');yn('mood.stressor','stress.present','exclusion');
  push('screen.mood',r.phq?.complete?r.phq.total>=10:'unknown',Array.from({length:9},(_,i)=>'phq.'+i),'standardized_screener');
 }
 if(name==='anxiety'){
  const gate=s.clusters?.gad;for(const [concept,path]of [['broad','multiple'],['excessive','excessive'],['control','control'],['mostDays','mostDays'],['tension','symptoms.tension']])push('anxiety.'+concept,gate==='no'?false:D.truth(get(s,'gad.'+path)),['clusters.gad','gad.'+path]);
  push('anxiety.duration',gate==='no'?false:duration(s.gad?.duration,['6plus'],['under4w','1to5m']),['clusters.gad','gad.duration'],'duration');
  push('anxiety.impact',gate==='no'?false:threshold(s.gad?.impact),['clusters.gad','gad.impact'],'functional_impairment');
  push('anxiety.panic',s.clusters?.panic==='no'?false:D.all(['abrupt','recurrent','unexpected'].map(k=>D.truth(s.panic?.[k]))),['clusters.panic','panic.abrupt','panic.recurrent','panic.unexpected']);yn('anxiety.panicDuration','panic.month','duration');push('anxiety.panicImpact',threshold(s.panic?.impact),['panic.impact'],'functional_impairment');
  for(const id of ['social','specific','agora','separation']){const d=r.directions?.find(d=>d.id===id);const branchQs=module.sections.find(sec=>sec.id===id).questions;const complete=branchQs.every(q=>get(s,q.id)!==undefined&&get(s,q.id)!=='unknown');push('anxiety.'+id,s.clusters?.[id]==='no'?false:s.clusters?.[id]==='yes'&&d?.pattern===true?true:complete?false:'unknown',['clusters.'+id,...branchQs.map(q=>q.id)]);}
  group('anxiety.medical',[...Anxiety.medicalConditions.map(row=>'medical.conditions.'+row[0]),'medical.temporal'],'exclusion');
  push('anxiety.substance',duration(s.substance?.temporal,['start','change','withdrawal'],['none']),['substance.temporal'],'exclusion');
  for(const [key,id]of [['ptsd','trauma'],['adhd','attention'],['psychosis','psychotic']])yn('unsupported.'+id,'context.'+key);
  push('screen.anxiety',r.screening?.complete&&r.screening.applicable?r.screening.total>=10:'unknown',Array.from({length:7},(_,i)=>'gad7.'+i),'standardized_screener');
 }
 if(name==='ocd'){
  yn('ocd.intrusive','obsessions.present');yn('ocd.ego','obsessions.ego');yn('ocd.response','cycle.response');yn('ocd.relief','cycle.relief');
  group('ocd.rituals',[...OCD.visible.map(row=>'visible.'+row[0]),...OCD.mental.map(row=>'mental.'+row[0])]);
  push('ocd.impact',D.any(['distress','work','relationships','routine','leaving'].map(k=>threshold(s.impact?.[k]))),['impact.distress','impact.work','impact.relationships','impact.routine','impact.leaving'],'functional_impairment');
  push('ocd.timeKnown',['under30','30to60','1to3','over3'].includes(s.impact?.time)?true:'unknown',['impact.time'],'duration');
  yn('anxiety.broad','diff.gad');yn('mood.contextSymptoms','diff.depression');yn('ocd.medical','medical.sudden','exclusion');yn('ocd.substance','substance.temporal','exclusion');
  yn('unsupported.trauma','obsessions.trauma');group('unsupported.psychotic',['psychosis.fixed','psychosis.reality']);yn('unsupported.attention','diff.autism');group('unsupported.other',['diff.bdd','diff.hoard','diff.hair','diff.skin','diff.ocpd','diff.tic']);
 }
 return {evidence,ready:true,invalid:evidence.some(e=>!D.validEvidence(e))};
};
D.adaptRouter=function(profile){if(!globalThis.SymptomRouter?.validate(profile))return [];const mappings={'ocd.intrusiveThoughts':'ocd.intrusive','ocd.egoDystonic':'ocd.ego','mood.depressedMood':'mood.low','mood.anhedonia':'mood.interest','mood.lowEnergy':'mood.energy','mood.guiltWorthlessness':'mood.worth','anxiety.excessiveWorry':'anxiety.excessive','unsupported.trauma':'unsupported.trauma','unsupported.attention':'unsupported.attention','unsupported.eating':'unsupported.eating','unsupported.psychotic':'unsupported.psychotic'};return Object.entries(mappings).map(([path,concept])=>D.fact(concept,SymptomRouter.get(profile,path),'router',[path],0,'free_text_extraction','current',SymptomRouter.version));};
})(globalThis.Differential);
