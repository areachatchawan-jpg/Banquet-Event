/* =============================================================
   One-time patch (Baiyoke Sky) — ใบ 9/11 สำนักงานปลัดสำนักนายกรัฐมนตรี (GECC) · 12 พ.ย. 2569
   ใบแก้ไข (Banquet Function Adjustment Sheet) ลงวันที่ 11 พ.ย. 2569 โดย มาฮาดี อีแต (Sales Executive)
   - ลดจำนวนการันตี 210 → 180 ท่าน (ใบแก้ไขไม่ระบุ set up → คง 220 ไว้ ให้ยืนยัน)
   - รายได้: อาหารว่าง 150 × 180 × 2 + บุฟเฟ่ต์ 550 × 180 = 153,000 (เดิม 178,500)
   - ออกเป็นใบแก้ไข V2 · แผนกที่กระทบต้องกดรับทราบใหม่
   - แนบใบแก้ไข + คาดการณ์รายได้ (ฉบับ 210 ท่าน · หัวชื่อบริษัทพิมพ์ผิดเป็น เอ็นพีซี)
   ทำครั้งเดียว (marker patch_20261111_opm_adj)
   ============================================================= */
(function(){
  const MARK = "patch_20261111_opm_adj";
  const ID = "q20261112_opm";
  const IMG = "img/20261112/";
  const OLD = 210, NEW = 180;
  const HIT = ["F&B Office","ฝ่ายจัดเลี้ยง","บาร์","ครัว / เบเกอรี่","Event"];

  const ADD = [
    ["ฝ่ายจัดเลี้ยง","** ใบแก้ไข 11 พ.ย.: การันตีลดเหลือ 180 ท่าน — BEO เดิมจัด Classroom 210 ที่นั่ง set up 220 · ยืนยันจำนวนที่นั่งจัดห้องกับ Sales (คุณมาฮาดี) **"],
    ["ครัว / เบเกอรี่","** ใบแก้ไข 11 พ.ย.: ลดการันตี 210 → 180 ท่าน — อาหารว่างเช้า / บ่าย และบุฟเฟ่ต์กลางวันชั้น 78 เตรียม 180 ท่าน **"],
    ["บาร์","** ใบแก้ไข 11 พ.ย.: การันตีลดเหลือ 180 ท่าน **"],
    ["Event","** ใบแก้ไข 11 พ.ย.: การันตี 180 ท่าน · ยอดใหม่ 153,000 บาท (เดิม 178,500) · ใบคาดการณ์รายได้ที่แนบยังเป็นยอด 210 ท่าน และหัวชื่อบริษัทพิมพ์ผิดเป็น บ.เอ็นพีซี เซฟตี้ฯ **"]
  ];

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบแก้ไข 11 พ.ย. 2569 — ลดการันตี 210 → 180 ท่าน (มาฮาดี อีแต)", src:IMG+"opm-adj-1111.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 178,500 (ฉบับ 210 ท่าน · ก่อนใบแก้ไข · หัวชื่อบริษัทพิมพ์ผิด)", src:IMG+"opm-revenue.jpg"}
  ];

  function patchFunc(){
    const i=FUNCS.findIndex(x=>x.id===ID);
    if(i<0) return false;
    const x=FUNCS[i];
    if(x.guarantee!==OLD) return true;           // แก้ไปแล้ว / มีคนแก้มือแล้ว

    x.guarantee=NEW;
    x.days.forEach(d=>{
      d.set=String(d.set||"").split(OLD+" ท่าน set up").join(NEW+" ท่าน set up")
            + " (ใบแก้ไข 11/11 · เดิม "+OLD+" ท่าน)";
    });
    (x.rev||[]).forEach(r=>{ if(r.qty===OLD) r.qty=NEW; });
    x.depts.forEach(d=>{
      d.t=d.t.map(s=>s.replace("ชั้น 78 สำหรับ "+OLD+" ท่าน","ชั้น 78 สำหรับ "+NEW+" ท่าน (เดิม "+OLD+")"));
    });
    ADD.forEach(([dn,txt])=>{
      const d=x.depts.find(z=>z.n===dn);
      if(d && !d.t.includes(txt)) d.t.push(txt);
    });

    const old=x.ver||1, nv=old+1;
    x.ver=nv; x.updAt="11 พ.ย. 2569 (ใบแก้ไข · ลดการันตี)"; x.adj=x.adj||[];
    x.adj.push({ date:"11 พ.ย. 2569", topic:"ลดจำนวนการันตี", ver:nv, by:"มาฮาดี อีแต (Sales Executive)",
      cc:"Account / Banquet / ครัว 80 / Bakery / Fruit Court / Steward / F&B / ครัว 15",
      from:["การันตี "+OLD+" ท่าน"], to:["การันตี "+NEW+" ท่าน"] });
    x.depts.forEach(d=>{ if(!HIT.includes(d.n) && d.ack && (d.ack.ver||1)===old) d.ack.ver=nv; });

    const st=state[ID] || (state[ID]={menu:x.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]});
    st.photos=st.photos||[];
    PHOTOS.forEach((p,k)=>{ if(!st.photos.some(q=>q.src===p.src)) st.photos.push({...p, id:ID+"_a"+k}); });
    return true;
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;
    const imp=await sb.from(T_SET).select("id").eq("id","import_20261112_opm").maybeSingle();
    if(imp.error && imp.error.code!=="PGRST116") throw imp.error;
    if(!imp.data) return false;

    const ok=patchFunc();
    await autoSync();
    if(lastDbError) return false;

    const now=new Date().toISOString();
    const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:ok?[ID]:[] }, updated_at:now });
    if(error) throw error;

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] patched 9/11 OPM → guarantee 180 (V2)");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] patch OPM adj failed:", e); }
  }, 3000);
})();
