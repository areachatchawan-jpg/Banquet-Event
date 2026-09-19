function masterMenus(){
  if(!BE.settings.MENUS || !Object.keys(BE.settings.MENUS).length){BE.settings.MENUS=clone(window.CURRENT_DEFAULT_MENUS||{});}
  return BE.settings.MENUS;
}
function menuNames(){return Object.keys(masterMenus());}
function menuGroups(name){return masterMenus()[name]||[];}
function getMenuForEvent(x,dayIndex){
  const standard=x.days?.[dayIndex]?.menu||"ไม่มีอาหาร";
  const override=BE.states[x.id]?.menuOverrides?.[dayIndex];
  const base=clone(menuGroups(standard));
  if(!override)return {name:standard,groups:base};
  const groups=base.map(g=>{
    const ov=override[g.g];
    if(!ov)return g;
    return {...g,items:Array.isArray(ov.items)?ov.items:[],on:Array.isArray(ov.on)?ov.on:[]};
  });
  return {name:standard,groups};
}
function setEventMenuOverride(x,dayIndex,groups){
  const st=BE.states[x.id]||{done:[],photos:[],menuOverrides:{}};
  st.menuOverrides=st.menuOverrides||{};
  st.menuOverrides[dayIndex]={};
  groups.forEach(g=>{st.menuOverrides[dayIndex][g.g]={items:[...g.items],on:[...(g.on||[])]};});
  BE.states[x.id]=st;
}
function openMenuEditor(id,dayIndex){
  const x=BE.funcs.find(v=>v.id===id);if(!x)return;
  if(BE.me.role!=="admin"&&BE.me.role!=="sales"){toast("บัญชีนี้ไม่มีสิทธิ์แก้เมนู");return;}
  const menu=getMenuForEvent(x,dayIndex);BE.editMenu={id,dayIndex,groups:clone(menu.groups)};
  renderMenuModal();
}
function renderMenuModal(){
  const m=BE.editMenu,x=BE.funcs.find(v=>v.id===m.id),d=x.days[m.dayIndex];
  const groups=m.groups.map((g,gi)=>`<div class="menu-edit-group"><div class="group-head"><b>${esc(g.g)}</b><button class="ghost" onclick="addMenuItem(${gi})">＋ เพิ่มรายการ</button></div>
    <div class="menu-items">${g.items.map((it,ii)=>`<div class="menu-item"><input value="${esc(it)}" onchange="editMenuItem(${gi},${ii},this.value)"><button class="icon danger" onclick="removeMenuItem(${gi},${ii})">×</button></div>`).join("")||'<div class="muted">ยังไม่มีรายการ</div>'}</div>
    ${g.pick?`<div class="pick-note">เลือกได้ ${g.pick} รายการ</div>`:""}</div>`).join("");
  showModal(`<div class="modal-title"><div><h3>แก้ไขอาหารเฉพาะงาน</h3><p>${esc(x.no)} · ${esc(d.menu||"ไม่มีอาหาร")}</p></div><button class="icon" onclick="closeModal()">×</button></div>
  <div class="menu-edit-list">${groups||'<div class="empty">ไม่มีรายการอาหาร</div>'}</div>
  <div class="modal-actions"><button class="ghost" onclick="resetEventMenu()">↩ คืนค่ามาตรฐาน</button><button class="primary" onclick="saveEventMenu()">บันทึกเมนูงานนี้</button></div>`);
}
function addMenuItem(gi){BE.editMenu.groups[gi].items.push("");renderMenuModal();}
function editMenuItem(gi,ii,v){BE.editMenu.groups[gi].items[ii]=v;}
function removeMenuItem(gi,ii){BE.editMenu.groups[gi].items.splice(ii,1);BE.editMenu.groups[gi].on=(BE.editMenu.groups[gi].on||[]).filter(v=>v!==BE.editMenu.groups[gi].items[ii]);renderMenuModal();}
function saveEventMenu(){const m=BE.editMenu,x=BE.funcs.find(v=>v.id===m.id);setEventMenuOverride(x,m.dayIndex,m.groups);closeModal();renderEvents();syncNow();toast("บันทึกเมนูเฉพาะงานแล้ว");}
function resetEventMenu(){const m=BE.editMenu;const st=BE.states[m.id];if(st?.menuOverrides)delete st.menuOverrides[m.dayIndex];closeModal();renderEvents();syncNow();toast("คืนค่าเมนูมาตรฐานแล้ว");}
function renderMenuSummary(x){
  return (x.days||[]).map((d,i)=>{if(!d.menu||d.menu==="ไม่มีอาหาร")return `<div class="menu-summary"><b>${esc(d.menu||"ไม่มีอาหาร")}</b></div>`;const m=getMenuForEvent(x,i);const changed=!!BE.states[x.id]?.menuOverrides?.[i];return `<div class="menu-summary"><div class="menu-summary-head"><b>${esc(d.menu)}</b>${changed?'<span class="badge warning">มีการแก้ไขเฉพาะงาน</span>':''}<button class="ghost small" onclick="openMenuEditor('${x.id}',${i})">✏️ แก้รายการอาหาร</button></div><div class="menu-lines">${m.groups.map(g=>`<div><span>${esc(g.g)}</span><em>${esc((g.on&&g.on.length?g.on:g.items).join(" · "))}</em></div>`).join("")}</div></div>`;}).join("");
}
