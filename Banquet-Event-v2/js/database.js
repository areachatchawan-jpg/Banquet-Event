function initDB(){
  try{BE.db=window.supabase.createClient(BE_CONFIG.supabaseUrl,BE_CONFIG.supabaseKey);setSync("กำลังโหลด…","wait");return true;}catch(e){setSync("ฐานข้อมูลไม่พร้อม","err");return false;}
}
function packState(id){
  const s=BE.states[id]||{};
  return {done:s.done||[],photos:s.photos||[],menuOverrides:s.menuOverrides||{}};
}
function unpackState(id,p){
  BE.states[id]={done:Array.isArray(p?.done)?p.done:[],photos:Array.isArray(p?.photos)?p.photos:[],menuOverrides:p?.menuOverrides||{}};
}
function rowSnapshot(x){return JSON.stringify({f:x,st:packState(x.id)});}
function packSettings(){
  return {USERS:BE.settings.USERS||DEFAULT_USERS,ROOMS:BE.settings.ROOMS||DEFAULT_ROOMS,MENUS:BE.settings.MENUS||{},KINDS:BE.settings.KINDS||DEFAULT_KINDS,STAFF:BE.settings.STAFF||DEFAULT_STAFF,DEPTS_BASIC:BE.settings.DEPTS_BASIC||DEFAULT_DEPTS};
}
function applySettings(o){if(!o)return;BE.settings={...BE.settings,...o};}
async function dbLoad(){
  if(!BE.db)return false;
  try{
    const s=await BE.db.from(BE_CONFIG.settingsTable).select("data").eq("id","app").maybeSingle();
    if(s.error && s.error.code!=="PGRST116")throw s.error;
    if(s.data?.data)applySettings(s.data.data);
    if(!BE.settings.ROOMS)BE.settings.ROOMS=clone(DEFAULT_ROOMS);
    if(!BE.settings.KINDS)BE.settings.KINDS=clone(DEFAULT_KINDS);
    if(!BE.settings.STAFF)BE.settings.STAFF=clone(DEFAULT_STAFF);
    if(!BE.settings.DEPTS_BASIC)BE.settings.DEPTS_BASIC=clone(DEFAULT_DEPTS);
    if(!BE.settings.USERS)BE.settings.USERS=clone(DEFAULT_USERS);
    const f=await BE.db.from(BE_CONFIG.functionsTable).select("id,data");
    if(f.error)throw f.error;
    BE.funcs=[];BE.states={};BE.lastHash={};
    (f.data||[]).forEach(r=>{const x=r.data?.f;if(!x)return;BE.funcs.push(x);unpackState(x.id,r.data?.st);BE.lastHash[x.id]=rowSnapshot(x);});
    BE.funcs.sort((a,b)=>String(a.days?.[0]?.d||"").localeCompare(String(b.days?.[0]?.d||"")));
    BE.lastSettings=JSON.stringify(packSettings());BE.dbReady=true;setSync("บันทึกแล้ว","ok");return true;
  }catch(e){console.error(e);setSync("อ่านฐานข้อมูลไม่สำเร็จ","err");return false;}
}
async function dbUpsertEvent(x){
  const payload={id:x.id,data:{f:x,st:packState(x.id)},updated_at:new Date().toISOString()};
  const r=await BE.db.from(BE_CONFIG.functionsTable).upsert(payload);if(r.error)throw r.error;BE.lastHash[x.id]=rowSnapshot(x);
}
async function dbDeleteEvent(id){const r=await BE.db.from(BE_CONFIG.functionsTable).delete().eq("id",id);if(r.error)throw r.error;delete BE.lastHash[id];}
async function dbSaveSettings(){const data=packSettings();const r=await BE.db.from(BE_CONFIG.settingsTable).upsert({id:"app",data,updated_at:new Date().toISOString()});if(r.error)throw r.error;BE.lastSettings=JSON.stringify(data);}
async function syncNow(){
  if(!BE.db||!BE.dbReady||BE.syncing)return;
  const changed=BE.funcs.filter(x=>BE.lastHash[x.id]!==rowSnapshot(x));
  const gone=Object.keys(BE.lastHash).filter(id=>!BE.funcs.some(x=>x.id===id));
  const settings=JSON.stringify(packSettings());
  if(!changed.length&&!gone.length&&settings===BE.lastSettings)return;
  BE.syncing=true;setSync("กำลังบันทึก…","wait");
  try{for(const x of changed)await dbUpsertEvent(x);for(const id of gone)await dbDeleteEvent(id);if(settings!==BE.lastSettings)await dbSaveSettings();setSync("บันทึกแล้ว","ok");}
  catch(e){console.error(e);setSync("บันทึกไม่สำเร็จ","err");}
  finally{BE.syncing=false;}
}
