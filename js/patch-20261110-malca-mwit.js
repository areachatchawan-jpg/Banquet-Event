/* =============================================================
   One-time patch (Baiyoke Sky) — ตรวจทานใบ 15/11 Malca-Amit และใบ 14/11 MWIT
   กับเอกสารต้นฉบับ (BEO / ใบแก้ไข / เมนู / ใบเสร็จ) แล้วแก้จุดที่ไม่ตรง
   - 15/11: "ข้าวแซลมอนไข่กุ้ง" → "ข้าวแซลมอนไข่ดอง" (เมนูหน้า 3)
   - 15/11: ผู้ควบคุม Backdrop "คุณธิตราวรรณ" → "คุณธิดารัตน์"
   - 15/11: หมายเหตุ ครัวระบุซุ้มละ 2 ซุ้ม แต่ราคา/คาดการณ์รายได้คิดอย่างละ 1 ซุ้ม
   - 15/11: หมายเหตุ ใบแก้ไข 6/11 ไม่ระบุ set up (ในระบบใส่ 410)
   - 14/11: รปภ. "คุณธานินทร์" → "คุณธนินทร์"
   แก้เฉพาะงานเดิม ไม่สร้างงานใหม่ · ทำครั้งเดียว (marker patch_20261110_malca_mwit)
   ============================================================= */
(function(){
  const MARK = "patch_20261110_malca_mwit";
  const NOTE_STALL = "** BEO ส่วนครัวระบุซุ้มบะหมี่เกี๊ยว/หมูแดง 2 ซุ้ม + ข้าวต้มหมู 2 ซุ้ม แต่ราคาและคาดการณ์รายได้ (310,500) คิดอย่างละ 1 ซุ้ม — ยืนยันจำนวนซุ้มกับ Sales **";
  const NOTE_SETUP = "** ใบแก้ไข 6/11 เพิ่มการันตีเป็น 400 แต่ไม่ระบุ set up (ในระบบใส่ 410) — ยืนยันกับ Sales **";

  const FIX = {
    q20261107_malca: [["ข้าวแซลมอนไข่กุ้ง","ข้าวแซลมอนไข่ดอง"],["คุณธิตราวรรณ","คุณธิดารัตน์"]],
    q20261114_mwit:  [["คุณธานินทร์","คุณธนินทร์"]]
  };

  const swap = (s, pairs) => pairs.reduce((t,[a,b])=>t.split(a).join(b), s);

  function patchMenus(){
    let n=0;
    Object.keys(MENUS).forEach(k=>{
      const s=JSON.stringify(MENUS[k]);
      if(s.includes("ข้าวแซลมอนไข่กุ้ง")){ MENUS[k]=JSON.parse(swap(s, FIX.q20261107_malca)); n++; }
    });
    return n;
  }

  function patchFunc(id){
    const i=FUNCS.findIndex(x=>x.id===id);
    if(i<0) return false;
    const f=JSON.parse(swap(JSON.stringify(FUNCS[i]), FIX[id]));
    if(id==="q20261107_malca"){
      const k=(f.depts||[]).find(d=>d.n==="ครัว / เบเกอรี่");
      if(k && !k.t.includes(NOTE_STALL)) k.t.push(NOTE_STALL);
      const b=(f.depts||[]).find(d=>d.n==="ฝ่ายจัดเลี้ยง");
      if(b && !b.t.includes(NOTE_SETUP)) b.t.push(NOTE_SETUP);
    }
    FUNCS[i]=f;
    const st=state[id];
    if(st && st.menuOverrides){
      st.menuOverrides=JSON.parse(swap(JSON.stringify(st.menuOverrides), FIX[id]));
    }
    return true;
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;
    const imp=await sb.from(T_SET).select("id").in("id",["import_20261107_malca","import_20261114_mwit"]);
    if(imp.error) throw imp.error;
    if((imp.data||[]).length<2) return false;   // รอให้นำเข้า 2 งานเดิมเสร็จก่อน

    const done=Object.keys(FIX).filter(patchFunc);
    patchMenus();
    await autoSync();
    if(lastDbError) return false;   // ลองใหม่รอบถัดไป

    const now=new Date().toISOString();
    const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:done }, updated_at:now });
    if(error) throw error;

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] patched", done.join(", "));
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] patch Malca/MWIT failed:", e); }
  }, 3000);
})();
