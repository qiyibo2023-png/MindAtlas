(function(M){'use strict';
// Presentation audit only. The existing engine remains authoritative for qualification.
M.explainSymptoms=function(s,r){
 const rows=M.phqDomainMap.map((id,index)=>{
  const raw=s.phq?.[index],score=['0','1','2','3'].includes(String(raw))&&raw!==null&&raw!==undefined?Number(raw):null;
  const d=s.symptoms?.[id]||{},reasons=[],qualified=r.qualified.includes(id);
  const reported=score===null?null:score>0;
  const carryMismatch=score!==null&&(d.present!==(reported?'yes':'no')||(reported&&d.frequency!==({1:'some',2:'most',3:'daily'})[score]));
  if(!qualified){
   if(d.present==='no')reasons.push('moodExplain.notReported');
   else if(d.present!=='yes')reasons.push('moodExplain.presenceUnknown');
   else {
    if(d.changed!=='yes')reasons.push(d.changed==='no'?'moodExplain.changeNo':'moodExplain.changeUnknown');
    if(!['14to29','30to179','180plus'].includes(d.duration))reasons.push(d.duration==='under14'?'moodExplain.durationShort':'moodExplain.durationUnknown');
    if(id!=='death'&&d.frequency!=='daily')reasons.push(['some','most'].includes(d.frequency)?'moodExplain.frequencyLow':'moodExplain.frequencyUnknown');
    if(id==='motor'&&d.observed!=='yes')reasons.push(d.observed==='no'?'moodExplain.observationNo':'moodExplain.observationUnknown');
   }
  }
  return {id,index,score,reported,qualified,carryMismatch,reasons};
 });
 return {rows,reported:rows.filter(x=>x.reported===true).length,unanswered:rows.filter(x=>x.score===null).length,qualified:r.qualified.length,carryMismatch:rows.some(x=>x.carryMismatch)};
};
M.explanationHTML=function(s,r,l){
 const x=M.explainSymptoms(s,r),copy=k=>I18n.t(k,l),E=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const counts=I18n.text(I18n.formatPair('moodExplain.counts',{reported:x.reported,qualified:x.qualified}),l);
 return `<section class="panel mood-count-explanation" aria-labelledby="mood-count-heading"><h3 id="mood-count-heading">${copy('moodExplain.heading')}</h3><p>${E(counts)}</p><p>${copy('moodExplain.distinction')}</p>${x.qualified===0?`<p>${copy('moodExplain.zero')}</p>`:''}${x.unanswered||r.unresolvedSymptoms.length||r.missing.length?`<p>${copy('moodExplain.uncertainty')}</p>`:''}${x.carryMismatch?`<p role="status">${copy('moodExplain.mismatch')}</p>`:''}<details class="mood-count-details"><summary>${copy('moodExplain.details')}</summary><p>${copy('moodExplain.rules')}</p><p>${copy('moodExplain.limitation')}</p><ul>${x.rows.map(row=>`<li><strong>${E(I18n.text(M.symptomDomains.find(d=>d[0]===row.id).slice(1),l))}</strong><p>PHQ-9: ${row.score===null?copy('moodExplain.unanswered'):row.score+' / 3'} · ${row.qualified?copy('moodExplain.counted'):copy('moodExplain.notCounted')}</p>${row.reasons.length?`<ul>${row.reasons.map(key=>`<li>${copy(key)}</li>`).join('')}</ul>`:''}</li>`).join('')}</ul><p>${copy('moodExplain.context')}</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1495268/" target="_blank" rel="noopener noreferrer">${copy('moodExplain.phqSource')}</a> · <a href="https://www.nice.org.uk/guidance/ng222/chapter/Recommendations" target="_blank" rel="noopener noreferrer">${copy('moodExplain.niceSource')}</a></details></section>`;
};
})(globalThis.Mood=globalThis.Mood||{});
