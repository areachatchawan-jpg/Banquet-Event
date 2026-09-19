function menuLines(x,di){
  const name=x.days[di].menu, sel=state[x.id].menu[di], out=[];
  (MENUS[name]||[]).forEach(g=>{
    if(g.fixed) out.push(...g.fixed.map(t=>"  · "+t));
    else { const v=[...sel[g.g]]; if(v.length) out.push("  · "+g.g+": "+v.join(", ")); }
  });
  return out;
}
function headText(x){
  const L=[];
  L.push("["+(x.hotel==="QL"?"QUEENSLAND":"BAIYOKE SKY")+"] ใบสั่งงาน "+x.no+" — "+x.doc);
  L.push(x.title); L.push("ประเภท: "+x.kind);
  uniqDates(x).forEach(u=>{
    x.days.filter(d=>d.d===u).forEach((d,i)=>{
      L.push((i===0?"📅 ":"   ")+thDate(u,true)+"  "+d.time);
      L.push("   "+d.room+(d.set?" — "+d.set:""));
    });
  });
  L.push("รับรอง "+x.guarantee+" "+x.unit+" / เซ็ตอัพ "+x.setup+" "+x.unit+" ("+x.style+")");
  L.push("ผู้ติดต่อ "+x.contact+"  "+x.phone);
  return L;
}
function fullText(x){
  const L=headText(x);
  if(x.prog.length){ L.push("","— กำหนดการ —"); x.prog.forEach(p=>L.push(p[0]+"  "+p[1])); }
  L.push("","— อาหาร —");
  x.days.forEach((d,di)=>{
    if(d.menu==="ไม่มีอาหาร") return;
    L.push(thDate(d.d)+" : "+d.menu);
    if(d.note) L.push("  "+d.note);
    L.push(...menuLines(x,di));
  });
  L.push("","— งานแต่ละฝ่าย —");
  x.depts.forEach((d,di)=>{
    L.push("▸ "+d.n+(d.who?" ("+d.who+")":""));
    d.t.forEach((t,ti)=>L.push("   "+(state[x.id].done.has(di+"-"+ti)?"[x]":"[ ]")+" "+t));
    state[x.id].photos.filter(p=>p.dept===d.n).forEach(p=>L.push("   📎 "+p.cap));
  });
  if(x.adj && x.adj.length){
    L.push("","— ใบแก้ไข —");
    x.adj.forEach(a=>{ L.push(a.date+" : "+a.topic);
      a.to.filter(t=>!a.from.includes(t)).forEach(t=>L.push("   + "+t));
      a.from.filter(t=>!a.to.includes(t)).forEach(t=>L.push("   - "+t)); });
  }
  if(canMoney()){
    L.push("","— ยอดเงิน —");
    x.rev.forEach(r=>L.push(r.n+"  "+baht(r.price)+" x"+r.qty+(r.times>1?" x"+r.times+" ครั้ง":"")+" = "+baht(r.price*r.qty*(r.times||1))));
    L.push("ยอดรวม "+baht(total(x))+" บาท");
    (x.pays||[]).forEach(p=>L.push("รับเงิน "+p.d+" "+baht(p.amt)+" บาท ("+p.note+")"));
    L.push("รับแล้วรวม "+baht(received(x))+" บาท");
    L.push("คงเหลือ "+baht(total(x)-received(x))+" บาท");
  }
  if(x.link) L.push("","* งานต่อเนื่องกับใบสั่งงาน "+x.linkNo);
  L.push("","Sales "+x.sales+" / Event "+x.event+" / อนุมัติ "+x.approve);
  return L.join("\n");
}
function deptText(x,di){
  const d=x.depts[di], L=headText(x);
  L.push("","— งานของ "+d.n+(d.who?" ("+d.who+")":"")+" —");
  d.t.forEach((t,ti)=>L.push((state[x.id].done.has(di+"-"+ti)?"[x] ":"[ ] ")+t));
  const ph=state[x.id].photos.filter(p=>p.dept===d.n);
  if(ph.length){ L.push("","📎 รูปอ้างอิงของฝ่ายนี้ ("+ph.length+")"); ph.forEach(p=>L.push("   - "+p.cap)); }
  if(/ครัว|เบเกอรี่|บาร์/.test(d.n)){
    L.push("","— เมนู —");
    x.days.forEach((dd,dj)=>{ if(dd.menu==="ไม่มีอาหาร") return;
      L.push(thDate(dd.d)+" : "+dd.menu); if(dd.note) L.push("  "+dd.note); L.push(...menuLines(x,dj)); });
  }
  (x.adj||[]).forEach(a=>{
    L.push("","* ใบแก้ไข "+a.date+" : "+a.topic);
    a.to.filter(t=>!a.from.includes(t)).forEach(t=>L.push("   + "+t));
  });
  L.push("","แจ้งโดย Event "+x.event);
  return L.join("\n");
}
let mCb=null;
function closeModal(){ modal.classList.remove("on"); mCb=null; }
function askConfirm(title,text,cb){
  mTitle.textContent=title; mText.textContent=text; mInput.style.display="none";
  mOk.textContent="ยืนยัน"; mOk.className="danger"; mCb=()=>cb();
  modal.classList.add("on");
}
function askText(title,text,ph,cb){
  mTitle.textContent=title; mText.textContent=text; mInput.style.display="block";
  mInput.value=""; mInput.placeholder=ph||""; mOk.textContent="เพิ่ม"; mOk.className="save"; mCb=()=>{
    const v=mInput.value.trim(); if(v) cb(v);
  };
  modal.classList.add("on"); setTimeout(()=>mInput.focus(),60);
}
mOk.addEventListener("click",()=>{ const c=mCb; closeModal(); if(c) c(); });
modal.addEventListener("click",e=>{ if(e.target===modal) closeModal(); });
mInput.addEventListener("keydown",e=>{ if(e.key==="Enter") mOk.click(); });
function toast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("on"); setTimeout(()=>t.classList.remove("on"),1800); }
async function copyText(txt){
  try{ await navigator.clipboard.writeText(txt); toast("คัดลอกแล้ว วางในแชทได้เลย"); }
  catch(e){
    const ta=document.createElement("textarea"); ta.value=txt; ta.style.position="fixed"; ta.style.opacity="0";
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); toast("คัดลอกแล้ว"); }catch(_){ toast("คัดลอกไม่สำเร็จ"); }
    ta.remove();
  }
}
async function shareText(txt,title){
  if(navigator.share){ try{ await navigator.share({title,text:txt}); return; }catch(e){ if(e.name==="AbortError") return; } }
  copyText(txt);
}
function sendAll(how){ const x=f(); how==="share"? shareText(fullText(x), x.title) : copyText(fullText(x)); }
function sendDept(di,how){ const x=f(); how==="share"? shareText(deptText(x,di), x.depts[di].n) : copyText(deptText(x,di)); }
function delFunc(){
  if(!canEdit()) return;
  const x=f();
  askConfirm("ลบใบสั่งงาน "+x.no+" ?", x.title+" — ลบแล้วกู้คืนไม่ได้", ()=>{
    FUNCS.splice(FUNCS.indexOf(x),1); delete state[x.id];
    const left=FUNCS.filter(y=>inH(y) && visible(y));
    cur = left.length? left[0].id : null;
    renderList(); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); }
    go("list"); toast("ลบงานแล้ว");
  });
}
function renderSend(){
  const x=f(); if(!x) return;
  const s=state[x.id];
  sendWho.textContent=x.title;
  const sd=(me&&me.role==="dept")? x.depts.map((d,i)=>[d,i]).filter(a=>a[0].n===me.dept) : x.depts.map((d,i)=>[d,i]);
  sendBox.innerHTML=sd.map(([d,di])=>{
    const done=d.t.filter((_,ti)=>s.done.has(di+"-"+ti)).length, p=d.t.length?Math.round(done/d.t.length*100):0;
    const np=s.photos.filter(q=>q.dept===d.n).length;
    return `<div class="sendrow">
      <div class="nm"><b>${d.n}</b><span>${d.who||"ยังไม่ระบุผู้รับผิดชอบ"} · ${done}/${d.t.length} รายการ${np?" · 📎 "+np+" รูป":""}</span>
        <div class="bar2"><i style="width:${p}%"></i></div></div>
      <div class="btns">
        <button class="ghost" onclick="sendDept(${di},'copy')">คัดลอก</button>
        <button class="ghost" onclick="sendDept(${di},'share')">แชร์</button>
      </div></div>`;
  }).join("");
}
function sheetHTML(x){
  const s=state[x.id];
  const dayRows=x.days.map(d=>`<tr><td>${thDate(d.d)}</td><td>${d.time}</td><td>${d.room}</td>
    <td>${x.guarantee} ${x.unit} · Set Up ${x.setup} ${x.unit}</td><td>${d.set||x.style}</td></tr>`).join("");
  const box=(title,items,photos)=>`<div class="bx"><h4>${title}</h4>
    <ul>${items.map(t=>`<li>${t}</li>`).join("")}</ul>
    ${photos&&photos.length?`<div class="ph">${photos.map(p=>`<figure><img src="${p.src}"><figcaption>${p.cap}</figcaption></figure>`).join("")}</div>`:""}
  </div>`;
  const deptBoxes=x.depts.map(d=>box(d.n+(d.who?" : "+d.who:""), d.t, s.photos.filter(p=>p.dept===d.n))).join("");
  const menuBoxes=x.days.map((d,di)=>d.menu==="ไม่มีอาหาร"?"":
    box("เมนู "+thDate(d.d)+" — "+d.menu, (d.note?[d.note]:[]).concat(menuLines(x,di).map(t=>t.replace(/^\s+·\s/,""))))).join("");
  const adjBoxes=(x.adj||[]).map(a=>box("ใบแก้ไข "+a.date+" — "+a.topic,
    a.to.filter(t=>!a.from.includes(t)).map(t=>"เพิ่ม: "+t).concat(a.from.filter(t=>!a.to.includes(t)).map(t=>"ตัดออก: "+t)))).join("");
  const progBox=x.prog.length? box("PROGRAM", x.prog.map(p=>p[0]+" — "+p[1])) : "";
  const other=x.link? box("งานต่อเนื่อง", ["ใช้ร่วมกับใบสั่งงาน "+x.linkNo]) : "";
  let boxes=deptBoxes+progBox+adjBoxes+menuBoxes+other;
  const n=(boxes.match(/class="bx"/g)||[]).length;
  if(n%2) boxes+=`<div class="bx"></div>`;
  return `<div class="final">${x.doc==="Final"?"Final Function":"ร่าง Function"}</div>
  <div class="top">
    <div class="l"><b>BANQUET EVENT ORDER</b>FUNCTION NO : ${x.no}<br>PAGE 1 / 1</div>
    <div class="c"><img src="${LOGO[x.hotel]}" alt=""></div>
    <div class="r">FUNCTION ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}<br>
      <span style="color:#111;font-weight:400">${x.status}</span></div>
  </div>
  <div class="band">DATE OF EVENT : ${dateLabel(x)} — ${x.kind.toUpperCase()}</div>
  <div class="info">
    <div><b>COMPANY :</b> ${x.company}</div>
    <div><b>CONTACT :</b> ${x.contact} &nbsp;&nbsp; <b>PHONE :</b> ${x.phone}</div>
    <div><b>งาน :</b> ${x.title}</div>
  </div>
  <table><thead><tr><th>Date</th><th>Time</th><th>Function Room</th><th>Guarantee</th><th>Set Up</th></tr></thead>
    <tbody>${dayRows}</tbody></table>
  ${canMoney()?`<div class="price"><b>PRICE :</b> ${x.rev.map(r=>r.n+" "+baht(r.price)+" x "+r.qty+(r.times>1?" x "+r.times+" ครั้ง":"")+" = "+baht(r.price*r.qty*(r.times||1))+" บาท").join(" / ")}</div>
  <div class="price"><b>PAYMENT :</b> ยอดรวม ${baht(total(x))} บาท · รับแล้ว ${received(x)?baht(received(x)):"—"} บาท · คงเหลือ ${baht(total(x)-received(x))} บาท</div>`:""}
  <div class="cols">${boxes}</div>
  <div class="sign"><div>SALES IN CHARGE : ${x.sales}</div><div>EVENT : ${x.event}</div>
    <div>CHIEF ACCOUNTANT</div><div>APPROVED BY : ${x.approve}</div></div>`;
}
function doPrint(){
  const x=f(); if(!x) return;
  document.getElementById("sheet").innerHTML=sheetHTML(x);
  go("sheet");
}

