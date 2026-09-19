function setScope(s){ scope=s; renderRev(); }
const pct=(a,b)=>b? Math.round(a/b*100):0;
function revKind(n){
  if(/เช่าห้อง/.test(n)) return "ค่าเช่าสถานที่";
  if(/LED|Light|ไมค์|ลำโพง|อุปกรณ์/i.test(n)) return "ค่าอุปกรณ์";
  if(/นำเข้า/.test(n)) return "ค่านำเข้า";
  if(/ถ่ายรูป|ซุ้มถ่าย/.test(n)) return "บริการอื่น";
  return "อาหารและเครื่องดื่ม";
}
function bar(label, right, parts, maxv){
  const seg=parts.map(p=>`<i class="${p.c}" style="width:${maxv?p.v/maxv*100:0}%"></i>`).join("");
  return `<div class="brow"><div class="bl"><b style="font-weight:500">${label}</b><span>${right}</span></div>
    <div class="bt">${seg}</div></div>`;
}
/* ---- จัดกลุ่มประเภทงานที่เหมือนกัน (แก้ได้ที่หน้าตั้งค่า) ---- */
let KINDGROUPS=[
 {g:"งานมงคลสมรส", kw:["แต่งงาน","มงคลสมรส","สมรส","หมั้น","wedding","engage"]},
 {g:"ประชุมสัมมนา", kw:["ประชุม","สัมมนา","อบรม","meeting","seminar","training"]},
 {g:"งานเลี้ยงสังสรรค์", kw:["เลี้ยง","ปีใหม่","สังสรรค์","party","gala"]},
 {g:"คอนเสิร์ต / Meet & Greet", kw:["คอนเสิร์ต","concert","meet","fan"]},
 {g:"งานโต๊ะจีน", kw:["โต๊ะจีน"]}
];
function kindGroup(k){
  const s=(k||"").toLowerCase();
  const hit=KINDGROUPS.find(g=>g.kw.some(w=>w && s.includes(String(w).toLowerCase())));
  return hit? hit.g : (k||"อื่น ๆ");
}

/* ---- ตรวจความถูกต้องของงาน ---- */
function menuIncomplete(x){
  const st=state[x.id]; if(!st) return false;
  return x.days.some((d,di)=>{
    const sel=st.menu[di]; if(!sel) return false;
    return (MENUS[d.menu]||[]).some(g=>g.items && g.pick>0 && (sel[g.g]? sel[g.g].size : 0)!==g.pick);
  });
}
function dupTitles(set){
  const m={}; set.forEach(x=>{ const k=(x.title||"").trim().toLowerCase(); (m[k]=m[k]||[]).push(x); });
  return Object.keys(m).filter(k=>k && m[k].length>1).flatMap(k=>m[k]);
}
function buildChecks(set){
  const out=[];
  const add=(sev,title,hint,jobs)=>{ if(jobs && jobs.length) out.push({sev,title,hint,jobs}); };

  const map={};
  set.forEach(x=>x.days.forEach(d=>{ const k=x.hotel+"|"+d.d+"|"+d.room; (map[k]=map[k]||new Set()).add(x.id); }));
  const clash=new Set(); let spots=0;
  Object.keys(map).forEach(k=>{ if(map[k].size>1){ spots++; map[k].forEach(id=>clash.add(id)); } });
  add("bad","ห้องซ้ำในวันเดียวกัน", spots+" จุด", set.filter(x=>clash.has(x.id)));

  add("bad","ยังไม่มีราคา ยอดรวมเป็นศูนย์","", set.filter(x=>total(x)<=0));
  add("bad","จำนวนรับรองยังเป็น 0","", set.filter(x=>!x.guarantee));
  add("bad","เลยวันงานแล้วแต่ยังไม่ปิดงาน","", set.filter(x=>phase(x)==="done"));
  add("warn","ใกล้วันงานแต่ยังไม่ได้รับมัดจำ","ภายใน 14 วัน",
      set.filter(x=>!x.closed && received(x)<=0 && daysTo(x)>=0 && daysTo(x)<=14));
  add("warn","ยังไม่ระบุห้องจัดงาน","", set.filter(x=>x.days.some(d=>!d.room || /ระบุภายหลัง/.test(d.room))));
  add("warn","ข้อมูลผู้ติดต่อไม่ครบ","ชื่อผู้ติดต่อหรือเบอร์โทร",
      set.filter(x=>[x.contact,x.phone].some(v=>!v || v==="—")));
  add("warn","ยังไม่มีผู้อนุมัติงาน","", set.filter(x=>!x.approve || x.approve==="—"));
  add("warn","แผนกยังไม่มีผู้รับผิดชอบ","", set.filter(x=>x.depts.some(d=>!d.who)));
  add("warn","เลือกรายการอาหารไม่ครบตามชุดเมนู","", set.filter(menuIncomplete));
  add("warn","ปิดงานแล้วแต่ยังค้างรับเงิน","", set.filter(x=>x.closed && total(x)-received(x)>0));
  add("warn","ชื่องานซ้ำกัน","อาจบันทึกซ้ำ", dupTitles(set));
  return out;
}
function renderChecks(set){
  const list=buildChecks(set);
  const bad=list.filter(c=>c.sev==="bad").length;
  const warnN=list.length-bad;
  chkWho.textContent = list.length
    ? [bad?bad+" เรื่องต้องแก้":"", warnN?warnN+" เรื่องควรตรวจ":""].filter(Boolean).join(" · ")
    : "ตรวจแล้วไม่พบปัญหา";
  cChecks.innerHTML = list.length
    ? list.map(c=>`<details class="chk ${c.sev}">
        <summary><s></s><span>${c.title}${c.hint?` <em>${c.hint}</em>`:""}</span><b>${c.jobs.length}</b></summary>
        <div class="chkjobs">${c.jobs.map(x=>`<button onclick="open_('${x.id}')">
          <span>${x.hotel==="QL"?"Queensland":"Baiyoke"} · ใบ ${x.no}</span>${x.title}<em>${dateLabel(x)}</em></button>`).join("")}</div>
      </details>`).join("")
    : `<div class="okline">ข้อมูลครบทุกงาน ไม่พบจุดที่ต้องแก้</div>`;
}

