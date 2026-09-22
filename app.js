const BUILT_IN_GEMINI_API_KEY = 'AQ.Ab8RN6JqmByBDZbIJZSj_Bz88ule2cJ0qvdjZF-WMhNX3MtZTA';

const CONFIG = {
  version: '3.0.5',
  accountsUrl: 'https://raw.githubusercontent.com/ivansmirnov20151-afk/school/refs/heads/main/accounts',
  accountsFallbackUrl: 'https://raw.githubusercontent.com/ivansmirnov20151-afk/school/main/accounts',
  updateUrl: 'https://raw.githubusercontent.com/ivansmirnov20151-afk/chiat/refs/heads/main/shcoolupdata',
  electionsUrl: 'https://vybory.gov.ru/',
  geminiModel: 'gemini-3.8-flash',
  geminiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
};

const DAYS = [
  {n:1, short:'Пн', full:'Понедельник'}, {n:2, short:'Вт', full:'Вторник'},
  {n:3, short:'Ср', full:'Среда'}, {n:4, short:'Чт', full:'Четверг'},
  {n:5, short:'Пт', full:'Пятница'}, {n:6, short:'Сб', full:'Суббота'}, {n:7, short:'Вс', full:'Воскресенье'}
];
const BELLS = [
  {lessonNumber:1,start:'08:00',end:'08:40',duration:40,break:10,lunch:false},
  {lessonNumber:2,start:'08:50',end:'09:30',duration:40,break:10,lunch:false},
  {lessonNumber:3,start:'09:40',end:'10:20',duration:40,break:10,lunch:false},
  {lessonNumber:4,start:'10:30',end:'11:05',duration:35,break:20,lunch:true},
  {lessonNumber:5,start:'11:25',end:'12:00',duration:35,break:10,lunch:false},
  {lessonNumber:6,start:'12:10',end:'12:50',duration:40,break:30,lunch:false},
];
const DEFAULT_SCHEDULE = [
  [1,1,'Разговор о важном','309А',''],[1,2,'Физ-ра','Спортзал',''],[1,3,'Музыка','311В',''],[1,4,'Математика','209Г',''],[1,5,'Русский язык','107Г',''],[1,6,'История','309Г',''],
  [2,1,'Литература','107Г',''],[2,2,'География','216А',''],[2,3,'Математика','209Г',''],[2,4,'Русский язык','107Г',''],[2,5,'Английский язык','132В',''],
  [3,1,'Математика','209Г',''],[3,2,'Русский язык','107Г',''],[3,3,'Литература','107Г',''],[3,4,'Труд','115Б / 119Б',''],[3,5,'Труд','115Б / 119Б',''],[3,6,'Физ-ра','Спортзал',''],
  [4,1,'Математика','209Г',''],[4,2,'Русский язык','107Г',''],[4,3,'ИЗО','129Б',''],[4,4,'Биология','213А',''],[4,5,'Английский язык','202Г',''],[4,6,'История','309Г',''],
  [5,1,'Русский язык','107Г',''],[5,2,'История','309Г',''],[5,3,'Литература','107Г',''],[5,4,'Математика','209Г',''],[5,5,'Физ-ра','Спортзал',''],[5,6,'Семьеведение','241Б','']
].map(x=>lesson(...x));
const SUBJECTS = ['Математика','Русский язык','Литература','История','Обществознание','Биология','Английский язык','География','Информатика','Технология','Музыка','ИЗО','Физкультура'];
const DEFAULT_GRADES = [
  ['Математика',[5,5,4]],['Русский язык',[5,4,5]],['Литература',[5,5]],['История',[4,5]],['Обществознание',[5]],['Биология',[5,4]],['Английский язык',[4,5]],['География',[5]],['Информатика',[5,5]],['Технология',[5]],['Музыка',[5]],['ИЗО',[5]],['Физкультура',[5,5]]
].map(([subject,grades])=>({subject,grades}));
const SMART_SCHEDULE = [
  [1,1,'Разговор о важном','309А','Иванова О.А.'],[1,2,'Математика','209Г','Кузнецова Е.В.'],[1,3,'Русский язык','107Г','Смирнова Т.И.'],[1,4,'История','309Г','Федоров М.Н.'],[1,5,'Физ-ра','Спортзал','Соколов П.С.'],[1,6,'Музыка','311В','Васильева Н.П.'],
  [2,1,'Литература','107Г','Смирнова Т.И.'],[2,2,'География','216А','Морозова Л.Д.'],[2,3,'Математика','209Г','Кузнецова Е.В.'],[2,4,'Русский язык','107Г','Смирнова Т.И.'],[2,5,'Английский язык','132В','Петрова А.С.'],[2,6,'Биология','213А','Сидорова В.К.'],
  [3,1,'Математика','209Г','Кузнецова Е.В.'],[3,2,'Русский язык','107Г','Смирнова Т.И.'],[3,3,'Литература','107Г','Смирнова Т.И.'],[3,4,'Труд','115Б','Григорьев А.И.'],[3,5,'Труд','115Б','Григорьев А.И.'],[3,6,'Физ-ра','Спортзал','Соколов П.С.'],
  [4,1,'Информатика','302Б','Алексеев Д.В.'],[4,2,'Математика','209Г','Кузнецова Е.В.'],[4,3,'Русский язык','107Г','Смирнова Т.И.'],[4,4,'ИЗО','129Б','Николаева К.М.'],[4,5,'Английский язык','202Г','Петрова А.С.'],[4,6,'История','309Г','Федоров М.Н.'],
  [5,1,'Русский язык','107Г','Смирнова Т.И.'],[5,2,'История','309Г','Федоров М.Н.'],[5,3,'Литература','107Г','Смирнова Т.И.'],[5,4,'Математика','209Г','Кузнецова Е.В.'],[5,5,'Физ-ра','Спортзал','Соколов П.С.'],[5,6,'Семьеведение','241Б','Иванова О.А.'],
  [6,1,'Родной язык','107Г','Смирнова Т.И.'],[6,2,'Краеведение','216А','Морозова Л.Д.'],[6,3,'Проектная деятельность','302Б','Алексеев Д.В.']
].map(x=>lesson(...x));

function lesson(dayOfWeek, lessonNumber, subject, cabinet, teacher='', overrideDate=null){
  return {id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, dayOfWeek, lessonNumber, subject, cabinet, teacher, note:'', overrideDate};
}
const Store = {
  get(k,f){try{const v=localStorage.getItem('schedule_web_'+k);return v===null?f:JSON.parse(v)}catch{return f}},
  set(k,v){localStorage.setItem('schedule_web_'+k,JSON.stringify(v))},
  clear(){Object.keys(localStorage).filter(k=>k.startsWith('schedule_web_')).forEach(k=>localStorage.removeItem(k))}
};
const state = {
  lessons: Store.get('lessons', null) || structuredClone(DEFAULT_SCHEDULE),
  grades: Store.get('grades', null) || structuredClone(DEFAULT_GRADES),
  registered: Store.get('registered', false),
  guest: Store.get('guest', false),
  login: Store.get('login',''),
  displayName: Store.get('displayName',''),
  pin: Store.get('pin','2015'),
  unlocked: false,
  restricted: !Store.get('unlockedStatus', false),
  unlockedStatus: Store.get('unlockedStatus', false),
  verification: Store.get('verification',{status:'none',time:0,fio:'',birthDate:''}),
  selectedDay: new Date().getDay() === 0 ? 7 : new Date().getDay(),
  autoTrack: Store.get('autoTrack', true),
  manualActive: Store.get('manualActive', -1),
  notifications: Store.get('notifications', true),
  notifyMinutes: Store.get('notifyMinutes', 5),
  homework: Store.get('homework', []),
  rawUrl: Store.get('rawUrl',''),
  canPublish: Store.get('canPublish',false),
  accounts: [],
  aiMessages: Store.get('aiMessages', []),
  geminiKey: Store.get('geminiKey',BUILT_IN_GEMINI_API_KEY) || BUILT_IN_GEMINI_API_KEY,
  aiScheduleStep: 1,
  schedulePhoto: '', bellsPhoto:'', smartResult: [],
  activeTab:'schedule'
};
let splashSync = {accounts:false, update:false, homework:false, failed:false};

