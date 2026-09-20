const SB_URL = "https://gufnisizabudxeqqviet.supabase.co";
const SB_KEY = "sb_publishable_xw4diCn3g-WNMvJJXz_22A_Y6wk9a4W";
const T_FUNC = "be_functions", T_SET = "be_settings";

let sb=null, dbOn=false, syncBusy=false, dbReady=false;
let lastHash={}, lastSet="", lastDbError="";
let retryTimer=null;

function initDB(){
  try{
    if(window.supabase && SB_URL && SB_KEY){
      sb=window.supabase.createClient(SB_URL, SB_KEY);
      dbOn=true;
    }
  }catch(e){
    dbOn=false;
    lastDbError=(e&&e.message)||"สร้างการเชื่อมต่อฐานข้อมูลไม่ได้";
  }
  setSync(dbOn? "loading" : "off", lastDbError);
}

function setSync(st, msg){
  const el=document.getElementById("syncDot"); if(!el) return;
  const map={ loading:["wait","กำลังโหลดข้อมูล…"], saving:["wait","กำลังบันทึก…"],
    ok:["ok","บันทึกแล้ว"], err:["err","บันทึกไม่สำเร็จ"], off:["off","ไม่ได้ต่อฐานข้อมูล"] };
  const m=map[st]||map.off;
  el.className="sync "+m[0];
  el.innerHTML=`<s></s>${m[1]}`;
  el.title=msg||"";
  const n=document.getElementById("listNote");
  if(n) n.textContent = dbOn
    ? (st==="err" && lastDbError ? "ฐานข้อมูลยังบันทึกไม่ได้ · ระบบจะลองเชื่อมต่อใหม่อัตโนมัติ" : "ข้อมูลบันทึกอัตโนมัติลงฐานข้อมูล ใช้งานพร้อมกันหลายเครื่องได้")
    : "ยังไม่ได้ต่อฐานข้อมูล ข้อมูลที่แก้จะหายเมื่อปิดหน้า";
}

/* ---- แปลงข้อมูลไป-กลับ ---- */
function packState(id){
  const s=state[id]||{menu:[],done:new Set(),photos:[]};
  return {
    menu:(s.menu||[]).map(sel=>{ const o={}; Object.keys(sel||{}).forEach(g=>o[g]=[...sel[g]]); return o; }),
    done:[...(s.done||[])],
    menuOverrides:s.menuOverrides||{},
    photos:(s.photos||[])
  };
}
function unpackState(id,p){
  const menu=((p&&p.menu)||[]).map(o=>{ const s={}; Object.keys(o||{}).forEach(g=>s[g]=new Set(o[g]||[])); return s; });
  state[id]={ menu, done:new Set((p&&p.done)||[]), menuOverrides:(p&&p.menuOverrides)||{}, photos:((p&&p.photos)||[]) };
}
function snapFunc(x){ return JSON.stringify({f:x, st:packState(x.id)}); }
function packSettings(){
  return { USERS, HOTELNAME, LOGO, ROOMS, MENUS, STAFF, KINDS, KINDGROUPS,
           DEPTS_BASIC, KPIW, KPIGRADE, KPIKEY, KPINAME, DEPTGROUPS };
}
function applySettings(o){
  if(!o) return;
  const setArr=(target,src)=>{ if(Array.isArray(src)){ target.length=0; src.forEach(v=>target.push(v)); } };
  const setObj=(target,src)=>{ if(src && typeof src==="object"){ Object.keys(target).forEach(k=>delete target[k]); Object.keys(src).forEach(k=>target[k]=src[k]); } };
  setArr(USERS,o.USERS); setArr(DEPTS_BASIC,o.DEPTS_BASIC);
  setObj(HOTELNAME,o.HOTELNAME); setObj(LOGO,o.LOGO); setObj(ROOMS,o.ROOMS);
  setObj(MENUS,o.MENUS); setObj(STAFF,o.STAFF);
  if(Array.isArray(o.KINDS)) KINDS=o.KINDS;
  if(Array.isArray(o.KINDGROUPS)) KINDGROUPS=o.KINDGROUPS;
  if(Array.isArray(o.DEPTGROUPS)) DEPTGROUPS=o.DEPTGROUPS;
  if(o.KPIW) KPIW=o.KPIW;
  if(o.KPIGRADE) KPIGRADE=o.KPIGRADE;
  if(o.KPIKEY) KPIKEY=o.KPIKEY;
  if(o.KPINAME) KPINAME=o.KPINAME;
  rebuildMenuOrder();
}

