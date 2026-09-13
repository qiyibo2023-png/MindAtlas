(function(O){'use strict';
O.get=Assessment.get; O.emptyState=()=>({intro:{},screen:{},obsessions:{},themes:{},visible:{},mental:{},avoid:{},cycle:{},control:{},impact:{},insight:{},psychosis:{},diff:{},medical:{},substance:{},context:{},harm:{},safety:{},revision:0,startedAt:new Date().toISOString(),updatedAt:null});
O.plan=()=>O.sections; O.missing=s=>O.sections.filter(x=>!['review','results'].includes(x.id)).flatMap(x=>Assessment.missing(x.questions,s));
O.setAnswer=(s,path,value)=>{const q=O.questions.find(x=>x.id===path);if(!q||!Assessment.validAnswer(q,value))throw Error('Invalid OCD answer');return Assessment.set(s,path,value);};
O.store={state:O.emptyState(),step:'intro',visited:['intro'],error:[],result:null,returnStep:null};
O.update=(p,v)=>{O.store.state=O.setAnswer(O.store.state,p,v);O.store.result=null;}; O.clear=()=>O.store={state:O.emptyState(),step:'intro',visited:['intro'],error:[],result:null,returnStep:null};
O.answerText=(q,s,l)=>q.options.find(x=>x[0]===O.get(s,q.id))?.[l+1]||[...I18n.pair("platform.m_8761c0d9409d")][l];
})(globalThis.OCD=globalThis.OCD||{});
