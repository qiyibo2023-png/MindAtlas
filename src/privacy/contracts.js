(function(P){'use strict';
const frozen=rows=>Object.freeze(rows.map(r=>Object.freeze(r)));
// Proposed field contracts are separate from the inventory of actual data.
P.futureFields=frozen([
 {id:'assessmentHistory',purpose:'future_profile',dataClass:'HIGHLY_SENSITIVE_HEALTH',consentRequired:'profileStorage',retention:'profile_user_controlled',exportable:true,deletable:true,persistenceAllowed:false},
 {id:'assessmentResultOverTime',purpose:'longitudinal_tracking',dataClass:'HIGHLY_SENSITIVE_HEALTH',consentRequired:'longitudinalTracking',retention:'longitudinal_user_controlled',exportable:true,deletable:true,persistenceAllowed:false},
 {id:'symptomTrajectory',purpose:'longitudinal_tracking',dataClass:'HIGHLY_SENSITIVE_HEALTH',consentRequired:'longitudinalTracking',retention:'longitudinal_user_controlled',exportable:true,deletable:true,persistenceAllowed:false},
 {id:'functionalImpairmentTrajectory',purpose:'longitudinal_tracking',dataClass:'HIGHLY_SENSITIVE_HEALTH',consentRequired:'longitudinalTracking',retention:'longitudinal_user_controlled',exportable:true,deletable:true,persistenceAllowed:false}
]);
P.futureRetention=frozen(['profile_user_controlled','longitudinal_user_controlled'].map(id=>({id,retentionMode:'user_controlled',expiry:null,deletionBehavior:'user_delete_and_consent_withdrawal',enabled:false,reviewStatus:'engineering_review_only'})));
P.futurePersistenceDecision=function(r){try{
 const field=P.futureFields.find(f=>f.id===r?.field);
 if(!field)return {allowed:false,reason:'unregistered_field'};
 if(r.dataClass!==field.dataClass||r.purpose!==field.purpose)return {allowed:false,reason:'class_or_purpose_mismatch'};
 if(r.consentState?.[field.consentRequired]!=='granted')return {allowed:false,reason:'purpose_consent_required'};
 if(r.retention!==field.retention||!P.futureRetention.some(p=>p.id===r.retention))return {allowed:false,reason:'retention_required'};
 // No target is approved in this milestone. Caller flags cannot grant capability.
 return {allowed:false,reason:'no_approved_storage_capability'};
}catch{return {allowed:false,reason:'invalid_request'};}};
P.aiContextDecision=function(r){try{
 if(!r||r.purpose!=='current_assessment'||!Array.isArray(r.categories)||!r.categories.length||r.categories.some(x=>!['routerEvidence','differentialEvidence','adaptiveEvidence'].includes(x))||r.minimumNecessary!==true)return {allowed:false,reason:'excessive_or_unscoped_context',categories:[]};
 return {allowed:false,reason:'ai_capability_not_enabled',categories:[]};
}catch{return {allowed:false,reason:'invalid_request',categories:[]};}};
P.handoffDecision=r=>({allowed:false,reason:P.canExport(r)?'clinician_transmission_not_enabled':'invalid_export_scope'});
P.governanceRules=frozen([
 ['PG_CLASSIFY','defined_purpose','ALL','classify','conservative_unknown','none','policy.js'],
 ['PG_PERSIST','defined_purpose','ALL','persist','deny','registered_static_public_operational_assets_only','policy.js'],
 ['PG_CONSENT','separate_future_purposes','SENSITIVE','authorize','not_asked','explicit_per_purpose_grant_does_not_enable_storage','policy.js'],
 ['PG_RETENTION','defined_purpose','ALL','retain','session_or_ephemeral','public_static_assets_and_user_exports','policy.js'],
 ['PG_DELETE','user_requested_deletion','ALL','delete','current_memory_only','external_files_and_nonexistent_backends_excluded','runtime.js'],
 ['PG_EXPORT','user_requested_export','HIGHLY_SENSITIVE_HEALTH','export','deny','explicit_current_summary_with_warning_and_preview','policy.js'],
 ['PG_LOG','technical_operation','OPERATIONAL','log','omit','enumerated_metadata_only_no_sink','policy.js'],
 ['PG_ANALYTICS','optional_analytics','ALL','analyze','deny','none','policy.js'],
 ['PG_URL','navigation','ALL','url','deny','fixed_route_ids_only','policy.js'],
 ['PG_FUTURE','future_profile_or_longitudinal','HIGHLY_SENSITIVE_HEALTH','persist','deny','no_capability_enabled','contracts.js'],
 ['PG_AI','current_assessment','HIGHLY_SENSITIVE_HEALTH','context','deny','no_ai_capability_enabled','contracts.js'],
 ['PG_SAFETY','safety_processing','SAFETY_CRITICAL','process','memory_allowed','no_persistence_exception','runtime.js']
 ].map(([id,purpose,dataClass,action,defaultDecision,exceptions,file])=>({id,purpose,dataClass,action,defaultDecision,exceptions,implementation:'src/privacy/'+file,version:P.version,reviewStatus:'engineering_review_only'})));
})(PrivacyGovernance);
