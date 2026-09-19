function renderBEO(){
  const x=f(); if(!x) return;
  const s=state[x.id] || (state[x.id]={menu:x.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]});
  beoNo.textContent="ใบสั่งงาน "+x.no+" · "+x.kind;
  beoStatus.textContent=x.doc+" · "+x.status;
  beoLogo.src=LOGO[x.hotel]; beoLogo.alt=HOTELNAME[x.hotel];
  beoTitle.textContent=x.title;
  beoWhen.textContent=dateLabel(x)+" · "+x.days[0].time+" · "+x.days[0].room;

  const ro = canEdit()? "" : " readonly";
  const rows=[["บริษัท","company",x.company],["ผู้ติดต่อ","contact",x.contact],["โทรศัพท์","phone",x.phone],
    ["รับรอง","guarantee",x.guarantee+" "+x.unit],["จัดที่นั่ง","setup",x.setup+" "+x.unit+" ("+x.style+")"],
    ["Sales","sales",x.sales],["Event","event",x.event],["อนุมัติโดย","approve",x.approve]];
  beoRows.innerHTML=rows.map(r=>{
    const body = STAFF[r[1]]
      ? (canEdit()
          ? `<select aria-label="${r[0]}" onchange="editField('${r[1]}',this)"
               style="width:100%;border:1px solid var(--line);background:var(--paper);border-radius:6px;padding:4px 7px;font-size:14px">
               ${STAFF[r[1]].concat(STAFF[r[1]].includes(r[2])?[]:[r[2]]).map(o=>`<option ${o===r[2]?"selected":""}>${o}</option>`).join("")}
             </select>`
          : `<span>${r[2]}</span>`)
      : `<input value="${r[2]}" aria-label="${r[0]}"${ro} onchange="editField('${r[1]}',this)">`;
    return `<div class="row"><div class="k">${r[0]}</div><div class="v">${body}</div></div>`;
  }).join("");

  const ph=phase(x), dd=daysTo(x), pend=pending(x);
  stWhen.textContent = ph==="closed"?"ปิดงานแล้ว": ph==="done"?"เลยวันงานแล้ว": ph==="live"?"กำลังจัดวันนี้": (dd===0?"วันนี้":"อีก "+dd+" วัน");
  const doneAll = x.depts.reduce((a,d)=>a+d.t.length,0);
  const doneNow = x.depts.reduce((a,d,di)=>a+d.t.filter((_,ti)=>s.done.has(di+"-"+ti)).length,0);
  stBody.innerHTML=`
    <div style="display:flex;gap:10px;align-items:center;font-size:14px;margin-bottom:9px">
      <span class="tag2 ${ph==="closed"?"done":ph==="done"?"hold":ph==="live"?"live":"next"}">
        ${ph==="closed"?"ปิดงานแล้ว":ph==="done"?"รอปิดงาน":ph==="live"?"กำลังจัดวันนี้":"ยังไม่ถึงกำหนด"}</span>
      <span style="color:var(--muted);font-size:13px">งานฝ่ายเสร็จ ${doneNow}/${doneAll} รายการ</span>
    </div>
    <div class="bar2" style="max-width:none"><i style="width:${doneAll?Math.round(doneNow/doneAll*100):0}%"></i></div>
    ${x.closed?`<div style="font-size:12.5px;color:var(--muted);margin-top:10px">ปิดงานโดย ${x.closedBy} เมื่อ ${x.closedAt}</div>`
      : pend.length?`<div style="font-size:12.5px;color:var(--warn);margin-top:10px">ค้างอยู่: ${pend.join(" · ")}</div>`
      : `<div style="font-size:12.5px;color:var(--ok);margin-top:10px">ทุกอย่างเรียบร้อย พร้อมปิดงาน</div>`}
    ${canEdit()?`<div class="btns" style="margin-top:12px">
      ${x.closed?`<button class="ghost" onclick="reopenJob()">เปิดงานอีกครั้ง</button>`
               :`<button class="save" onclick="closeJob()">ปิดงานนี้</button>`}</div>`:""}`;
  dayCount.textContent=x.days.length+" วัน";
  dayBox.innerHTML=x.days.map((d,di)=>`<div class="day">
      <div class="hd"><b>${thDate(d.d,true)} · ${d.time}</b><span>${d.room} — ${d.set||""}</span></div>
      ${d.note?`<div style="font-size:12.5px;color:var(--muted);margin-top:4px">${d.note}</div>`:""}
      <select class="setsel" ${canEdit()?"":"disabled"} onchange="changeMenu(${di},this.value)" aria-label="ชุดเมนูวันที่ ${thDate(d.d)}">
        ${MENU_ORDER.map(m=>`<option ${m===d.menu?"selected":""}>${m}</option>`).join("")}
      </select>
      ${MENUS[d.menu] ? `<details class="menu"><summary>ดูรายการอาหาร</summary>${menuHTML(di)}</details>${canEdit()?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="ghost" onclick="openMenuEditor(${di})">✏️ แก้เมนูเฉพาะงาน</button>${feHasOverride(x,di)?`<button class="ghost" onclick="feResetMenu(${di})">↩ คืนค่ามาตรฐาน</button>`:""}</div>`:""}` : ""}
    </div>`).join("");

  revMode.textContent = x.mode==="rent"?"เช่าห้อง / เหมาจ่าย": x.mode==="meal"?"คิดตามมื้อ × วัน":"คิดต่อหัว";
  revLines.innerHTML=`<thead><tr><th>รายการ</th><th>ราคา</th><th>จำนวน</th><th>ครั้ง</th><th>รวม</th></tr></thead><tbody>`
    + x.rev.map(r=>`<tr><td>${r.n}</td><td class="money">${baht(r.price)}</td><td>${r.qty}</td><td>${r.times||1}</td>
        <td class="money">${baht(r.price*r.qty*(r.times||1))}</td></tr>`).join("")
    + `</tbody><tfoot>
        <tr><td colspan="4">ยอดรวม</td><td class="money">${baht(total(x))}</td></tr>
        ${(x.pays||[]).map((p,pi)=>`<tr><td colspan="4">รับเงิน ${p.d} · ${p.note}${canEdit()?` <button class="x2" onclick="delPay(${pi})">ลบ</button>`:""}</td>
            <td class="money">${baht(p.amt)}</td></tr>`).join("")}
        <tr><td colspan="4">รับแล้วรวม</td><td class="money">${received(x)?baht(received(x)):"—"}</td></tr>
        <tr><td colspan="4">คงเหลือ</td><td class="money">${baht(total(x)-received(x))}</td></tr>
       </tfoot>`;

  payBtns.innerHTML = canEdit()? `
    <button class="ghost" onclick="addPay()">＋ บันทึกรับเงิน</button>
    ${total(x)-received(x)>0?`<button class="ghost" onclick="payAll()">รับครบแล้ว (${baht(total(x)-received(x))})</button>`:`<span class="note" style="padding:0">รับเงินครบแล้ว</span>`}` : "";
  beoProg.innerHTML=x.prog.length? x.prog.map(p=>`<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join("")
    : `<div style="color:var(--muted)">ยังไม่ได้ใส่กำหนดการ</div>`;

  const myDepts = (me && me.role==="dept") ? x.depts.map((d,i)=>[d,i]).filter(a=>a[0].n===me.dept) : x.depts.map((d,i)=>[d,i]);
  document.getElementById("revMode").closest(".card").style.display = canMoney()? "" : "none";
  deptBox.innerHTML=myDepts.map(([d,di])=>`<div class="card">
    <div class="band"><span>${d.n}</span><span class="who">${canEdit()
        ? `<input value="${d.who||""}" placeholder="ผู้รับผิดชอบ" onchange="setWho(${di},this)"
             style="border:1px solid var(--line);background:var(--paper);border-radius:6px;padding:2px 7px;font-size:12.5px;width:132px">`
        : (d.who||"—")} · ${d.t.filter((_,ti)=>s.done.has(di+"-"+ti)).length}/${d.t.length}</span></div>
    <div class="pad">${d.t.map((t,ti)=>{
      const key=di+"-"+ti;
      return `<label class="task"><input type="checkbox" ${s.done.has(key)?"checked":""}
        onchange="toggleTask('${key}',this)"><span>${t}</span></label>`;
    }).join("")}
      ${canEdit()?`<button class="ghost" style="margin-top:8px;font-size:12.5px" onclick="addTask(${di})">＋ เพิ่มรายการงาน</button>`:""}
      <div class="thumbs">${s.photos.filter(p=>p.dept===d.n).map((p,pi)=>
        `<button class="thumb" onclick="openDeptLB('${d.n.replace(/'/g,"")}',${pi})">
           <img src="${p.src}" alt="${p.cap}" loading="lazy"><span>${p.cap}</span></button>`).join("")}
        <button class="thumbadd" onclick="addTo('${d.n.replace(/'/g,"")}')"><span style="font-size:19px">＋</span>แนบรูป</button>
      </div>
    </div></div>`).join("")
    + (x.adj&&x.adj.length ? x.adj.map(a=>`<div class="card">
        <div class="band"><span>ใบแก้ไข ${a.date}</span><span class="who">${a.topic}</span></div>
        <div class="pad" style="display:grid;gap:12px;grid-template-columns:1fr 1fr;font-size:13px">
          <div><div style="color:var(--muted);margin-bottom:4px">จากเดิม</div>
            ${a.from.map(t=>`<div style="padding:2px 0">${t}</div>`).join("")}</div>
          <div><div style="color:var(--muted);margin-bottom:4px">เปลี่ยนเป็น</div>
            ${a.to.map(t=>`<div style="padding:2px 0;${a.from.includes(t)?"":"color:var(--gold);font-weight:600"}">${t}</div>`).join("")}</div>
        </div>
        <div class="pad" style="border-top:1px solid var(--line);font-size:12.5px;color:var(--muted)">แจ้ง: ${a.cc}</div>
      </div>`).join("") : "")
    + (x.link ? `<div class="card"><div class="band">งานต่อเนื่อง</div><div class="pad">
        <button class="ghost" onclick="open_('${x.link}')">ไปที่ใบสั่งงาน ${x.linkNo}</button>
        <div style="font-size:12.5px;color:var(--muted);margin-top:8px">วันเดียวกัน ยอดรวมทั้งคู่ ${baht(total(x)+total(FUNCS.find(y=>y.id===x.link)))} บาท</div>
      </div></div>` : "")
    + `<div class="card"><div class="band">ส่งงาน</div><div class="pad btns">
        <button class="ghost" onclick="go('photos')">รูปแนบ (${s.photos.length})</button>
        <button class="ghost" onclick="go('send')">สรุปงาน / ส่งให้ฝ่าย</button>
        <button class="ghost" onclick="doPrint()">ดูใบสรุปงาน / พิมพ์</button>
        ${canEdit()?`<button class="ghost" style="color:#B4573F" onclick="delFunc()">ลบงานนี้</button>`:""}
      </div></div>`;
}