/* ---------------- add (wizard) ---------------- */
const ROOMS={
 QL:["Diamond Dome 1 ชั้น 22","Diamond Dome 2 ชั้น 22","Diamond Dome 1+2 (รวม) ชั้น 22",
     "Event Hall 02 ชั้น 22","VIP Room ชั้น 22","Pre-Function Area ชั้น 22",
     "Foyer 1 ชั้น 22","Foyer 2 ชั้น 22","Mum's Bistro ชั้น 20"],
 BY:["Rainbow Hall","Rainbow I","Rainbow II","Sky Room 1 – Small","Sky Room 2 – Big","V.I.P. Room","Kontent Space"]
};
const DEPTS_BASIC=[
 {n:"ฝ่ายจัดเลี้ยง", who:"", t:["จัดโต๊ะและที่นั่งตามแบบ","โต๊ะลงทะเบียนหน้าห้อง","ยืนยันผังห้องกับลูกค้า"]},
 {n:"ครัว / เบเกอรี่", who:"", t:["ยืนยันเมนูกับครัว","เวลาเสิร์ฟอาหาร"]},
 {n:"ช่าง / อุปกรณ์", who:"", t:["ไมค์และเครื่องเสียง","จอ LED / โปรเจกเตอร์"]},
 {n:"แม่บ้าน", who:"", t:["ผ้าปูและดอกไม้ตกแต่ง","ดูแลความสะอาดระหว่างงาน"]},
 {n:"รปภ. / ที่จอดรถ", who:"", t:["ที่จอดรถผู้ร่วมงาน","เดินตรวจภายในงาน"]}
];
let wIdx=1;
function fillRooms(){
  const hv=a_hotel.value;
  a_room.innerHTML=ROOMS[hv].map(r=>`<option>${r}</option>`).join("")+`<option value="ETC">อื่น ๆ (ระบุภายหลัง)</option>`;
}
function modeFields(){
  lbPrice.textContent = a_mode.value==="rent" ? "ค่าเช่าและอุปกรณ์รวม (บาท)"
    : a_mode.value==="pack" ? "ราคาแพ็กเกจเหมา (บาท)" : "ราคาต่อ"+a_unit.value+" (บาท)";
}
let draft={depts:[],sel:{}};
function openAdd(){
  if(!canEdit()){ toast("บัญชีนี้ไม่มีสิทธิ์เพิ่มงาน"); return; }
  a_menu.innerHTML=["ไม่มีอาหาร",...MENU_ORDER.filter(m=>m!=="ไม่มีอาหาร")].map(m=>`<option>${m}</option>`).join("");
  a_kind.innerHTML=KINDS.map(k=>`<option>${k}</option>`).join("");
  a_hotel.value = (me&&me.hotel)? me.hotel : (hotel==="ALL"?"QL":hotel);
  ["sales","event","approve"].forEach(k=>{
    const el=document.getElementById("a_"+k);
    el.innerHTML=STAFF[k].map(o=>`<option>${o}</option>`).join("");
  });
  if(me&&me.role==="sales" && STAFF.sales.includes(me.name)) a_sales.value=me.name;
  ["a_title","a_company","a_contact","a_phone","a_g","a_price","a_dep"].forEach(k=>document.getElementById(k).value="");
  a_from.value=""; a_to.value="";
  draft={ depts: DEPTS_BASIC.map(d=>({use:true, n:d.n, who:"", tasks:d.t.slice(), photos:[]})), sel:{} };
  fillRooms(); modeFields(); renderDraftDepts(); wMenuPick(); wIdx=1; paintStep(); go("add");
}
function renderDraftDepts(){
  a_depts.innerHTML=draft.depts.map((d,i)=>`<div class="dcard ${d.use?"":"off"}">
    <div class="dh"><input type="checkbox" ${d.use?"checked":""} onchange="draft.depts[${i}].use=this.checked;renderDraftDepts()">
      <b>${d.n}</b><button class="x" onclick="draft.depts.splice(${i},1);renderDraftDepts()" aria-label="ลบแผนก">✕</button></div>
    <input class="who" placeholder="ผู้รับผิดชอบ เช่น คุณวิรัตน์" value="${d.who}" onchange="draft.depts[${i}].who=this.value">
    <textarea rows="${Math.max(3,d.tasks.length)}" placeholder="รายการงาน บรรทัดละ 1 รายการ"
      onchange="draft.depts[${i}].tasks=this.value.split('\n').map(s=>s.trim()).filter(Boolean)">${d.tasks.join("\n")}</textarea>
    <div class="thumbs">${d.photos.map((p,pi)=>`<button class="thumb" onclick="draft.depts[${i}].photos.splice(${pi},1);renderDraftDepts()">
        <img src="${p.src}" alt=""><span>${p.cap}<br>แตะเพื่อเอาออก</span></button>`).join("")}
      <button class="thumbadd" onclick="wAddPhoto(${i})"><span style="font-size:19px">＋</span>แนบรูป</button></div>
  </div>`).join("");
}
function addDeptRow(){
  askText("เพิ่มแผนก", "พิมพ์ชื่อแผนกที่ต้องการ", "เช่น Artist / Backdrop / ป้าย", n=>{
    draft.depts.push({use:true,n,who:"",tasks:[],photos:[]}); renderDraftDepts();
  });
}
let wTarget=null;
function wAddPhoto(i){ wTarget=i; wpicker.click(); }
wpicker.addEventListener("change", async e=>{
  const files=[...e.target.files]; e.target.value="";
  for(const file of files){ const src=await shrink(file);
    draft.depts[wTarget].photos.push({cap:file.name.replace(/\.[^.]+$/,""), src}); }
  renderDraftDepts();
});
function wMenuPick(){
  const name=a_menu.value;
  draft.sel=initSel(name);
  a_menubox.innerHTML=(MENUS[name]||[]).map((g,gi)=>{
    if(g.fixed) return `<div class="menugrp"><div class="gh"><span>${g.g}</span></div>
      <div class="fixedlist">${g.fixed.map(t=>`<div>${t}</div>`).join("")}</div></div>`;
    const n=draft.sel[g.g].size;
    return `<div class="menugrp"><div class="gh"><span>${g.g}</span>
      <span class="count" id="w${gi}">${g.pick?`เลือก ${n}/${g.pick}`:`เลือกแล้ว ${n}`}</span></div>
      ${g.items.map(it=>`<label class="task"><input type="checkbox" ${draft.sel[g.g].has(it)?"checked":""}
        data-it="${it}" onchange="wPick(${gi},this)"><span>${it}</span></label>`).join("")}</div>`;
  }).join("") || `<div class="empty">งานนี้ไม่มีอาหาร</div>`;
}
function wPick(gi,el){
  const g=MENUS[a_menu.value][gi], it=el.dataset.it;
  el.checked? draft.sel[g.g].add(it) : draft.sel[g.g].delete(it);
  const n=draft.sel[g.g].size, c=document.getElementById("w"+gi);
  c.textContent=g.pick?`เลือก ${n}/${g.pick}`:`เลือกแล้ว ${n}`;
  c.classList.toggle("over", !!g.pick && n>g.pick);
}
function paintStep(){
  [1,2,3,4,5,6].forEach(n=>{
    document.getElementById("st"+n).classList.toggle("on", n===wIdx);
    const s=wSteps.children[n-1];
    s.classList.toggle("on", n===wIdx); s.classList.toggle("done", n<wIdx);
  });
  wPrev.style.visibility = wIdx===1? "hidden":"visible";
  wNext.textContent = wIdx===6? "ยืนยันบันทึกงาน" : "ถัดไป";
  wTitle.textContent = "ขั้นที่ "+wIdx+" จาก 6";
  a_err.textContent="";
  if(wIdx===6) buildReview();
  window.scrollTo({top:0});
}
function fmtT(v){ return v? v.replace(":","."):""; }
function wDays(){
  const days=[]; if(!a_from.value) return days;
  const from=new Date(a_from.value+"T00:00:00"), to=new Date((a_to.value||a_from.value)+"T00:00:00");
  const time=fmtT(a_t1.value)+" – "+fmtT(a_t2.value)+" น.";
  const room=a_room.value==="ETC"? "ระบุภายหลัง" : a_room.value;
  for(let d=new Date(from); d<=to; d.setDate(d.getDate()+1))
    days.push({d:d.toISOString().slice(0,10), time, room, set:a_style.value+" "+(a_g.value||"")+" "+a_unit.value, menu:a_menu.value, note:""});
  return days;
}
function wRev(days){
  const g=+a_g.value||0, price=+a_price.value||0;
  if(a_mode.value==="rent") return [{n:"ค่าเช่าห้องและอุปกรณ์", price, qty:1, times:1}];
  if(a_mode.value==="pack") return [{n:"แพ็กเกจเหมา", price, qty:1, times:1}];
  return [{n:"อาหาร "+baht(price)+" บาท/"+a_unit.value, price, qty:g, times:days.length}];
}
function validate(n){
  if(n===1){
    if(!a_title.value.trim()) return "ใส่ชื่องานก่อน";
    if(!a_company.value.trim()) return "ใส่ชื่อบริษัทหรือลูกค้าก่อน";
  }
  if(n===2){
    if(!a_from.value) return "เลือกวันที่เริ่มงานก่อน";
    if(a_to.value && a_to.value<a_from.value) return "วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่ม";
    if(!a_g.value) return "ใส่จำนวนรับรองก่อน";
    if(a_t2.value<=a_t1.value) return "เวลาสิ้นสุดต้องหลังเวลาเริ่ม";
    const yr=+a_from.value.slice(0,4), now=new Date().getFullYear();
    if(yr<now-1 || yr>now+3) return "ปีของวันที่ดูผิดปกติ ("+yr+") ช่องวันที่ใช้ปี ค.ศ. เช่น "+(now+0)+" ไม่ใช่ พ.ศ.";
  }
  if(n===3){ if(a_price.value==="") return "ใส่ราคาก่อน ถ้ายังไม่ทราบให้ใส่ 0"; }
  if(n===4){ if(!draft.depts.some(d=>d.use)) return "เลือกอย่างน้อย 1 แผนก"; }
  return "";
}
function wStep(dir){
  if(dir>0 && wIdx<6){ const e=validate(wIdx); if(e){ a_err.textContent=e; return; } wIdx++; paintStep(); return; }
  if(dir>0 && wIdx===6){ saveNew(); return; }
  if(dir<0 && wIdx>1){ wIdx--; paintStep(); }
}
function buildReview(){
  const days=wDays(), rev=wRev(days), hv=a_hotel.value;
  const sum=rev.reduce((a,r)=>a+r.price*r.qty*(r.times||1),0), dep=+a_dep.value||0;
  const u=[...new Set(days.map(d=>d.d))];
  const clash=FUNCS.filter(x=>x.hotel===hv && x.days.some(d=>u.includes(d.d) && d.room===days[0].room));
  a_review.innerHTML=`<div class="rv">
    <div class="rvh"><span>ใบสั่งงานใหม่ · ${a_kind.value}</span><span>${a_status.value}</span></div>
    <div class="rvb"><img src="${LOGO[hv]}" alt=""><h3>${a_title.value}</h3>
      <span>${a_company.value} · ${a_contact.value||"—"} ${a_phone.value||""}</span></div>
    <table><thead><tr><th>วันที่</th><th>เวลา</th><th>ห้อง</th><th>เมนู</th></tr></thead><tbody>
      ${days.map(d=>`<tr><td>${thDate(d.d,true)}</td><td>${d.time}</td><td>${d.room}</td><td>${d.menu}</td></tr>`).join("")}
    </tbody></table>
    <table><thead><tr><th>รายการ</th><th>ราคา</th><th>จำนวน</th><th>ครั้ง</th><th>รวม</th></tr></thead><tbody>
      ${rev.map(r=>`<tr><td>${r.n}</td><td class="money">${baht(r.price)}</td><td>${r.qty}</td><td>${r.times}</td>
         <td class="money">${baht(r.price*r.qty*r.times)}</td></tr>`).join("")}
    </tbody><tfoot>
      <tr><td colspan="4">ยอดรวม</td><td class="money">${baht(sum)}</td></tr>
      <tr><td colspan="4">มัดจำ</td><td class="money">${dep?baht(dep):"—"}</td></tr>
      <tr><td colspan="4">คงเหลือวันงาน</td><td class="money">${baht(sum-dep)}</td></tr>
    </tfoot></table>
    <div class="pad" style="font-size:13px">รับรอง ${a_g.value} ${a_unit.value} · จัดที่นั่ง ${a_style.value} · ${days.length} วัน</div>
    <div class="pad" style="font-size:13px;border-top:1px solid var(--line)">
      <b>ผู้รับผิดชอบงาน</b>
      <div style="padding:4px 0;color:var(--muted)">Sales ${a_sales.value} · Event ${a_event.value} · อนุมัติ ${a_approve.value}</div>
    </div>
    <div class="pad" style="font-size:13px;border-top:1px solid var(--line)">
      <b>แผนกที่รับผิดชอบ</b>
      ${draft.depts.filter(d=>d.use).map(d=>`<div style="padding:4px 0;color:var(--muted)">
        ${d.n}${d.who?" — "+d.who:""} · ${d.tasks.length} รายการ${d.photos.length?" · 📎 "+d.photos.length+" รูป":""}</div>`).join("")}
    </div>
    <div class="pad" style="font-size:13px;border-top:1px solid var(--line)">
      <b>เมนู ${a_menu.value}</b>
      ${Object.keys(draft.sel).map(g=>{const v=[...draft.sel[g]]; return v.length?`<div style="padding:4px 0;color:var(--muted)">${g}: ${v.join(", ")}</div>`:"";}).join("")}
    </div>
    ${clash.length?`<div class="warn">⚠ ห้องนี้มีงานอยู่แล้วในวันเดียวกัน: ${clash.map(c=>"ใบ "+c.no+" "+c.title).join(", ")} — ตรวจสอบก่อนยืนยัน</div>`:""}
  </div>`;
}
function saveNew(){
  const days=wDays(); if(!days.length){ a_err.textContent="ข้อมูลวันที่ไม่ครบ"; wIdx=2; paintStep(); return; }
  const hv=a_hotel.value, g=+a_g.value, rev=wRev(days);
  const from=new Date(a_from.value+"T00:00:00");
  const nf={ id:"n"+Date.now(), hotel:hv, no:(FUNCS.filter(x=>x.hotel===hv).length+1)+"/"+(from.getMonth()+1),
    doc:"ร่าง", status:a_status.value, kind:a_kind.value, title:a_title.value.trim(),
    company:a_company.value.trim()||"—", contact:a_contact.value.trim()||"—", phone:a_phone.value.trim()||"—",
    unit:a_unit.value, guarantee:g, setup:g, style:a_style.value,
    mode:a_mode.value==="rent"?"rent":a_mode.value==="pack"?"pack":(days.length>1?"meal":"head"),
    price:+a_price.value||0, days, rev, dep:{amt:0,when:"—"}, pays:(+a_dep.value>0?[{d:thDate(todayStr()),amt:+a_dep.value,note:"มัดจำ"}]:[]), prog:[],
    depts:draft.depts.filter(d=>d.use).map(d=>({n:d.n, who:d.who, t:d.tasks.length?d.tasks:["(ยังไม่ระบุรายการงาน)"]})),
    sales:a_sales.value, event:a_event.value, approve:a_approve.value, seed:"", adj:[] };
  FUNCS.push(nf);
  const photos=[];
  draft.depts.filter(d=>d.use).forEach(d=>d.photos.forEach((p,i)=>
    photos.push({id:nf.id+"_w"+photos.length, dept:d.n, cap:p.cap, src:p.src})));
  const cp=()=>{ const o={}; Object.keys(draft.sel).forEach(g=>o[g]=new Set(draft.sel[g])); return o; };
  state[nf.id]={ menu:nf.days.map(()=>cp()), done:new Set(), menuOverrides:{}, photos };
  if(hotel!=="ALL" && hotel!==hv) hotel=hv;
  document.documentElement.setAttribute("data-hotel",hotel);
  if(hotel!=="ALL"){ logo.src=LOGO[hotel]; hotelName.textContent=HOTELNAME[hotel]; }
  hQL.setAttribute("aria-pressed", hotel==="QL"); hBY.setAttribute("aria-pressed", hotel==="BY");
  cur=nf.id; renderList(); renderRev(); renderBEO(); renderPhotos(); renderSend();
  go("list");
  setTimeout(()=>{
    const c=document.getElementById("card_"+nf.id);
    if(c){ c.scrollIntoView({block:"center",behavior:"smooth"}); c.classList.add("flash");
      setTimeout(()=>c.classList.remove("flash"),2600); }
  },120);
  toast("บันทึกงานแล้ว — แตะการ์ดเพื่อเปิดใบสั่งงาน");
}


