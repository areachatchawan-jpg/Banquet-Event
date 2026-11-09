/* =========================================================
   workflow.js — ลดการประชุมด้วยระบบ
   1) เวอร์ชันใบสั่งงาน + ออกใบแก้ไข (Revision)
   2) แต่ละแผนกกด "รับทราบ" / ส่งคำถาม
   3) เส้นตาย D-14 / D-7 / D-3 / D-1
   4) ตรวจห้องชน (วันเดียวกัน + เวลาทับกัน + ห้องรวม 1+2)
   ข้อมูลทั้งหมดเก็บอยู่ในตัวงาน (FUNCS) จึงบันทึกลง Supabase อัตโนมัติ
   ========================================================= */

const wfEsc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function wfNow(){
  const d=new Date(), p=n=>String(n).padStart(2,"0");
  return d.getDate()+" "+THMON[d.getMonth()]+" "+(d.getFullYear()+543)+" "+p(d.getHours())+":"+p(d.getMinutes());
}
function ver(x){ return x.ver||1; }

/* ---------- 2) การรับทราบของแผนก ---------- */
function ackState(x,d){
  if(!d.ack) return "none";
  return (d.ack.ver||1) < ver(x) ? "old" : "ok";
}
function wfPast(x){ return !!x.closed || phase(x)==="done"; }
function ackWaiting(x){ return wfPast(x) ? [] : x.depts.filter(d=>ackState(x,d)!=="ok"); }
function ackQuestions(x){ return x.depts.filter(d=>d.q); }

function ackStrip(x,di){
  const d=x.depts[di], st=ackState(x,d), v=ver(x);
  if(wfPast(x) && !d.ack && !d.q) return "";
  const mine = !!(me && me.role==="dept" && me.dept===d.n);
  const msg = st==="ok" ? `✓ รับทราบ V${d.ack.ver||1} แล้ว · ${wfEsc(d.ack.by)} · ${wfEsc(d.ack.at)}`
    : st==="old" ? `⚠ เคยรับทราบ V${d.ack.ver||1} — ใบสั่งงานแก้เป็น V${v} แล้ว ต้องรับทราบใหม่`
    : `⏳ ยังไม่รับทราบใบสั่งงาน V${v}`;
  const btns=[];
  if(st!=="ok" && mine) btns.push(`<button class="save" onclick="wfAck(${di})">✓ รับทราบ V${v}</button>`);
  else if(st!=="ok" && canEdit()) btns.push(`<button class="ghost" onclick="wfAck(${di})">บันทึกว่ารับทราบแล้ว</button>`);
  if(mine || canEdit()) btns.push(`<button class="ghost" onclick="wfAsk(${di})">❓ มีคำถาม</button>`);
  const q = d.q ? `<div class="ackq">❓ ${wfEsc(d.q.text)}<small>${wfEsc(d.q.by)} · ${wfEsc(d.q.at)}</small>
      ${canEdit()?`<button class="ghost" onclick="wfClearQ(${di})">ตอบแล้ว / ปิดคำถาม</button>`:""}</div>` : "";
  return `<div class="ack ${st}"><div class="am">${msg}</div>${btns.length?`<div class="btns">${btns.join("")}</div>`:""}${q}</div>`;
}
function wfAck(di){
  const x=f(); if(!x) return;
  const d=x.depts[di];
  const mine = me && me.role==="dept" && me.dept===d.n;
  if(!mine && !canEdit()) return;
  d.ack = { ver:ver(x), at:wfNow(), by: mine ? me.name : (d.who||d.n)+" (บันทึกโดย "+me.name+")" };
  renderBEO(); renderSend(); renderList(); toast("บันทึกรับทราบแล้ว");
}
function wfAsk(di){
  const x=f(); if(!x) return;
  askText("ส่งคำถามถึง Sales / Event", x.depts[di].n+" · ใบสั่งงาน "+x.no, "เช่น เบรกเช้าเสิร์ฟกี่โมง / ต้องเตรียมไมค์กี่ตัว", t=>{
    x.depts[di].q={ text:t, by:me.name, at:wfNow() };
    renderBEO(); renderSend(); renderList(); toast("ส่งคำถามแล้ว");
  });
}
function wfClearQ(di){
  if(!canEdit()) return;
  const x=f(); delete x.depts[di].q;
  renderBEO(); renderSend(); renderList(); toast("ปิดคำถามแล้ว");
}