/* ---- โหลดจากฐานข้อมูล ---- */
async function dbLoad(){
  if(!dbOn || !sb) return false;
  setSync("loading", lastDbError);
  try{
    const r2=await sb.from(T_SET).select("data").eq("id","app").maybeSingle();
    if(r2.error && r2.error.code!=="PGRST116") throw r2.error;
    if(r2.data && r2.data.data) applySettings(r2.data.data);
    lastSet=JSON.stringify(packSettings());

    const r1=await sb.from(T_FUNC).select("id,data");
    if(r1.error) throw r1.error;
    if(Array.isArray(r1.data)){
      // A successful empty query means the production table is empty; do not
      // resurrect bundled demo/sample jobs from data.js.
      FUNCS.length=0;
      Object.keys(state).forEach(k=>delete state[k]);
      lastHash={};
      r1.data.forEach(row=>{
        const f=row.data && row.data.f; if(!f || !f.days || !f.days.length) return;
        FUNCS.push(f); unpackState(f.id, row.data.st);
      });
      FUNCS.sort((a,b)=> a.days[0].d===b.days[0].d ? (a.no<b.no?-1:1) : (a.days[0].d<b.days[0].d?-1:1));
      FUNCS.forEach(x=>{ lastHash[x.id]=snapFunc(x); });
      if(!FUNCS.some(x=>x.id===cur)) cur = FUNCS.length? FUNCS[0].id : null;
    }

    dbReady=true;
    lastDbError="";
    setSync("ok");
    return true;
  }catch(e){
    dbReady=false;
    lastDbError=(e&&e.message)||"อ่านฐานข้อมูลไม่ได้";
    console.error("[Banquet-Event] DB load failed:", e);
    setSync("err", lastDbError);
    return false;
  }
}

/* ---- บันทึกอัตโนมัติ ---- */
function pendingChanges(){
  if(!dbOn) return false;
  if(JSON.stringify(packSettings())!==lastSet) return true;
  const ids=new Set(FUNCS.map(x=>x.id));
  if(Object.keys(lastHash).some(id=>!ids.has(id))) return true;
  return FUNCS.some(x=>lastHash[x.id]!==snapFunc(x));
}

async function autoSync(){
  if(!dbOn || !sb || syncBusy || !dbReady) return;
  const changed=[];
  FUNCS.forEach(x=>{ const s=snapFunc(x); if(lastHash[x.id]!==s) changed.push([x.id,s]); });
  const ids=new Set(FUNCS.map(x=>x.id));
  const gone=Object.keys(lastHash).filter(id=>!ids.has(id));
  const setJson=JSON.stringify(packSettings());
  if(!changed.length && !gone.length && setJson===lastSet) return;
  syncBusy=true; setSync("saving");
  try{
    const now=new Date().toISOString();
    for(const [id,s] of changed){
      const payload=JSON.parse(s);
      const {error}=await sb.from(T_FUNC).upsert({ id, data:payload, updated_at:now });
      if(error) throw error;
      lastHash[id]=s;
    }
    for(const id of gone){
      const {error}=await sb.from(T_FUNC).delete().eq("id",id);
      if(error) throw error;
      delete lastHash[id];
    }
    if(setJson!==lastSet){
      const {error}=await sb.from(T_SET).upsert({ id:"app", data:JSON.parse(setJson), updated_at:now });
      if(error) throw error;
      lastSet=setJson;
    }
    lastDbError="";
    setSync("ok");
  }catch(e){
    lastDbError=(e&&e.message)||"บันทึกไม่สำเร็จ";
    console.error("[Banquet-Event] DB sync failed:", e);
    setSync("err", lastDbError);
  }finally{
    syncBusy=false;
  }
}

/* ---- โหลดใหม่เมื่อกลับมาที่แท็บ (ถ้าไม่มีอะไรค้างบันทึก) ---- */
document.addEventListener("visibilitychange", async ()=>{
  if(document.hidden || !dbOn || !dbReady || syncBusy || !me) return;
  if(pendingChanges()) return;
  await dbLoad();
  renderList(); renderHero(false); renderRev();
  if(cur){ renderBEO(); renderPhotos(); renderSend(); }
});