function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(msg,type=''){const root=document.getElementById('toast-root');const el=document.createElement('div');el.className='toast '+type;el.textContent=msg;root.appendChild(el);setTimeout(()=>el.remove(),3800)}
function saveState(){Store.set('lessons',state.lessons);Store.set('grades',state.grades);Store.set('registered',state.registered);Store.set('guest',state.guest);Store.set('login',state.login);Store.set('displayName',state.displayName);Store.set('pin',state.pin);Store.set('unlockedStatus',state.unlockedStatus);Store.set('verification',state.verification);Store.set('autoTrack',state.autoTrack);Store.set('manualActive',state.manualActive);Store.set('notifications',state.notifications);Store.set('notifyMinutes',state.notifyMinutes);Store.set('homework',state.homework);Store.set('rawUrl',state.rawUrl);Store.set('canPublish',state.canPublish);Store.set('aiMessages',state.aiMessages);Store.set('geminiKey',state.geminiKey)}
function timeToSec(t){const [h,m]=t.split(':').map(Number);return h*3600+m*60}
function fmtSec(s){s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function todayIso(){const d=new Date();return d.toISOString().slice(0,10)}
function activeLessonsForDay(day){return state.lessons.filter(l=>l.dayOfWeek===day && (!l.overrideDate || l.overrideDate===todayIso())).sort((a,b)=>a.lessonNumber-b.lessonNumber)}
function dayName(n){return DAYS.find(d=>d.n===n)?.full||'Понедельник'}
function lessonTime(num){return BELLS.find(b=>b.lessonNumber===num) || {start:'13:50',end:'14:30',duration:40,break:10,lunch:false}}
function overallAverage(){const all=state.grades.flatMap(s=>s.grades);return all.length?(all.reduce((a,b)=>a+b,0)/all.length).toFixed(2):'—'}
function escapeAttr(s=''){return esc(s).replace(/\n/g,' ')}

async function fetchText(url, timeout=6000){const c=new AbortController();const id=setTimeout(()=>c.abort(),timeout);try{const r=await fetch(url,{cache:'no-store',signal:c.signal});if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.text()}finally{clearTimeout(id)}}
function parseAccounts(text){const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean), out=[];let user=null,pass='',raw=null;for(const line of lines){const lower=line.toLowerCase();if(lower.startsWith('passworld:')||lower.startsWith('password:')||lower.startsWith('pass:'))pass=line.slice(line.indexOf(':')+1).trim();else if(lower.startsWith('raw:')||lower.startsWith('raw :')){let cand=line.slice(line.indexOf(':')+1).trim();raw=cand.startsWith('http')?cand:(line.includes('http')?line.slice(line.indexOf('http')).trim():cand)}else{if(user&&pass)out.push({username:user,password:pass,rawUrl:raw});user=line;pass='';raw=null}}if(user&&pass)out.push({username:user,password:pass,rawUrl:raw});return out}
function parseHomework(content, defaultAuthor){const blocks=content.split(/=== HOMEWORK ===|=== HOMEWORK===|===HOMEWORK===/), result=[];for(const block of blocks){if(!block.trim())continue;let ru='',en='',date='',task='',author=defaultAuthor;for(const lineRaw of block.split(/\r?\n/)){const line=lineRaw.trim(), lo=line.toLowerCase();if(lo.startsWith('subject_ru:')||lo.startsWith('предмет:'))ru=line.slice(line.indexOf(':')+1).trim();else if(lo.startsWith('subject:')||lo.startsWith('subject_en:'))en=line.slice(line.indexOf(':')+1).trim();else if(lo.startsWith('date:')||lo.startsWith('дата:'))date=line.slice(line.indexOf(':')+1).trim();else if(lo.startsWith('task:')||lo.startsWith('задание:')||lo.startsWith('дз:'))task=line.slice(line.indexOf(':')+1).trim();else if(lo.startsWith('author:')||lo.startsWith('автор:'))author=line.slice(line.indexOf(':')+1).trim();else if(line.includes('|')){const p=line.split('|').map(x=>x.trim());if(p.length>=3){ru=p[0];date=p[1];task=p[2]}}}if(ru&&task)result.push({id:crypto?.randomUUID?.()||Math.random().toString(36),subjectRu:ru,subjectEn:en||ru,date:date||'На след. урок',task,author:author||defaultAuthor})}return result}
async function syncGitHub(){
  const status=document.getElementById('splash-status');
  const detail=document.getElementById('splash-detail');
  if(status) status.textContent='Получаем данные из GitHub…';
  if(detail) detail.textContent='Подключаемся к серверу…';
  try{
    let txt;
    try{txt=await fetchText(CONFIG.accountsUrl)}catch{txt=await fetchText(CONFIG.accountsFallbackUrl)}
    state.accounts=parseAccounts(txt);
    splashSync.accounts=true;
    if(detail) detail.textContent=`Получено аккаунтов: ${state.accounts.length}`;
  }catch(e){
    splashSync.failed=true;
    if(detail) detail.textContent='GitHub недоступен — используются сохранённые данные';
  }
  try{
    const t=await fetchText(CONFIG.updateUrl);
    const u=parseUpdate(t);
    splashSync.update=true;
    if(u.remote && newer(u.remote,CONFIG.version)) state.remoteUpdate=u;
  }catch{}
  if(state.accounts.length){
    const jobs=state.accounts.filter(a=>a.rawUrl).map(async a=>{
      try{return parseHomework(await fetchText(a.rawUrl,5500),a.username)}catch{return []}
    });
    const chunks=await Promise.all(jobs);
    state.homework=uniqueHomework(chunks.flat());
    Store.set('homework',state.homework);
    splashSync.homework=true;
    if(detail) detail.textContent=`GitHub готов: аккаунтов ${state.accounts.length}, ДЗ ${state.homework.length}`;
  }
  return splashSync;
}
function parseUpdate(text){let version=null,updateUrl=null,announcement=null;for(const line of text.split(/\r?\n/)){const t=line.trim();const lo=t.toLowerCase();if(lo.startsWith('version-'))version=t.slice(8).trim();else if(lo.startsWith('version:'))version=t.slice(8).trim();else if(lo.startsWith('version='))version=t.slice(8).trim();else if(lo.startsWith('updata-')){const v=t.slice(7).trim();if(!/^(not|none)$/i.test(v)&&v)updateUrl=v}else if(lo.startsWith('updata:')){const v=t.slice(7).trim();if(!/^(not|none)$/i.test(v)&&v)updateUrl=v}else if(lo.startsWith('ancoment-')){const v=t.slice(9).trim();if(!/^(not|none)$/i.test(v)&&v)announcement=v}else if(lo.startsWith('ancoment:')){const v=t.slice(9).trim();if(!/^(not|none)$/i.test(v)&&v)announcement=v}}return{remote:(version||'').replace(/^v/i,''),updateUrl,announcement}}
function newer(a,b){const pa=a.replace(/^v/i,'').split('.').map(x=>parseInt(x)||0),pb=b.split('.').map(x=>parseInt(x)||0);for(let i=0;i<Math.max(pa.length,pb.length);i++){if((pa[i]||0)>(pb[i]||0))return true;if((pa[i]||0)<(pb[i]||0))return false}return a!==b}
function uniqueHomework(list){const seen=new Set(),out=[];for(const x of list){const k=`${x.subjectRu}_${x.date}_${x.task}`;if(!seen.has(k)){seen.add(k);out.push(x)}}return out}

function renderDays(){
 const el=document.getElementById('day-tabs');
 if(!el)return;
 el.innerHTML=DAYS.map(d=>`<button class="day-tab ${d.n===state.selectedDay?'active':''} ${d.n===state.todayDay?'today':''}" data-day="${d.n}">${d.short}<small>${d.full}</small></button>`).join('');
 el.querySelectorAll('.day-tab').forEach(b=>b.onclick=()=>{state.selectedDay=+b.dataset.day;renderAll()});
 const tb=document.getElementById('today-btn'); if(tb)tb.onclick=()=>{state.selectedDay=state.todayDay;renderAll()};
}
function renderSchedule(){
 const list=document.getElementById('schedule-list'); if(!list)return;
 const lessons=activeLessonsForDay(state.selectedDay);
 const ttl=document.getElementById('selected-day-title'), sub=document.getElementById('selected-day-subtitle');
 if(ttl)ttl.textContent=dayName(state.selectedDay);
 if(sub)sub.textContent=`5Б · ${lessons.length?lessons.length:'нет'} ${lessons.length===1?'урок':lessons.length<5?'урока':'уроков'}`;
 if(!lessons.length){list.innerHTML=`<div class="empty">На ${dayName(state.selectedDay).toLowerCase()} уроков нет</div>`;return}
 list.innerHTML=lessons.map(l=>{
  const t=lessonTime(l.lessonNumber);
  const active=!state.restricted&&currentStatus().activeLessonNumber===l.lessonNumber&&state.selectedDay===state.todayDay;
  const hw=state.homework.find(h=>h.subjectRu?.toLowerCase()===l.subject?.toLowerCase()||h.subjectEn?.toLowerCase()===l.subject?.toLowerCase());
  const bell=BELLS.find(b=>b.lessonNumber===l.lessonNumber);
  return `<div class="lesson-row ${active?'active':''}" data-lesson-id="${escapeAttr(l.id)}">
   <div class="lesson-num"><div>${l.lessonNumber}</div><span>${bell?.start||t.start}</span><small>${bell?.end||t.end}</small></div>
   <div class="lesson-main"><div class="lesson-subject">${esc(l.subject)} ${l.overrideDate?'<span class="replace-badge">Замена</span>':''} ${active?'<span class="now-badge">СЕЙЧАС</span>':''}</div>
    <div class="lesson-time">Каб. ${esc(l.cabinet)}${l.teacher?` · ${esc(l.teacher)}`:''}</div>
    ${hw?`<div class="lesson-hw">📖 ДЗ (${esc(hw.date)}): ${esc(hw.task)}</div>`:''}</div>
   <div class="row-actions"><button class="circle-action" data-edit="${escapeAttr(l.id)}" title="Изменить">✎</button><button class="circle-action" data-details="${escapeAttr(l.id)}" title="Подробнее">⋯</button></div>
  </div>${bell?.lunch?'<div class="lunch-divider"><span>🍴</span><b>Обед и питание: 11:05 – 11:25 (20 минут)</b></div>':''}`;
 }).join('');
 list.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openEdit(b.dataset.edit));
 list.querySelectorAll('[data-details]').forEach(b=>b.onclick=()=>openDetails(b.dataset.details));
}
function renderGradesSummary(){
 const avg=overallAverage(), all=state.grades.flatMap(s=>s.grades);
 const a=document.getElementById('overall-average'), c=document.getElementById('grades-count');
 if(a)a.textContent=avg; if(c)c.textContent=`${all.length} ${all.length===1?'оценка':all.length<5?'оценки':'оценок'}`;
}