/* ---------- 3) เส้นตาย ---------- */
const MILES=[
  ["d14",14,"ส่ง BEO ฉบับแรกให้ทุกแผนก"],
  ["d7", 7, "ล็อกเมนู ผังห้อง และอนุมัติไฟล์ป้าย"],
  ["d3", 3, "ลูกค้ายืนยันจำนวนคน (Guarantee)"],
  ["d1", 1, "ส่งฉบับสุดท้าย + ทุกแผนกรับทราบครบ"]
];
function mileDate(x,n){
  const d=new Date(uniqDates(x)[0]+"T00:00:00"); d.setDate(d.getDate()-n);
  return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
}
function mileList(x){
  const t=todayStr(), m=x.miles||{};
  return MILES.map(([k,n,label])=>{
    const date=mileDate(x,n), done=m[k];
    const st = done ? "ok" : (x.created && date<x.created) ? "skip" : date<t ? "late" : date===t ? "today" : "wait";
    return {k,n,label,date,done,st};
  });
}
function milesLate(x){
  if(x.closed || ["done","live"].includes(phase(x))) return [];
  return mileList(x).filter(m=>m.st==="late");
}
function wfMile(k,el){
  if(!canEdit()) return;
  const x=f(); x.miles=x.miles||{};
  if(el.checked) x.miles[k]={by:me.name, at:wfNow()}; else delete x.miles[k];
  renderBEO(); renderList();
}

/* ---------- 4) ห้องชน ---------- */
function wfMin(s){ const m=String(s||"").match(/(\d{1,2})[.:](\d{2})\s*[–-]\s*(\d{1,2})[.:](\d{2})/);
  return m ? [(+m[1])*60+(+m[2]), (+m[3])*60+(+m[4])] : [0,1440]; }
function roomParts(r){
  const s=String(r||"").trim(), m=s.match(/^(.*?)(\d+)\s*\+\s*(\d+)(.*)$/);
  if(!m) return [s];
  const base=m[1], tail=m[4].replace(/\(รวม\)/,"").trim();
  return [m[2],m[3]].map(n=>(base+n+(tail?" "+tail:"")).replace(/\s+/g," ").trim());
}
// ห้องอาหาร/เอาท์เล็ตรับหลายกลุ่มพร้อมกันได้ จึงไม่นับเป็นห้องชน
const SHARED_ROOM=/bistro|grill|restaurant|caf[eé]|ห้องอาหาร|ภัตตาคาร/i;
function roomsHit(a,b){
  if(!a||!b||/ระบุภายหลัง/.test(a)||/ระบุภายหลัง/.test(b)) return false;
  if(SHARED_ROOM.test(a)||SHARED_ROOM.test(b)) return false;
  if(a===b) return true;
  const pa=roomParts(a), pb=roomParts(b);
  return pa.some(p=>pb.includes(p));
}
function clashesOf(x){
  const out=[];
  FUNCS.forEach(y=>{
    if(y.id===x.id || y.hotel!==x.hotel || y.closed) return;
    if(x.link===y.id || y.link===x.id) return;
    x.days.forEach(a=>y.days.forEach(b=>{
      if(a.d!==b.d || !roomsHit(a.room,b.room)) return;
      const [a1,a2]=wfMin(a.time), [b1,b2]=wfMin(b.time);
      if(a1<b2 && b1<a2 && !out.some(o=>o.y===y && o.d===a.d)) out.push({y, d:a.d, room:a.room, time:b.time});
    }));
  });
  return out;
}

