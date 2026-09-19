function clone(v){return JSON.parse(JSON.stringify(v));}
/* =============================================================
   Event Menu Override Editor
   - Master menu remains untouched
   - Each Event/Day can override its own menu
   - Fixed Chinese-set items become editable for that Event
   - Buffet pick limits are enforced
   ============================================================= */

function feEnsureState(x){
  if(!state[x.id]) state[x.id]={menu:x.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]};
  if(!state[x.id].menuOverrides) state[x.id].menuOverrides={};
  while((state[x.id].menu||[]).length<x.days.length) state[x.id].menu.push(initSel(x.days[state[x.id].menu.length]?.menu||"ไม่มีอาหาร"));
  return state[x.id];
}

function feGroupItems(g){
  const arr=[];
  if(Array.isArray(g?.items)) arr.push(...g.items);
  if(Array.isArray(g?.fixed)) arr.push(...g.fixed);
  return arr.map(v=>String(v??'').trim()).filter(Boolean);
}

function feStandardGroups(x,di){
  const name=x.days?.[di]?.menu||"ไม่มีอาหาร";
  return clone(MENUS[name]||[]).map(g=>({
    g:g.g||"รายการ",
    pick:Number(g.pick||0),
    items:feGroupItems(g),
    on:Array.isArray(g.on)?[...g.on]:[]
  }));
}

function feEffectiveGroups(x,di){
  const st=feEnsureState(x), standard=feStandardGroups(x,di), ov=st.menuOverrides?.[di];
  if(!ov) return standard;
  return standard.map(g=>{
    const o=ov[g.g];
    if(!o) return g;
    return {
      g:g.g,
      pick:Number(o.pick ?? g.pick ?? 0),
      items:Array.isArray(o.items)?o.items.filter(Boolean):g.items,
      on:Array.isArray(o.on)?o.on:[]
    };
  });
}

function feHasOverride(x,di){ return !!(state[x.id]?.menuOverrides && state[x.id].menuOverrides[di]); }

function feStoreOverride(x,di,groups){
  const st=feEnsureState(x);
  st.menuOverrides[di]={};
  groups.forEach(g=>{
    const items=(g.items||[]).map(v=>String(v||'').trim()).filter(Boolean);
    const on=(g.on||[]).filter(v=>items.includes(v));
    st.menuOverrides[di][g.g]={items,on,pick:Number(g.pick||0)};
  });
}

function feMenuName(x,di){ return x.days?.[di]?.menu||"ไม่มีอาหาร"; }

/* Replace the original fixed/checkbox renderer with the event-aware renderer. */
function menuHTML(di){
  const x=f(); if(!x) return '';
  const groups=feEffectiveGroups(x,di);
  const changed=feHasOverride(x,di);
  let html='';
  if(canEdit()) html+=`<div style="display:flex;justify-content:flex-end;gap:8px;margin:0 0 8px;flex-wrap:wrap">
    <button class="ghost" type="button" onclick="openMenuEditor(${di})">✏️ แก้เมนูเฉพาะงาน</button>
    ${changed?`<button class="ghost" type="button" onclick="feResetMenu(${di})">↩ คืนค่ามาตรฐาน</button>`:''}
  </div>`;
  if(changed) html+=`<div class="note" style="padding:0 0 8px;color:var(--warn)">เมนูนี้ถูกปรับเฉพาะงานนี้ ไม่กระทบ Master Menu</div>`;
  html+=groups.map((g,gi)=>{
    const n=(g.on||[]).length, over=g.pick>0 && n>g.pick;
    if(g.pick>0){
      return `<div class="menugrp">
        <div class="gh"><span>${esc(g.g)}</span><span class="count ${over?'over':''}">${`เลือก ${n}/${g.pick}`}</span></div>
        ${g.items.map((it,ii)=>`<label class="task"><input type="checkbox" data-fe-it="1" data-di="${di}" data-gi="${gi}" data-ii="${ii}" ${g.on.includes(it)?'checked':''} ${canEdit()?'':'disabled'} onchange="feToggle(${di},${gi},${ii},this.checked)"><span>${esc(it)}</span></label>`).join('')}
      </div>`;
    }
    return `<div class="menugrp"><div class="gh"><span>${esc(g.g)}</span><span class="count">${g.items.length} รายการ</span></div>
      <div class="fixedlist">${g.items.map(it=>`<div>${esc(it)}</div>`).join('')||'<div>ยังไม่มีรายการอาหาร</div>'}</div></div>`;
  }).join('');
  return html;
}

