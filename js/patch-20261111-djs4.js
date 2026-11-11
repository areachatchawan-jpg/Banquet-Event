/* =============================================================
   One-time patch (Queensland) — DJS4 Digital JumpStart 4 · 14 พ.ย. 2569
   ไฟล์ที่ส่งมา 11 พ.ย. 2569 เป็นงานเดิมในระบบ (q20261114_djs4) → ไม่สร้างงานใหม่
   BEO ฉบับใหม่ (FINAL FUNCTION 10/11/2026) ต่างจากฉบับเดิม 2 จุด:
   - เลขใบ 22/11 → 21/11 (แก้เลขซ้ำกับใบ 22/11 SHI 30 ของ Baiyoke Sky)
   - ป้ายต้อนรับ เวลา 08.00–20.00 น. → 08.00–22.00 น.
   แก้เพิ่มให้ตรงเอกสาร: ผู้ควบคุม Backdrop "คุณธิตราวรรณ" → "คุณธิดารัตน์"
   แนบใหม่: BEO 21/11, คาดการณ์รายได้ 45,000, แปลนห้อง (Event Hall 01)
   ทำครั้งเดียว (marker patch_20261111_djs4)
   ============================================================= */
(function(){
  const MARK = "patch_20261111_djs4";
  const ID = "q20261114_djs4";
  const IMG = "img/20261114/";
  const FIX = [["คุณธิตราวรรณ","คุณธิดารัตน์"], ["08.00–20.00 น.","08.00–22.00 น."]];

  const ADD = [
    ["ฝ่ายจัดเลี้ยง","แปลนลูกค้า: ไลน์อาหารด้านหลังห้อง · โต๊ะกลมนั่ง 7 คน จำนวน 5 โต๊ะ (ช่วยดูช่องไฟด้านข้างกับด้านหลัง)"],
    ["ฝ่ายจัดเลี้ยง","แปลนลูกค้า: โต๊ะทีมงาน 6 ตัว นั่งโต๊ะละ 2 คน วางเรียงต่อกัน ขอไลน์ปลั๊กด้วย"],
    ["ฝ่ายจัดเลี้ยง","** แปลนขอโต๊ะทีมงาน 6 ตัว / 12 ท่าน แต่ BEO ระบุโต๊ะสังเกตการณ์ข้างห้อง 3 ตัว / 6 ท่าน · BEO เขียน Mum's Bistro ชั้น 22 แต่ตารางห้องเป็นชั้น 20 — ยืนยันกับ Sales **"],
    ["ช่าง / อุปกรณ์","ไลน์ปลั๊กที่โต๊ะทีมงาน (ตามแปลนลูกค้า)"]
  ];

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 21/11 (FINAL FUNCTION 10/11/2026 · ฉบับแก้เลขใบ + ป้าย 08.00–22.00)", src:IMG+"djs4-beo-2111.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 45,000 บาท", src:IMG+"djs4-revenue.jpg"},
    {dept:"ฝ่ายจัดเลี้ยง", cap:"แปลนห้อง Event Hall 01 (โต๊ะกลม 5 โต๊ะ ๆ ละ 7 · โต๊ะทีมงาน 6 ตัว)", src:IMG+"djs4-floorplan.jpg"}
  ];

  const swap = (s, pairs) => pairs.reduce((t,[a,b])=>t.split(a).join(b), s);

  function patchFunc(){
    const i=FUNCS.findIndex(x=>x.id===ID);
    if(i<0) return false;
    const f=JSON.parse(swap(JSON.stringify(FUNCS[i]), FIX));
    f.no="21/11";
    ADD.forEach(([dn,txt])=>{
      const d=(f.depts||[]).find(z=>z.n===dn);
      if(d && !d.t.includes(txt)) d.t.push(txt);
    });
    FUNCS[i]=f;

    const st=state[ID] || (state[ID]={menu:f.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]});
    st.photos=st.photos||[];
    st.photos.forEach(p=>{
      if(p.src===IMG+"djs4-beo.jpg") p.cap="ใบ BEO 22/11 (ฉบับเดิม — ใช้ฉบับ 21/11 แทน)";
    });
    PHOTOS.forEach((p,k)=>{
      if(!st.photos.some(q=>q.src===p.src)) st.photos.push({...p, id:ID+"_p"+k});
    });
    return true;
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;
    const imp=await sb.from(T_SET).select("id").eq("id","import_20261114_djs4").maybeSingle();
    if(imp.error && imp.error.code!=="PGRST116") throw imp.error;
    if(!imp.data) return false;   // รอให้นำเข้างานเดิมเสร็จก่อน

    const ok=patchFunc();
    await autoSync();
    if(lastDbError) return false;   // ลองใหม่รอบถัดไป

    const now=new Date().toISOString();
    const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:ok?[ID]:[] }, updated_at:now });
    if(error) throw error;

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] patched DJS4 → 21/11");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] patch DJS4 failed:", e); }
  }, 3000);
})();
