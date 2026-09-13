(function(M){'use strict';
M.scorePHQ9=function(phq={}){const items=Array.from({length:9},(_,i)=>phq[i]);const valid=v=>['0','1','2','3'].includes(String(v))&&v!==null&&v!==undefined;const complete=items.every(valid);const total=complete?items.reduce((s,v)=>s+Number(v),0):null;return {complete,total,answered:items.filter(valid).length,band:total===null?null:total<5?0:total<10?1:total<15?2:total<20?3:4,item9:valid(items[8])?Number(items[8]):null};};
M.phqBands=[[...I18n.pair("platform.m_701aa5cab8c7")],[...I18n.pair("platform.m_90c5fe37939f")],[...I18n.pair("platform.m_3b5c0b83cc1b")],[...I18n.pair("platform.m_85a1a803f7f7")],[...I18n.pair("platform.m_360cf28e5bda")]];
M.validAnswer=Assessment.validAnswer;
M.validateSection=function(s,index){return M.sections[index].questions.filter(q=>M.visible(q,s)&&!M.validAnswer(q,M.get(s,q.id))).map(q=>q.id);};
M.missing=function(s){return M.sections.slice(0,10).flatMap((_,i)=>M.validateSection(s,i));};
})(globalThis.Mood=globalThis.Mood||{});
