(function(G,P){'use strict';
// This approves bounded runtime processing, never persistent health storage.
G.profileRuntimeContract=Object.freeze({version:P.version,storageTarget:'memory',purpose:'user_controlled_profile',consentPurpose:'profileStorage',persistent:false,reviewStatus:'unreviewed'});
G.profileDecision=function(r){const f=P.fields[r?.fieldId];return !!(G.profileRuntimeContract?.storageTarget==='memory'&&G.profileRuntimeContract?.persistent===false&&f&&r.storageTarget==='memory'&&r.purpose===f.purpose&&r.dataClass===f.dataClass&&G.consentState.profileStorage==='granted'&&r.userInitiated===true&&f.persistenceAllowed===false);};
G.profileExportDecision=r=>!!(r?.userInitiated&&r.previewAvailable&&r.warningShown&&r.target==='download'&&r.items?.length&&r.items.every(i=>P.fields[i.fieldId]?.exportable)&&G.canExport({userInitiated:true,previewAvailable:true,warningShown:true,purpose:'user_requested_export',target:'download',categories:['profileItems']}));
const retention=G.retention;G.retention=id=>id==='profileItems'?{dataClass:'HIGHLY_SENSITIVE_HEALTH',purpose:'user_controlled_profile',storageTarget:'memory',retentionMode:'runtime',expiry:null,deletionBehavior:'individual_delete_clear_profile_or_reload',productionReviewRequired:true}:retention(id);
})(PrivacyGovernance,PersonalProfile);