function feToggle(di,gi,ii,checked){
  const x=f(); if(!x || !canEdit()) return;
  const groups=feEffectiveGroups(x,di), g=groups[gi]; if(!g || !g.pick) return;
  const value=g.items[ii]; g.on=Array.isArray(g.on)?g.on:[];
  if(checked){
    if(g.pick>0 && g.on.length>=g.pick && !g.on.includes(value)){
      toast(`กลุ่ม “${g.g}” เลือกได้ไม่เกิน ${g.pick} รายการ`);
      renderBEO(); return;
    }
    if(!g.on.includes(value)) g.on.push(value);
  }else g.on=g.on.filter(v=>v!==value);
  feStoreOverride(x,di,groups);
  renderBEO();
  autoSync();
}

function openMenuEditor(di){
  const x=f(); if(!x || !canEdit()) return;
  const groups=clone(feEffectiveGroups(x,di));
  window.FE_EDITOR={id:x.id,di,groups};
  feRenderEditor();
}

function feRenderEditor(){
  const ed=window.FE_EDITOR; if(!ed) return;
  const x=FUNCS.find(v=>v.id===ed.id); if(!x) return;
  const mbox=document.querySelector('#modal .mbox');
  if(!mbox) return;
  const groupHtml=ed.groups.map((g,gi)=>{
    const items=(g.items||[]).map(String);
    const selected=new Set(g.on||[]);
    return `<div class="card" style="margin-bottom:10px">
      <div class="band"><span><input style="max-width:100%;width:100%;border:1px solid var(--line);background:var(--paper);border-radius:6px;padding:4px 6px;font:inherit" value="${esc(g.g)}" onchange="feEditGroupName(${gi},this.value)"></span><span class="who">${g.pick?`เลือกได้ ${g.pick}`:'แก้ได้อิสระ'}</span></div>
      <div class="pad">
        <div style="display:grid;gap:7px">
          ${items.map((it,ii)=>`<div style="display:flex;gap:7px;align-items:center">
            ${g.pick?`<input type="checkbox" ${selected.has(it)?'checked':''} onchange="feEditorToggle(${gi},${ii},this.checked)">`:''}
            <input style="flex:1;border:1px solid var(--line);background:var(--paper);border-radius:7px;padding:8px 9px" value="${esc(it)}" onchange="feEditItem(${gi},${ii},this.value)">
            <button class="ghost danger2" type="button" onclick="feRemoveItem(${gi},${ii})">ลบ</button>
          </div>`).join('')}
          <button class="ghost" type="button" onclick="feAddItem(${gi})">＋ เพิ่มรายการอาหาร</button>
        </div>
      </div>
    </div>`;
  }).join('');
  mbox.innerHTML=`<h3>แก้ไขอาหารเฉพาะงาน</h3>
    <p>${esc(x.no)} · ${esc(x.title)} · ${esc(feMenuName(x,ed.di))}</p>
    <div class="note" style="padding:0 0 10px">แก้เฉพาะ Event นี้เท่านั้น Master Menu จะไม่เปลี่ยน</div>
    <div>${groupHtml||'<div class="empty">ยังไม่มีรายการอาหาร</div>'}</div>
    <div class="btns" style="justify-content:flex-end;margin-top:12px;flex-wrap:wrap">
      <button class="ghost" type="button" onclick="feAddGroup()">＋ เพิ่มหมวดอาหาร</button>
      <button class="ghost" type="button" onclick="feResetMenu(${ed.di})">↩ คืนค่ามาตรฐาน</button>
      <button class="save" type="button" onclick="feSaveEditor()">บันทึกเมนูงานนี้</button>
    </div>`;
  document.getElementById('modal').classList.add('on');
}

