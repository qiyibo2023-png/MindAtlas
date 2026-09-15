(function(A,V){'use strict';
A.version='adaptive-assessment-v1.0.0';A.defaultBudget=6;A.reviewStatus='unreviewed';
A.registry=[];A.ruleCatalog=['safety_first','known_evidence_skip','duplicate_skip','contradiction_priority','deterministic_information_priority','finite_budget','saturation_stop','multiple_supported_stop','insufficient_stop','user_stop','unsupported_stop','sleep_context_stop','structured_update'].map(id=>({id,version:A.version,reviewStatus:A.reviewStatus}));
const option=(value,labelKey,effects={})=>({value,labelKey,evidenceUpdates:effects});
A.register=function(id,targets,domains,questionKey,whyKey,answers,priority=50,kind='discriminator'){
 if(A.registry.some(q=>q.id===id)||targets.some(k=>!Object.hasOwn(V.concepts,k)))throw Error('Invalid adaptive question registration');
 A.registry.push(Object.freeze({id,conceptTarget:targets[0],targets,domainsCompared:domains,questionKey,whyKey,answerOptions:[...answers,option('unknown','adaptive.unknown'),option('prefer','adaptive.prefer')],priority,kind,contraindications:['safety_interruption','already_reliably_known'],requiresUnknownEvidence:true,stopImpact:'rerun_differential',version:A.version,reviewStatus:A.reviewStatus}));
};
A.binary=function(id,concept,domains,q,why,priority=40,kind='discriminator'){A.register(id,[concept],domains,q,why,[option('yes','adaptive.yes',{[concept]:true}),option('no','adaptive.no',{[concept]:false})],priority,kind);};
A.option=option;
})(globalThis.Adaptive={},globalThis.DifferentialV2);