function renderHomework(){const el=document.getElementById('homework-list');document.getElementById('homework-subtitle').textContent=state.homework.length?`Получено из GitHub Raw: ${state.homework.length}`:'Нет опубликованных заданий или GitHub пока недоступен';if(!state.homework.length){el.innerHTML='<div class="empty">Домашних заданий пока нет.</div>';return}el.innerHTML=state.homework.slice(0,30).map(h=>`<article class="hw-item"><div class="hw-meta"><span>${esc(h.date)}</span><span>${esc(h.author)}</span></div><div class="hw-subject">${esc(h.subjectRu)}</div><div class="hw-task">${esc(h.task)}</div></article>`).join('')}

function getLessonsUntilLunch(status){
 const n=status?.activeLessonNumber||0;
 if(status?.type==='IN_LUNCH_BREAK'||status?.type==='AFTER_SCHOOL'||status?.type==='WEEKEND')return 0;
 if(status?.type==='BEFORE_SCHOOL')return 4;
 return Math.max(0,4-n);
}
function currentStatus(){
 const now=new Date(), day=now.getDay()===0?7:now.getDay(), sec=now.getHours()*3600+now.getMinutes()*60+now.getSeconds(), lessons=activeLessonsForDay(day);
 if(day>5)return {type:'WEEKEND',headline:'Выходной день',sub:'Уроков сегодня нет. Отдыхайте!',remaining:0,total:1,progress:1,activeLessonNumber:null,nextLessonNumber:1,nextSubject:activeLessonsForDay(1)[0]?.subject||'Разговор о важном',nextCabinet:activeLessonsForDay(1)[0]?.cabinet||'309А'};
 const first=BELLS[0], last=BELLS[BELLS.length-1], schoolStart=timeToSec(first.start), schoolEnd=timeToSec(last.end);
 const lessonsUntilLunch = Math.max(0, Math.min(4, 4 - ((lessons.find(l=>l.lessonNumber===4)?.lessonNumber && sec>=timeToSec(BELLS[0].start)) ? 0 : 0)));if(sec<schoolStart){const l=lessons[0];return {type:'BEFORE_SCHOOL',headline:'До начала уроков',sub:`Следующий: 1-й урок — ${l?.subject||'Урок'} (Каб. ${l?.cabinet||'—'})`,remaining:schoolStart-sec,total:3600,progress:0,activeLessonNumber:null,nextLessonNumber:1,nextSubject:l?.subject||'1-й урок',nextCabinet:l?.cabinet||''}}
 if(sec>=schoolEnd+last.break*60){return {type:'AFTER_SCHOOL',headline:'Уроки на сегодня окончены',sub:'Все занятия прошли. До завтра!',remaining:0,total:1,progress:1,activeLessonNumber:null,nextLessonNumber:null,nextSubject:null,nextCabinet:null}}
 for(const b of BELLS){const s=timeToSec(b.start),e=timeToSec(b.end),be=e+b.break*60;const cur=lessons.find(l=>l.lessonNumber===b.lessonNumber),next=lessons.find(l=>l.lessonNumber===b.lessonNumber+1);if(sec>=s&&sec<e)return {type:'IN_LESSON',headline:`${b.lessonNumber}-й урок: ${cur?.subject||'Урок'}`,sub:`Кабинет: ${cur?.cabinet||'—'} (${b.start} – ${b.end})`,remaining:e-sec,total:b.duration*60,progress:(sec-s)/(b.duration*60),activeLessonNumber:b.lessonNumber,nextLessonNumber:next?b.lessonNumber+1:null,nextSubject:next?.subject,nextCabinet:next?.cabinet};if(sec>=e&&sec<be){const lunch=b.lunch||b.lessonNumber===4;return {type:lunch?'IN_LUNCH_BREAK':'IN_BREAK',headline:lunch?'Обед и питание (20 мин)':`Перемена (${b.break} мин)`,sub:lunch?`Перемена с питанием до ${BELLS.find(x=>x.lessonNumber===5)?.start||'11:25'}. Следующий: ${next?.subject||'Урок 5'}`:`Идите в каб. ${next?.cabinet||'—'} на ${next?.subject||'следующий урок'}`,remaining:be-sec,total:b.break*60,progress:(sec-e)/(b.break*60),activeLessonNumber:null,nextLessonNumber:next?b.lessonNumber+1:null,nextSubject:next?.subject||'Следующий урок',nextCabinet:next?.cabinet||'—'} }
 }
 return {type:'AFTER_SCHOOL',headline:'Уроки завершены',sub:'До завтра!',remaining:0,total:1,progress:1,activeLessonNumber:null,nextLessonNumber:null};
}
function renderStatus(){
 const now=new Date(); state.todayDay=now.getDay()===0?7:now.getDay();
 const h=now.getHours();
 const g=h>=5&&h<=11?['Доброе утро, 5Б!','☀️']:h<=17?['Добрый день, 5Б!','🌤️']:h<=22?['Добрый вечер, 5Б!','🌆']:['Доброй ночи, 5Б!','🌙'];
 const greet=document.getElementById('greeting'); if(greet)greet.textContent=state.displayName?g[0].replace('5Б',state.displayName):g[0];
 const ge=document.getElementById('greeting-emoji'); if(ge)ge.textContent=g[1];
 const gd=document.getElementById('greeting-date'); if(gd){const ru=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];gd.textContent=`${now.getDate()} ${ru[now.getMonth()]}`;}
 const gv=document.getElementById('greeting-version'); if(gv)gv.textContent=`v${CONFIG.version}`;
 const s=currentStatus();
 const pill=document.getElementById('hero-status-pill');
 const kicker=document.getElementById('hero-kicker'); const title=document.getElementById('hero-title'); const sub=document.getElementById('hero-sub');
 const cabinet=document.getElementById('hero-cabinet'); const timer=document.getElementById('status-timer'); const prog=document.getElementById('status-progress');
 const bottom=document.getElementById('hero-bottom-text');
 const statusMap={IN_LESSON:'ИДЁТ УРОК',IN_LUNCH_BREAK:'ПЕРЕМЕНА • ОБЕД',IN_BREAK:'ПЕРЕМЕНА',BEFORE_SCHOOL:'ДО НАЧАЛА',AFTER_SCHOOL:'УРОКИ ЗАВЕРШЕНЫ',WEEKEND:'ВЫХОДНОЙ'};
 if(pill)pill.textContent=statusMap[s.type]||'СТАТУС';
 if(kicker)kicker.textContent=s.type==='IN_LESSON'?`${s.activeLessonNumber}-й урок`:(s.type==='IN_LUNCH_BREAK'?'ПИТАНИЕ И ОБЕД':'ТЕКУЩИЙ СТАТУС');
 if(title)title.textContent=s.type==='IN_LESSON'?(s.activeSubject||'Урок'):s.type==='IN_LUNCH_BREAK'?'Обед в столовой 🍲':s.type==='IN_BREAK'?'Отдых между уроками':s.headline;
 if(sub)sub.textContent=s.type==='IN_LESSON'?`Кабинет: ${s.activeCabinet||'—'} · ${BELLS.find(b=>b.lessonNumber===s.activeLessonNumber)?.start||''} – ${BELLS.find(b=>b.lessonNumber===s.activeLessonNumber)?.end||''}`:s.sub;
 if(cabinet)cabinet.textContent=s.activeCabinet?`Каб. ${s.activeCabinet}`:'';
 if(timer)timer.textContent=`${fmtSec(s.remaining)} осталось`;
 if(prog)prog.style.width=`${Math.round((s.progress||0)*100)}%`;
 if(bottom)bottom.textContent=s.type==='IN_LESSON'?'Урок в процессе':s.sub;
 s.lessonsUntilLunch=getLessonsUntilLunch(s);
 const next=activeLessonsForDay(state.todayDay).find(l=>l.lessonNumber===s.nextLessonNumber);
 const nh=document.getElementById('next-headline'), ns=document.getElementById('next-sub');
 if(nh)nh.textContent=s.nextSubject||next?.subject||'Нет уроков';
 if(ns)ns.textContent=s.nextCabinet?`Кабинет ${s.nextCabinet}`:'По расписанию';
 const lunch=document.getElementById('lunch-headline'), lunchSub=document.getElementById('lunch-sub');
 if(lunch){if(s.type==='IN_LUNCH_BREAK')lunch.textContent='СЕЙЧАС ОБЕД';else if(s.type==='AFTER_SCHOOL')lunch.textContent='Завершен';else {const n=Math.max(0, s.lessonsUntilLunch ?? 4); lunch.textContent=n===1?'1 урок':`${n} ${n<5?'урока':'уроков'}`;}}
 if(lunchSub)lunchSub.textContent=s.type==='IN_LUNCH_BREAK'?'До 11:25 (20 мин)':'Обед в 11:05 • 20 мин';
 const restricted=document.getElementById('restricted-banner'); if(restricted)restricted.classList.toggle('hidden',!state.restricted);
 const dot=document.getElementById('widget-dot'); if(dot)dot.style.background=state.notifications?'#4ADE80':'#9CA3AF';
}

