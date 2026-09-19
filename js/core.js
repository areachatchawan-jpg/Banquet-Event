function received(x){ return (x.pays||[]).reduce((a,p)=>a+p.amt,0); }
function initSel(name){
  const sel={};
  (MENUS[name]||[]).forEach(g=>{ if(g.items) sel[g.g]=new Set(g.on||[]); });
  return sel;
}
FUNCS.forEach(f=>{
  f.pays = f.dep.amt ? [{d:"—", amt:f.dep.amt, note:f.dep.when}] : [];
  state[f.id]={ menu:f.days.map(d=>initSel(d.menu)), done:new Set(), menuOverrides:{},
    photos:(SEEDS[f.seed]||[]).map((s,i)=>({...s,id:f.id+"_s"+i})) };
});
/* ติ๊กงานฝ่ายไว้ล่วงหน้าให้ดูเป็นตัวอย่าง (งานที่ใกล้ถึงยิ่งติ๊กมาก) */
(function seedDone(){
  const t=new Date(new Date().getTime()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
  FUNCS.forEach(f=>{
    const last=[...new Set(f.days.map(d=>d.d))].sort().pop();
    const first=[...new Set(f.days.map(d=>d.d))].sort()[0];
    const left=Math.round((new Date(first+"T00:00:00")-new Date(t+"T00:00:00"))/864e5);
    const lvl = last<t ? 9 : left<=0 ? 8 : left<=7 ? 6 : left<=14 ? 4 : 2;
    f.depts.forEach((d,di)=>d.t.forEach((_,ti)=>{
      if((di*7+ti*3+di*ti) % 10 < lvl) state[f.id].done.add(di+"-"+ti);
    }));
  });
})();

let hotel="QL", cur="f1", tab="list", phCat="ทั้งหมด";

const STAFF={
  sales:["—","PAPHAON","SIKSAKA","NUTTAWUT","NARIN"],
  event:["—","PORNTIP","พรทิพย์"],
  approve:["—","PATCHARAPOL","PACHARAPOL"]
};
/* ---------------- accounts ---------------- */
const USERS=[
 {code:"ADMIN", pin:"1234", name:"ชัชวาล (ผู้ดูแลระบบ)", role:"admin", title:"ผู้ดูแลระบบ"},
 {code:"QL01", pin:"1234", name:"PAPHAON", role:"sales", hotel:"QL", title:"Sales · Queensland"},
 {code:"BY01", pin:"1234", name:"NARIN", role:"sales", hotel:"BY", title:"Sales · Baiyoke Sky"},
 {code:"KITCHEN", pin:"1234", name:"ครัวและเบเกอรี่", role:"dept", dept:"ครัว / เบเกอรี่", title:"ฝ่ายครัว · ดูอย่างเดียว"}
];
let me=null;
const canEdit = ()=> me && (me.role==="admin" || me.role==="sales");
const canMoney = ()=> me && me.role!=="dept";
function visible(x){
  if(!me) return false;
  if(me.role==="admin") return true;
  if(me.role==="sales") return x.hotel===me.hotel && (x.sales===me.name || x.event===me.name);
  return x.depts.some(d=>d.n===me.dept);
}
function doLogin(){
  const u=(gu.value||"").trim().toUpperCase(), p=(gp.value||"").trim();
  const f=USERS.find(a=>a.code===u && a.pin===p);
  if(!f){ ge.textContent="รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"; return; }
  me=f; ge.textContent=""; gp.value="";
  gate.classList.add("off");
  uchip.innerHTML=`<span class="rolebadge">${me.title}</span><b>${me.name}</b>
    <button onclick="doLogout()">ออก</button>`;
  hpick.style.display = (me.role==="sales") ? "none" : "flex";
  const topAdd=document.getElementById("topAddBtn"); if(topAdd) topAdd.style.display = canEdit()? "" : "none";
  const t=document.getElementById("t-rev"); if(t) t.style.display = canMoney()? "" : "none";
  const ta=document.getElementById("t-admin"); if(ta) ta.style.display = me.role==="admin"? "" : "none";
  if(me.role==="admin") renderAdmin();
  const start = me.hotel || (FUNCS.find(x=>visible(x))||FUNCS[0]).hotel;
  setHotel(start);
}
function doLogout(){ me=null; gate.classList.remove("off"); gu.value=""; gp.value="";
  const ta=document.getElementById("t-admin"); if(ta) ta.style.display="none";
  const topAdd=document.getElementById("topAddBtn"); if(topAdd) topAdd.style.display="none";
  go("list"); }
gp.addEventListener("keydown",e=>{ if(e.key==="Enter") doLogin(); });
gu.addEventListener("keydown",e=>{ if(e.key==="Enter") gp.focus(); });

/* ---------------- helpers ---------------- */
const THMON=["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
const THDAY=["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."];
function thDate(v,full){
  if(!v) return "";
  const d=new Date(v+"T00:00:00");
  return (full?THDAY[d.getDay()]+" ":"")+d.getDate()+" "+THMON[d.getMonth()]+" "+(d.getFullYear()+543);
}
const baht = n=>Math.round(n).toLocaleString("th-TH");
const f = ()=>FUNCS.find(x=>x.id===cur);
const inH = x => hotel==="ALL" || x.hotel===hotel;
const total = x=>x.rev.reduce((a,r)=>a+r.price*r.qty*(r.times||1),0);
function uniqDates(x){ return [...new Set(x.days.map(d=>d.d))].sort(); }
function dateLabel(x){
  const u=uniqDates(x);
  if(u.length===1) return thDate(u[0],true);
  return thDate(u[0])+" – "+thDate(u[u.length-1])+" ("+u.length+" วัน)";
}

function setHotel(h){
  if(me && me.role==="sales" && h!==me.hotel) return;
  hotel=h;
  document.documentElement.setAttribute("data-hotel", h==="ALL"?"QL":h);
  logo.src=LOGO[h==="ALL"?"QL":h]; logo.alt=h==="ALL"?"ทั้ง 2 โรงแรม":HOTELNAME[h];
  hotelName.textContent = h==="ALL"?"Queensland + Baiyoke Sky":HOTELNAME[h];
  hQL.setAttribute("aria-pressed", h==="QL"); hBY.setAttribute("aria-pressed", h==="BY");
  hAll.setAttribute("aria-pressed", h==="ALL");
  const list=FUNCS.filter(x=>inH(x) && visible(x));
  cur = list.length ? (list.some(x=>x.id===cur)? cur : list[0].id) : null;
  renderHero(true);
  renderList(); renderBEO(); renderPhotos(); renderSend(); renderRev();
  if(tab!=="rev") go("list");
}
function go(t){
  if(t==="admin" && (!me || me.role!=="admin")) return;
  if(t==="rev" && !canMoney()) return;
  if(t==="add" && !canEdit()) return;
  tab=t;
  ["list","beo","photos","rev","add","send","sheet","admin"].forEach(k=>{
    document.getElementById("view-"+k).classList.toggle("on",k===t);
    const b=document.getElementById("t-"+k);
    if(b) b.setAttribute("aria-selected", k===t || (t==="add"&&k==="list"));
  });
  window.scrollTo({top:0});
}

/* ---------------- list ---------------- */
function todayStr(){ const d=new Date(); return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10); }
function phase(x){
  const u=uniqDates(x), t=todayStr();
  if(x.closed) return "closed";
  if(u[u.length-1] < t) return "done";
  if(u[0] <= t) return "live";
  return "future";
}
function daysTo(x){
  const t=new Date(todayStr()+"T00:00:00"), a=new Date(uniqDates(x)[0]+"T00:00:00");
  return Math.round((a-t)/864e5);
}
function pending(x){
  const s=state[x.id], left=[];
  let undone=0; x.depts.forEach((d,di)=>d.t.forEach((_,ti)=>{ if(!s.done.has(di+"-"+ti)) undone++; }));
  if(undone) left.push("งานฝ่ายยังไม่ติ๊ก "+undone+" รายการ");
  if(canMoney() && total(x)-received(x)>0) left.push("ยังค้างรับ "+baht(total(x)-received(x))+" บาท");
  return left;
}
let filt="up";
function setFilt(v){ filt=v; renderList(); }
function renderHero(anim){
  const h=hotel, list=FUNCS.filter(x=>inH(x) && visible(x));
  hero.style.display = h==="ALL"? "none":"block";
  heroAll.style.display = h==="ALL"? "block":"none";
  if(h==="ALL"){
    lgQL.src=LOGO.QL; lgBY.src=LOGO.BY;
    lgQL.alt=HOTELNAME.QL; lgBY.alt=HOTELNAME.BY;
    nmQL.textContent=HOTELNAME.QL; nmBY.textContent=HOTELNAME.BY;
    const V={}, N={};
    ["QL","BY"].forEach(k=>{
      const s=FUNCS.filter(x=>x.hotel===k && visible(x));
      const up=s.filter(x=>!["done","closed"].includes(phase(x)));
      const v=s.reduce((a,x)=>a+total(x),0);
      V[k]=v; N[k]=s.length;
      document.getElementById("hn"+k).innerHTML=
        `<div><b>${s.length}</b>งานทั้งหมด</div><div><b>${up.length}</b>ยังไม่ถึงกำหนด</div>`
        +(canMoney()?`<div><b>${baht(v)}</b>ยอดรวม (บาท)</div>`:"");
    });
    const sum=list.reduce((a,x)=>a+total(x),0), got=list.reduce((a,x)=>a+received(x),0);
    const up=list.filter(x=>!["done","closed"].includes(phase(x)));
    const nx=up[0];
    const evDays=new Set(list.flatMap(x=>x.days.map(d=>x.hotel+d.d))).size;
    gheadSub.textContent = list.length+" งาน · "+evDays+" วันจัดงาน";
    const base = canMoney()? V : N, tv=(base.QL||0)+(base.BY||0);
    const unit = canMoney()? " บาท" : " งาน";
    hshare.innerHTML=`<div class="hb">
        <i class="a" style="width:${tv?base.QL/tv*100:50}%"></i>
        <i class="b" style="width:${tv?base.BY/tv*100:50}%"></i></div>
      <div class="hl">
        <span><i style="background:var(--plum)"></i>Queensland <b>${tv?Math.round(base.QL/tv*100):50}%</b> · ${baht(base.QL)}${unit}</span>
        <span><i style="background:var(--gold)"></i>Baiyoke Sky <b>${tv?Math.round(base.BY/tv*100):50}%</b> · ${baht(base.BY)}${unit}</span>
      </div>`;
    const cnt={}; list.forEach(x=>x.days.forEach(d=>{const k=x.hotel+"|"+d.d+"|"+d.room; cnt[k]=(cnt[k]||0)+1;}));
    const clashes=Object.values(cnt).filter(v=>v>1).length;
    heroAllStat.innerHTML=([[nx?(daysTo(nx)<=0?"วันนี้":"อีก "+daysTo(nx)+" วัน"):"—","งานถัดไป"+(nx?" · "+(nx.hotel==="QL"?"Queensland":"Baiyoke")+" ใบ "+nx.no:"")],
      [up.length+" งาน","ยังไม่ถึงกำหนด"]]
      .concat(canMoney()?[[baht(sum-got),"คงเหลือรับ (บาท)"]]:[])
      .concat([[clashes?clashes+" จุด":"ไม่มี","ห้องซ้ำในวันเดียวกัน"]]))
      .map(k=>`<div><b>${k[0]}</b>${k[1]}</div>`).join("");
    if(anim){ heroAll.classList.remove("in"); void heroAll.offsetWidth; heroAll.classList.add("in"); }
    return;
  }
  heroWm.src=LOGO[h==="ALL"?"BY":h]; heroMark.src=LOGO[h==="ALL"?"QL":h];
  heroMark.alt = h==="ALL"?"ทั้ง 2 โรงแรม":HOTELNAME[h];
  heroName.textContent = h==="ALL"?"Queensland + Baiyoke Sky":HOTELNAME[h];
  const sum=list.reduce((a,x)=>a+total(x),0), got=list.reduce((a,x)=>a+received(x),0);
  const upcoming=list.filter(x=>!["done","closed"].includes(phase(x)));
  const nx=upcoming[0];
  const nxTxt = nx ? (daysTo(nx)<=0? "วันนี้" : "อีก "+daysTo(nx)+" วัน") : "—";
  heroStat.innerHTML=([[nxTxt,"งานถัดไป"+(nx?" · ใบ "+nx.no:"")],[upcoming.length+" งาน","ยังไม่ถึงกำหนด"]]
    .concat(canMoney()?[[baht(sum),"ยอดคาดการณ์ (บาท)"],[baht(sum-got),"คงเหลือรับ (บาท)"]]:[]))
    .map(k=>`<div><b>${k[0]}</b>${k[1]}</div>`).join("");
  if(anim){ hero.classList.remove("in"); void hero.offsetWidth; hero.classList.add("in"); }
}
function renderList(){
  fl1.setAttribute("aria-pressed",filt==="up"); fl2.setAttribute("aria-pressed",filt==="past"); fl3.setAttribute("aria-pressed",filt==="all");
  const all=FUNCS.filter(x=>inH(x) && visible(x)).slice()
    .sort((a,b)=> a.days[0].d===b.days[0].d ? (a.no<b.no?-1:1) : (a.days[0].d<b.days[0].d?-1:1));
  const isPast=x=>["done","closed"].includes(phase(x));
  const list = filt==="up"? all.filter(x=>!isPast(x)) : filt==="past"? all.filter(isPast) : all;
  const nextJob = all.filter(x=>!isPast(x))[0];
  if(!list.length){ fnlist.innerHTML=`<div class="empty">${filt==="up"?"ไม่มีงานที่ยังไม่ถึงกำหนด":filt==="past"?"ยังไม่มีงานที่ผ่านมาแล้ว":"ยังไม่มีงานที่คุณดูได้ในโรงแรมนี้"}</div>`; renderHero(false); return; }

  let html="", lastMonth="", lastDate="";
  list.forEach(x=>{
    const u=uniqDates(x), d0=new Date(u[0]+"T00:00:00"), mk=u[0].slice(0,7);
    if(mk!==lastMonth){
      lastMonth=mk; lastDate="";
      const inMonth=list.filter(y=>y.days[0].d.slice(0,7)===mk);
      const sum=inMonth.reduce((a,y)=>a+total(y),0);
      if(html) html+="</div></div>";
      html+=`<div class="mhead"><h2>${["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"][d0.getMonth()]} ${d0.getFullYear()+543}</h2>
        <span class="st">${inMonth.length} งาน · ${baht(sum)} บาท</span></div>`;
    }
    if(u[0]!==lastDate){
      if(lastDate) html+="</div></div>";
      lastDate=u[0];
      const last=new Date(u[u.length-1]+"T00:00:00");
      const span = u.length>1 ? `<em>ถึง ${last.getDate()} ${THMON[last.getMonth()]}</em>` : "";
      const sameDay=list.filter(y=>y.days[0].d===u[0]);
      const rooms={}, warn=[];
      sameDay.forEach(y=>y.days.filter(dd=>dd.d===u[0]).forEach(dd=>{
        const k=y.hotel+"|"+dd.room; rooms[k]=(rooms[k]||0)+1;
        if(rooms[k]===2) warn.push(dd.room);
      }));
      const byH={QL:sameDay.filter(y=>y.hotel==="QL").length, BY:sameDay.filter(y=>y.hotel==="BY").length};
      const dsum = (sameDay.length>1 || hotel==="ALL")
        ? `<div class="dsum">${sameDay.length} งาน${hotel==="ALL"?` · Queensland ${byH.QL} · Baiyoke ${byH.BY}`:""}
            ${warn.length?`<b>⚠ ห้อง ${[...new Set(warn)].join(", ")} มีมากกว่า 1 งาน</b>`:""}</div>` : "";
      html+=`<div class="dgroup"><div class="dcol"><b>${d0.getDate()}</b><i>${THDAY[d0.getDay()]}</i>${span}</div><div class="dcards">${dsum}`;
    }
    const ph=phase(x), pastCls=["done","closed"].includes(ph)?" past":"";
    const cls = (x.status==="ปิดงานแล้ว"||x.status==="ยืนยันแล้ว"?"ok":(x.status==="รอมัดจำ"?"wait":""))+pastCls;
    const dd=daysTo(x);
    const lifeTag = ph==="closed" ? `<span class="tag2 done">ปิดงานแล้ว</span>`
      : ph==="done" ? `<span class="tag2 hold">รอปิดงาน</span>`
      : ph==="live" ? `<span class="tag2 live">กำลังจัดวันนี้</span>`
      : (nextJob && nextJob.id===x.id) ? `<span class="tag2 next">คิวถัดไป · ${dd===0?"วันนี้":"อีก "+dd+" วัน"}</span>`
      : `<span class="tag2">อีก ${dd} วัน</span>`;
    const size = x.mode==="rent"?"เช่าห้อง": x.mode==="pack"?"เหมาแพ็กเกจ": x.guarantee+" "+x.unit;
    const rooms=[...new Set(x.days.map(d=>d.room))];
    html+=`<button class="fcard ${cls}" id="card_${x.id}" onclick="open_('${x.id}')">
      <div class="eye"><span>${hotel==="ALL"?`<b style="color:var(--plum)">${x.hotel==="QL"?"Queensland":"Baiyoke"}</b> · `:""}${x.kind}</span>
        <span class="dc">ใบสั่งงาน ${x.no}${x.link?" + "+x.linkNo:""}</span></div>
      <h3>${x.title}</h3>
      <div class="where">${x.days[0].time}${u.length>1?" · "+u.length+" วัน":""}<br>${rooms.join(" / ")}</div>
      <div class="foot">
        ${lifeTag}
        <span class="stt"><s></s>${x.status}</span>
        <span class="tag2">${x.doc}</span>
        <span class="tag2">${size}</span>
        ${x.adj&&x.adj.length?`<span class="tag2">มีใบแก้ไข</span>`:""}
        <span class="amt">${baht(total(x))}<u>บาท</u></span>
      </div></button>`;
  });
  html+="</div></div>";
  fnlist.innerHTML=html;
  renderHero(false);
}
function open_(id){ cur=id; phCat="ทั้งหมด"; renderBEO(); renderPhotos(); renderSend(); go("beo"); }

/* ---------------- BEO ---------------- */
