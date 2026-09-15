const fs=require('fs'),assert=require('node:assert/strict');
function run(){const metrics={automaticSaveCount:0,unauthorizedSaveCount:0,rawTextPersistenceCount:0,safetyAutoProfileCount:0,duplicateItemCount:0,failedDeletionCount:0,languageSwitchDuplicationCount:0,privacyPolicyBypassCount:0};let scenarios=0;
for(const locale of [0,1]){const c=require(process.cwd()+'/tests/differential-v2-harness.cjs')(),P=c.PersonalProfile,G=c.PrivacyGovernance;c.lang=locale;P.page();metrics.automaticSaveCount+=P.store.list().length;scenarios++;
P.preview('goal','understand','current');P.save();metrics.unauthorizedSaveCount+=P.store.list().length;scenarios++;
G.setConsent('profileStorage','granted');P.save();const original=P.store.list();P.preview('goal','understand','current');P.save();metrics.duplicateItemCount+=Math.max(0,P.store.list().length-original.length);scenarios++;
for(const l of [0,1,0,1]){c.lang=l;P.page();}metrics.languageSwitchDuplicationCount+=Math.max(0,P.store.list().length-original.length);scenarios++;
P.store.save({fieldId:'goal',value:'SYNTHETIC_RAW_TEXT',temporality:'current',userInitiated:true});metrics.rawTextPersistenceCount+=Number(JSON.stringify(P.store.list()).includes('SYNTHETIC_RAW_TEXT'));scenarios++;
const before=P.store.list().length;c.GlobalSafety.submitText('I intend to end my life and have a plan.');metrics.safetyAutoProfileCount+=Math.max(0,P.store.list().length-before);scenarios++;
metrics.privacyPolicyBypassCount+=Number(G.profileDecision({fieldId:'goal',storageTarget:'persistent',purpose:'user_controlled_profile',dataClass:'HIGHLY_SENSITIVE_HEALTH',userInitiated:true}));scenarios++;
for(const i of P.store.list()){P.store.delete(i.id);metrics.failedDeletionCount+=Number(!!P.store.get(i.id));}P.store.clear();metrics.failedDeletionCount+=P.store.list().length;scenarios++;}
assert(Object.values(metrics).every(n=>n===0));return {version:'personal-profile-v1.0.0',synthetic:true,scenarios,metrics,passed:true,certification:false};}
module.exports={run};if(require.main===module){const result=run();fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/profile-scenarios.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));}