function renderAll(){renderDays();renderSchedule();renderGradesSummary();renderHomework();renderStatus();document.querySelectorAll('.requires-access').forEach(el=>el.classList.toggle('hidden',state.restricted));document.getElementById('locked-content')?.classList.toggle('hidden',!state.restricted);document.querySelectorAll('.restricted-aware').forEach(b=>b.classList.toggle('disabled-look',state.restricted));document.querySelectorAll('.liquid-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.activeTab));const hl=document.getElementById('liquid-highlight');if(hl){const i=['schedule','ai','grades','bells','settings'].indexOf(state.activeTab);hl.style.transform=`translateX(${Math.max(0,i)*100}%)`}}

function closeModal(){document.getElementById('modal-root').innerHTML=''}
function modal(html, cls=''){document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop"><div class="modal ${cls}">${html}</div></div>`;document.querySelector('.modal-backdrop').addEventListener('click',e=>{if(e.target.classList.contains('modal-backdrop'))closeModal()})}
function head(title,subtitle=''){return `<div class="modal-head"><div><div class="modal-title">${esc(title)}</div>${subtitle?`<div class="modal-subtitle">${esc(subtitle)}</div>`:''}</div><button class="modal-close" data-close>✕</button></div>`}
function bindClose(){document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeModal)}
function openAuth(){
 let mode='choose', verified='';
 const draw=()=>{let body='';if(mode==='choose')body=`${head('Добро пожаловать','Войдите через аккаунт школы или продолжите как гость')}<div class="modal-body auth-shell"><button class="auth-option" id="authLogin"><span class="auth-icon">👤</span><span><b>Войти по логину и паролю</b><small class="muted" style="display:block;margin-top:3px">Получение аккаунта из GitHub</small></span></button><button class="auth-option" id="authGuest"><span class="auth-icon">🎒</span><span><b>Вход как гость</b><small class="muted" style="display:block;margin-top:3px">Просмотр расписания и домашних заданий</small></span></button></div>`;
 else if(mode==='login')body=`${head('Вход в аккаунт','Данные проверяются по базе GitHub')}<div class="modal-body"><div class="form-grid"><div class="field full"><label>Логин</label><input id="loginField" class="input" autocomplete="username"></div><div class="field full"><label>Пароль</label><input id="passField" type="password" class="input" autocomplete="current-password"></div></div><div id="authErr" class="help-text" style="color:#b91c1c;margin-top:10px"></div><div class="modal-footer"><button class="ghost" id="authBack">Назад</button><button class="primary" id="authNext">Проверить</button></div></div>`;
 else if(mode==='guest')body=`${head('Вход как гость','Ограниченный режим с локальным профилем')}<div class="modal-body"><div class="field"><label>Имя</label><input id="guestName" class="input" placeholder="Например, Иван"></div><div class="modal-footer"><button class="ghost" id="authBack">Назад</button><button class="primary" id="guestNext">Далее</button></div></div>`;
 else if(mode==='name')body=`${head('Ваше имя','После этого зададим PIN-код')}<div class="modal-body"><div class="field"><label>Отображаемое имя</label><input id="displayNameField" class="input" value="${escapeAttr(state.displayName||verified)}"></div><div class="modal-footer"><button class="ghost" id="authBack">Назад</button><button class="primary" id="nameNext">Далее</button></div></div>`;
 else if(mode==='pin')body=`${head('Создание PIN-кода','Нужен 4-значный код для входа')}<div class="modal-body"><div class="field"><label>4-значный PIN-код</label><input id="pin1" class="input" inputmode="numeric" maxlength="4" type="password"></div><div class="modal-footer"><button class="ghost" id="authBack">Назад</button><button class="primary" id="pinNext">Далее</button></div></div>`;
 else body=`${head('Подтверждение PIN-кода','Введите тот же PIN-код ещё раз')}<div class="modal-body"><div class="field"><label>Повторите PIN-код</label><input id="pin2" class="input" inputmode="numeric" maxlength="4" type="password"></div><div id="pinErr" class="help-text" style="color:#b91c1c;margin-top:8px"></div><div class="modal-footer"><button class="ghost" id="authBack">Назад</button><button class="primary" id="finishAuth">Завершить и войти</button></div></div>`;
 modal(body);bindClose();
 document.getElementById('authLogin')?.addEventListener('click',()=>{mode='login';draw()});document.getElementById('authGuest')?.addEventListener('click',()=>{mode='guest';draw()});document.getElementById('authBack')?.addEventListener('click',()=>{mode=mode==='pin'?'name':mode==='confirm'?'pin':mode==='name'?(verified?'login':'choose'):'choose';draw()});
 document.getElementById('authNext')?.addEventListener('click',async()=>{const login=document.getElementById('loginField').value.trim(),pass=document.getElementById('passField').value.trim(),er=document.getElementById('authErr');if(!login||!pass){er.textContent='Заполните логин и пароль.';return}if(!state.accounts.length)try{let t=await fetchText(CONFIG.accountsUrl);state.accounts=parseAccounts(t)}catch{try{let t=await fetchText(CONFIG.accountsFallbackUrl);state.accounts=parseAccounts(t)}catch{}}const acc=state.accounts.find(a=>a.username.toLowerCase()===login.toLowerCase());if(!acc){er.textContent=`Логин «${login}» отсутствует в списке зарегистрированных аккаунтов школы.`;return}if(acc.password!==pass){er.textContent='Неверный пароль. Проверьте введённые символы.';return}verified=acc.username;state.pendingRawUrl=acc.rawUrl||'';mode='name';draw()});
 document.getElementById('guestNext')?.addEventListener('click',()=>{const n=document.getElementById('guestName').value.trim();if(!n){toast('Введите имя','err');return}verified='';state.pendingRawUrl='';state.pendingGuestName=n;mode='pin';draw()});
 document.getElementById('nameNext')?.addEventListener('click',()=>{const n=document.getElementById('displayNameField').value.trim();if(!n){toast('Введите имя','err');return}state.pendingName=n;mode='pin';draw()});
 document.getElementById('pinNext')?.addEventListener('click',()=>{const p=document.getElementById('pin1').value.replace(/\D/g,'');if(p.length!==4){toast('PIN должен состоять из 4 цифр','err');return}state.pendingPin=p;mode='confirm';draw()});
 document.getElementById('finishAuth')?.addEventListener('click',()=>{const p=document.getElementById('pin2').value.replace(/\D/g,'');if(p!==state.pendingPin){document.getElementById('pinErr').textContent='PIN-коды не совпадают! Попробуйте снова.';return}state.registered=true;state.guest=!!state.pendingGuestName;state.login=state.guest?'':verified;state.displayName=state.pendingName||state.pendingGuestName||verified||'Гость';state.pin=state.pendingPin;state.unlocked=true;state.restricted=!state.unlockedStatus;state.rawUrl=state.pendingRawUrl||'';state.canPublish=!!state.rawUrl;saveState();closeModal();renderAll();refreshHomework(true);toast('Добро пожаловать, '+state.displayName+'!','ok')});
 };
 draw();
}
function openPin(){let entered='';const draw=()=>{const dots=[0,1,2,3].map(i=>`<span class="pin-dot ${i<entered.length?'filled':''}"></span>`).join('');modal(`<div class="pin-screen" style="min-height:auto;padding:10px;background:transparent"><div class="pin-card"><div class="modal-title">Введите PIN-код</div><div class="modal-subtitle">${state.displayName?esc(state.displayName):'Расписание и звонки'}</div><div class="pin-dots">${dots}</div><div class="help-text" id="pinHelp">Введите PIN-код или воспользуйтесь быстрым входом</div><div class="keypad">${['1','2','3','4','5','6','7','8','9','⌫','0','✓'].map(k=>`<button class="key" data-key="${k}">${k}</button>`).join('')}</div><button id="fastUnlock" class="ghost" style="width:100%;margin-top:10px">◉ Быстрый вход</button></div></div>`,'');document.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>{const k=b.dataset.key;if(k==='⌫')entered=entered.slice(0,-1);else if(k==='✓'){if(entered.length===4)finish();}else if(/\d/.test(k)&&entered.length<4)entered+=k;draw()});document.getElementById('fastUnlock').onclick=()=>{entered=state.pin;finish()};};const finish=()=>{if(entered===state.pin){state.unlocked=true;state.restricted=!state.unlockedStatus;closeModal();renderAll();maybeUpdateCheck()}else{entered='';document.getElementById('modal-root').querySelector('#pinHelp').textContent='Неверный PIN! Попробуйте снова';document.getElementById('modal-root').querySelector('#pinHelp').style.color='#dc2626'}};draw()}
async function maybeUpdateCheck(manual=false){try{const t=await fetchText(CONFIG.updateUrl,5000);const u=parseUpdate(t);if(u.remote&&newer(u.remote,CONFIG.version)){openUpdate(u)}else if(manual)toast(`У вас актуальная версия v${CONFIG.version}`,'ok')}catch{if(manual)toast('Нет соединения с интернетом для проверки обновлений','err')}}
function openUpdate(u){modal(`${head('Данная версия не поддерживается',`Текущая v${CONFIG.version} · доступна v${u.remote}`)}<div class="modal-body"><div class="update-box"><b>Для продолжения работы необходимо установить актуальную версию.</b><p class="help-text">${esc(u.announcement||'Добавлены новые функции и улучшения расписания, оптимизация таймера и исправления стабильности.')}</p><div class="modal-footer"><button class="ghost" id="updateRecheck">Проверить снова</button>${u.updateUrl?`<button class="primary" id="updateGo">Установить обновление</button>`:''}</div></div></div>`);bindClose();document.getElementById('updateGo')?.addEventListener('click',()=>window.open(u.updateUrl,'_blank','noopener'));document.getElementById('updateRecheck')?.addEventListener('click',()=>maybeUpdateCheck(true))}

function openDetails(id){const l=state.lessons.find(x=>String(x.id)===String(id));if(!l)return;const t=lessonTime(l.lessonNumber), hw=state.homework.filter(h=>h.subjectRu.toLowerCase()===l.subject.toLowerCase());modal(`${head(`${l.lessonNumber}-й урок: ${l.subject}`,'Подробности урока')}<div class="modal-body"><div class="account-info"><b>Время:</b> ${t.start} – ${t.end}<br><b>Кабинет:</b> ${esc(l.cabinet)}<br><b>Учитель:</b> ${esc(l.teacher||'—')}<br><b>День:</b> ${dayName(l.dayOfWeek)}</div><div style="margin-top:14px"><b>Домашнее задание</b>${hw.length?hw.map(h=>`<div class="hw-item" style="margin-top:9px"><div class="hw-meta"><span>${esc(h.date)}</span><span>${esc(h.author)}</span></div><div class="hw-task">${esc(h.task)}</div></div>`).join(''):'<div class="empty" style="margin-top:9px">Для этого предмета заданий нет.</div>'}</div><div class="modal-footer"><button class="ghost" data-close>Закрыть</button>${!state.restricted?`<button class="primary" id="detailEdit">Изменить урок</button>`:''}</div></div>`);bindClose();document.getElementById('detailEdit')?.addEventListener('click',()=>{closeModal();openEdit(id)})}
function openEdit(id){if(state.restricted){restrictedNotice();return}const l=state.lessons.find(x=>String(x.id)===String(id));if(!l)return;modal(`${head(`Редактировать ${l.lessonNumber}-й урок`,'Изменения сохраняются в браузере')}<div class="modal-body"><div class="form-grid"><div class="field full"><label>Предмет</label><input id="editSubject" class="input" value="${escapeAttr(l.subject)}"></div><div class="field"><label>Кабинет</label><input id="editCab" class="input" value="${escapeAttr(l.cabinet)}"></div><div class="field"><label>Учитель</label><input id="editTeacher" class="input" value="${escapeAttr(l.teacher)}"></div><div class="field full"><label>Режим изменения</label><select id="editScope" class="select"><option value="permanent">Навсегда (в расписание)</option><option value="today">Только сегодня</option></select></div></div><div class="modal-footer"><button class="ghost" id="editCancel">Отмена</button><button class="ghost" id="editDelete">Удалить урок</button><button class="primary" id="editSave">Сохранить</button></div></div>`);bindClose();document.getElementById('editCancel').onclick=closeModal;document.getElementById('editDelete').onclick=()=>{state.lessons=state.lessons.filter(x=>String(x.id)!==String(id));saveState();closeModal();renderAll();toast('Урок удалён')};document.getElementById('editSave').onclick=()=>{const subj=document.getElementById('editSubject').value.trim();if(!subj){toast('Введите предмет','err');return}if(document.getElementById('editScope').value==='today'){state.lessons.push(lesson(l.dayOfWeek,l.lessonNumber,subj,document.getElementById('editCab').value.trim(),document.getElementById('editTeacher').value.trim(),todayIso()))}else{l.subject=subj;l.cabinet=document.getElementById('editCab').value.trim();l.teacher=document.getElementById('editTeacher').value.trim();l.overrideDate=null}saveState();closeModal();renderAll();toast('Урок сохранён','ok')}}
function openAddLesson(){if(state.restricted){restrictedNotice();return}modal(`${head('Добавить урок',`Добавить урок на ${dayName(state.selectedDay).toLowerCase()}`)}<div class="modal-body"><div class="form-grid"><div class="field"><label>Номер урока</label><select id="addNum" class="select">${Array.from({length:8},(_,i)=>`<option value="${i+1}">${i+1}-й урок</option>`).join('')}</select></div><div class="field"><label>Предмет</label><input id="addSubject" class="input" list="subjectList" placeholder="Математика"><datalist id="subjectList">${SUBJECTS.map(s=>`<option value="${s}">`).join('')}</datalist></div><div class="field"><label>Кабинет</label><input id="addCab" class="input" placeholder="209Г"></div><div class="field"><label>Учитель</label><input id="addTeacher" class="input" placeholder="Кузнецова Е.В."></div></div><div class="modal-footer"><button class="ghost" data-close>Отмена</button><button class="primary" id="addSave">Добавить</button></div></div>`);bindClose();document.getElementById('addSave').onclick=()=>{const num=+document.getElementById('addNum').value,subj=document.getElementById('addSubject').value.trim();if(!subj){toast('Введите предмет','err');return}state.lessons=state.lessons.filter(l=>!(l.dayOfWeek===state.selectedDay&&l.lessonNumber===num&&!l.overrideDate));state.lessons.push(lesson(state.selectedDay,num,subj,document.getElementById('addCab').value.trim(),document.getElementById('addTeacher').value.trim()));saveState();closeModal();renderAll();toast('Урок добавлен','ok')}}
function restrictedNotice(){modal(`${head('Доступ заблокирован','Функции требуют подтверждения') }<div class="modal-body"><p class="help-text">Функции звонков, настроек и полного расписания заблокированы, так как не подтверждён статус. Откройте поддержку и выберите вариант подтверждения.</p><div class="modal-footer"><button class="ghost" data-close>Позже</button><button class="primary" id="restrictedSupport">Написать в поддержку</button></div></div>`);bindClose();document.getElementById('restrictedSupport').onclick=()=>{closeModal();openSupport()}}

function openBells(){if(state.restricted){restrictedNotice();return}const items=BELLS.map(b=>`<div class="lesson-row"><div class="lesson-num">${b.lessonNumber}</div><div><div class="lesson-subject">${b.lessonNumber}-й урок</div><div class="lesson-time">${b.start} – ${b.end}</div></div><div class="cabinet">${b.duration} мин</div><div class="timer-badge">${b.lunch?'🍽️ Обед после урока':'Перемена '+b.break+' мин'}</div></div>`).join('');modal(`${head('Расписание звонков','1 смена · 5Б')}<div class="modal-body"><div class="schedule-list">${items}</div><div class="empty" style="margin-top:12px">Обеденная перемена: 11:05 – 11:25 (после 4-го урока)</div></div>`);bindClose()}
function openGrades(){if(state.restricted){restrictedNotice();return}const rows=state.grades.map((s,idx)=>`<div class="hw-item"><div class="section-head"><div><b>${esc(s.subject)}</b><div class="muted">Средний: ${s.grades.length?(s.grades.reduce((a,b)=>a+b,0)/s.grades.length).toFixed(2):'—'}</div></div><button class="primary small" data-grade-add="${idx}">＋ Оценка</button></div><div class="grade-chips">${s.grades.map((g,i)=>`<button class="grade-chip" data-grade-remove="${idx}|${i}">${g} ×</button>`).join('')||'<span class="muted">Нет оценок</span>'}</div></div>`).join('');modal(`${head('Мои оценки и баллы','Нажмите на оценку, чтобы удалить')}<div class="modal-body"><div class="update-box"><b>Общий средний балл: ${overallAverage()}</b><p class="help-text">Оценки хранятся локально и можно изменять вручную.</p></div><div class="schedule-list" style="margin-top:12px">${rows}</div><div class="modal-footer"><button class="ghost" id="gradesReset">Восстановить исходные</button><button class="ghost" data-close>Закрыть</button></div></div>`);bindClose();document.querySelectorAll('[data-grade-remove]').forEach(b=>b.onclick=()=>{const [si,gi]=b.dataset.gradeRemove.split('|').map(Number);state.grades[si].grades.splice(gi,1);saveState();openGrades();renderGradesSummary()});document.querySelectorAll('[data-grade-add]').forEach(b=>b.onclick=()=>{const si=+b.dataset.gradeAdd;modal(`${head('Поставить оценку',state.grades[si].subject)}<div class="modal-body"><div class="keypad">${[5,4,3,2].map(g=>`<button class="key" data-new-grade="${g}">${g}</button>`).join('')}</div></div>`);bindClose();document.querySelectorAll('[data-new-grade]').forEach(x=>x.onclick=()=>{state.grades[si].grades.push(+x.dataset.newGrade);saveState();closeModal();openGrades();renderGradesSummary()})});document.getElementById('gradesReset').onclick=()=>{state.grades=structuredClone(DEFAULT_GRADES);saveState();openGrades();renderGradesSummary()}}

function openSupport(){const v=state.verification;const remaining=v.status==='pending'?Math.max(0,300-Math.floor((Date.now()-v.time)/1000)):0;modal(`${head('Служба поддержки','Помощь с доступом, расписанием и PIN')}<div class="modal-body"><div class="support-list"><button class="support-option" id="supportAdult"><span><b>18+ / подтверждение участия</b><small class="muted" style="display:block;margin-top:3px">Открыть официальный сайт выборов</small></span><span>↗</span></button><button class="support-option" id="supportChild"><span><b>Я ребёнок</b><small class="muted" style="display:block;margin-top:3px">ФИО и дата рождения · авто-подтверждение через 5 минут</small></span><span>👦</span></button><button class="support-option" id="supportFaq"><span><b>Частые вопросы</b><small class="muted" style="display:block;margin-top:3px">Как работают звонки, уведомления и PIN</small></span><span>?</span></button></div><div id="supportExtra" style="margin-top:14px">${v.status==='pending'?`<div class="update-box"><b>Заявка проверяется</b><p class="help-text">Ровно через 5 минут статус изменится на «Обработано». Осталось: <span id="supportTimer">${fmtSec(remaining)}</span></p></div>`:v.status==='approved'?`<div class="update-box"><b>Статус подтверждён</b><p class="help-text">Ограничения сняты.</p></div>`:`<div class="empty">Выберите пункт выше.</div>`}</div><div class="modal-footer"><button class="ghost" data-close>Закрыть</button></div></div>`);bindClose();document.getElementById('supportAdult').onclick=()=>{state.unlockedStatus=true;state.restricted=false;saveState();window.open(CONFIG.electionsUrl,'_blank','noopener');closeModal();renderAll();toast('Доступ открыт','ok')};document.getElementById('supportChild').onclick=()=>openChildForm();document.getElementById('supportFaq').onclick=()=>openFaq();}
function openChildForm(){const v=state.verification;modal(`${head('Я ребёнок','Укажите данные учащегося')}<div class="modal-body"><div class="form-grid"><div class="field full"><label>ФИО</label><input id="fio" class="input" value="${escapeAttr(v.fio)}" placeholder="Иванов Иван Иванович"></div><div class="field full"><label>Дата рождения</label><input id="birth" type="date" class="input" value="${escapeAttr(v.birthDate)}"></div></div><p class="help-text" style="margin-top:12px">Сайт хранит введённые данные только в localStorage этого браузера.</p><div class="modal-footer"><button class="ghost" data-close>Отмена</button><button class="primary" id="submitChild">Отправить заявку</button></div></div>`);bindClose();document.getElementById('submitChild').onclick=()=>{const fio=document.getElementById('fio').value.trim(),birth=document.getElementById('birth').value;if(!fio||!birth){toast('Заполните ФИО и дату рождения','err');return}state.verification={status:'pending',time:Date.now(),fio,birthDate:birth};saveState();closeModal();renderAll();toast('Заявка отправлена. Через 5 минут доступ откроется автоматически.','ok');openSupport()}}
function openFaq(){modal(`${head('Техническая поддержка','Частые вопросы')}<div class="modal-body"><div class="schedule-list"><div class="hw-item"><b>Почему заблокированы расписание и звонки?</b><p class="help-text">Для снятия блокировки используйте подтверждение в меню поддержки.</p></div><div class="hw-item"><b>Как работают уведомления?</b><p class="help-text">Уведомления можно включить в настройках. В веб-версии напоминания работают, пока страница открыта.</p></div><div class="hw-item"><b>Когда обед?</b><p class="help-text">11:05 – 11:25, после 4-го урока.</p></div><div class="hw-item"><b>Какой стандартный PIN?</b><p class="help-text">2015. Его можно сменить в настройках.</p></div></div><div class="modal-footer"><button class="ghost" data-close>Закрыть</button></div></div>`);bindClose()}

function openSettings(){if(state.restricted){restrictedNotice();return}modal(`${head('Настройки','Параметры веб-версии')}<div class="modal-body"><div class="setting-row"><div><div class="setting-label">Уведомлять перед началом урока</div><div class="setting-sub">За ${state.notifyMinutes} мин · при открытой странице</div></div><button class="switch ${state.notifications?'on':''}" id="setNotifications"></button></div><div class="setting-row"><div><div class="setting-label">Автоматически подсвечивать текущий урок</div><div class="setting-sub">По системному времени</div></div><button class="switch ${state.autoTrack?'on':''}" id="setAuto"></button></div><div class="setting-row"><div><div class="setting-label">Сменить PIN-код</div><div class="setting-sub">Текущий: ${esc(state.pin)}</div></div><button class="ghost small" id="changePin">Изменить</button></div><div class="setting-row"><div><div class="setting-label">Gemini API</div><div class="setting-sub">Ключ хранится только локально; нужен для ИИ</div></div><button class="ghost small" id="aiKeyBtn">Настроить</button></div><div class="setting-row"><div><div class="setting-label">Обновления</div><div class="setting-sub">Текущая версия v${CONFIG.version}</div></div><button class="ghost small" id="checkUpdate">Проверить</button></div><div class="setting-row"><div><div class="setting-label">Восстановить исходное расписание 5Б</div><div class="setting-sub">Удалит ваши изменения расписания</div></div><button class="ghost small" id="resetSchedule">Восстановить</button></div><div class="setting-row"><div><div class="setting-label">Заблокировать приложение</div><div class="setting-sub">Потребуется PIN при следующем входе</div></div><button class="ghost small" id="lockNow">Заблокировать</button></div><div class="setting-row"><div><div class="setting-label">Тест уведомления</div><div class="setting-sub">Запросить системное разрешение</div></div><button class="primary small" id="testNotify">Тест</button></div><div class="modal-footer"><button class="ghost" data-close>Закрыть</button></div></div>`);bindClose();document.getElementById('setNotifications').onclick=()=>{state.notifications=!state.notifications;saveState();openSettings();};document.getElementById('setAuto').onclick=()=>{state.autoTrack=!state.autoTrack;saveState();openSettings();renderAll()};document.getElementById('changePin').onclick=openChangePin;document.getElementById('aiKeyBtn').onclick=openAiKey;document.getElementById('checkUpdate').onclick=()=>maybeUpdateCheck(true);document.getElementById('resetSchedule').onclick=()=>{state.lessons=structuredClone(DEFAULT_SCHEDULE);saveState();renderAll();toast('Исходное расписание восстановлено','ok');openSettings()};document.getElementById('lockNow').onclick=()=>{closeModal();openPin()};document.getElementById('testNotify').onclick=sendTestNotification}
function openChangePin(){modal(`${head('Смена PIN-кода','Введите новый 4-значный PIN')}<div class="modal-body"><div class="form-grid"><div class="field"><label>Новый PIN</label><input id="np1" class="input" type="password" maxlength="4" inputmode="numeric"></div><div class="field"><label>Повторите PIN</label><input id="np2" class="input" type="password" maxlength="4" inputmode="numeric"></div></div><div class="modal-footer"><button class="ghost" data-close>Отмена</button><button class="primary" id="savePin">Сохранить</button></div></div>`);bindClose();document.getElementById('savePin').onclick=()=>{const a=document.getElementById('np1').value.replace(/\D/g,''),b=document.getElementById('np2').value.replace(/\D/g,'');if(a.length!==4){toast('PIN должен состоять ровно из 4 цифр','err');return}if(a!==b){toast('Введенные PIN-коды не совпадают','err');return}state.pin=a;saveState();closeModal();toast('PIN изменён','ok')}}
function openAiKey(){modal(`${head('Gemini API','Для ИИ-репетитора и будущего анализа изображений')}<div class="modal-body"><div class="field"><label>API-ключ</label><input id="geminiKey" class="input" type="password" value="${escapeAttr(state.geminiKey)}" placeholder="AIza…"></div><p class="help-text" style="margin-top:10px">Ключ можно задать во встроенной переменной BUILT_IN_GEMINI_API_KEY в app.js; сохранённый через это окно ключ хранится только в localStorage этого браузера.</p><div class="modal-footer"><button class="ghost" data-close>Отмена</button><button class="primary" id="saveGemini">Сохранить</button></div></div>`);bindClose();document.getElementById('saveGemini').onclick=()=>{state.geminiKey=document.getElementById('geminiKey').value.trim();saveState();closeModal();toast('Ключ сохранён локально','ok')}}
async function sendTestNotification(){try{if(!('Notification'in window)){toast('Браузер не поддерживает системные уведомления','err');return}if(Notification.permission!=='granted'){const p=await Notification.requestPermission();if(p!=='granted'){toast('Разрешение на уведомления не выдано','err');return}}new Notification('🔔 Расписание и Звонки',{body:'1-й урок через 5 мин: Математика · каб. 209Г'});toast('Тестовое уведомление отправлено','ok')}catch{toast('Не удалось показать уведомление','err')}}

async function refreshHomework(silent=false){if(!state.accounts.length){try{const t=await fetchText(CONFIG.accountsUrl);state.accounts=parseAccounts(t)}catch{}}if(state.accounts.length){const all=[];for(const a of state.accounts){if(!a.rawUrl)continue;try{all.push(...parseHomework(await fetchText(a.rawUrl,5500),a.username))}catch{}}state.homework=uniqueHomework(all);Store.set('homework',state.homework);if(!silent)toast(`GitHub: найдено ${state.homework.length} ДЗ`,'ok');renderHomework()}if(state.login){const a=state.accounts.find(x=>x.username.toLowerCase()===state.login.toLowerCase());if(a?.rawUrl){state.rawUrl=a.rawUrl;state.canPublish=true;saveState()}}}

function openGitHubInstruction(){modal(`${head('GitHub: привязка ДЗ','Веб-версия повторяет инструкцию исходного приложения')}<div class="modal-body"><div class="progress-stage"><div class="stage-item done"><b>1. Репозиторий</b><div class="stage-sub">Откройте ваш репозиторий GitHub и создайте/выберите файл с домашними заданиями.</div></div><div class="stage-item"><b>2. Raw-ссылка</b><div class="stage-sub">Откройте созданный файл, нажмите «Raw» и скопируйте ссылку вида https://raw.githubusercontent.com/…</div></div><div class="stage-item"><b>3. Проверка</b><div class="stage-sub">Вставьте Raw-ссылку ниже и нажмите «Проверить привязку».</div></div></div><div class="field" style="margin-top:14px"><label>Raw URL</label><input id="manualRaw" class="input" value="${escapeAttr(state.rawUrl)}" placeholder="https://raw.githubusercontent.com/.../"></div><div class="modal-footer"><button class="ghost" data-close>Закрыть</button><button class="primary" id="bindRaw">Проверить привязку</button></div></div>`);bindClose();document.getElementById('bindRaw').onclick=async()=>{const u=document.getElementById('manualRaw').value.trim();if(!u.startsWith('http')){toast('Введите корректную ссылку','err');return}try{await fetchText(u,5000);state.rawUrl=u;state.canPublish=true;saveState();closeModal();toast('Raw-ссылка доступна. Публикация включена.','ok')}catch{toast('Не удалось открыть Raw-ссылку','err')}}}
function openPublishHomework(){if(!state.canPublish){openGitHubInstruction();return}modal(`${head('Опубликовать домашнее задание','После Commit проверим его через GitHub Raw')}<div class="modal-body"><div class="form-grid"><div class="field"><label>Предмет</label><input id="pubSubject" class="input" list="pubSubjList"><datalist id="pubSubjList">${SUBJECTS.map(s=>`<option value="${s}">`).join('')}</datalist></div><div class="field"><label>Дата</label><input id="pubDate" class="input" placeholder="2026-09-23"></div><div class="field full"><label>Текст домашнего задания</label><textarea id="pubTask" class="textarea" placeholder="Напишите задание"></textarea></div></div><div class="update-box" style="margin-top:12px"><b>GitHub Raw</b><div class="account-info" style="margin-top:8px">${esc(state.rawUrl||'не привязан')}</div><p class="help-text">Сохраните (Commit) изменения в вашем файле на GitHub, затем нажмите «Проверить публикацию».</p></div><div class="modal-footer"><button class="ghost" data-close>Отмена</button><button class="primary" id="pubVerify">Проверить публикацию</button></div></div>`);bindClose();document.getElementById('pubVerify').onclick=async()=>{const subject=document.getElementById('pubSubject').value.trim(),date=document.getElementById('pubDate').value.trim(),task=document.getElementById('pubTask').value.trim();if(!subject||!task){toast('Заполните предмет и текст задания','err');return}let ok=false;try{const content=await fetchText(state.rawUrl,7000).then(x=>x.toLowerCase());const d=(date||'').toLowerCase(),snip=task.toLowerCase().slice(0,15);ok=(!d||content.includes(d))&&content.includes(snip)}catch{}if(!ok){toast('Запись пока не найдена в GitHub Raw. Проверьте Commit и повторите.','err');return}const item={id:crypto?.randomUUID?.()||Math.random().toString(36),subjectRu:subject,subjectEn:subject,date:date||'На след. урок',task,author:state.login||state.displayName};state.homework=state.homework.filter(h=>!(h.subjectRu.toLowerCase()===subject.toLowerCase()&&h.date===item.date));state.homework.unshift(item);saveState();closeModal();renderHomework();toast('Домашнее задание успешно опубликовано!','ok')}}

function openAi(){if(state.restricted){restrictedNotice();return}let tab='chat';const draw=()=>{const content=tab==='chat'?`<div class="chat" id="chatBox">${state.aiMessages.length?state.aiMessages.map(([role,text])=>`<div class="bubble ${role==='user'?'user':'ai'}">${esc(text)}</div>`).join(''):'<div class="empty">Я — школьный репетитор. Не даю готовые ответы, а объясняю тему и помогаю найти решение самостоятельно.</div>'}</div><div class="chat-row"><input id="aiInput" class="input" placeholder="Напишите вопрос…"><button class="primary" id="aiSend">Отправить</button></div>`:`<div id="aiScheduleRoot"></div>`;modal(`${head('ИИ-Репетитор','Объяснение тем и заполнение расписания')}<div class="modal-body"><div class="day-tabs" style="grid-template-columns:1fr 1fr"><button class="day-tab ${tab==='chat'?'active':''}" id="aiChatTab">💬 Чат<small>Репетитор</small></button><button class="day-tab ${tab==='schedule'?'active':''}" id="aiScheduleTab">🖼️ Заполнить<small>По фото</small></button></div><div style="margin-top:14px">${content}</div><div class="modal-footer"><button class="ghost" id="aiClear">Очистить</button><button class="ghost" data-close>Закрыть</button></div></div>`);bindClose();document.getElementById('aiChatTab').onclick=()=>{tab='chat';draw()};document.getElementById('aiScheduleTab').onclick=()=>{tab='schedule';draw()};document.getElementById('aiClear').onclick=()=>{state.aiMessages=[];saveState();draw()};if(tab==='chat'){document.getElementById('aiSend').onclick=sendAiFromModal;document.getElementById('aiInput').onkeydown=e=>{if(e.key==='Enter')sendAiFromModal()};}else renderAiScheduleRoot()};draw()}
async function sendAiFromModal(){const input=document.getElementById('aiInput');if(!input)return;const msg=input.value.trim();if(!msg)return;state.aiMessages.push(['user',msg]);saveState();openAi();try{const reply=await geminiChat();state.aiMessages.push(['model',reply]);saveState();openAi()}catch(e){toast(e.message||'Включите Gemini API или проверьте интернет','err');}}
async function geminiChat(){if(!state.geminiKey)throw new Error('Включите Gemini API в Настройках → Gemini API.');const contents=state.aiMessages.map(([r,t])=>({role:r==='user'?'user':'model',parts:[{text:t}]}));const system='Ты — умный, чуткий и доброжелательный школьный репетитор и наставник для учеников 5-го класса. НИКОГДА НЕ ДАВАЙ ГОТОВЫЙ ОТВЕТ НА ЗАДАЧУ ИЛИ ДОМАШНЕЕ ЗАДАНИЕ! Вместо этого объясняй тему, правила, формулы, логику шагов простыми словами, задавай наводящие вопросы и поддерживай ученика. Формат работы: только текст.';const r=await fetch(CONFIG.geminiEndpoint+CONFIG.geminiModel+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':state.geminiKey},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents})});const data=await r.json();if(!r.ok)throw new Error(`Gemini: ${data.error?.message||r.status}`);const text=data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')?.trim();if(!text)throw new Error('Gemini вернул пустой ответ.');return text}
function renderAiScheduleRoot(){const root=document.getElementById('aiScheduleRoot');if(!root)return;const step=state.aiScheduleStep;root.innerHTML=step===1?`<div class="photo-grid"><label class="photo-box" id="schedulePick"><input id="scheduleImage" type="file" accept="image/*" hidden>${state.schedulePhoto?`<img src="${state.schedulePhoto}" alt="Расписание">`:'<span style="font-size:42px">🗓️</span>'}<b>1. Изображение расписания уроков</b><small class="help-text">Сфотографируйте или загрузите школьную сетку</small></label></div><div class="modal-footer"><button class="ghost" id="useDemoSchedule">Демо-образец</button><button class="primary" id="nextToBells" ${state.schedulePhoto?'':'disabled'}>Далее: Расписание звонков</button></div>`:step===2?`<div class="photo-grid"><label class="photo-box"><input id="bellsImage" type="file" accept="image/*" hidden>${state.bellsPhoto?`<img src="${state.bellsPhoto}" alt="Звонки">`:'<span style="font-size:42px">🔔</span>'}<b>2. Изображение расписания звонков</b><small class="help-text">Время уроков, обед и перемены</small></label></div><div class="modal-footer"><button class="ghost" id="backToSchedule">Назад</button><button class="ghost" id="useDemoBells">Демо-звонки</button><button class="primary" id="startGenerate" ${state.bellsPhoto?'':'disabled'}>Начать генерацию</button></div>`:step===3?`<div class="progress-stage"><div class="stage-item active"><b>Анализируем расписание уроков…</b><div class="stage-sub">Смотрим на список уроков, кабинеты и количество</div></div><div class="stage-item"><b>Сопоставляем расписание звонков…</b><div class="stage-sub">Определяем время начала и окончания уроков, перемены и обед</div></div><div class="stage-item"><b>Проверяем результат…</b><div class="stage-sub">Сверяем отсутствие пересечений и корректность стыковки</div></div></div><div class="empty" style="margin-top:12px">Формируем структурированные данные расписания…</div>`:`<div class="review-list">${state.smartResult.map(l=>{const t=lessonTime(l.lessonNumber);return `<div class="review-item"><div class="review-num">${l.lessonNumber}</div><div><b>${esc(l.subject)}</b><div class="review-time">${dayName(l.dayOfWeek)} · ${t.start} – ${t.end}</div></div><div class="review-cab">Каб. ${esc(l.cabinet)}</div></div>`}).join('')}</div><div class="modal-footer"><button class="ghost" id="aiBack2">Назад</button><button class="primary" id="applySmart">✓ Изменить расписание</button></div>`;
 bindAiScheduleHandlers();}
function bindAiScheduleHandlers(){document.getElementById('schedulePick')?.addEventListener('click',()=>document.getElementById('scheduleImage').click());document.getElementById('scheduleImage')?.addEventListener('change',e=>readFileImage(e.target.files[0],v=>{state.schedulePhoto=v;openAi()}));document.getElementById('bellsImage')?.addEventListener('change',e=>readFileImage(e.target.files[0],v=>{state.bellsPhoto=v;openAi()}));document.getElementById('useDemoSchedule')?.addEventListener('click',()=>{state.schedulePhoto=makeDemoImage('РАСПИСАНИЕ 5Б\nПН: Матем, Русс, Лит\nВТ: Геогр, Матем, Англ\nСР: Лит, Русс, Труд\nЧТ: Матем, Русс, ИЗО\nПТ: Русс, Ист, Лит\nСБ: Родной язык, Проект');state.aiScheduleStep=1;openAi()});document.getElementById('nextToBells')?.addEventListener('click',()=>{state.aiScheduleStep=2;openAi()});document.getElementById('backToSchedule')?.addEventListener('click',()=>{state.aiScheduleStep=1;openAi()});document.getElementById('useDemoBells')?.addEventListener('click',()=>{state.bellsPhoto=makeDemoImage('ТАБЛИЦА ЗВОНКОВ 1 СМЕНА\n1: 08:00 – 08:40\n2: 08:50 – 09:30\n3: 09:40 – 10:20\n4: 10:30 – 11:05\nОБЕД: 11:05 – 11:25');openAi()});document.getElementById('startGenerate')?.addEventListener('click',startSmartGeneration);document.getElementById('aiBack2')?.addEventListener('click',()=>{state.aiScheduleStep=2;openAi()});document.getElementById('applySmart')?.addEventListener('click',()=>{state.lessons=structuredClone(state.smartResult);saveState();state.aiScheduleStep=1;state.schedulePhoto='';state.bellsPhoto='';state.smartResult=[];closeModal();renderAll();toast('✨ Расписание успешно изменено и обновлено!','ok')})}
function readFileImage(file,cb){if(!file)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}
function makeDemoImage(text){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600"><rect width="100%" height="100%" fill="#0f172a"/><text x="50" y="90" fill="#38bdf8" font-size="36" font-family="Arial" font-weight="700">${esc(text).replace(/\n/g,'</text><text x="50" y="') }</text></svg>`;return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function startSmartGeneration(){state.aiScheduleStep=3;openAi();let ticks=0;const stages=document.getElementById('aiScheduleRoot');const timer=setInterval(()=>{ticks++;if(ticks>=4){clearInterval(timer);state.smartResult=structuredClone(SMART_SCHEDULE);state.aiScheduleStep=4;openAi()}},700)}

function setActiveTab(tab){state.activeTab=tab;renderAll();if(tab==='ai')openAi();else if(tab==='grades')openGrades();else if(tab==='bells')openBells();else if(tab==='settings')openSettings()}
function advanceManualLesson(){
 const current=state.manualActive>0?state.manualActive:(currentStatus().activeLessonNumber||0);
 state.autoTrack=false; state.manualActive=Math.min(6,current+1); saveState(); renderAll();
}
function resetAutoTracking(){state.autoTrack=true;state.manualActive=-1;saveState();renderAll()}
function initInteractions(){document.getElementById('hero-manual-btn')?.addEventListener('click',()=>{if(state.autoTrack)advanceManualLesson();else resetAutoTracking()});document.querySelector('.ai-cta')?.addEventListener('click',()=>openAi());document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.action;if(a==='support')openSupport();else if(a==='ai')openAi();else if(a==='grades')openGrades();else if(a==='bells')openBells();else if(a==='settings')openSettings();else if(a==='lock'){state.unlocked=false;closeModal();openPin()}else if(a==='add-lesson')openAddLesson();else if(a==='refresh-homework')refreshHomework();else if(a==='publish-homework')openPublishHomework()}));document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>setActiveTab(b.dataset.tab)))}
function checkVerification(){if(state.verification.status==='pending'&&Date.now()-state.verification.time>=300000){state.verification.status='approved';state.unlockedStatus=true;state.restricted=false;saveState();toast('Статус подтверждён. Ограничения сняты.','ok');renderAll()}}
let notifiedKey='';function checkNotifications(){if(!state.notifications)return;const now=new Date(), day=now.getDay()===0?7:now.getDay();const mins=now.getHours()*60+now.getMinutes(),sec=now.getSeconds();for(const b of BELLS){const target=timeToSec(b.start)/60-state.notifyMinutes;if(mins===Math.floor(target)&&sec<2){const key=`${todayIso()}-${b.lessonNumber}`;if(notifiedKey!==key){notifiedKey=key;const l=activeLessonsForDay(day).find(x=>x.lessonNumber===b.lessonNumber);try{if('Notification'in window&&Notification.permission==='granted')new Notification('🔔 Скоро урок',{body:`${b.lessonNumber}-й урок через ${state.notifyMinutes} мин: ${l?.subject||'Урок'} · каб. ${l?.cabinet||'—'}`});}catch{}toast(`🔔 ${b.lessonNumber}-й урок через ${state.notifyMinutes} мин: ${l?.subject||'Урок'}`)}}}}

