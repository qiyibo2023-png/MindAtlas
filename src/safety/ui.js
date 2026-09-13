(function(G){'use strict';
const T=(z,e)=>I18n.select(z,e,lang),X=p=>I18n.text(p,lang),E=s=>esc(String(s));
G.questionLabels={
 'suicide.desireToDie':[...I18n.pair("platform.m_7754bcdb50e0")],
 'suicide.currentIdeation':[...I18n.pair("platform.m_b68c19d9db5c")],
 'suicide.intent':[...I18n.pair("platform.m_18084afc0f0e")],
 'suicide.plan':[...I18n.pair("platform.m_82c91698ab3a")],
 'suicide.preparation':[...I18n.pair("platform.m_0ef7a6fe8e1f")],
 'suicide.unableToStaySafe':[...I18n.pair("platform.m_cb41f6b1d8fa")],
 'harmToOthers.actualDesire':[...I18n.pair("platform.m_f0e3ac0c95d0")],
 'harmToOthers.intent':[...I18n.pair("platform.m_3b5e076da8fa")],
 'harmToOthers.plan':[...I18n.pair("platform.m_727156dd3172")],
 'harmToOthers.preparation':[...I18n.pair("platform.m_4313ed7daf89")],
 'harmToOthers.imminence':[...I18n.pair("platform.m_4f442beb9b32")],
 'selfHarm.medicalInjuryConcern':[...I18n.pair("platform.m_de398e853c60")],
 'selfHarm.suicidalIntentAssociated':[...I18n.pair("platform.m_4f6b41b836c3")],
 'psychosis.commandSelfHarm':[...I18n.pair("platform.m_11655c21d388")],
 'psychosis.commandOtherHarm':[...I18n.pair("platform.m_3b09ca4e0082")],
 'medical.otherImmediateMedicalDanger':[...I18n.pair("platform.m_35c6d932e294")]
};
// Presentation only; this mapping never changes engine facts or thresholds.
G.safetyPresentation=function(r){
 const state=r.urgency==='acute'?'acute':r.assessmentStatus==='unable_to_assess'?'unable_to_assess':r.urgency==='elevated'?'elevated':r.assessmentStatus==='incomplete'?'incomplete':r.urgency;
 const titles={none:[...I18n.pair("platform.m_01806af2beca")],attention:[...I18n.pair("platform.m_f6767ea7ef37")],incomplete:[...I18n.pair("platform.m_cf5e909826b9")],unable_to_assess:[...I18n.pair("platform.m_165666d5d857")],elevated:[...I18n.pair("platform.m_16f47126a365")],acute:r.primaryDomain==='medical'?[...I18n.pair("platform.m_9910cf69e7b3")]:[...I18n.pair("platform.m_a9972a667d87")]};
 const labels={none:[...I18n.pair("platform.m_74bc8bfd9707")],attention:[...I18n.pair("platform.m_9a882a39e87e")],incomplete:[...I18n.pair("platform.m_611dc987712f")],unable_to_assess:[...I18n.pair("platform.m_3d18eb481e38")],elevated:[...I18n.pair("platform.m_4f1019b92c0c")],acute:[...I18n.pair("platform.m_7ecca2579f7b")]};
 return {state,title:X(titles[state]),label:X(labels[state])};
};
G.entryHTML=()=>`<section class="global-entry" aria-labelledby="global-entry-heading"><h1 id="global-entry-heading" tabindex="-1">${T(...I18n.pair("platform.m_b41b3d455a55"))}</h1><p id="global-entry-help">${T(...I18n.pair("platform.m_3492324455d8"))}</p><form id="global-entry-form"><label for="global-description">${T(...I18n.pair("platform.m_920b315308e0"))}</label><textarea id="global-description" maxlength="4000" rows="3" required aria-describedby="global-entry-help global-entry-privacy global-entry-error"></textarea><p id="global-entry-error" class="global-entry-error" role="status" aria-live="polite"></p><div class="global-entry-actions"><button type="submit" class="primary" data-global="text">${T(...I18n.pair("platform.m_564056bc436d"))}</button><button type="button" class="secondary" data-view="urgent">${T(...I18n.pair("platform.m_bdbdd21b19b3"))}</button></div></form><p id="global-entry-privacy" class="global-small">${T(...I18n.pair("platform.m_33dc78cb5e01"))}</p></section>`;
G.resourcesHTML=resources;
function resources(r,requested=false){
 const d=G.resource(G.store.region),emergencyFirst=r.urgency==='acute'||requested;
 const phone=(num,label,primary=false)=>num?`<a class="${primary?'primary':'secondary'}" href="tel:${num.replace(/[^+\d]/g,'')}">${label} · ${E(num)}</a>`:'';
 return `<div class="global-resources"><label for="global-region">${T(...I18n.pair("platform.m_cab2aba8e3c7"))}</label><select id="global-region">${G.directory().map(d=>`<option value="${d.id}" ${d.id===G.store.region?'selected':''}>${X(d.name)}</option>`).join('')||`<option>${T(...I18n.pair("platform.m_5b30f31ec64f"))}</option>`}</select><div class="actions">${phone(d.emergency,T(...I18n.pair("platform.m_5e6e124f2595")),emergencyFirst)}${r.primaryDomain!=='medical'?phone(d.crisis,T(...I18n.pair("platform.m_a66f393a2dcf")),!emergencyFirst&&r.urgency==='elevated'):''}${r.domains.includes('substance')||r.signals?.medical?.suspectedOverdose===true||r.signals?.medical?.suspectedPoisoning===true?phone(d.poison,T(...I18n.pair("platform.m_309ede02883a"))):''}</div>${!d.emergency?`<p>${T(...I18n.pair("platform.m_4be802ab3cbf"))}</p>`:''}${d.note?`<p class="global-small">${X(d.note)}</p>`:''}<details id="global-resource-sources"><summary>${T(...I18n.pair("platform.m_b5d353e38cc0"))}</summary>${d.sources.map(url=>`<p><a href="${url}" target="_blank" rel="noopener noreferrer">${T(...I18n.pair("platform.m_b53a5552d2d6"))} ↗</a></p>`).join('')}<p class="global-small">${T(...I18n.pair("platform.m_91f7f536e86c"))}</p></details></div>`;
}
function questions(r){return r.followup.length?`<div class="global-followups"><h2>${T(...I18n.pair("platform.m_9d4ddb5d880e"))}</h2><p id="global-answer-help" class="global-small">${T(...I18n.pair("platform.m_7611ee98d704"))}</p>${r.followup.map((p,i)=>`<div class="global-question"><label for="global-answer-${p.replaceAll('.','-')}"><span class="global-question-number" aria-hidden="true">${i+1}</span>${E(X(G.questionLabels[p]||[p,p]))}</label><select id="global-answer-${p.replaceAll('.','-')}" data-global-answer="${p}" aria-describedby="global-answer-help"><option value="unknown">${T(...I18n.pair("platform.m_60d4cbfc99f2"))}</option><option value="yes">${T(...I18n.pair("platform.m_f806cd1c147e"))}</option><option value="no">${T(...I18n.pair("platform.m_507bedd3c8e2"))}</option></select></div>`).join('')}</div>`:'';}
function resetDetails(r){return `<details id="global-basis"><summary>${T(...I18n.pair("platform.m_5af16c42ae08"))}</summary><p>${r.findings.map(f=>E(X(f.text))).join('；')||T(...I18n.pair("platform.m_564fdb39ed1f"))}</p><p>${T(...I18n.pair("platform.m_ba088b47369f"))}</p><button type="button" class="secondary" data-global="reset">${T(...I18n.pair("platform.m_716b97b768db"))}</button></details>`;}
G.panel=function(r,compact=false,options={}){
 const p=G.safetyPresentation(r),acute=p.state==='acute',failed=p.state==='unable_to_assess',prominent=acute||p.state==='elevated',medical=r.primaryDomain==='medical',help=options.urgentRequest&&!acute;
 if(compact)return p.state==='none'?'':`<aside class="global-summary ${p.state}" aria-label="${T(...I18n.pair("platform.m_b69e81288fb5"))}"><span>${p.title}</span> <button type="button" class="secondary" data-view="safety">${T(...I18n.pair("platform.m_ad673747719c"))}</button></aside>`;
 const title=help?T(...I18n.pair("platform.m_61440cd397a5")):p.title;
 const intro=acute?(medical?T(...I18n.pair("platform.m_f3cb5ef7f0fd")):T(...I18n.pair("platform.m_525312995c88"))):failed?T(...I18n.pair("platform.m_f4a396501341")):p.state==='elevated'?T(...I18n.pair("platform.m_8050262721c6")):p.state==='incomplete'?T(...I18n.pair("platform.m_3d71de21bf09")):p.state==='none'?T(...I18n.pair("platform.m_e689aa62a7e7")):T(...I18n.pair("platform.m_e44141fa08b4"));
 const intrusive=!acute&&(r.intrusiveInterpretation?.harm||r.intrusiveInterpretation?.self)?`<p class="global-intrusive">${T(...I18n.pair("platform.m_754873ee2493"))}</p>`:'';
 const support=(prominent||help)?`<div class="global-support"><h2>${T(...I18n.pair("platform.m_508f01670dc3"))}</h2>${resources(r,help)}</div>`:`<details id="global-support"><summary>${T(...I18n.pair("platform.m_7f1db66639f9"))}</summary>${resources(r)}</details>`;
 return `<section class="global-safety ${p.state}${help?' requested-help':''}" data-safety-ui="${help?'urgent_help':p.state}" data-safety-urgency="${r.urgency}" data-assessment-status="${r.assessmentStatus}" role="${acute?'alert':'region'}" aria-labelledby="global-safety-heading"><p class="global-state-label">${help?T(...I18n.pair("platform.m_ee7517394a3e")):p.label}</p><h1 id="global-safety-heading" tabindex="-1">${title}</h1><p class="global-intro">${help?T(...I18n.pair("platform.m_0008c58c9888")):intro}</p>${!prominent&&!help&&!failed?intrusive+questions(r):''}${r.primaryDomain==='harm_to_others'&&prominent?`<p>${T(...I18n.pair("platform.m_a44fc1de2908"))}</p>`:''}${medical&&acute?`<p>${T(...I18n.pair("platform.m_64d540638427"))}</p>`:''}${failed&&!help?`<div class="global-retry"><button type="button" class="primary" data-global="reset">${T(...I18n.pair("platform.m_d3a8a750a2ae"))}</button><p class="global-small">${T(...I18n.pair("platform.m_f436fd74bf13"))}</p></div>`:''}${support}${p.state==='elevated'&&!help?intrusive+questions(r):''}${failed&&!help?`<p>${T(...I18n.pair("platform.m_42fbe1f5f54c"))}</p>`:''}${!acute&&!failed?`<div class="global-continue"><button type="button" class="primary" data-global="continue">${T(...I18n.pair("platform.m_74bc8bfd9707"))}</button>${r.assessmentStatus==='incomplete'?`<p class="global-small">${T(...I18n.pair("platform.m_e4929e599e11"))}</p>`:''}</div>`:''}<p class="global-small global-monitoring">${acute?T(...I18n.pair("platform.m_adde56bff99a")):T(...I18n.pair("platform.m_2e2fbffe1af9"))}</p>${resetDetails(r)}</section>`;
};
// Temporary DOM snapshots preserve focus, disclosures and an unsubmitted draft during redraw.
// No draft is written to engine state, storage, logs or the network.
G.captureUI=function(){const input=document.getElementById('global-description'),panel=document.querySelector('[data-safety-ui]');return {focus:document.activeElement?.id,scope:panel?.getAttribute('data-safety-ui'),draft:input?.value,invalid:input?.getAttribute('aria-invalid')==='true',open:Array.from(document.querySelectorAll('.global-safety details[open]')).map(e=>e.id)};};
G.restoreUI=function(previous){
 if(!previous)return;const input=document.getElementById('global-description'),panel=document.querySelector('[data-safety-ui]');
 if(input&&previous.draft!==undefined)input.value=previous.draft;
 for(const id of previous.open){const el=document.getElementById(id);if(el)el.open=true;}
 if(input&&previous.invalid)entryError(input);
 if(panel&&panel.getAttribute('data-safety-ui')!==previous.scope){document.getElementById('global-safety-heading')?.focus();return;}
 const active=previous.focus&&document.getElementById(previous.focus);
 if(active)active.focus();else if(previous.focus?.startsWith('global-answer-'))focusNext();
 else if(previous.scope&&!panel)document.getElementById('main-content')?.focus();
};
function focusNext(){(document.querySelector('[data-global-answer]')||document.getElementById('global-safety-heading'))?.focus();}
function entryError(input){input.setAttribute('aria-invalid','true');const el=document.getElementById('global-entry-error');if(el)el.textContent=T(...I18n.pair("platform.m_754d7e33bfba"));}
G.bind=function(){
 document.querySelectorAll('[data-global-answer]').forEach(el=>el.onchange=()=>{G.answer(el.dataset.globalAnswer,el.value==='yes'?true:el.value==='no'?false:'unknown');render();});
 const reg=document.getElementById('global-region');if(reg)reg.onchange=()=>{G.store.region=reg.value;render();};
 const input=document.getElementById('global-description');if(input)input.oninput=()=>{input.removeAttribute('aria-invalid');document.getElementById('global-entry-error').textContent='';const parsed=G.validateExtraction(G.extract(input.value));const r=G.evaluate(parsed.signals,{failed:!parsed.valid});if(r.requiresInterruption){G.submitText(input.value);render();document.getElementById('global-safety-heading')?.focus();}};
 const form=document.getElementById('global-entry-form');if(form)form.onsubmit=e=>{e.preventDefault();if(!input.value.trim()){entryError(input);input.focus();return;}G.submitText(input.value);navigate('safety');};
 document.querySelectorAll('[data-global]').forEach(el=>{if(el.dataset.global==='text')return;el.onclick=()=>{if(el.dataset.global==='continue'&&G.acknowledge()){if(['safety','urgent'].includes(view))view='library';render();}if(el.dataset.global==='reset'){G.reset();view='library';render();}};});
};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
