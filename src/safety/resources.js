(function(G){'use strict';
// Offline directory: no runtime network dependency, inferred location or fabricated telephone numbers.
G.resources=[
{id:'cn',country:'CN',region:'mainland',name:['中国大陆','Mainland China'],emergency:'120',crisis:'12356',poison:null,sources:['https://www.nhc.gov.cn/yzygj/c100068/202412/49a1a65386cd4be582d4702fd0926ee8.shtml'],note:['12356 为心理援助，不能代替急救。服务时间及接通情况请以当地实际为准。','12356 provides psychological support and does not replace emergency care. Local availability and operating hours vary.']},
{id:'other',country:null,region:null,name:['其他／未选择','Other / not selected'],emergency:null,crisis:null,poison:null,sources:[]},
{id:'ca',country:'CA',region:'outside-QC',name:['加拿大（魁北克以外）','Canada (outside Quebec)'],emergency:'911',crisis:'988',poison:'1-844-764-7669',sources:['https://988.ca/get-help/help-right-now','https://www.canada.ca/en/health-canada/news/2024/03/message-from-the-minister-of-health-poison-prevention-week.html']},
{id:'ca-qc',country:'CA',region:'QC',name:['加拿大 · 魁北克','Canada · Quebec'],emergency:'911',crisis:'988',poison:'1-800-463-5060',sources:['https://988.ca/get-help/help-right-now','https://www.canada.ca/en/health-canada/news/2024/03/message-from-the-minister-of-health-poison-prevention-week.html']},
{id:'us',country:'US',region:null,name:['美国','United States'],emergency:'911',crisis:'988',poison:'1-800-222-1222',sources:['https://988lifeline.org/','https://poisonhelp.hrsa.gov/about-us']},
{id:'england',country:'GB',region:'England',name:['英格兰','England'],emergency:'999',crisis:'111',poison:null,sources:['https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/','https://www.nhs.uk/conditions/poisoning/'],note:['111 请选心理健康选项。','For 111, select the mental health option.']}
].map(r=>({...r,accessed:'2026-09-13',emergencyDepartment:['前往最近急诊；急症时不要自行驾车。','Go to the nearest emergency department; do not drive yourself in an emergency.']}));
G.directory=()=>Array.isArray(G.resources)?G.resources.filter(r=>r&&typeof r.id==='string'&&Array.isArray(r.name)&&r.name.length===2&&Array.isArray(r.sources)&&['emergency','crisis','poison'].every(k=>r[k]===null||typeof r[k]==='string')):[];
G.resource=function(id){try{const r=G.directory().find(x=>x.id===id);if(r)return r;}catch{}return {id:'other',name:['其他／未选择','Other / not selected'],emergency:null,crisis:null,poison:null,sources:[],unavailable:true};};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
