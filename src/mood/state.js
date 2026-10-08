(function(M){'use strict';
M.emptyState=()=>({intro:{},phq:{},symptoms:{},course:{associated:{}},function:{},mania:{features:{}},medical:{conditions:{}},substance:{exposures:{}},stress:{types:{}},safety:{},revision:0,startedAt:new Date().toISOString(),updatedAt:null});
M.setAnswer=function(state,path,value){const q=M.questions.find(q=>q.id===path);if(!q||(value!==''&&!M.validAnswer(q,value)))throw new Error('Invalid answer');const s=JSON.parse(JSON.stringify(state));const keys=path.split('.');let o=s;keys.slice(0,-1).forEach(k=>o=o[k]||(o[k]={}));if(value==='')delete o[keys.at(-1)];else o[keys.at(-1)]=value;
// Delete dependent answers when a gate changes. Hidden history never influences results.
if(path==='mania.period'&&value!=='yes')s.mania={...(value?{period:value}:{}),...(s.mania.pastMania?{pastMania:s.mania.pastMania}:{})};
if(path==='course.chronic'&&value!=='yes'){delete s.course.years;delete s.course.remission;s.course.associated={};}
if(path==='substance.screen'&&value!=='yes')s.substance=value?{screen:value}:{exposures:{}};
if(path==='stress.present'&&value!=='yes')s.stress=value?{present:value}:{types:{}};
if(path==='medical.screen'&&value!=='yes')s.medical=value?{screen:value}:{conditions:{}};
if(['substance.medication','substance.other'].includes(path)&&value!=='yes'){const med=['start','stop','dose','steroid','stimulant','sedative'];for(const key of Object.keys(s.substance.exposures||{}))if(med.includes(key)===(path==='substance.medication'))delete s.substance.exposures[key];delete s.substance.temporal;delete s.substance.before;}
if(/^symptoms\.[^.]+\.present$/.test(path)&&value!=='yes')s.symptoms[keys[1]]={present:value};
s.revision=(s.revision||0)+1;s.updatedAt=new Date().toISOString();return s;};

M.seedSymptomsFromPHQ=function(){const map=M.phqDomainMap,freq={1:'some',2:'most',3:'daily'};let s=M.store.state;for(let i=0;i<9;i++){const v=s.phq?.[i];if(!['0','1','2','3'].includes(String(v)))continue;const id=map[i],present=Number(v)>0?'yes':'no';if(s.symptoms?.[id]?.present!==present)s=M.setAnswer(s,'symptoms.'+id+'.present',present);if(present==='yes'&&s.symptoms?.[id]?.frequency!==freq[Number(v)])s=M.setAnswer(s,'symptoms.'+id+'.frequency',freq[Number(v)]);}M.store.state=s;M.store.result=null;};
M.store={state:M.emptyState(),step:0,maxStep:0,returnStep:null,error:[],result:null,region:'other',revisionReviewed:null};
M.update=function(path,value){M.store.state=M.setAnswer(M.store.state,path,value);if(/^phq\.[0-8]$/.test(path)){const id=M.phqDomainMap[Number(path.split('.')[1])];delete M.store.state.symptoms[id];M.seedSymptomsFromPHQ();}M.store.result=null;M.store.revisionReviewed=null;};
M.clear=function(){M.store.state=M.emptyState();M.store.step=0;M.store.maxStep=0;M.store.returnStep=null;M.store.error=[];M.store.result=null;M.store.revisionReviewed=null;};
})(globalThis.Mood=globalThis.Mood||{});
