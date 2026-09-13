(function(R){'use strict';
R.store={profile:null,result:null,preference:null,pending:false};
R.clear=()=>{R.store={profile:null,result:null,preference:null,pending:false};};
R.gate=()=>GlobalSafety.guard('screen');
R.submit=function(raw){
 R.clear();const safety=GlobalSafety.submitText(raw); // Must execute first, even if extraction fails.
 if(safety.requiresInterruption||safety.assessmentStatus==='unable_to_assess')return 'safety';
 try{R.store.profile=R.extract(raw);}catch{R.store.profile=null;}
 R.store.pending=true;
 return R.gate().show?'safety':R.resume();
};
R.resume=function(){if(R.gate().show)return 'safety';if(!R.store.pending)return 'library';R.store.result=R.route(R.store.profile,R.store.preference);return 'router';};
R.choose=function(choice){if(!R.domains.has(choice)&&!['other','unsure'].includes(choice))return false;if(R.gate().show)return false;R.store.preference=choice;R.store.result=R.route(R.store.profile,choice);return true;};
R.start=function(domain){if(R.gate().show||!R.domains.has(domain))return 'safety';return R.domains.get(domain).view;};
})(globalThis.SymptomRouter);