function feEditGroupName(gi,v){ if(window.FE_EDITOR?.groups[gi]) window.FE_EDITOR.groups[gi].g=String(v||'').trim()||'หมวดอาหาร'; }
function feEditItem(gi,ii,v){
  const g=window.FE_EDITOR?.groups[gi]; if(!g)return;
  const old=g.items[ii], next=String(v||'').trim(); g.items[ii]=next;
  if(old!==next) g.on=(g.on||[]).map(x=>x===old?next:x).filter(Boolean);
}
function feEditorToggle(gi,ii,checked){
  const g=window.FE_EDITOR?.groups[gi]; if(!g)return;
  const value=g.items[ii]; g.on=g.on||[];
  if(checked){
    if(g.pick && g.on.length>=g.pick && !g.on.includes(value)){
      toast(`กลุ่ม “${g.g}” เลือกได้ไม่เกิน ${g.pick} รายการ`); feRenderEditor(); return;
    }
    if(!g.on.includes(value)) g.on.push(value);
  }else g.on=g.on.filter(x=>x!==value);
}
function feAddItem(gi){ const g=window.FE_EDITOR?.groups[gi]; if(!g)return; g.items.push(''); feRenderEditor(); }
function feRemoveItem(gi,ii){
  const g=window.FE_EDITOR?.groups[gi]; if(!g)return;
  const old=g.items[ii]; g.items.splice(ii,1); g.on=(g.on||[]).filter(v=>v!==old); feRenderEditor();
}
function feAddGroup(){ window.FE_EDITOR?.groups.push({g:'หมวดอาหารใหม่',pick:0,items:[''],on:[]}); feRenderEditor(); }

function feSaveEditor(){
  const ed=window.FE_EDITOR; if(!ed)return;
  const x=FUNCS.find(v=>v.id===ed.id); if(!x)return;
  ed.groups.forEach(g=>{g.g=String(g.g||'').trim()||'หมวดอาหาร';g.items=(g.items||[]).map(v=>String(v||'').trim()).filter(Boolean);g.on=(g.on||[]).filter(v=>g.items.includes(v));});
  feStoreOverride(x,ed.di,ed.groups);
  window.FE_EDITOR=null;
  closeModal(); renderBEO(); renderList(); renderRev(); autoSync(); toast('บันทึกเมนูเฉพาะงานแล้ว');
}

function feResetMenu(di){
  const x=f(); if(!x)return;
  const st=feEnsureState(x);
  delete st.menuOverrides[di];
  window.FE_EDITOR=null;
  closeModal(); renderBEO(); renderList(); renderRev(); autoSync(); toast('คืนค่าเมนูมาตรฐานแล้ว');
}

/* Preserve the original API name so existing buttons continue to work. */
function changeMenu(di,v){
  const x=f(); if(!x || !canEdit()) return;
  x.days[di].menu=v;
  const st=feEnsureState(x);
  st.menu[di]=initSel(v);
  delete st.menuOverrides[di];
  renderBEO(); renderList(); renderRev(); autoSync();
}

function pick(di,gi,el){
  const x=f(); if(!x || !canEdit()) return;
  const g=feEffectiveGroups(x,di)[gi], st=feEnsureState(x);
  if(!g || !g.pick)return;
  const value=el.dataset.it;
  const sel=st.menu[di][g.g]||new Set(); st.menu[di][g.g]=sel;
  if(el.checked && g.pick>0 && sel.size>=g.pick && !sel.has(value)){
    el.checked=false; toast(`กลุ่ม “${g.g}” เลือกได้ไม่เกิน ${g.pick} รายการ`); return;
  }
  el.checked?sel.add(value):sel.delete(value);
  renderBEO(); autoSync();
}

/* Extend DB snapshots for menu overrides. These declarations are intentionally
   lightweight helpers used by the database module as its authoritative packers. */