/* ---------------- ตั้งค่าระบบ (แอดมิน) ---------------- */
let KINDS=["ประชุมสัมมนา","งานแต่งงาน","พิธีหมั้น","พิธีมงคลสมรส","งานเลี้ยงบริษัท","คอนเสิร์ต / Meet & Greet","งานโต๊ะจีน","อื่น ๆ"];
const ADSEC=[["jobs","งานทั้งหมด"],["job","แก้ไขงานเชิงลึก"],["users","ผู้ใช้และรหัส"],["hotels","โรงแรมและโลโก้"],
             ["rooms","ห้องจัดงาน"],["kinds","ประเภทงานและกลุ่ม"],["depts","แผนกมาตรฐาน"],["staff","รายชื่อพนักงาน"],
             ["menus","ชุดเมนู"],["kpi","เกณฑ์ KPI"],["db","ฐานข้อมูล"]];
let adSec="jobs", adJob=null, adMenuName=null, logoTarget=null;
const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const val = id => { const el=document.getElementById(id); return el? el.value : ""; };
const isAdmin = ()=> !!(me && me.role==="admin");
const opts = (arr,v)=>arr.map(o=>`<option ${o===v?"selected":""}>${esc(o)}</option>`).join("");
function rebuildMenuOrder(){ MENU_ORDER=["ไม่มีอาหาร",...Object.keys(MENUS).filter(m=>m!=="ไม่มีอาหาร")]; }