/* ---- ประเมิน KPI รายแผนก ---- */
let KPIW={done:30, ready:20, owner:10, ref:10, adj:10, close:10, detail:10, menu:25, seat:10, clash:10};
let KPIGRADE={great:90, good:80, fair:70};
let KPIKEY={kitchen:"ครัว, เบเกอรี่, kitchen", fb:"จัดเลี้ยง, บริการ, เสิร์ฟ, F&B, banquet"};
let KPINAME={
  done:"งานที่ได้รับมอบหมายเสร็จ", ready:"ความพร้อมของงานที่ถึงกำหนดแล้ว", owner:"ระบุผู้รับผิดชอบครบ",
  ref:"มีรูป / เอกสารอ้างอิงแนบ", adj:"ไม่มีใบแก้ไขหลังยืนยันงาน", close:"ปิดงานครบหลังจบงาน",
  detail:"รายการงานระบุชัดเจน", menu:"ยืนยันรายการอาหารครบทุกวัน",
  seat:"จัดที่นั่งครบตามจำนวนรับรอง", clash:"ไม่มีห้องชนกันในวันเดียวกัน"};
const KPIKEYS=Object.keys(KPINAME);
const KPIHOW={
  done:"รายการงานที่ติ๊กแล้ว ÷ ทั้งหมด", ready:"เฉพาะงานที่ถึงวันจัดแล้ว ติ๊กครบแค่ไหน",
  owner:"งานที่กรอกชื่อผู้รับผิดชอบ ÷ งานที่ดูแล", ref:"งานที่แผนกมีรูปแนบ ÷ งานที่ดูแล",
  adj:"งานที่ไม่มีใบแก้ไข ÷ งานที่ดูแล", close:"งานที่เลยวันแล้วและปิดงาน ÷ งานที่เลยวันแล้ว",
  detail:"รายการงานที่ไม่ใช่ (ยังไม่ระบุ) ÷ ทั้งหมด", menu:"วันจัดงานที่เลือกอาหารครบ ÷ วันที่มีอาหาร",
  seat:"งานที่จัดที่นั่ง ≥ จำนวนรับรอง ÷ งานที่ดูแล", clash:"งานที่ห้องไม่ชนกัน ÷ งานที่ดูแล"};
