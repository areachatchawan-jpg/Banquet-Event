function refreshAll(){
  renderList();
  if(cur && FUNCS.some(x=>x.id===cur)){ renderBEO(); renderPhotos(); renderSend(); }
  renderRev();
}
function adGo(s){ adSec=s; renderAdmin(); }
function renderAdmin(){
  if(!isAdmin()){ adminNav.innerHTML=""; adminBody.innerHTML=`<div class="empty">หน้านี้สำหรับผู้ดูแลระบบเท่านั้น</div>`; return; }
  adminNav.innerHTML=ADSEC.map(s=>`<button aria-pressed="${s[0]===adSec}" onclick="adGo('${s[0]}')">${s[1]}</button>`).join("");
  const R={jobs:adJobs, job:adJobEdit, users:adUsers, hotels:adHotels, rooms:adRooms,
           kinds:adKinds, depts:adDepts, staff:adStaff, menus:adMenus, kpi:adKPI, db:adDB}[adSec];
  adminBody.innerHTML=R();
}

/* ----- งานทั้งหมด ----- */
function adJobs(){
  const rows=FUNCS.slice().sort((a,b)=> a.days[0].d<b.days[0].d?-1:1).map(x=>`
    <tr><td>${x.hotel==="QL"?"Queensland":"Baiyoke"}</td><td>${esc(x.no)}</td>
      <td style="text-align:left">${esc(x.title)}<br><span class="sub2">${esc(x.kind)} · ${dateLabel(x)}</span></td>
      <td class="money">${baht(total(x))}</td>
      <td class="acts">
        <button class="ghost" onclick="adEdit('${x.id}')">แก้ไข</button>
        <button class="ghost" onclick="open_('${x.id}')">เปิดใบสั่งงาน</button>
        <button class="ghost danger2" onclick="adDelJob('${x.id}')">ลบ</button></td></tr>`).join("");
  return `<div class="card">
    <div class="band"><span>งานทั้งหมด ${FUNCS.length} งาน</span>
      <span class="who"><button class="ghost" onclick="openAdd()">＋ เพิ่มงานใหม่</button></span></div>
    <div class="pad" style="overflow-x:auto"><table class="adtab">
      <thead><tr><th>โรงแรม</th><th>ใบสั่งงาน</th><th>งาน</th><th>ยอดรวม</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="5">ยังไม่มีงาน</td></tr>`}</tbody></table></div></div>`;
}
function adEdit(id){ adJob=id; adSec="job"; renderAdmin(); window.scrollTo({top:0}); }
function adPick(id){ adJob=id; renderAdmin(); }
function adDelJob(id){
  const x=FUNCS.find(y=>y.id===id); if(!x) return;
  askConfirm("ลบใบสั่งงาน "+x.no+" ?", x.title+" — ลบแล้วกู้คืนไม่ได้", ()=>{
    FUNCS.splice(FUNCS.indexOf(x),1); delete state[x.id];
    if(adJob===id) adJob=null;
    if(cur===id){ const left=FUNCS.filter(y=>inH(y)&&visible(y)); cur=left.length?left[0].id:null; }
    refreshAll(); renderAdmin(); toast("ลบงานแล้ว");
  });
}

/* ----- แก้ไขงานเชิงลึก ----- */
function adJobEdit(){
  if(!adJob || !FUNCS.some(x=>x.id===adJob)) adJob = FUNCS.length? FUNCS[0].id : null;
  if(!adJob) return `<div class="empty">ยังไม่มีงานในระบบ — กดเพิ่มงานใหม่ที่หน้า "งานทั้งหมด"</div>`;
  const x=FUNCS.find(y=>y.id===adJob);
  const picker=`<div class="card"><div class="band"><span>เลือกงานที่จะแก้</span><span class="who">${FUNCS.length} งาน</span></div>
    <div class="pad"><select class="setsel" style="margin-top:0" onchange="adPick(this.value)">
      ${FUNCS.map(y=>`<option value="${y.id}" ${y.id===adJob?"selected":""}>${y.hotel} · ใบ ${esc(y.no)} · ${esc(y.title)}</option>`).join("")}
    </select></div></div>`;

  const main=`<div class="card"><div class="band">ข้อมูลหลัก</div><div class="pad"><div class="form">
    <div class="fld"><label>โรงแรม</label><select id="j_hotel">
      <option value="QL" ${x.hotel==="QL"?"selected":""}>${esc(HOTELNAME.QL)}</option>
      <option value="BY" ${x.hotel==="BY"?"selected":""}>${esc(HOTELNAME.BY)}</option></select></div>
    <div class="fld"><label>เลขที่ใบสั่งงาน</label><input id="j_no" value="${esc(x.no)}"></div>
    <div class="fld"><label>ประเภทงาน</label><select id="j_kind">${opts(KINDS.includes(x.kind)?KINDS:KINDS.concat([x.kind]),x.kind)}</select></div>
    <div class="fld"><label>สถานะเอกสาร</label><select id="j_doc">${opts(["ร่าง","BEO","Final BEO","ใบเสนอราคา","ยกเลิก"],x.doc)}</select></div>
    <div class="fld"><label>สถานะงาน</label><select id="j_status">${opts(["ร่าง","รอมัดจำ","รอยืนยัน","ยืนยันแล้ว","ปิดงานแล้ว","ยกเลิก"],x.status)}</select></div>
    <div class="fld"><label>รูปแบบคิดเงิน</label><select id="j_mode">
      <option value="head" ${x.mode==="head"?"selected":""}>คิดต่อหัว / ต่อโต๊ะ</option>
      <option value="meal" ${x.mode==="meal"?"selected":""}>คิดตามมื้อ × วัน</option>
      <option value="rent" ${x.mode==="rent"?"selected":""}>เช่าห้อง</option>
      <option value="pack" ${x.mode==="pack"?"selected":""}>เหมาแพ็กเกจ</option></select></div>
    <div class="fld wide"><label>ชื่องาน</label><input id="j_title" value="${esc(x.title)}"></div>
    <div class="fld wide"><label>บริษัท / ลูกค้า</label><input id="j_company" value="${esc(x.company)}"></div>
    <div class="fld"><label>ผู้ติดต่อ</label><input id="j_contact" value="${esc(x.contact)}"></div>
    <div class="fld"><label>เบอร์โทร</label><input id="j_phone" value="${esc(x.phone)}"></div>
    <div class="fld"><label>จำนวนรับรอง</label><input id="j_g" type="number" value="${x.guarantee}"></div>
    <div class="fld"><label>หน่วยนับ</label><select id="j_unit">${opts(["ท่าน","โต๊ะ"],x.unit)}</select></div>
    <div class="fld"><label>จัดที่นั่ง (จำนวน)</label><input id="j_setup" type="number" value="${x.setup}"></div>
    <div class="fld"><label>รูปแบบจัดที่นั่ง</label><select id="j_style">${opts(["U-Shape","Theater","Class Room","โต๊ะกลม","โต๊ะจีน","Lunch","ยืนรับประทาน"].includes(x.style)?["U-Shape","Theater","Class Room","โต๊ะกลม","โต๊ะจีน","Lunch","ยืนรับประทาน"]:["U-Shape","Theater","Class Room","โต๊ะกลม","โต๊ะจีน","Lunch","ยืนรับประทาน"].concat([x.style]),x.style)}</select></div>
    <div class="fld"><label>Sales</label><select id="j_sales">${opts(STAFF.sales.includes(x.sales)?STAFF.sales:STAFF.sales.concat([x.sales]),x.sales)}</select></div>
    <div class="fld"><label>Event</label><select id="j_event">${opts(STAFF.event.includes(x.event)?STAFF.event:STAFF.event.concat([x.event]),x.event)}</select></div>
    <div class="fld"><label>อนุมัติโดย</label><select id="j_approve">${opts(STAFF.approve.includes(x.approve)?STAFF.approve:STAFF.approve.concat([x.approve]),x.approve)}</select></div>
  </div></div></div>`;

  const days=`<div class="card"><div class="band"><span>วันจัดงาน ${x.days.length} วัน</span>
      <span class="who"><button class="ghost" onclick="adAddDay()">＋ เพิ่มวัน</button></span></div>
    <div class="pad">${x.days.map((d,i)=>`<div class="erow">
      <div class="rowtop"><b>วันที่ ${i+1}</b>
        <button class="ghost danger2" onclick="adDelDay(${i})">ลบวันนี้</button></div>
      <div class="form">
        <div class="fld"><label>วันที่</label><input type="date" id="d_d${i}" value="${d.d}"></div>
        <div class="fld"><label>เวลา</label><input id="d_t${i}" value="${esc(d.time)}"></div>
        <div class="fld wide"><label>ห้องจัดงาน</label><input id="d_r${i}" value="${esc(d.room)}" list="roomlist"></div>
        <div class="fld wide"><label>ชุดเมนู</label><select id="d_m${i}">${opts(MENU_ORDER.includes(d.menu)?MENU_ORDER:MENU_ORDER.concat([d.menu]),d.menu)}</select></div>
        <div class="fld wide"><label>รูปแบบ / หมายเหตุ</label><input id="d_s${i}" value="${esc(d.set||"")}"></div>
      </div></div>`).join("")}
      <datalist id="roomlist">${[...ROOMS.QL,...ROOMS.BY].map(r=>`<option value="${esc(r)}">`).join("")}</datalist>
    </div></div>`;

  const rev=`<div class="card"><div class="band"><span>รายการรายได้</span>
      <span class="who"><button class="ghost" onclick="adAddRev()">＋ เพิ่มรายการ</button></span></div>
    <div class="pad">${x.rev.map((r,i)=>`<div class="erow">
      <div class="rowtop"><b>รายการที่ ${i+1}</b><button class="ghost danger2" onclick="adDelRev(${i})">ลบ</button></div>
      <div class="form">
        <div class="fld wide"><label>ชื่อรายการ</label><input id="r_n${i}" value="${esc(r.n)}"></div>
        <div class="fld"><label>ราคา</label><input id="r_p${i}" type="number" value="${r.price}"></div>
        <div class="fld"><label>จำนวน</label><input id="r_q${i}" type="number" value="${r.qty}"></div>
        <div class="fld"><label>จำนวนครั้ง / วัน</label><input id="r_t${i}" type="number" value="${r.times||1}"></div>
      </div></div>`).join("")}
      <div class="note" style="padding:0">ยอดรวมปัจจุบัน ${baht(total(x))} บาท</div></div></div>`;

  const pays=`<div class="card"><div class="band"><span>การรับเงิน</span>
      <span class="who"><button class="ghost" onclick="adAddPay()">＋ เพิ่มรายการรับเงิน</button></span></div>
    <div class="pad">${(x.pays||[]).map((p,i)=>`<div class="erow">
      <div class="rowtop"><b>งวดที่ ${i+1}</b><button class="ghost danger2" onclick="adDelPay(${i})">ลบ</button></div>
      <div class="form">
        <div class="fld"><label>วันที่รับ</label><input id="p_d${i}" value="${esc(p.d)}"></div>
        <div class="fld"><label>จำนวนเงิน</label><input id="p_a${i}" type="number" value="${p.amt}"></div>
        <div class="fld wide"><label>หมายเหตุ</label><input id="p_n${i}" value="${esc(p.note||"")}"></div>
      </div></div>`).join("") || `<div class="note" style="padding:0">ยังไม่มีการรับเงิน</div>`}</div></div>`;

  const depts=`<div class="card"><div class="band"><span>แผนกและรายการงาน</span>
      <span class="who"><button class="ghost" onclick="adAddDept()">＋ เพิ่มแผนก</button></span></div>
    <div class="pad">${x.depts.map((d,i)=>`<div class="erow">
      <div class="rowtop"><b>แผนกที่ ${i+1}</b><button class="ghost danger2" onclick="adDelDept(${i})">ลบแผนก</button></div>
      <div class="form">
        <div class="fld"><label>ชื่อแผนก</label><input id="q_n${i}" value="${esc(d.n)}"></div>
        <div class="fld"><label>ผู้รับผิดชอบ</label><input id="q_w${i}" value="${esc(d.who||"")}"></div>
      </div>
      <label class="note" style="padding:8px 0 4px;display:block">รายการงาน บรรทัดละ 1 รายการ</label>
      <textarea id="q_t${i}" rows="${Math.max(3,d.t.length)}">${esc(d.t.join("\n"))}</textarea>
    </div>`).join("")}</div></div>`;

  const bar=`<div class="savebar">
    <button class="save" onclick="adSaveJob()">บันทึกการแก้ไข</button>
    <button class="ghost" onclick="open_('${x.id}')">ดูใบสั่งงาน</button>
    <button class="ghost danger2" onclick="adDelJob('${x.id}')">ลบงานนี้</button></div>`;

  return picker+main+days+rev+pays+depts+bar;
}
function adCollect(){
  const x=FUNCS.find(y=>y.id===adJob); if(!x) return null;
  const prev=x.days.map(d=>d.menu);
  x.hotel=val("j_hotel"); x.no=val("j_no").trim(); x.kind=val("j_kind"); x.doc=val("j_doc"); x.status=val("j_status");
  x.mode=val("j_mode"); x.title=val("j_title").trim(); x.company=val("j_company").trim();
  x.contact=val("j_contact").trim(); x.phone=val("j_phone").trim();
  x.guarantee=+val("j_g")||0; x.unit=val("j_unit"); x.setup=+val("j_setup")||0; x.style=val("j_style");
  x.sales=val("j_sales"); x.event=val("j_event"); x.approve=val("j_approve");
  x.closed = x.status==="ปิดงานแล้ว";
  x.days=x.days.map((d,i)=>({...d, d:val("d_d"+i)||d.d, time:val("d_t"+i), room:val("d_r"+i).trim()||d.room,
    menu:val("d_m"+i), set:val("d_s"+i)}));
  x.rev=x.rev.map((r,i)=>({...r, n:val("r_n"+i), price:+val("r_p"+i)||0, qty:+val("r_q"+i)||0, times:+val("r_t"+i)||1}));
  x.pays=(x.pays||[]).map((p,i)=>({d:val("p_d"+i)||"—", amt:+val("p_a"+i)||0, note:val("p_n"+i)||""}));
  x.depts=x.depts.map((d,i)=>({...d, n:val("q_n"+i)||d.n, who:val("q_w"+i),
    t:val("q_t"+i).split("\n").map(s=>s.trim()).filter(Boolean)}));
  const st=state[x.id];
  st.menu=x.days.map((d,i)=> (prev[i]===d.menu && st.menu[i]) ? st.menu[i] : initSel(d.menu));
  return x;
}
function adSaveJob(){ const x=adCollect(); if(!x) return; refreshAll(); renderAdmin(); toast("บันทึกงาน "+x.no+" แล้ว"); }
function adAddDay(){
  const x=adCollect(); if(!x) return;
  const last=x.days[x.days.length-1];
  const nd=new Date((last?last.d:todayStr())+"T00:00:00"); nd.setDate(nd.getDate()+1);
  x.days.push({...last, d:nd.toISOString().slice(0,10)});
  state[x.id].menu.push(initSel(last? last.menu : "ไม่มีอาหาร"));
  renderAdmin();
}
function adDelDay(i){
  const x=adCollect(); if(!x) return;
  if(x.days.length<2){ toast("ต้องมีอย่างน้อย 1 วัน"); return; }
  x.days.splice(i,1); state[x.id].menu.splice(i,1); renderAdmin();
}
function adAddRev(){ const x=adCollect(); if(!x) return; x.rev.push({n:"รายการใหม่", price:0, qty:1, times:1}); renderAdmin(); }
function adDelRev(i){ const x=adCollect(); if(!x) return; x.rev.splice(i,1); renderAdmin(); }
function adAddPay(){ const x=adCollect(); if(!x) return; x.pays=x.pays||[]; x.pays.push({d:thDate(todayStr()), amt:0, note:"รับเงิน"}); renderAdmin(); }
function adDelPay(i){ const x=adCollect(); if(!x) return; x.pays.splice(i,1); renderAdmin(); }
function adAddDept(){
  const x=adCollect(); if(!x) return;
  x.depts.push({n:"แผนกใหม่", who:"", t:["(ยังไม่ระบุรายการงาน)"]}); renderAdmin();
}
function adDelDept(i){
  const x=adCollect(); if(!x) return;
  x.depts.splice(i,1);
  const st=state[x.id], nd=new Set();
  st.done.forEach(k=>{ const p=k.split("-"), di=+p[0];
    if(di<i) nd.add(k); else if(di>i) nd.add((di-1)+"-"+p[1]); });
  st.done=nd;
  st.photos=st.photos.filter(p=>x.depts.some(d=>d.n===p.dept));
  renderAdmin();
}

/* ----- ผู้ใช้และรหัส ----- */
function adUsers(){
  return `<div class="card"><div class="band"><span>ผู้ใช้ทั้งหมด ${USERS.length} คน</span>
      <span class="who"><button class="ghost" onclick="adAddUser()">＋ เพิ่มผู้ใช้</button></span></div>
    <div class="pad">${USERS.map((u,i)=>`<div class="erow">
      <div class="rowtop"><b>${esc(u.code)}</b>
        <button class="ghost danger2" onclick="adDelUser(${i})">ลบผู้ใช้</button></div>
      <div class="form">
        <div class="fld"><label>รหัสผู้ใช้</label><input id="u_c${i}" value="${esc(u.code)}"></div>
        <div class="fld"><label>รหัสผ่าน</label><input id="u_p${i}" value="${esc(u.pin)}"></div>
        <div class="fld"><label>ชื่อผู้ใช้</label><input id="u_n${i}" value="${esc(u.name)}"></div>
        <div class="fld"><label>สิทธิ์</label><select id="u_r${i}">
          <option value="admin" ${u.role==="admin"?"selected":""}>ผู้ดูแลระบบ — แก้ไขได้ทุกอย่าง</option>
          <option value="sales" ${u.role==="sales"?"selected":""}>Sales — แก้เฉพาะงานตัวเอง</option>
          <option value="dept" ${u.role==="dept"?"selected":""}>แผนก — ดูอย่างเดียว</option></select></div>
        <div class="fld"><label>โรงแรม (เฉพาะ Sales)</label><select id="u_h${i}">
          <option value="" ${!u.hotel?"selected":""}>ทั้ง 2 แห่ง</option>
          <option value="QL" ${u.hotel==="QL"?"selected":""}>${esc(HOTELNAME.QL)}</option>
          <option value="BY" ${u.hotel==="BY"?"selected":""}>${esc(HOTELNAME.BY)}</option></select></div>
        <div class="fld"><label>แผนก (เฉพาะสิทธิ์แผนก)</label><input id="u_d${i}" value="${esc(u.dept||"")}"></div>
        <div class="fld wide"><label>คำอธิบายที่แสดงบนหัวจอ</label><input id="u_t${i}" value="${esc(u.title||"")}"></div>
      </div></div>`).join("")}
      <div class="savebar"><button class="save" onclick="adSaveUsers()">บันทึกผู้ใช้</button></div>
    </div></div>`;
}
function adCollectUsers(){
  USERS.forEach((u,i)=>{
    u.code=val("u_c"+i).trim().toUpperCase()||u.code;
    u.pin=val("u_p"+i).trim()||u.pin;
    u.name=val("u_n"+i).trim()||u.name;
    u.role=val("u_r"+i);
    const h=val("u_h"+i); if(h) u.hotel=h; else delete u.hotel;
    const d=val("u_d"+i).trim(); if(d) u.dept=d; else delete u.dept;
    u.title=val("u_t"+i).trim();
  });
}
function adSaveUsers(){
  adCollectUsers();
  if(!USERS.some(u=>u.role==="admin")){ toast("ต้องมีผู้ดูแลระบบอย่างน้อย 1 คน"); return; }
  if(me){ uchip.innerHTML=`<span class="rolebadge">${esc(me.title)}</span><b>${esc(me.name)}</b>
    <button onclick="doLogout()">ออก</button>`; }
  refreshAll(); renderAdmin(); toast("บันทึกผู้ใช้แล้ว");
}
function adAddUser(){
  adCollectUsers();
  USERS.push({code:"USER"+(USERS.length+1), pin:"1234", name:"ผู้ใช้ใหม่", role:"sales", hotel:"QL", title:"Sales"});
  renderAdmin();
}
function adDelUser(i){
  adCollectUsers();
  const u=USERS[i];
  if(me && u.code===me.code){ toast("ลบบัญชีที่กำลังใช้อยู่ไม่ได้"); return; }
  askConfirm("ลบผู้ใช้ "+u.code+" ?", u.name, ()=>{ USERS.splice(i,1); renderAdmin(); toast("ลบผู้ใช้แล้ว"); });
}

/* ----- โรงแรมและโลโก้ ----- */
function adHotels(){
  return ["QL","BY"].map(k=>`<div class="card">
    <div class="band"><span>${k==="QL"?"โรงแรมที่ 1":"โรงแรมที่ 2"}</span><span class="who">รหัส ${k}</span></div>
    <div class="pad">
      <div class="fld"><label>ชื่อโรงแรม</label><input id="h_n${k}" value="${esc(HOTELNAME[k])}"></div>
      <div class="logobox"><img src="${LOGO[k]}" alt="">
        <div><button class="ghost" onclick="adPickLogo('${k}')">เปลี่ยนโลโก้</button>
          <p class="note" style="padding:5px 0 0">ไฟล์ PNG พื้นหลังโปร่งใสจะสวยที่สุด ระบบย่อขนาดให้อัตโนมัติ</p></div></div>
    </div></div>`).join("")
    + `<div class="savebar"><button class="save" onclick="adSaveHotels()">บันทึกชื่อโรงแรม</button></div>`;
}
function adSaveHotels(){
  HOTELNAME.QL=val("h_nQL").trim()||HOTELNAME.QL;
  HOTELNAME.BY=val("h_nBY").trim()||HOTELNAME.BY;
  applyBrand(); renderAdmin(); toast("บันทึกชื่อโรงแรมแล้ว");
}
function applyBrand(){
  gwL.src=LOGO.QL; gwR.src=LOGO.BY; gl1.src=LOGO.QL; gl2.src=LOGO.BY;
  gl1.alt=HOTELNAME.QL; gl2.alt=HOTELNAME.BY;
  const h=hotel==="ALL"?"QL":hotel;
  logo.src=LOGO[h];
  hotelName.textContent = hotel==="ALL"? (HOTELNAME.QL+" + "+HOTELNAME.BY) : HOTELNAME[hotel];
  renderHero(false);
  refreshAll();
}
function adPickLogo(k){ logoTarget=k; logopicker.click(); }
function shrinkPNG(file, max=640){
  return new Promise(res=>{
    const img=new Image(), url=URL.createObjectURL(file);
    img.onload=()=>{
      const s=Math.min(1,max/Math.max(img.width,img.height));
      const c=document.createElement("canvas");
      c.width=Math.round(img.width*s); c.height=Math.round(img.height*s);
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);
      URL.revokeObjectURL(url); res(c.toDataURL("image/png"));
    };
    img.onerror=()=>{ URL.revokeObjectURL(url); res(""); };
    img.src=url;
  });
}
logopicker.addEventListener("change", async e=>{
  const file=e.target.files[0]; e.target.value=""; if(!file || !logoTarget) return;
  const src=await shrinkPNG(file);
  if(!src){ toast("อ่านไฟล์รูปไม่ได้"); return; }
  LOGO[logoTarget]=src; applyBrand(); renderAdmin(); toast("เปลี่ยนโลโก้แล้ว");
});

/* ----- ห้องจัดงาน ----- */
function adRooms(){
  return ["QL","BY"].map(k=>`<div class="card">
    <div class="band"><span>ห้องจัดงาน — ${esc(HOTELNAME[k])}</span><span class="who">${ROOMS[k].length} ห้อง</span></div>
    <div class="pad"><div class="erow"><label class="note" style="padding:0 0 6px;display:block">พิมพ์ชื่อห้อง บรรทัดละ 1 ห้อง</label>
      <textarea id="rm_${k}" rows="${Math.max(4,ROOMS[k].length)}">${esc(ROOMS[k].join("\n"))}</textarea></div></div></div>`).join("")
    + `<div class="savebar"><button class="save" onclick="adSaveRooms()">บันทึกห้องจัดงาน</button></div>`;
}
function adSaveRooms(){
  ["QL","BY"].forEach(k=>{ const l=val("rm_"+k).split("\n").map(s=>s.trim()).filter(Boolean); if(l.length) ROOMS[k]=l; });
  renderAdmin(); toast("บันทึกห้องจัดงานแล้ว");
}

/* ----- ประเภทงานและกลุ่ม ----- */
function adKinds(){
  return `<div class="card"><div class="band"><span>ประเภทงานที่เลือกได้ตอนเพิ่มงาน</span><span class="who">${KINDS.length} ประเภท</span></div>
    <div class="pad"><div class="erow"><label class="note" style="padding:0 0 6px;display:block">บรรทัดละ 1 ประเภท</label>
      <textarea id="kd_list" rows="${Math.max(4,KINDS.length)}">${esc(KINDS.join("\n"))}</textarea></div></div></div>
  <div class="card"><div class="band"><span>การรวมประเภทที่เหมือนกันเป็นกลุ่มเดียว</span>
      <span class="who"><button class="ghost" onclick="adAddGroup()">＋ เพิ่มกลุ่ม</button></span></div>
    <div class="pad">
      <p class="note" style="padding:0 0 10px">ใช้กับหน้าสรุป เช่น งานแต่งงาน พิธีหมั้น พิธีมงคลสมรส จะถูกนับรวมเป็นกลุ่มเดียวกัน ระบบจะดูจากคำที่ใส่ไว้</p>
      ${KINDGROUPS.map((g,i)=>`<div class="erow">
        <div class="rowtop"><b>กลุ่มที่ ${i+1}</b><button class="ghost danger2" onclick="adDelGroup(${i})">ลบกลุ่ม</button></div>
        <div class="form">
          <div class="fld"><label>ชื่อกลุ่ม</label><input id="kg_n${i}" value="${esc(g.g)}"></div>
          <div class="fld"><label>คำที่ใช้จับกลุ่ม (คั่นด้วย , )</label><input id="kg_k${i}" value="${esc(g.kw.join(", "))}"></div>
        </div></div>`).join("")}
      <div class="savebar"><button class="save" onclick="adSaveKinds()">บันทึกประเภทงานและกลุ่ม</button></div>
    </div></div>`;
}
function adCollectKinds(){
  const l=val("kd_list").split("\n").map(s=>s.trim()).filter(Boolean); if(l.length) KINDS=l;
  KINDGROUPS=KINDGROUPS.map((g,i)=>({g:val("kg_n"+i).trim()||g.g,
    kw:val("kg_k"+i).split(",").map(s=>s.trim()).filter(Boolean)}));
}
function adSaveKinds(){ adCollectKinds(); refreshAll(); renderAdmin(); toast("บันทึกประเภทงานแล้ว"); }
function adAddGroup(){ adCollectKinds(); KINDGROUPS.push({g:"กลุ่มใหม่", kw:[]}); renderAdmin(); }
function adDelGroup(i){ adCollectKinds(); KINDGROUPS.splice(i,1); renderAdmin(); }

/* ----- แผนกมาตรฐาน ----- */
function adDepts(){
  return `<div class="card"><div class="band"><span>แผนกมาตรฐานที่ใช้ตอนเพิ่มงานใหม่</span>
      <span class="who"><button class="ghost" onclick="adAddBasicDept()">＋ เพิ่มแผนก</button></span></div>
    <div class="pad">${DEPTS_BASIC.map((d,i)=>`<div class="erow">
      <div class="rowtop"><b>${esc(d.n)}</b><button class="ghost danger2" onclick="adDelBasicDept(${i})">ลบ</button></div>
      <div class="fld"><label>ชื่อแผนก</label><input id="bd_n${i}" value="${esc(d.n)}"></div>
      <label class="note" style="padding:8px 0 4px;display:block">รายการงานมาตรฐาน บรรทัดละ 1 รายการ</label>
      <textarea id="bd_t${i}" rows="${Math.max(3,d.t.length)}">${esc(d.t.join("\n"))}</textarea></div>`).join("")}
      <div class="savebar"><button class="save" onclick="adSaveBasicDepts()">บันทึกแผนกมาตรฐาน</button></div>
    </div></div>`;
}
function adCollectBasicDepts(){
  DEPTS_BASIC.forEach((d,i)=>{ d.n=val("bd_n"+i).trim()||d.n;
    d.t=val("bd_t"+i).split("\n").map(s=>s.trim()).filter(Boolean); });
}
function adSaveBasicDepts(){ adCollectBasicDepts(); renderAdmin(); toast("บันทึกแผนกมาตรฐานแล้ว"); }
function adAddBasicDept(){ adCollectBasicDepts(); DEPTS_BASIC.push({n:"แผนกใหม่", who:"", t:[]}); renderAdmin(); }
function adDelBasicDept(i){ adCollectBasicDepts(); DEPTS_BASIC.splice(i,1); renderAdmin(); }

/* ----- รายชื่อพนักงาน ----- */
function adStaff(){
  const box=(k,label)=>`<div class="card"><div class="band"><span>${label}</span><span class="who">${STAFF[k].length} รายชื่อ</span></div>
    <div class="pad"><div class="erow"><label class="note" style="padding:0 0 6px;display:block">บรรทัดละ 1 ชื่อ ใส่ — ไว้บรรทัดแรกสำหรับ "ยังไม่ระบุ"</label>
      <textarea id="sf_${k}" rows="${Math.max(3,STAFF[k].length)}">${esc(STAFF[k].join("\n"))}</textarea></div></div></div>`;
  return box("sales","Sales ผู้ดูแลงาน")+box("event","Event ผู้ควบคุมงาน")+box("approve","ผู้อนุมัติงาน")
    + `<div class="savebar"><button class="save" onclick="adSaveStaff()">บันทึกรายชื่อ</button></div>`;
}
function adSaveStaff(){
  ["sales","event","approve"].forEach(k=>{
    const l=val("sf_"+k).split("\n").map(s=>s.trim()).filter(Boolean); if(l.length) STAFF[k]=l; });
  refreshAll(); renderAdmin(); toast("บันทึกรายชื่อแล้ว");
}

/* ----- ชุดเมนู ----- */
function adMenus(){
  const names=Object.keys(MENUS);
  if(!adMenuName || !MENUS[adMenuName]) adMenuName=names[0]||null;
  if(!adMenuName) return `<div class="empty">ยังไม่มีชุดเมนู <button class="ghost" onclick="adAddMenu()">＋ เพิ่มชุดเมนู</button></div>`;
  const list=MENUS[adMenuName];
  return `<div class="card"><div class="band"><span>เลือกชุดเมนู</span>
      <span class="who"><button class="ghost" onclick="adAddMenu()">＋ เพิ่มชุดเมนู</button></span></div>
    <div class="pad"><select class="setsel" style="margin-top:0" onchange="adPickMenu(this.value)">
      ${names.map(n=>`<option ${n===adMenuName?"selected":""}>${esc(n)}</option>`).join("")}</select>
      <div class="fld" style="margin-top:11px"><label>ชื่อชุดเมนู</label><input id="m_name" value="${esc(adMenuName)}"></div>
    </div></div>
  <div class="card"><div class="band"><span>กลุ่มรายการอาหาร ${list.length} กลุ่ม</span>
      <span class="who"><button class="ghost" onclick="adAddMenuGroup()">＋ เพิ่มกลุ่ม</button></span></div>
    <div class="pad">${list.map((g,i)=>{
      const fixed=!!g.fixed, items=(fixed? g.fixed : g.items)||[];
      return `<div class="erow">
        <div class="rowtop"><b>กลุ่มที่ ${i+1}</b><button class="ghost danger2" onclick="adDelMenuGroup(${i})">ลบกลุ่ม</button></div>
        <div class="form">
          <div class="fld wide"><label>ชื่อกลุ่ม</label><input id="g_n${i}" value="${esc(g.g)}"></div>
          <div class="fld"><label>ชนิดกลุ่ม</label><select id="g_k${i}">
            <option value="pick" ${fixed?"":"selected"}>ให้ลูกค้าเลือกได้</option>
            <option value="fixed" ${fixed?"selected":""}>รายการตายตัว</option></select></div>
          <div class="fld"><label>เลือกได้กี่อย่าง (0 = ไม่จำกัด)</label><input id="g_p${i}" type="number" value="${g.pick||0}"></div>
        </div>
        <label class="note" style="padding:8px 0 4px;display:block">รายการอาหาร บรรทัดละ 1 รายการ</label>
        <textarea id="g_i${i}" rows="${Math.max(3,Math.min(12,items.length))}">${esc(items.join("\n"))}</textarea>
      </div>`;}).join("")}
      <div class="savebar">
        <button class="save" onclick="adSaveMenu()">บันทึกชุดเมนู</button>
        <button class="ghost danger2" onclick="adDelMenu()">ลบชุดเมนูนี้</button></div>
    </div></div>`;
}
function adPickMenu(n){ adMenuName=n; renderAdmin(); }
function adCollectMenu(){
  const list=MENUS[adMenuName]; if(!list) return;
  list.forEach((g,i)=>{
    const kind=val("g_k"+i), items=val("g_i"+i).split("\n").map(s=>s.trim()).filter(Boolean);
    g.g=val("g_n"+i).trim()||g.g;
    if(kind==="fixed"){ g.fixed=items; delete g.items; delete g.pick; delete g.on; }
    else { g.items=items; g.pick=+val("g_p"+i)||0; g.on=(g.on||[]).filter(o=>items.includes(o)); delete g.fixed; }
  });
}
function adSaveMenu(){
  adCollectMenu();
  const nm=val("m_name").trim();
  if(nm && nm!==adMenuName && !MENUS[nm]){ adRenameMenu(adMenuName,nm); adMenuName=nm; }
  rebuildMenuOrder(); reinitMenus(); refreshAll(); renderAdmin(); toast("บันทึกชุดเมนูแล้ว");
}
function adRenameMenu(oldN,newN){
  const o={}; Object.keys(MENUS).forEach(k=> o[k===oldN?newN:k]=MENUS[k]);
  Object.keys(MENUS).forEach(k=>delete MENUS[k]);
  Object.keys(o).forEach(k=>{ MENUS[k]=o[k]; });
  FUNCS.forEach(x=>x.days.forEach(d=>{ if(d.menu===oldN) d.menu=newN; }));
}
function adAddMenu(){
  askText("เพิ่มชุดเมนู","ตั้งชื่อชุดเมนูใหม่","เช่น บุฟเฟ่ต์ C (150 ท่าน)", n=>{
    if(MENUS[n]){ toast("มีชุดเมนูชื่อนี้แล้ว"); return; }
    MENUS[n]=[{g:"รายการอาหาร", pick:0, items:[], on:[]}];
    adMenuName=n; rebuildMenuOrder(); renderAdmin(); toast("เพิ่มชุดเมนูแล้ว");
  });
}
function adDelMenu(){
  const n=adMenuName, used=FUNCS.filter(x=>x.days.some(d=>d.menu===n));
  askConfirm("ลบชุดเมนู ?", n+(used.length? " — มี "+used.length+" งานที่ใช้อยู่ งานเหล่านั้นจะเปลี่ยนเป็น ไม่มีอาหาร":""), ()=>{
    delete MENUS[n];
    FUNCS.forEach(x=>x.days.forEach(d=>{ if(d.menu===n) d.menu="ไม่มีอาหาร"; }));
    adMenuName=null; rebuildMenuOrder(); reinitMenus(); refreshAll(); renderAdmin(); toast("ลบชุดเมนูแล้ว");
  });
}
function adAddMenuGroup(){
  adCollectMenu();
  MENUS[adMenuName].push({g:"กลุ่มใหม่", pick:1, items:[], on:[]});
  renderAdmin();
}
function adDelMenuGroup(i){
  adCollectMenu();
  MENUS[adMenuName].splice(i,1);
  reinitMenus(); renderAdmin();
}
/* ----- เกณฑ์ KPI ----- */
function adKPI(){
  const tag=k=> k==="menu"?"เฉพาะแผนกครัว" : (k==="seat"||k==="clash")?"เฉพาะแผนก F&B" : "ทุกแผนก";
  return `<div class="card"><div class="band"><span>หัวข้อประเมินและน้ำหนักคะแนน</span>
      <span class="who">แก้ชื่อหัวข้อได้ · ใส่น้ำหนัก 0 = ไม่ใช้หัวข้อนั้น</span></div>
    <div class="pad">
      <p class="note" style="padding:0 0 10px">น้ำหนักใส่ตัวเลขเท่าไรก็ได้ ระบบคิดเป็นสัดส่วนให้เอง หัวข้อที่แผนกนั้นไม่มีข้อมูล ระบบจะข้ามและเฉลี่ยจากหัวข้อที่เหลือ</p>
      ${KPIKEYS.map(k=>`<div class="erow">
        <div class="rowtop"><b>${tag(k)}</b></div>
        <div class="form">
          <div class="fld wide"><label>ชื่อหัวข้อที่แสดงในรายงาน</label><input id="kn_${k}" value="${esc(KPINAME[k])}"></div>
          <div class="fld"><label>น้ำหนักคะแนน</label><input id="kw_${k}" type="number" value="${KPIW[k]}"></div>
          <div class="fld"><label>วัดจาก</label><input value="${esc(KPIHOW[k])}" readonly style="color:var(--muted)"></div>
        </div></div>`).join("")}
    </div></div>
  <div class="card"><div class="band"><span>รวมแผนกที่เป็นแผนกเดียวกัน</span>
      <span class="who"><button class="ghost" onclick="adAddDeptGroup()">＋ เพิ่มกลุ่มแผนก</button></span></div>
    <div class="pad">
      <p class="note" style="padding:0 0 10px">ถ้าชื่อแผนกในใบสั่งงานเขียนไม่เหมือนกัน เช่น "ทีมอีเวนต์" กับ "Event" ใส่คำที่ใช้จับให้อยู่กลุ่มเดียวกัน คะแนน KPI จะรวมเป็นแผนกเดียว</p>
      ${DEPTGROUPS.map((g,i)=>`<div class="erow">
        <div class="rowtop"><b>กลุ่มที่ ${i+1}</b><button class="ghost danger2" onclick="adDelDeptGroup(${i})">ลบ</button></div>
        <div class="form">
          <div class="fld"><label>ชื่อแผนกที่ใช้ในรายงาน</label><input id="dg_n${i}" value="${esc(g.g)}"></div>
          <div class="fld"><label>คำที่ใช้จับกลุ่ม (คั่นด้วย , )</label><input id="dg_k${i}" value="${esc(g.kw.join(", "))}"></div>
        </div></div>`).join("")}
    </div></div>
  <div class="card"><div class="band">เกณฑ์ตัดเกรด (คะแนนเต็ม 100)</div><div class="pad"><div class="form">
    <div class="fld"><label>ดีมาก ตั้งแต่</label><input id="kt_great" type="number" value="${KPIGRADE.great}"></div>
    <div class="fld"><label>ดี ตั้งแต่</label><input id="kt_good" type="number" value="${KPIGRADE.good}"></div>
    <div class="fld"><label>พอใช้ ตั้งแต่</label><input id="kt_fair" type="number" value="${KPIGRADE.fair}"></div>
  </div></div></div>
  <div class="card"><div class="band"><span>คำที่ใช้แยกประเภทแผนก</span><span class="who">ใช้เลือกหัวข้อเฉพาะทาง</span></div>
    <div class="pad"><div class="form">
      <div class="fld wide"><label>แผนกครัว (คั่นด้วย , )</label><input id="kk_kitchen" value="${esc(KPIKEY.kitchen)}"></div>
      <div class="fld wide"><label>แผนกบริการ F&amp;B (คั่นด้วย , )</label><input id="kk_fb" value="${esc(KPIKEY.fb)}"></div>
    </div></div></div>
  <div class="savebar"><button class="save" onclick="adSaveKPI()">บันทึกเกณฑ์ KPI</button></div>`;
}
function adCollectKPI(){
  KPIKEYS.forEach(k=>{
    KPIW[k]=Math.max(0,+val("kw_"+k)||0);
    const n=val("kn_"+k).trim(); if(n) KPINAME[k]=n;
  });
  KPIGRADE.great=+val("kt_great")||90; KPIGRADE.good=+val("kt_good")||80; KPIGRADE.fair=+val("kt_fair")||70;
  KPIKEY.kitchen=val("kk_kitchen"); KPIKEY.fb=val("kk_fb");
  DEPTGROUPS=DEPTGROUPS.map((g,i)=>({g:val("dg_n"+i).trim()||g.g,
    kw:val("dg_k"+i).split(",").map(s=>s.trim()).filter(Boolean)}));
}
function adSaveKPI(){ adCollectKPI(); refreshAll(); renderAdmin(); toast("บันทึกเกณฑ์ KPI แล้ว"); }
function adAddDeptGroup(){ adCollectKPI(); DEPTGROUPS.push({g:"กลุ่มแผนกใหม่", kw:[]}); renderAdmin(); }
function adDelDeptGroup(i){ adCollectKPI(); DEPTGROUPS.splice(i,1); renderAdmin(); }

function reinitMenus(){
  FUNCS.forEach(x=>{
    const st=state[x.id]; if(!st) return;
    st.menu=x.days.map((d,i)=>{
      const sel=initSel(d.menu), prev=st.menu[i];
      if(prev) Object.keys(sel).forEach(g=>{
        if(prev[g]){
          const grp=(MENUS[d.menu]||[]).find(gg=>gg.g===g), items=(grp&&grp.items)||[];
          sel[g]=new Set([...prev[g]].filter(v=>items.includes(v)));
        }
      });
      return sel;
    });
  });
}

/* ================= Supabase — บันทึกข้อมูลถาวร ================= */
