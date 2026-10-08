(function(G){'use strict';
// Live presentation only: the shared engine owns status, urgency and interruption.
G.resultStatusHTML=function(r,l){if(r.requiresInterruption||r.assessmentStatus==='unable_to_assess')return G.panel(r);const copy=k=>I18n.t(k,l),E=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;'),p=G.safetyPresentation(r),pending=[...new Set([...r.unresolvedCriticalSignals,...r.followup])];
 const key=r.assessmentStatus==='incomplete'?'safetyResult.incomplete':r.urgency==='elevated'?'safetyResult.elevated':r.urgency==='attention'?'safetyResult.attention':'safetyResult.nonacute';
 return `<section class="global-summary ${p.state}" data-result-safety="${p.state}" aria-labelledby="result-safety-heading"><h3 id="result-safety-heading">${E(p.title)}</h3><p>${copy(key)}</p>${pending.length?`<p>${copy('safetyResult.pending')}</p><ul>${pending.map(path=>`<li>${E(I18n.text(G.questionLabels[path],l))}</li>`).join('')}</ul>`:''}${p.state!=='none'?`<button type="button" class="secondary" data-result-clarify>${copy('safetyResult.review')}</button>`:''}</section>`;
};
G.beginResultClarification=function(){G.ux.resultReturn={target:'screen',step:Mood.store.step};G.ux.batch=null;return 'safety';};
G.finishResultClarification=function(){const r=G.current();if(r.requiresInterruption||r.assessmentStatus!=='assessed'||r.unresolvedCriticalSignals.length||G.ux.recovery)return false;const saved=G.ux.resultReturn;if(!saved||!G.acknowledge())return false;Mood.store.step=saved.step;G.ux.resultReturn=null;G.ux.batch=null;return saved.target;};
const bind=G.bind;G.bind=function(){bind();const entry=document.querySelector?.('[data-result-clarify]');if(entry)entry.onclick=()=>navigate(G.beginResultClarification());if(G.ux.resultReturn){document.querySelectorAll('[data-global]').forEach(el=>{if(el.dataset.global==='continue')el.onclick=()=>{G.ux.batch=null;const target=G.finishResultClarification();if(target)navigate(target);else render();};});}};
})(GlobalSafety);