let DEPTGROUPS=[
 {g:"ครัว / เบเกอรี่", kw:["ครัว","เบเกอรี่","kitchen","ขนม"]},
 {g:"ฝ่ายจัดเลี้ยง (F&B)", kw:["จัดเลี้ยง","banquet","บริการ","เสิร์ฟ","f&b"]},
 {g:"บาร์ / เครื่องดื่ม", kw:["บาร์","เครื่องดื่ม","bar"]},
 {g:"ช่าง / อุปกรณ์", kw:["ช่าง","อุปกรณ์","เทคนิค","แสง","เสียง"]},
 {g:"แม่บ้าน", kw:["แม่บ้าน","ทำความสะอาด","housekeep"]},
 {g:"ทีมอีเวนต์", kw:["อีเวนต์","event"]},
 {g:"Artist / Backdrop / ป้าย", kw:["artist","backdrop","ป้าย","สื่อ"]},
 {g:"รปภ. / ที่จอดรถ", kw:["รปภ","จอดรถ","security"]},
 {g:"เอกสาร / อื่น ๆ", kw:["เอกสาร"]}
];
function deptGroup(n){
  const s=(n||"").toLowerCase();
  const hit=DEPTGROUPS.find(g=>g.kw.some(w=>w && s.includes(String(w).toLowerCase())));
  return hit? hit.g : (n||"อื่น ๆ");
}
function deptType(n){
  const s=(n||"").toLowerCase();
  const has=l=>String(l||"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean).some(t=>s.includes(t));
  if(has(KPIKEY.kitchen)) return "kitchen";
  if(has(KPIKEY.fb)) return "fb";
  return "other";
}
function clashSet(set){
  const map={}, out=new Set();
  set.forEach(x=>x.days.forEach(d=>{ const k=x.hotel+"|"+d.d+"|"+d.room; (map[k]=map[k]||new Set()).add(x.id); }));
  Object.keys(map).forEach(k=>{ if(map[k].size>1) map[k].forEach(id=>out.add(id)); });
  return out;
}
function dayMenuOK(x,di){
  const m=MENUS[x.days[di].menu]; if(!m) return null;
  const sel=state[x.id].menu[di], gs=m.filter(g=>g.items && g.pick>0);
  if(!gs.length) return true;
  return gs.every(g=>(sel && sel[g.g]? sel[g.g].size:0)===g.pick);
}
function kpiGrade(s){
  if(s>=KPIGRADE.great) return ["ดีมาก","ok"];
  if(s>=KPIGRADE.good) return ["ดี","plum"];
  if(s>=KPIGRADE.fair) return ["พอใช้","warn"];
  return ["ต้องปรับปรุง","bad"];
}
function buildKPI(set){
  const cl=clashSet(set), today=todayStr();
  const gmap={};
  set.forEach(x=>x.depts.forEach(d=>{ const g=deptGroup(d.n); (gmap[g]=gmap[g]||new Set()).add(d.n); }));
  return Object.keys(gmap).map(n=>{
    const jobs=set.filter(x=>x.depts.some(d=>deptGroup(d.n)===n));
    let tasks=0, done=0, pT=0, pD=0, real=0, owner=0, ref=0, adj=0, pastN=0, closed=0;
    const who=new Set();
    jobs.forEach(x=>{
      const st=state[x.id];
      const mine=x.depts.map((d,i)=>[d,i]).filter(a=>deptGroup(a[0].n)===n);
      const started=["live","done","closed"].includes(phase(x));
      let hasWho=false, hasRef=false;
      mine.forEach(([dp,di])=>{
        dp.t.forEach((tk,ti)=>{
          tasks++;
          const ok=st.done.has(di+"-"+ti); if(ok) done++;
          if(tk && !/^\(ยังไม่ระบุ/.test(tk)) real++;
          if(started){ pT++; if(ok) pD++; }
        });
        if(dp.who){ hasWho=true; who.add(dp.who); }
        if(st.photos.some(p=>p.dept===dp.n)) hasRef=true;
      });
      if(hasWho) owner++;
      if(hasRef) ref++;
      if(x.adj && x.adj.length) adj++;
      const u=uniqDates(x);
      if(u[u.length-1] < today){ pastN++; if(x.closed) closed++; }
    });
    const m={}, put=(k,v)=>{ if(!(+KPIW[k]>0)) return;
      if(v!==null && v!==undefined && !isNaN(v)) m[k]=Math.max(0,Math.min(100,v)); };
    const J=jobs.length;
    put("done", tasks? done/tasks*100 : null);
    put("ready", pT? pD/pT*100 : null);
    put("owner", J? owner/J*100 : null);
    put("ref", J? ref/J*100 : null);
    put("adj", J? 100-adj/J*100 : null);
    put("close", pastN? closed/pastN*100 : null);
    put("detail", tasks? real/tasks*100 : null);
    const ty=deptType(n);
    if(ty==="kitchen"){
      let dn=0, ok=0;
      jobs.forEach(x=>x.days.forEach((d,di)=>{ const r=dayMenuOK(x,di); if(r===null) return; dn++; if(r) ok++; }));
      put("menu", dn? ok/dn*100 : null);
    }
    if(ty==="fb"){
      const seat=jobs.filter(x=> (x.mode==="rent"||x.mode==="pack") ? true : (+x.setup||0)>=(+x.guarantee||0)).length;
      put("seat", J? seat/J*100 : null);
      put("clash", J? 100-jobs.filter(x=>cl.has(x.id)).length/J*100 : null);
    }
    let ws=0, sc=0;
    Object.keys(m).forEach(k=>{ const w=+KPIW[k]||0; ws+=w; sc+=w*m[k]; });
    return {n, ty, subs:[...gmap[n]], jobs:J, tasks, done, who:[...who], m, score: ws? Math.round(sc/ws) : 0};
  }).sort((a,b)=>{
    const r=t=>t==="kitchen"?0:t==="fb"?1:2;
    return r(a.ty)-r(b.ty) || b.score-a.score;
  });
}
function kpiRing(v,c){
  const C=2*Math.PI*20;
  return `<svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
    <circle cx="27" cy="27" r="20" fill="none" stroke="var(--soft)" stroke-width="5"></circle>
    <circle cx="27" cy="27" r="20" fill="none" class="rg ${c}" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="${v/100*C} ${C}" transform="rotate(-90 27 27)"></circle>
    <text x="27" y="32" text-anchor="middle" font-size="15" font-weight="600" fill="var(--ink)">${v}</text></svg>`;
}
function renderKPI(set){
  const list=buildKPI(set);
  if(!list.length){ kpiWho.textContent=""; kpiBox.innerHTML=`<div class="okline">ยังไม่มีข้อมูลแผนกให้ประเมิน</div>`; return; }
  const avg=Math.round(list.reduce((a,d)=>a+d.score,0)/list.length);
  kpiWho.textContent="เฉลี่ยทุกแผนก "+avg+"/100 · "+kpiGrade(avg)[0];
  kpiBox.innerHTML = list.map(d=>{
    const g=kpiGrade(d.score);
    return `<div class="dk ${d.ty!=="other"?"main":""}">
      <div class="dkh">${kpiRing(d.score,g[1])}
        <div class="dkn"><b>${d.n}${d.ty==="kitchen"?'<i class="dkt">ครัว</i>':d.ty==="fb"?'<i class="dkt">F&amp;B</i>':''}</b>
          <span>${d.jobs} งาน · รายการงานเสร็จ ${d.done}/${d.tasks}${d.who.length?" · ผู้รับผิดชอบ "+d.who.join(", "):" · ยังไม่ระบุผู้รับผิดชอบ"}${
            d.subs.length>1?"<br>รวมจากชื่อแผนก: "+d.subs.join(" + "):""}</span></div>
        <div class="dkg ${g[1]}">${g[0]}</div></div>
      <div class="dkm">${Object.keys(d.m).map(k=>`<div class="mrow"><span>${KPINAME[k]}</span>
        <i><b class="${kpiGrade(d.m[k])[1]}" style="width:${d.m[k]}%"></b></i><em>${Math.round(d.m[k])}%</em></div>`).join("")}</div>
    </div>`;
  }).join("")
  + `<table class="kpitab"><thead><tr><th>แผนก</th><th>งาน</th><th>รายการงาน</th><th>เสร็จ</th><th>คะแนน</th><th>ผลประเมิน</th></tr></thead><tbody>`
  + list.map(d=>`<tr><td>${d.n}</td><td>${d.jobs}</td><td>${d.tasks}</td><td>${d.done}</td>
      <td class="money">${d.score}</td><td>${kpiGrade(d.score)[0]}</td></tr>`).join("")
  + `</tbody><tfoot><tr><td>เฉลี่ยทุกแผนก</td><td></td><td></td><td></td><td class="money">${avg}</td>
      <td>${kpiGrade(avg)[0]}</td></tr></tfoot></table>`;
}

function renderRev(){
  sc1.setAttribute("aria-pressed", scope==="one"); sc2.setAttribute("aria-pressed", scope==="all");
  const set = (scope==="one" ? FUNCS.filter(inH) : FUNCS.slice()).filter(visible);
  revRange.textContent = (scope==="one"? (hotel==="ALL"?"รวม 2 โรงแรม":HOTELNAME[hotel]) :"รวมทั้งกลุ่ม")+" · "+set.length+" งาน";
  if(!set.length){ kpis.innerHTML=""; cChecks.innerHTML=`<div class="okline">ยังไม่มีงานให้ตรวจ</div>`;
    chkWho.textContent=""; kpiBox.innerHTML=""; kpiWho.textContent=""; return; }

  renderChecks(set);
  renderKPI(set);

  const sum=set.reduce((a,x)=>a+total(x),0);
  const got=set.reduce((a,x)=>a+received(x),0);
  const heads=set.filter(x=>x.unit==="ท่าน").reduce((a,x)=>a+x.guarantee,0)
            + set.filter(x=>x.unit==="โต๊ะ").reduce((a,x)=>a+x.guarantee*10,0);
  const evDays=new Set(set.flatMap(x=>x.days.map(d=>x.id+d.d))).size;
  kpis.innerHTML=[["ยอดคาดการณ์",baht(sum)+" ฿"],["งานทั้งหมด",set.length+" งาน · "+evDays+" วัน"],
    ["ลูกค้าที่รับรอง",baht(heads)+" ท่าน"],["รายได้เฉลี่ยต่อหัว",heads?baht(sum/heads)+" ฿":"—"]]
    .map(k=>`<div class="kpi"><b>${k[1]}</b><span>${k[0]}</span></div>`).join("");

  // monthly stacked
  const M={};
  set.forEach(x=>{ const m=x.days[0].d.slice(0,7); M[m]=M[m]||{QL:0,BY:0}; M[m][x.hotel]+=total(x); });
  const mk=Object.keys(M).sort(), mmax=Math.max(...mk.map(k=>M[k].QL+M[k].BY));
  cMonth.innerHTML=mk.map(k=>{
    const d=new Date(k+"-01T00:00:00"), t=M[k].QL+M[k].BY;
    return bar(THMON[d.getMonth()]+" "+((d.getFullYear()+543)%100), baht(t)+" ฿",
      [{c:"a",v:M[k].QL},{c:"b",v:M[k].BY}], mmax);
  }).join("");

  // group by merged kind
  const K={};
  set.forEach(x=>{ const g=kindGroup(x.kind);
    K[g]=K[g]||{v:0,n:0,g:0,kinds:{}};
    K[g].v+=total(x); K[g].n++;
    K[g].g += x.unit==="โต๊ะ"? x.guarantee*10 : x.guarantee;
    K[g].kinds[x.kind]=(K[g].kinds[x.kind]||0)+1; });
  const ks=Object.keys(K).sort((a,b)=>K[b].v-K[a].v);
  const cols=["var(--plum)","var(--gold)","var(--ok)","var(--warn)","var(--muted)"];
  let off=0, segs="";
  const C=2*Math.PI*54;
  ks.forEach((k,i)=>{ const frac=sum? K[k].v/sum : 0;
    segs+=`<circle cx="70" cy="70" r="54" fill="none" stroke="${cols[i%cols.length]}" stroke-width="20"
      stroke-dasharray="${frac*C} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)"></circle>`;
    off+=frac*C; });
  cDonut.innerHTML=`<svg width="140" height="140" viewBox="0 0 140 140">${segs}
    <text x="70" y="66" text-anchor="middle" font-size="13" fill="var(--muted)">ยอดรวม</text>
    <text x="70" y="86" text-anchor="middle" font-size="16" font-weight="600" fill="var(--ink)">${baht(sum)}</text></svg>`;
  cDonutLeg.innerHTML=ks.map((k,i)=>`<div><i style="background:${cols[i%cols.length]}"></i>
    <span>${k}<br><span style="color:var(--muted);font-size:11.5px">${K[k].n} งาน · ${Object.keys(K[k].kinds).length} ประเภทย่อย</span></span><b>${pct(K[k].v,sum)}%</b></div>`).join("");

  tKind.innerHTML=`<thead><tr><th>กลุ่มงาน</th><th>งาน</th><th>ลูกค้า</th><th>ยอดรวม</th><th>เฉลี่ย/งาน</th></tr></thead><tbody>`
    + ks.map(k=>`<tr><td>${k}<br><span style="color:var(--muted);font-size:11.5px">${Object.keys(K[k].kinds).map(t=>t+" ("+K[k].kinds[t]+")").join(" · ")}</span></td>
        <td>${K[k].n}</td><td class="money">${baht(K[k].g)}</td>
        <td class="money">${baht(K[k].v)}</td><td class="money">${baht(K[k].v/K[k].n)}</td></tr>`).join("")
    + `</tbody><tfoot><tr><td>รวม</td><td>${set.length}</td><td class="money">${baht(heads)}</td>
        <td class="money">${baht(sum)}</td><td class="money">${baht(sum/set.length)}</td></tr></tfoot>`;

  cGrp.innerHTML=ks.map((k,i)=>`<div class="r"><em>${i+1}</em>
      <span style="color:var(--ink);font-size:13.5px">${k}<br><span>${Object.keys(K[k].kinds).join(" + ")}</span></span>
      <b>${K[k].n} งาน</b></div>`).join("");

  // revenue mix
  const MX={};
  set.forEach(x=>x.rev.forEach(r=>{ const k=revKind(r.n); MX[k]=(MX[k]||0)+r.price*r.qty*(r.times||1); }));
  const mxk=Object.keys(MX).sort((a,b)=>MX[b]-MX[a]);
  cMix.innerHTML=mxk.map(k=>bar(k, baht(MX[k])+" ฿ · "+pct(MX[k],sum)+"%", [{c:"a",v:MX[k]}], MX[mxk[0]])).join("");

  // rooms
  const R={};
  set.forEach(x=>{ const rooms=[...new Set(x.days.map(d=>d.room))];
    rooms.forEach(rm=>{ R[rm]=R[rm]||{v:0,n:0}; R[rm].v+=total(x)/rooms.length; R[rm].n++; }); });
  const rk=Object.keys(R).sort((a,b)=>R[b].v-R[a].v);
  cRoom.innerHTML=rk.map(k=>bar(k, baht(R[k].v)+" ฿ · "+R[k].n+" งาน", [{c:"a",v:R[k].v}], R[rk[0]].v)).join("");

  // menu sets by days used
  const S={};
  set.forEach(x=>x.days.forEach(d=>{ if(d.menu==="ไม่มีอาหาร") return; S[d.menu]=(S[d.menu]||0)+1; }));
  const sk=Object.keys(S).sort((a,b)=>S[b]-S[a]).slice(0,8);
  cSet.innerHTML= sk.length? sk.map((k,i)=>`<div class="r"><em>${i+1}</em><span style="color:var(--ink);font-size:13.5px">${k}</span><b>${S[k]} วัน</b></div>`).join("")
    : `<div style="color:var(--muted);font-size:13px">ยังไม่มีข้อมูล</div>`;

  // popular dishes
  const D={};
  set.forEach(x=>x.days.forEach((d,di)=>{
    const sel=state[x.id].menu[di]; if(!sel) return;
    Object.keys(sel).forEach(g=>sel[g].forEach(it=>{ D[it]=D[it]||{n:0,g}; D[it].n++; }));
  }));
  const dk=Object.keys(D).sort((a,b)=>D[b].n-D[a].n).slice(0,10);
  cDish.innerHTML= dk.length? dk.map((k,i)=>`<div class="r"><em>${i+1}</em>
      <span style="color:var(--ink);font-size:13.5px">${k}<br><span>${D[k].g}</span></span><b>${D[k].n} ครั้ง</b></div>`).join("")
    : `<div style="color:var(--muted);font-size:13px">ยังไม่มีข้อมูล</div>`;

  // top functions
  cTop.innerHTML=set.slice().sort((a,b)=>total(b)-total(a)).slice(0,5).map((x,i)=>
    `<div class="r"><em>${i+1}</em><span style="color:var(--ink);font-size:13.5px">${x.title}<br>
      <span>${x.kind} · ${dateLabel(x)}</span></span><b>${baht(total(x))} ฿</b></div>`).join("");

  // payment
  cPay.innerHTML=bar("รับมัดจำแล้ว", baht(got)+" ฿ · "+pct(got,sum)+"%", [{c:"c",v:got}], sum)
    + bar("คงเหลือเก็บวันงาน", baht(sum-got)+" ฿ · "+pct(sum-got,sum)+"%", [{c:"b",v:sum-got}], sum);
}
function fillRepHead(){
  repLogoL.src=LOGO.QL; repLogoR.src=LOGO.BY;
  const scopeTxt = scope==="all" ? "ทั้งกลุ่ม · "+HOTELNAME.QL+" + "+HOTELNAME.BY
    : (hotel==="ALL" ? HOTELNAME.QL+" + "+HOTELNAME.BY : HOTELNAME[hotel]);
  repSub.textContent = scopeTxt + " · " + (revRange.textContent||"");
  const d=new Date();
  repDate.innerHTML = "พิมพ์เมื่อ "+thDate(todayStr(),true)+"<br>เวลา "
    + String(d.getHours()).padStart(2,"0")+"."+String(d.getMinutes()).padStart(2,"0")+" น."
    + (me? "<br>โดย "+me.name : "");
}
function openPrintable(sectionId, bodyClass, title){
  const css=[...document.querySelectorAll("style")].map(s=>s.textContent).join("\n");
  const sec=document.getElementById(sectionId).outerHTML;
  const doc=`<!DOCTYPE html><html lang="th" data-hotel="${document.documentElement.getAttribute("data-hotel")||"QL"}" data-theme="light">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&family=Noto+Serif+Thai:wght@500;600&display=swap" rel="stylesheet">
<style>${css}</style>
<style>body{background:#fff}.shell{padding:14px}.view{display:block !important;padding-top:0}
body.repPrint #repHead{display:block}body.repPrint .sectionhead,body.repPrint .scope{display:none}
.prbar{display:flex;gap:8px;flex-wrap:wrap;padding:12px 14px 0;max-width:1180px;margin:0 auto}
@media print{.prbar{display:none !important}.shell{padding:0}}</style></head>
<body class="${bodyClass}">
<div class="prbar"><button class="save" onclick="window.print()">พิมพ์ / บันทึก PDF</button></div>
<div class="shell">${sec}</div></body></html>`;
  deliverDoc(doc, title.replace(/[\\/:*?"<>|]/g,"").slice(0,80)+".html", bodyClass);
}
async function deliverDoc(doc, filename, bodyClass){
  // 1) ในแอป Claude: บันทึกเป็นไฟล์ให้ผู้ใช้
  try{
    const dl = (window.claude && typeof claude.use==="function") ? await claude.use("downloads") : null;
    if(dl){
      await dl.save({filename, data:doc});
      toast("บันทึกไฟล์รายงานแล้ว เปิดไฟล์แล้วสั่งพิมพ์หรือบันทึกเป็น PDF ได้");
      return;
    }
  }catch(e){
    if(e && e.code==="declined") return;
  }
  // 2) เบราว์เซอร์ปกติ: เปิดแท็บใหม่แล้วสั่งพิมพ์
  let w=null;
  try{ w=window.open("","_blank"); }catch(e){}
  if(w){
    w.document.open(); w.document.write(doc); w.document.close();
    setTimeout(()=>{ try{ w.focus(); w.print(); }catch(e){} }, 800);
    return;
  }
  // 3) สั่งพิมพ์ในหน้านี้
  try{
    const cls=bodyClass? [bodyClass] : [];
    cls.forEach(c=>document.body.classList.add(c));
    window.print();
    setTimeout(()=>cls.forEach(c=>document.body.classList.remove(c)),400);
  }catch(e){
    toast("แอปนี้ไม่อนุญาตให้สั่งพิมพ์ ลองเปิดลิงก์ในเบราว์เซอร์แล้วกดใหม่");
  }
}
function printReport(){
  fillRepHead();
  document.querySelectorAll("#cChecks details").forEach(d=>d.open=true);
  openPrintable("view-rev","repPrint","รายงานสรุปผู้บริหาร "+thDate(todayStr()));
}
function printSheet(){
  const x=f();
  openPrintable("view-sheet","","ใบสรุปงาน "+(x? x.no+" "+x.title : ""));
}

/* ---------------- send / summary / print ---------------- */