async function bootstrap(){
  initInteractions();
  state.todayDay=new Date().getDay()===0?7:new Date().getDay();
  renderAll();

  // Экран загрузки — именно визуальная стадия на 10 секунд.
  // GitHub в это время загружает реальные данные параллельно; после 10 секунд
  // мы переходим к регистрации, даже если отдельный Raw-источник ещё отвечает.
  const started=Date.now();
  const splashJob=syncGitHub();
  const splashMessages=[
    'Получаем данные из GitHub…',
    'Проверяем аккаунты…',
    'Получаем домашние задания…',
    'Синхронизируем данные…',
    'Почти готово…'
  ];
  let msgIndex=0;
  const msgTimer=setInterval(()=>{
    const el=document.getElementById('splash-status');
    if(el) el.textContent=splashMessages[++msgIndex % splashMessages.length];
  },1800);
  await Promise.race([splashJob, new Promise(resolve=>setTimeout(resolve,10000))]);
  clearInterval(msgTimer);
  const elapsed=Date.now()-started;
  if(elapsed<10000) await new Promise(r=>setTimeout(r,10000-elapsed));

  renderAll();
  const splash=document.getElementById('splash');
  splash?.classList.add('fade');
  setTimeout(()=>splash?.remove(),550);
  document.getElementById('app').classList.remove('hidden');
  if(!state.registered){openAuth()}else{if(state.unlocked){maybeUpdateCheck()}else{openPin()}}
}
setInterval(()=>{checkVerification();renderStatus();if(state.selectedDay===state.todayDay)renderSchedule();checkNotifications()},1000);
window.addEventListener('visibilitychange',()=>{if(!document.hidden)renderAll()});
bootstrap();
