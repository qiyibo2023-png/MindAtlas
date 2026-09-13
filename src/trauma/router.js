(function(R){'use strict';
const register=R.registerAssessmentDomain;R.registerAssessmentDomain=d=>{if(d.id!=='trauma')return register(d);if(R.domains.has(d.id))throw Error('Duplicate assessment domain');R.domains.set(d.id,Object.freeze({...d}));};
R.registerAssessmentDomain({id:'trauma',view:'trauma',label:'traumaUI.title'});
R.fields.trauma=['exposure','reliving','avoidance','alertness'];R.paths.push(...R.fields.trauma.map(k=>'trauma.'+k));
const extract=R.extract;R.extract=raw=>{const p=extract(raw);if(typeof raw!=='string')return p;
 const text=raw.normalize('NFKC').toLowerCase();
 const other=/\b(?:he|she|they|my friend|my partner)\b|\u4ed6|\u5979/.test(text),hypothetical=/\bif\b|hypothetical|\u5982\u679c|\u5047\u5982/.test(text),denied=/\b(?:never|not|no longer|don't|do not)\b|\u6ca1\u6709|\u4e0d\u518d/.test(text),historical=/used to|years ago|\u4ee5\u524d|\u5e74\u524d/.test(text)&&!/\bnow\b|\u73b0\u5728/.test(text);
 const patterns={exposure:/assault|trauma|accident|combat|\u88ad\u51fb|\u4fb5\u72af|\u521b\u4f24|\u4e8b\u6545|\u6218\u4e89/,reliving:/reliv|flashback|re.?experienc|\u518d\u6b21\u53d1\u751f|\u91cd\u73b0|\u518d\u4f53\u9a8c|\u95ea\u56de/,avoidance:/avoid|\u56de\u907f|\u907f\u5f00/,alertness:/on guard|hypervigilan|\u8b66\u89c9|\u8b66\u60d5/};
 for(const [k,re]of Object.entries(patterns))if(re.test(text)&&!other&&!hypothetical&&!denied&&!historical){R.put(p,'trauma.'+k,true);p.observations.push({path:'trauma.'+k,value:true,context:{subject:'self',temporality:'current',polarity:'affirmed',uncertainty:false}});}
 return p;};
R.rules.push({id:'ROUTER_TRAUMA_REEXPERIENCING_001',domain:'trauma',relevance:'high',explanationKey:'traumaUI.routerReason',version:R.version,moduleVersion:Trauma.version,reviewStatus:'unreviewed',when:p=>p.trauma?.exposure===true&&p.trauma?.reliving===true});
const route=R.route;R.route=(p,preference)=>{const r=route(p,preference);if(r.candidateRoutes.some(c=>c.domain==='trauma'))r.unsupportedSignals=r.unsupportedSignals.filter(k=>k!=='trauma');return r;};
})(globalThis.SymptomRouter);