/* ---------- 1) เวอร์ชัน / ใบแก้ไข ---------- */
function wfRevOpen(){
  if(!canEdit()) return;
  const x=f(); if(!x) return;
  let m=document.getElementById("revModal");
  if(!m){ m=document.createElement("div"); m.className="modal"; m.id="revModal"; document.body.appendChild(m);
    m.addEventListener("click",e=>{ if(e.target===m) m.classList.remove("on"); }); }
  m.innerHTML=`<div class="mbox wide">
    <h3>ออกใบแก้ไข · V${ver(x)} → V${ver(x)+1}</h3>
    <p>แผนกที่ติ๊กจะต้องกดรับทราบใหม่ แผนกที่ไม่เกี่ยวข้องไม่ต้องรับทราบซ้ำ</p>
    <input id="rv_topic" placeholder="หัวข้อ เช่น เพิ่มน้ำเต้าหู้ 07.00 สำหรับเจ้าหน้าที่">
    <textarea id="rv_lines" rows="4" placeholder="รายละเอียดที่เปลี่ยน บรรทัดละ 1 รายการ"></textarea>
    <div class="rvdepts">${x.depts.map((d,i)=>`<label class="task"><input type="checkbox" id="rv_d${i}"><span>${wfEsc(d.n)}</span></label>`).join("")}</div>
    <p class="err" id="rv_err"></p>
    <div class="btns"><button class="prev" onclick="document.getElementById('revModal').classList.remove('on')">ยกเลิก</button>
      <button class="save" onclick="wfRevSave()">ออกใบแก้ไข</button></div></div>`;
  m.classList.add("on");
  setTimeout(()=>document.getElementById("rv_topic").focus(),60);
}
function wfRevSave(){
  const x=f(); if(!x||!canEdit()) return;
  const topic=document.getElementById("rv_topic").value.trim();
  const lines=document.getElementById("rv_lines").value.split("\n").map(s=>s.trim()).filter(Boolean);
  const hit=x.depts.map((_,i)=>document.getElementById("rv_d"+i).checked);
  const err=document.getElementById("rv_err");
  if(!topic){ err.textContent="ใส่หัวข้อการแก้ไขก่อน"; return; }
  if(!hit.some(Boolean)){ err.textContent="ติ๊กแผนกที่ได้รับผลกระทบอย่างน้อย 1 แผนก"; return; }
  const old=ver(x), nv=old+1;
  x.ver=nv; x.updAt=wfNow(); x.adj=x.adj||[];
  x.adj.push({ date:thDate(todayStr()), topic, ver:nv, by:me.name,
    cc:x.depts.filter((_,i)=>hit[i]).map(d=>d.n).join(" / "), from:[], to:lines.length?lines:[topic] });
  // แผนกที่ไม่เกี่ยวข้อง และรับทราบเวอร์ชันล่าสุดไว้แล้ว ไม่ต้องกดใหม่
  x.depts.forEach((d,i)=>{ if(!hit[i] && d.ack && (d.ack.ver||1)===old) d.ack.ver=nv; });
  document.getElementById("revModal").classList.remove("on");
  renderBEO(); renderSend(); renderList();
  toast("ออกใบแก้ไข V"+nv+" แล้ว — ส่งให้แผนกที่เกี่ยวข้องในแท็บส่งงาน");
}

/* ---------- ส่วนที่แสดงในการ์ดสถานะงาน ---------- */
function wfStatusHTML(x){
  const v=ver(x), wait=ackWaiting(x), qs=ackQuestions(x), cl=clashesOf(x);
  const past = wfPast(x);
  const miles = mileList(x).map(m=>`<label class="mile ${m.st}">
      <input type="checkbox" ${m.done?"checked":""} ${canEdit()?"":"disabled"} onchange="wfMile('${m.k}',this)">
      <b>D-${m.n}</b><span>${thDate(m.date)}</span><em>${m.label}</em>
      <i>${m.done?"✓ "+wfEsc(m.done.by):m.st==="late"?"เลยกำหนด":m.st==="today"?"วันนี้":m.st==="skip"?"รับงานหลังวันนี้":""}</i></label>`).join("");
  return `<div class="wf">
    <div class="wfh"><span class="vbadge">V${v}</span>
      <span>${x.updAt?"แก้ไขล่าสุด "+wfEsc(x.updAt):"ยังไม่มีใบแก้ไข"}</span>
      ${canEdit()&&!past?`<button class="ghost" onclick="wfRevOpen()">＋ ออกใบแก้ไข</button>`:""}</div>
    ${past?"":`${cl.length?`<div class="wfbad">⚠ ห้องชน: ${cl.map(c=>`${thDate(c.d)} ${wfEsc(c.room)} กับใบ ${wfEsc(c.y.no)} ${wfEsc(c.y.title)} (${wfEsc(c.time)})`).join(" · ")}</div>`:""}
    <div class="wfrow"><b>รับทราบ ${x.depts.length-wait.length}/${x.depts.length} แผนก</b>
      ${wait.length?`<span class="wfwarn">รอ: ${wait.map(d=>wfEsc(d.n)).join(", ")}</span>`:`<span class="wfok">ครบทุกแผนก</span>`}</div>
    ${qs.length?`<div class="wfrow"><b>คำถามค้าง ${qs.length}</b><span class="wfwarn">${qs.map(d=>wfEsc(d.n)).join(", ")}</span></div>`:""}
    <div class="miles">${miles}</div>`}
  </div>`;
}

/* ---------- แท็กบนการ์ดในหน้ารวมงาน ---------- */
function wfTags(x){
  const t=[];
  if(ver(x)>1) t.push(`<span class="tag2">V${ver(x)}</span>`);
  if(x.closed || phase(x)==="done") return t.join("");
  const w=ackWaiting(x).length, q=ackQuestions(x).length, late=milesLate(x), cl=clashesOf(x);
  if(cl.length) t.push(`<span class="tag2 bad">⚠ ห้องชน</span>`);
  if(w) t.push(`<span class="tag2 ${daysTo(x)<=3?"bad":"hold"}">รอรับทราบ ${w} แผนก</span>`);
  if(q) t.push(`<span class="tag2 hold">❓ คำถาม ${q}</span>`);
  if(late.length) t.push(`<span class="tag2 bad">⏰ เลย D-${late[late.length-1].n}</span>`);
  return t.join("");
}