/* ---- ปุ่มในหน้าตั้งค่า ---- */
async function dbPushAll(){
  if(!dbOn){ toast("ยังไม่ได้ต่อฐานข้อมูล"); return; }
  lastHash={}; lastSet=""; dbReady=true;
  await autoSync();
  renderAdmin(); toast("อัปข้อมูลขึ้นฐานข้อมูลแล้ว");
}
async function dbReload(){
  if(!dbOn){ toast("ยังไม่ได้ต่อฐานข้อมูล"); return; }
  const ok=await dbLoad();
  renderList(); renderHero(false); renderRev();
  if(cur){ renderBEO(); renderPhotos(); renderSend(); }
  renderAdmin(); toast(ok? "โหลดข้อมูลใหม่แล้ว":"โหลดไม่สำเร็จ");
}
function dbWipe(){
  if(!dbOn){ toast("ยังไม่ได้ต่อฐานข้อมูล"); return; }
  askConfirm("ลบงานทั้งหมดในฐานข้อมูล ?","ลบงานทุกใบทิ้งเพื่อเริ่มกรอกข้อมูลจริง การตั้งค่าไม่ถูกลบ และกู้คืนไม่ได้", async ()=>{
    syncBusy=true; setSync("saving");
    const {error}=await sb.from(T_FUNC).delete().neq("id","__none__");
    syncBusy=false;
    if(error){ lastDbError=error.message; setSync("err", error.message); toast("ลบไม่สำเร็จ"); return; }
    FUNCS.length=0; Object.keys(state).forEach(k=>delete state[k]);
    lastHash={}; cur=null;
    lastDbError="";
    setSync("ok");
    renderList(); renderHero(false); renderRev(); renderAdmin();
    toast("ลบงานทั้งหมดแล้ว เริ่มเพิ่มงานจริงได้เลย");
  });
}
function adDB(){
  const st = !dbOn ? "ยังไม่ได้ต่อฐานข้อมูล (ตรวจอินเทอร์เน็ตหรือการตั้งค่า)"
    : dbReady ? "เชื่อมต่อแล้ว · บันทึกอัตโนมัติทุก 4 วินาทีเมื่อมีการแก้ไข"
    : "กำลังเชื่อมต่อ…";
  return `<div class="card"><div class="band"><span>สถานะฐานข้อมูล</span><span class="who">${FUNCS.length} งานในระบบ</span></div>
    <div class="pad">
      <div class="row"><div class="k">สถานะ</div><div class="v">${st}</div></div>
      <div class="row"><div class="k">โปรเจกต์</div><div class="v" style="word-break:break-all">${SB_URL}</div></div>
      <div class="row"><div class="k">ตาราง</div><div class="v">${T_FUNC} · ${T_SET}</div></div>
      ${lastDbError?`<div class="note" style="padding-top:10px;color:#b42318">ข้อผิดพลาดล่าสุด: ${String(lastDbError).replace(/</g,"&lt;")}</div>`:""}
    </div></div>
  <div class="card"><div class="band">คำสั่ง</div><div class="pad">
    <div class="btns">
      <button class="ghost" onclick="dbReload()">โหลดข้อมูลจากฐานข้อมูลใหม่</button>
      <button class="ghost" onclick="dbPushAll()">อัปข้อมูลในหน้านี้ขึ้นฐานข้อมูล</button>
      <button class="ghost danger2" onclick="dbWipe()">ลบงานทั้งหมดในฐานข้อมูล</button>
    </div>
    <p class="note" style="padding:8px 0 0">ครั้งแรกที่ใช้งานจริง ให้กด "ลบงานทั้งหมดในฐานข้อมูล" เพื่อล้างงานตัวอย่าง แล้วเริ่มกรอกงานจริง การตั้งค่าทั้งหมดจะยังอยู่</p>
  </div></div>`;
}

/* ---- เริ่มระบบ ---- */
(async function boot(){
  initDB();
  if(!dbOn) return;

  const ok=await dbLoad();
  if(ok){
    document.documentElement.setAttribute("data-hotel", hotel==="ALL"?"QL":hotel);
    gwL.src=LOGO.QL; gwR.src=LOGO.BY; gl1.src=LOGO.QL; gl2.src=LOGO.BY;
    gl1.alt=HOTELNAME.QL; gl2.alt=HOTELNAME.BY;
    if(me){ setHotel(hotel); }
  }

  // Never mark the DB ready after a failed load.
  // Retry the connection automatically so a temporary Supabase/network failure
  // can recover without asking the user to refresh or edit Supabase manually.
  clearInterval(retryTimer);
  retryTimer=setInterval(async ()=>{
    if(!dbOn || syncBusy) return;
    if(!dbReady){
      await dbLoad();
      if(dbReady){ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }
      return;
    }
    await autoSync();
  }, 4000);

  window.addEventListener("beforeunload", e=>{ if(pendingChanges()){ e.preventDefault(); e.returnValue=""; } });
})();

gwL.src=LOGO.QL; gwR.src=LOGO.BY; gl1.src=LOGO.QL; gl2.src=LOGO.BY;
gl1.alt=HOTELNAME.QL; gl2.alt=HOTELNAME.BY;
document.documentElement.setAttribute("data-hotel","QL");
