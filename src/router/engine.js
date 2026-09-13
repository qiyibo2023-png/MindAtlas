(function(R){'use strict';
R.route=function(profile,preference=null){
 const result={version:R.version,primaryRoute:null,candidateRoutes:[],unsupportedSignals:[],unresolvedQuestions:[],confidenceStatus:'insufficient',explanationKeys:[],matchedRules:[]};
 if(!R.validate(profile)){result.unresolvedQuestions=['invalid_profile'];return result;}
 const hits=R.rules.filter(rule=>rule.when(profile));result.matchedRules=hits.map(r=>r.id);
 for(const domain of R.domains.keys()){
  const matching=hits.filter(r=>r.domain===domain);if(!matching.length)continue;
  result.candidateRoutes.push({domain,relevance:matching.some(r=>r.relevance==='high')?'high':'moderate',supportingSignals:R.fields[domain].filter(f=>profile[domain][f]===true).map(f=>domain+'.'+f),explanationKeys:[...new Set(matching.map(r=>r.explanationKey))]});
 }
 // Ordinal relevance, then number of positive domain features. Stable registration order
 // only orders tied cards; unresolved ties do not silently choose a primary route.
 const compare=(a,b)=>a.relevance!==b.relevance?(a.relevance==='high'?-1:1):b.supportingSignals.length-a.supportingSignals.length;
 result.candidateRoutes.sort(compare);
 result.unsupportedSignals=R.fields.unsupported.filter(f=>profile.unsupported[f]===true);
 const [first,second]=result.candidateRoutes;
 if(first){const tied=second&&compare(first,second)===0;result.primaryRoute=tied?null:first.domain;result.confidenceStatus=tied?'uncertain':'sufficient';if(tied)result.unresolvedQuestions=['main_concern'];}
 else result.unresolvedQuestions=['main_concern'];
 if(R.domains.has(preference)){result.primaryRoute=preference;result.confidenceStatus='uncertain';result.unresolvedQuestions=[];result.explanationKeys.push('router.userChoice');}
 else if(preference==='other'||preference==='unsure'){result.primaryRoute=null;result.confidenceStatus='insufficient';result.unresolvedQuestions=[];}
 result.explanationKeys.push('router.notDiagnosis');return result;
};
})(globalThis.SymptomRouter);
