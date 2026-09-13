(function(M){'use strict';
M.emptyState=()=>({intro:{},phq:{},symptoms:{},course:{associated:{}},function:{},mania:{features:{}},medical:{conditions:{}},substance:{exposures:{}},stress:{types:{}},safety:{},revision:0,startedAt:new Date().toISOString(),updatedAt:null});
M.setAnswer=function(state,path,value){const q=M.questions.find(q=>q.id===path);if(!q||!M.validAnswer(q,value))throw new Error('Invalid answer');const s=JSON.parse(JSON.stringify(state));const keys=path.split('.');let o=s;keys.slice(0,-1).forEach(k=>o=o[k]||(o[k]={}));if(value==='')delete o[keys.at(-1)];else o[keys.at(-1)]=value;
// Delete dependent answers when a gate changes. Hidden history never influences results.
if(path==='mania.period'&&value==='no')s.mania={period:'no',...(s.mania.pastMania?{pastMania:s.mania.pastMania}:{})};
if(path==='course.chronic'&&value!=='yes'){delete s.course.years;delete s.course.remission;s.course.associated={};}
if(path==='stress.present'&&value==='no')s.stress={present:'no'};
if(/^symptoms\.[^.]+\.present$/.test(path)&&value!=='yes')s.symptoms[keys[1]]={present:value};
s.revision=(s.revision||0)+1;s.updatedAt=new Date().toISOString();return s;};
M.store={state:M.emptyState(),step:0,maxStep:0,returnStep:null,error:[],result:null,region:'other',revisionReviewed:null};
M.update=function(path,value){M.store.state=M.setAnswer(M.store.state,path,value);M.store.result=null;M.store.revisionReviewed=null;};
M.clear=function(){M.store.state=M.emptyState();M.store.step=0;M.store.maxStep=0;M.store.returnStep=null;M.store.error=[];M.store.result=null;M.store.revisionReviewed=null;};
})(globalThis.Mood=globalThis.Mood||{});
