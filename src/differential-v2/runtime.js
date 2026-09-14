(function(V,D){'use strict';
V.store={fingerprint:null,result:null};
D.summaryForCurrent=l=>V.summary(V.current(),l);
V.current=function(){
 const input=V.collect(),fingerprint=JSON.stringify([input.evidence,input.availability,input.invalid,input.safety.signals,input.safety.assessmentStatus,D.store.selected,D.store.enabled]);
 if(fingerprint!==V.store.fingerprint){V.store.result=V.evaluate(input.invalid?null:input.evidence,input.safety.signals,{safetyFailed:input.safety.assessmentStatus==='unable_to_assess'});V.store.result.availability=input.availability;V.store.fingerprint=fingerprint;}
 return V.store.result;
};
})(globalThis.DifferentialV2,globalThis.Differential);
