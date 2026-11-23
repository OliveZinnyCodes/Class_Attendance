'use strict';
Portal.summary = records => {const counts=Object.fromEntries(Portal.statuses.map(s=>[s,0]));Object.values(records).forEach(s=>{if(s in counts)counts[s]++;});const total=Object.values(counts).reduce((a,b)=>a+b,0);const eligible=counts.Present+counts.Late+counts.Absent;return {...counts,total,rate:eligible?Math.round((counts.Present+counts.Late)/eligible*100):null};};
Portal.history = (data,id,from='',to='') => Object.values(data.sessions).filter(s=>(!from||s.date>=from)&&(!to||s.date<=to)&&Object.hasOwn(s.records,id)).sort((a,b)=>b.date.localeCompare(a.date)).map(s=>({date:s.date,status:s.records[id]}));
Portal.performance = (data,id,from='',to='') => Portal.summary(Object.fromEntries(Portal.history(data,id,from,to).map(x=>[x.date,x.status])));
Portal.formatDate = date => new Date(date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
Portal.initials = name => name.split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase();
