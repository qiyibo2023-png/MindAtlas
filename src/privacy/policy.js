// Governance is separate from clinical reasoning. No persistence adapter is enabled.
(function(P){'use strict';
P.version='privacy-data-governance-v1.0.0';
const freeze=o=>{Object.values(o).forEach(v=>{if(v&&typeof v==='object')freeze(v);});return Object.freeze(o);};
P.classes=freeze(['PUBLIC','OPERATIONAL','SENSITIVE','HIGHLY_SENSITIVE_HEALTH','SAFETY_CRITICAL']);
P.consentPurposes=freeze(['profileStorage','longitudinalTracking','clinicianExport','optionalAnalytics','research','modelTraining','marketing']);
P.emptyConsent=()=>Object.fromEntries(P.consentPurposes.map(p=>[p,'not_asked']));
P.consentState=P.emptyConsent();
P.setConsent=(purpose,state)=>{if(!P.consentPurposes.includes(purpose)||!['granted','denied','withdrawn'].includes(state))return false;P.consentState[purpose]=state;return true;};
const rows=[
 ['education','PUBLIC',['topics','sources'],'static editorial content','education','src/data.js and i18n catalog','static',false,true],
 ['capabilities','PUBLIC',['TopicCapabilities.topics'],'product registry','technical_operation','src/capabilities/registry.js','static',false,true],
 ['uiLabels','PUBLIC',['I18n catalog'],'static catalog','technical_operation','src/i18n/catalog.js','static',false,true],
 ['appVersion','OPERATIONAL',['engine.version'],'static release metadata','technical_operation','engine constants','static',false,true],
 ['preferences','SENSITIVE',['lang','region','category'],'user choices','current_session','application and module stores','session',true,false],
 ['rawText','HIGHLY_SENSITIVE_HEALTH',['global-description','adaptive safety textarea'],'user input','current_assessment','DOM draft and temporary extraction arguments','ephemeral',true,false],
 ['assessmentAnswers','HIGHLY_SENSITIVE_HEALTH',['Mood.store.state','Anxiety.store.state','OCD.store.state','Trauma.store.state','ADHD.store.state','Eating.store.state','Psychosis.store.state'],'structured answers','current_assessment','seven module stores','session',true,true],
 ['traumaEvidence','HIGHLY_SENSITIVE_HEALTH',['trauma.exposure','trauma.intrusion'],'structured trauma assessment','current_assessment','Trauma store and derived evidence','session',true,true],
 ['psychosisEvidence','HIGHLY_SENSITIVE_HEALTH',['psychosis.perception','psychosis.insight'],'structured psychosis assessment','current_assessment','Psychosis store and derived evidence','session',true,true],
 ['routerEvidence','HIGHLY_SENSITIVE_HEALTH',['SymptomRouter.store.profile','SymptomRouter.store.v2','EntryFlow.store'],'local extraction and clarification','current_assessment','SymptomRouter store','session',true,true],
 ['differentialEvidence','HIGHLY_SENSITIVE_HEALTH',['Differential.store','DifferentialV2.store'],'assessment and Router adapters','current_assessment','comparison stores and cached fingerprints','session',true,true],
 ['adaptiveEvidence','HIGHLY_SENSITIVE_HEALTH',['Adaptive.store.session','Adaptive.store.retainedEvidence'],'clarification answers','current_assessment','Adaptive store','session',true,true],
 ['assessmentResults','HIGHLY_SENSITIVE_HEALTH',['module.store.result'],'local assessment engines','current_assessment','module result caches','session',true,true],
 ['clinicianSummary','HIGHLY_SENSITIVE_HEALTH',['summary-text','a-summary-text','module.summary'],'structured current-session evidence','user_requested_export','generated strings and readonly DOM textareas','session',true,true],
 ['safetySignals','SAFETY_CRITICAL',['GlobalSafety.store.signals','suicide.intent','medical.lossOfConsciousness'],'local Safety extraction and structured adapters','safety_processing','Safety store and module answers','session',true,true],
 ['safetyAudit','SAFETY_CRITICAL',['GlobalSafety.store.audit','lastAudit'],'Safety evaluation','safety_processing','bounded memory audit and fingerprint','session',true,false],
 ['consentChoices','SENSITIVE',['PrivacyGovernance.consentState'],'future-purpose consent contract','consent_management','governance memory; no collection UI enabled','session',true,false],
 ['deletionStatus','OPERATIONAL',['PrivacyGovernance.deletionState'],'user-requested clear action','technical_operation','governance memory; status only','session',true,false],
 ['userExport','HIGHLY_SENSITIVE_HEALTH',['downloaded summary','printout','clipboard copy'],'explicit user export','user_requested_export','user-managed file, print or clipboard outside application','user_controlled',false,true]
];
P.inventory=freeze(rows.map(([id,dataClass,fields,source,purpose,location,retentionMode,deletable,exportable])=>({id,dataClass,fields,source,purpose,location,retentionMode,persisted:['static','user_controlled'].includes(retentionMode),exportable,deletable,analyticsEligible:false,loggingEligible:id==='appVersion'})));
P.classify=id=>P.inventory.find(r=>r.id===id)?.dataClass||'HIGHLY_SENSITIVE_HEALTH';
P.retention=id=>{const r=P.inventory.find(r=>r.id===id);return r?{dataClass:r.dataClass,purpose:r.purpose,storageTarget:r.retentionMode==='static'?'static_assets':r.retentionMode==='user_controlled'?'user_file':'memory',retentionMode:r.retentionMode,expiry:null,deletionBehavior:r.retentionMode==='static'?'release_managed':r.retentionMode==='user_controlled'?'user_managed':'clear_session_or_reload',productionReviewRequired:r.retentionMode!=='static'}:null;};
P.canPersist=function(request){try{if(!request||typeof request!=='object')return false;const row=P.inventory.find(r=>r.id===request.category);if(!row||request.dataClass!==row.dataClass||request.purpose!==row.purpose)return false;
 if(request.consentState!==undefined&&(!request.consentState||typeof request.consentState!=='object'||Object.entries(request.consentState).some(([k,v])=>!P.consentPurposes.includes(k)||!['not_asked','granted','denied','withdrawn'].includes(v))))return false;
 // Static public resources are approved. Personal browser/cloud persistence is not.
 return row.persisted&&['PUBLIC','OPERATIONAL'].includes(row.dataClass)&&request.storageTarget==='static_assets';
}catch{return false;}};
P.persist=()=>({allowed:false,reason:'no_personal_persistence_adapter'});
P.canAnalyze=()=>false;
P.canUseURL=({category,value}={})=>category==='route'&&['library','assessments','privacy','screen','anxiety','ocd','trauma','adhd','eating','psychosis','router','differential','adaptive','care','evidence','urgent'].includes(value);
P.canExport=function(r){try{return !!(r&&r.userInitiated===true&&r.purpose==='user_requested_export'&&r.previewAvailable===true&&r.warningShown===true&&['download','print','manual_copy'].includes(r.target)&&Array.isArray(r.categories)&&r.categories.length>0&&r.categories.every(id=>{const row=P.inventory.find(x=>x.id===id);return row?.exportable===true;})&&!r.categories.includes('rawText')&&(!r.categories.includes('safetySignals')||r.categories.includes('clinicianSummary')));}catch{return false;}};
P.exportContract=freeze({automaticTransmission:false,rawNarrative:false,requires:['user_initiation','explicit_scope','preview','sensitive_content_warning'],safety:'explicitly_scoped_current_summary_only',clinicianHandoffEnabled:false});
P.futureContracts=freeze({profile:{enabled:false,requiredFieldDefinition:['id','dataClass','purpose','persistenceAllowed','consentRequired','exportable','deletable'],requires:['approved_capability','profileStorage_consent','allowed_class','allowed_purpose','approved_target','reviewed_retention','deletion_support']},longitudinal:{enabled:false,consentPurpose:'longitudinalTracking',requires:['separate_opt_in','timestamp','structured_observation','provenance','deletion','export','withdrawal'],rawHistory:false},ai:{enabled:false,context:'minimum_necessary',allHistoryAccess:false},research:{enabled:false,consentPurpose:'research',requires:['separate_review','separate_consent']}});
// No caller-controlled strings are copied into log output, even under allowed keys.
const events=['privacy_policy_denied','privacy_runtime_error','export_failed'];
const components=['privacy','application'];
const codes=['INVALID_REQUEST','POLICY_DENIED','UNAVAILABLE'];
P.safeLog=function(event,metadata={}){try{if(!events.includes(event))return null;const out={event};if(components.includes(metadata.component))out.component=metadata.component;if(codes.includes(metadata.errorCode))out.errorCode=metadata.errorCode;if(metadata.engineVersion===P.version)out.engineVersion=P.version;return Object.freeze(out);}catch{return null;}};
})(globalThis.PrivacyGovernance={});
