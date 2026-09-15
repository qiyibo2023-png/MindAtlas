(function(P){'use strict';
const names=['Mood','Anxiety','OCD','Trauma','ADHD','Eating','Psychosis','GlobalSafety','SymptomRouter','Differential','DifferentialV2','Adaptive'];
const clone=x=>JSON.parse(JSON.stringify(x));
const defaults=Object.fromEntries(names.map(name=>[name,clone(globalThis[name].store)]));
P.deletionState={status:'not_requested'};
P.deleteData=function(request){
 if(!request||request.scope!=='current_session'||request.purpose!=='user_requested_deletion'||request.subject!=='current_browser_session'||request.storageTarget!=='memory')return {deleted:false,reason:'unsupported_scope'};
 try{for(const name of names)globalThis[name].store=clone(defaults[name]);P.consentState=P.emptyConsent();P.deletionState={status:'cleared',scope:'current_session'};return {deleted:true,scope:'current_session',downloadedFilesDeleted:false};}
 catch{P.deletionState={status:'failed'};return {deleted:false,reason:'local_clear_failed'};}
};
P.allowCurrentExport=function(action){try{if(!['export','download','print'].includes(action))return false;const preview=document.getElementById('summary-text')||document.getElementById('a-summary-text');return P.canExport({userInitiated:true,purpose:'user_requested_export',previewAvailable:typeof preview?.value==='string'&&preview.value.length>0,warningShown:!!document.getElementById('privacy-export-warning'),target:action==='print'?'print':'download',categories:['clinicianSummary','safetySignals']});}catch{return false;}};
})(PrivacyGovernance);
