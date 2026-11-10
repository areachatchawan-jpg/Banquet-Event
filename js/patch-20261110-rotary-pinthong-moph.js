/* =============================================================
   One-time patch (Baiyoke Sky) — ตรวจไฟล์ที่ส่งมา 10 พ.ย. 2569 เทียบกับระบบ
   ใบ 16/11 Rotary (8 พ.ย.), ใบ 17/11 Pinthong (17–18 พ.ย.), ใบ 18/11 สป.สธ. (11–13 พ.ย.)
   มีในระบบครบแล้วทั้ง 3 งาน → ไม่สร้างงานใหม่ แก้เฉพาะจุดที่ไม่ตรงเอกสาร
   - ทั้ง 3 งาน: ผู้ควบคุม Backdrop "คุณธิตราวรรณ" → "คุณธิดารัตน์"
   - 16/11: รปภ. "คุณธนินทร์" → "คุณธานินทร์" (ตาม BEO 16/11)
   - 18/11: "แท่นกล่าวเปิด 2 อัน" → "แฟ้มกล่าวเปิด 2 อัน"
   ทำครั้งเดียว (marker patch_20261110_rotary_pinthong_moph)
   ============================================================= */
(function(){
  const MARK = "patch_20261110_rotary_pinthong_moph";
  const BD = ["คุณธิตราวรรณ","คุณธิดารัตน์"];
  const FIX = {
    q20261108_rotary:   [BD, ["คุณธนินทร์","คุณธานินทร์"]],
    q20261117_pinthong: [BD],
    q20261111_moph:     [BD, ["แท่นกล่าวเปิด","แฟ้มกล่าวเปิด"]]
  };
  const NEED = ["import_20261108_rotary","import_20261117_pinthong","import_20261111_moph"];

  const swap = (s, pairs) => pairs.reduce((t,[a,b])=>t.split(a).join(b), s);

  function patchFunc(id){
    const i=FUNCS.findIndex(x=>x.id===id);
    if(i<0) return false;
    FUNCS[i]=JSON.parse(swap(JSON.stringify(FUNCS[i]), FIX[id]));
    return true;
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;
    const imp=await sb.from(T_SET).select("id").in("id",NEED);
    if(imp.error) throw imp.error;
    if((imp.data||[]).length<NEED.length) return false;   // รอให้นำเข้า 3 งานเดิมเสร็จก่อน

    const done=Object.keys(FIX).filter(patchFunc);
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
    catch(e){ console.error("[Banquet-Event] patch Rotary/Pinthong/MOPH failed:", e); }
  }, 3000);
})();
