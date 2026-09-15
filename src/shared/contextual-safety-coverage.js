(function(G,X){'use strict';
// Coverage correction for explicit current first-person emergency reports.
// Uses existing signal IDs and unchanged escalation rules. New extraction patterns require clinical review.
const extract=G.extract;
G.contextCoverageMetadata=Object.freeze({version:'contextual-safety-coverage-v1.0.1',reviewStatus:'unreviewed',signals:['medical.severeConfusion','medical.severeBreathingDifficulty','harmToOthers.intent','suicide.passiveDeathWish'],thresholdChanges:false});
G.extract=function(raw){if(typeof raw!=='string'||raw.length>4000||!raw.trim())return extract(raw);const transient=raw.replace(/inner voice|\u5185\u5fc3\u7684\u58f0\u97f3/gi,'internal reflection');const e=extract(transient);if(e.status==='failed')return e;for(const c of X.segments(raw)){if(c.subject!=='self'||c.temporality!=='current'||c.polarity!=='affirmed'||c.question||c.quoted)continue;
if(/^\s*(?:i (?:have|am experiencing) severe confusion|\u6211(?:\u6709|\u73b0\u5728)?\u4e25\u91cd\u610f\u8bc6\u6df7\u4e71)/.test(c.text))G.put(e.signals,'medical.severeConfusion',true);
if(/^\s*i (?:have|am experiencing) severe difficulty breathing/.test(c.text))G.put(e.signals,'medical.severeBreathingDifficulty',true);
if(/^\s*i wish i (?:were|was) dead\b/.test(c.text))G.put(e.signals,'suicide.passiveDeathWish',true);
if(/^\s*\u6211(?:\u73b0\u5728)?\u6253\u7b97(?:\u4f24\u5bb3|\u6740(?:\u6b7b)?)(?:\u522b\u4eba|\u4ed6\u4eba)/.test(c.text))G.put(e.signals,'harmToOthers.intent',true);
}return e;};
})(globalThis.GlobalSafety,globalThis.ExperienceContext);