function menuHTML(di){
  const x=f(), sel=state[x.id].menu[di];
  return (MENUS[x.days[di].menu]||[]).map((g,gi)=>{
    if(g.fixed) return `<div class="menugrp"><div class="gh"><span>${g.g}</span></div>
      <div class="fixedlist">${g.fixed.map(t=>`<div>${t}</div>`).join("")}</div></div>`;
    const n=sel[g.g].size, over=g.pick && n>g.pick;
    return `<div class="menugrp">
      <div class="gh"><span>${g.g}</span>
        <span class="count ${over?"over":""}" id="c${di}_${gi}">${g.pick?`เลือก ${n}/${g.pick}`:`เลือกแล้ว ${n}`}</span></div>
      ${g.items.map(it=>`<label class="task"><input type="checkbox" ${sel[g.g].has(it)?"checked":""}
        onchange="pick(${di},${gi},this)" data-it="${it}" ${canEdit()?"":"disabled"}><span>${it}</span></label>`).join("")}
    </div>`;
  }).join("");
}
function pick(di,gi,el){
  const x=f(), g=MENUS[x.days[di].menu][gi], sel=state[x.id].menu[di], it=el.dataset.it;
  el.checked ? sel[g.g].add(it) : sel[g.g].delete(it);
  const n=sel[g.g].size, c=document.getElementById("c"+di+"_"+gi);
  c.textContent = g.pick?`เลือก ${n}/${g.pick}`:`เลือกแล้ว ${n}`;
  c.classList.toggle("over", !!g.pick && n>g.pick);
}
function addPay(){
  if(!canEdit()) return;
  const x=f(), left=total(x)-received(x);
  askText("บันทึกรับเงิน", "คงเหลือ "+baht(left)+" บาท — ใส่จำนวนเงินที่รับ", "เช่น 76000", v=>{
    const n=parseFloat(String(v).replace(/[, ]/g,""));
    if(isNaN(n)||n<=0){ toast("จำนวนเงินไม่ถูกต้อง"); return; }
    x.pays.push({d:thDate(todayStr()), amt:n, note:"รับโดย "+me.name});
    renderBEO(); renderList(); renderRev(); toast("บันทึกรับเงินแล้ว");
  });
}
function payAll(){
  if(!canEdit()) return;
  const x=f(), left=total(x)-received(x);
  if(left<=0) return;
  askConfirm("รับเงินครบ", "บันทึกรับเงินอีก "+baht(left)+" บาท ให้ครบยอด "+baht(total(x))+" บาท", ()=>{
    x.pays.push({d:thDate(todayStr()), amt:left, note:"ชำระครบ รับโดย "+me.name});
    renderBEO(); renderList(); renderRev(); toast("รับเงินครบแล้ว");
  });
}
function delPay(i){
  if(!canEdit()) return;
  const x=f(), p=x.pays[i];
  askConfirm("ลบรายการรับเงิน", p.d+" · "+baht(p.amt)+" บาท", ()=>{
    x.pays.splice(i,1); renderBEO(); renderList(); renderRev(); toast("ลบรายการแล้ว");
  });
}
function closeJob(){
  if(!canEdit()) return;
  const x=f(), p=pending(x);
  askConfirm("ปิดงาน "+x.no+" ?", p.length? "ยังค้าง: "+p.join(" · ")+" — ยืนยันปิดงานเลยไหม" : "ทุกอย่างเรียบร้อยแล้ว", ()=>{
    x.closed=true; x.closedBy=me.name; x.closedAt=thDate(todayStr(),true);
    x.status="ปิดงานแล้ว";
    renderBEO(); renderList(); renderRev(); toast("ปิดงานแล้ว");
  });
}
function reopenJob(){
  if(!canEdit()) return;
  const x=f(); x.closed=false; x.status="ยืนยันแล้ว";
  renderBEO(); renderList(); renderRev(); toast("เปิดงานอีกครั้ง");
}
function setWho(di,el){ if(!canEdit()) return; f().depts[di].who=el.value.trim(); renderSend(); }
function addTask(di){
  if(!canEdit()) return;
  askText("เพิ่มรายการงาน", "แผนก "+f().depts[di].n, "เช่น จัดโต๊ะลงทะเบียนหน้าห้อง", t=>{
    f().depts[di].t.push(t); renderBEO(); renderSend();
  });
}
function editField(k,el){
  if(!canEdit()) return;
  const x=f(), v=el.value.trim();
  if(k==="guarantee"||k==="setup"){ const n=parseInt(v,10); if(!isNaN(n)) x[k]=n; el.value=x[k]+" "+x.unit+(k==="setup"?" ("+x.style+")":""); }
  else x[k]=v;
  renderList(); renderRev();
}
function changeMenu(di,v){ const x=f(); x.days[di].menu=v; state[x.id].menu[di]=initSel(v); renderBEO(); }
function toggleTask(k,el){ el.checked ? state[cur].done.add(k) : state[cur].done.delete(k); renderSend(); }

/* ---------------- photos ---------------- */
