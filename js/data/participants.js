'use strict';
window.Portal = {};
/** @typedef {{id:string,name:string,joined:string}} Student
 * @typedef {{date:string,records:Object<string,string>,savedAt:string|null}} Session
 * @typedef {{version:number,students:Student[],sessions:Object<string,Session>}} Database */
Portal.statuses = ['Present','Absent','Late','Excused','Unmarked'];
Portal.referenceDate = '2026-11-16';
Portal.seed = () => {const names=['Ibrahim Ahma...','NNENNA UKPAI','Eyiowuawi Tim...','Ara','Emmanuel Rnd','usman hassan','Gift Olungwe','Tomiwa Soyemi','Favour Akinlade']; const students=names.map((name,i)=>({id:`student-${String(i+1).padStart(3,'0')}`,name,joined:Portal.referenceDate})); return {version:1,students,sessions:{[Portal.referenceDate]:{date:Portal.referenceDate,records:Object.fromEntries(students.map(s=>[s.id,'Present'])),savedAt:'2026-11-16T00:00:00.000Z'}}};};
