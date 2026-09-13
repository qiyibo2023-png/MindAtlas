(function(A,G){'use strict';
// Bounded additions to shared extraction; no raw text is retained and no new
// escalation threshold is introduced. Unknown attribution is left unresolved.
const extract=G.extract;
G.extract=raw=>{const base=extract(raw);if(base.status==='failed'||typeof raw!=='string')return base;const text=raw.normalize('NFKC').toLowerCase().replace(/[\u2018\u2019]/g,"'");for(const clause of text.split(/[.!?;\n\u3002\uff01\uff1f\uff1b]+/)){if(/\b(?:my friend|my partner|he|she|they|if|hypothetical|used to|years ago|no longer|never)\b|\u4ed6|\u5979|\u5982\u679c|\u4ee5\u524d|\u4e0d\u518d|\u6ca1\u6709/.test(clause))continue;const affirmed=/\b(?:i|my)\b|\u6211/.test(clause);if(!affirmed)continue;
const patterns=[['medical.otherImmediateMedicalDanger',/severely dehydrated|(?:cannot|can't|unable to) keep (?:any )?fluids down|vomiting blood|repeatedly (?:nearly )?faint|\u4e25\u91cd\u8131\u6c34|\u559d.{0,4}\u6c34.{0,5}\u5410|\u5455\u8840|\u53cd\u590d.{0,4}\u6655\u53a5/],['selfCare.unableToEat',/(?:cannot|can't|unable to) (?:eat|maintain basic food intake)|\u65e0\u6cd5\u8fdb\u98df/],['selfCare.unableToDrink',/(?:cannot|can't|unable to) (?:drink|maintain hydration)|\u65e0\u6cd5\u996e\u6c34/]];for(const [p,re]of patterns)if(re.test(clause)&&!/(?:am not|not currently|don't|do not)\b|\u5e76\u672a|\u4e0d\u662f/.test(clause))G.put(base.signals,p,true);
}return base;};
A.extractionReview={id:'EATING_SHARED_MEDICAL_EXTRACTION_001',version:A.version,reviewStatus:'unreviewed'};
})(globalThis.Eating,globalThis.GlobalSafety);
