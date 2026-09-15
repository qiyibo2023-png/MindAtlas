(function(P,G){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const keys=(x,allowed)=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).every(k=>allowed.includes(k));
P.validValue=(field,value)=>field==='assessment'?keys(value,['domain','version','revision','summary','outcomes'])&&Object.hasOwn(P.domains,value.domain)&&value.version===globalThis[P.domains[value.domain]].version&&Number.isInteger(value.revision)&&value.revision>=0&&value.summary==='assessment_review'&&Array.isArray(value.outcomes)&&value.outcomes.length<=8&&value.outcomes.every(o=>keys(o,['id','level'])&&P.summaryOptions(value.domain).includes(o.id)&&(['trauma','adhd'].includes(value.domain)?o.level===null:[0,1,2,3].includes(o.level))):P.fields[field]?.values?.includes(value)===true;
P.createStore=function(){const items=new Map();let sequence=0;return Object.freeze({type:'governed_memory',lifetime:'runtime_until_reload',list:()=>clone([...items.values()]),get:id=>items.has(id)?clone(items.get(id)):null,
 save(request){const f=P.fields[request?.fieldId];if(!keys(request,['fieldId','value','temporality','userInitiated','editId'])||!f||!P.validValue(f.id,request.value)||!['current','historical','unknown'].includes(request.temporality)||!G.profileDecision({...request,storageTarget:'memory',dataClass:f.dataClass,purpose:f.purpose}))return {ok:false,reason:'denied'};
 const prior=request.editId&&items.get(request.editId);if(request.editId&&(!prior||prior.fieldId!==f.id||!f.editable))return {ok:false,reason:'denied'};
 const temporality=['assessment','pastPanic','childhoodAttention'].includes(f.id)?'historical':request.temporality;
 const duplicate=[...items.values()].find(i=>i.fieldId===f.id&&JSON.stringify(i.value)===JSON.stringify(request.value)&&i.temporality===temporality&&i.id!==request.editId);if(duplicate)return {ok:true,item:clone(duplicate),duplicate:true};
 const id=prior?.id||'profile-item-'+(++sequence),item={id,fieldId:f.id,value:clone(request.value),sourceType:f.sourceTypes[0],sourceReference:f.id==='assessment'?request.value.domain+':'+request.value.revision:'explicit_profile_confirmation',confirmedByUser:f.id!=='assessment',createdAt:prior?.createdAt||sequence,updatedAt:++sequence,dataClass:f.dataClass,purpose:f.purpose,consentScope:'profileStorage',retention:'runtime_until_reload',version:P.version,temporality};items.set(id,item);return {ok:true,item:clone(item)};},
 delete(id){return items.delete(id);},clear(){items.clear();return {ok:true};}
 });};
P.store=P.createStore();
P.ui={pending:null,editId:null,field:'goal',value:'understand',temporality:'current',message:null,confirmClear:false,exportIds:[],exportPreview:null};
P.preview=function(fieldId,value,temporality='unknown',editId=null){if(!P.validValue(fieldId,value))return false;P.ui.pending={fieldId,value:clone(value),temporality:['assessment','pastPanic','childhoodAttention'].includes(fieldId)?'historical':temporality,editId};P.ui.message=null;return true;};
P.save=function(){if(!P.ui.pending)return {ok:false};const pending=P.ui.pending;if(pending.fieldId==='assessment'){const m=globalThis[P.domains[pending.value.domain]];if(GlobalSafety.current().requiresInterruption||m.store.state.revision!==pending.value.revision||!m.store.result){P.ui.message='profile.denied';return {ok:false};}}const r=P.store.save({...pending,userInitiated:true});if(r.ok){P.ui.pending=null;P.ui.editId=null;P.ui.exportPreview=null;}P.ui.message=r.ok?'profile.saved':'profile.denied';return r;};
P.notNow=()=>{P.ui.pending=null;P.ui.message=null;};
P.exportSelection=function(ids,confirmed=false){if(!Array.isArray(ids))return null;const items=[...new Set(ids)].map(id=>P.store.get(id));if(items.some(i=>!i)||!G.profileExportDecision({items,userInitiated:confirmed,previewAvailable:true,warningShown:true,target:'download'}))return null;return {version:P.version,storageLifetime:P.store.lifetime,items};};
const clearSession=G.deleteData;G.deleteData=function(r){const result=clearSession(r);if(result.deleted){P.dismissed?.clear();P.notNow();P.ui.exportIds=[];P.ui.exportPreview=null;P.ui.confirmClear=false;}return result;};
})(PersonalProfile,PrivacyGovernance);


