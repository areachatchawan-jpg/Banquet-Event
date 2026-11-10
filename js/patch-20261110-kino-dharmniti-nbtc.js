/* =============================================================
   One-time patch (Baiyoke Sky) — ตรวจไฟล์ที่ส่งมา 10 พ.ย. 2569 (ชุดที่ 2) เทียบกับระบบ
   ใบ 20/11 Kinokuniya (11 พ.ย.), ใบ 19/11 ธรรมนิติ (13 พ.ย.), ใบ 21/11 กสทช. (13 พ.ย.)
   มีในระบบครบแล้วทั้ง 3 งาน → ไม่สร้างงานใหม่ แก้เฉพาะจุดที่ไม่ตรงเอกสาร + แนบแบบฟอร์มลูกค้า
   - ทั้ง 3 งาน: ผู้ควบคุม Backdrop "คุณธิตราวรรณ" → "คุณธิดารัตน์"
   - 20/11: รปภ. "คุณธนินทร์" → "คุณธานินทร์" · เมนู "ข้าวแซลมอนไข่กุ้ง" → "ข้าวแซลมอนไข่ดอง"
            หมายเหตุ เงื่อนไขชำระ PO (Credit 7 วัน โอน) ≠ BEO (เงินสด/บัตร ณ วันงาน)
   - 19/11: บาร์ "คุณชายุตรี" → "คุณซายูตรี" · แนบแบบฟอร์มลูกค้า
            หมายเหตุ ฟอร์มลูกค้าระบุห้อง Rainbow 2 / 84 ที่ / ไมค์ 3 ตัว / โต๊ะการเงิน 2 ชุด
   - 21/11: ทะเบียน "1 ขย 3576" → "1 ขถ 3576", "7 ขฬ 9226" → "7 ขผ 9226" (ตาม BEO)
            เพิ่มชื่อวิทยากร / รายละเอียดรถ VIP / ผู้ชำระเงิน จากแบบฟอร์มลูกค้า · แนบแบบฟอร์ม
            หมายเหตุ ขนมเบรกและทะเบียน 3576/3567 ไม่ตรงกันระหว่าง BEO กับฟอร์ม
   ทำครั้งเดียว (marker patch_20261110_kino_dharmniti_nbtc)
   ============================================================= */
(function(){
  const MARK = "patch_20261110_kino_dharmniti_nbtc";
  const IMG = "img/20261113/";
  const BD = ["คุณธิตราวรรณ","คุณธิดารัตน์"];
  const SALMON = ["ข้าวแซลมอนไข่กุ้ง","ข้าวแซลมอนไข่ดอง"];
  const FIX = {
    q20261111_kinokuniya: [BD, ["คุณธนินทร์","คุณธานินทร์"], SALMON],
    q20261113_dharmniti:  [BD, ["คุณชายุตรี","คุณซายูตรี"]],
    q20261113_nbtc_cc:    [BD, ["1 ขย 3576","1 ขถ 3576"], ["7 ขฬ 9226","7 ขผ 9226"]]
  };
  const NEED = ["import_20261111_kinokuniya","import_20261113_dharmniti","import_20261113_nbtc_cc"];

  /* บรรทัดที่เพิ่มในแผนก: [id, ชื่อแผนก, ข้อความ] */
  const ADD = [
    ["q20261111_kinokuniya","Event",
     "** เงื่อนไขชำระไม่ตรงกัน: PO 299/26 = Credit 7 วัน โอนเข้า K Bank 738-2-07272-8 (ยอดคงเหลือ 143,400 หลังวันงาน) · BEO = ชำระเงินสด/บัตรเครดิต ณ วันงาน — ยืนยันกับ Sales ก่อนวางบิล **"],

    ["q20261113_dharmniti","ฝ่ายจัดเลี้ยง",
     "** แบบฟอร์มลูกค้า (7 พ.ย.) ระบุห้อง \"Rainbow 2\" · จัดที่นั่ง 84 · มีเวทีบรรยาย · โต๊ะการเงิน 2 ชุด — BEO ใช้ Sky Room ชั้น 17 set up 85 (Rainbow Hall วันนี้ กสทช. ใช้) · ยืนยันให้ลูกค้าใช้ชื่อห้อง Sky Room ในเอกสาร/ป้าย **"],
    ["q20261113_dharmniti","ช่าง / อุปกรณ์",
     "** แบบฟอร์มลูกค้า: ไมค์ตั้งโต๊ะวิทยากร 1 + โพเดียม+ไมค์ 1 + ไมค์ลอย 1 (รวม 3 ตัว) — BEO ไมค์ลอย 2 ตัว · ยืนยันกับ Sales **"],

    ["q20261113_nbtc_cc","Event",
     "ป้ายวิทยากร (ตามแบบฟอร์มลูกค้า): กสทช. ศาสตราจารย์กิตติคุณ ดร.พิรงรอง รามสูต · ผู้ช่วยศาสตราจารย์ ดร.สกุลศรี ศรีสารคาม · ดร.วินิจพรรษ กันยะพงศ์ · นางสาวมณีรัตน์ กำจรกิจการ ผสทช. (สท.) · นางสิริรัตน์ นิ่มเงิน รก.อผส."],
    ["q20261113_nbtc_cc","รปภ. / ที่จอดรถ",
     "รถ VIP (แบบฟอร์มลูกค้า): กสทช. พิรงรอง Alphard ดำ 5 ขด 7922 · คุณมณีรัตน์ BYD ขาว 4 ขค 1232 · คุณพสุ Subaru เทา 5 กฐ 558 · ผศ.ดร.สกุลศรี 1 ขถ 3567 · ดร.วินิจพรรษ Mitsubishi XForce ขาว 7 ขผ 9226 · ผศ.ดร.ชนัญสรา 1 กบ 5125 · ผศ.ดร.ศศิธร Honda Civic เทา 4 กอ 9536"],
    ["q20261113_nbtc_cc","รปภ. / ที่จอดรถ",
     "** ทะเบียน ผศ.ดร.สกุลศรี: BEO = 1 ขถ 3576 · แบบฟอร์มลูกค้า = 1 ขถ 3567 — ยืนยันกับลูกค้า **"],
    ["q20261113_nbtc_cc","ครัว / เบเกอรี่",
     "** แบบฟอร์มลูกค้า (เบรกละ 2 รายการ): เช้า ครัวซองท์ไส้แฮม / เค้กหินอ่อน · บ่าย ซอสเซสโรล / มัฟฟินกล้วยหอม — BEO เช้าเป็น \"เค้กกาแฟ\" + วุ้นผลไม้, บ่าย + ผลไม้ · ยืนยันเค้กหินอ่อน หรือ เค้กกาแฟ **"]
  ];

  const DEP_NOTE = {
    q20261111_kinokuniya: " · ** PO: Credit 7 วัน โอน K Bank หลังวันงาน (BEO: เงินสด/บัตร ณ วันงาน) ยืนยันกับ Sales **",
    q20261113_nbtc_cc:    " · แบบฟอร์มลูกค้า: โอนจ่าย · ผู้ชำระ พันตรีหญิง รัฐวรรณ พันธุนิล 081-340-3366"
  };

  const PHOTOS = {
    q20261113_dharmniti: [
      {dept:"เอกสาร / อื่น ๆ", cap:"แบบฟอร์มลูกค้า ธรรมนิติ 7 พ.ย. 2569 (75 / จัด 84 ที่ · ระบุห้อง Rainbow 2)", src:IMG+"dharmniti-form.jpg"}],
    q20261113_nbtc_cc: [
      {dept:"เอกสาร / อื่น ๆ", cap:"แบบฟอร์มรายละเอียดการจัดงาน กสทช. หน้า 1", src:IMG+"nbtc-cc-form-1.jpg"},
      {dept:"เอกสาร / อื่น ๆ", cap:"แบบฟอร์มรายละเอียดการจัดงาน กสทช. หน้า 2 (วิทยากร / ขนมเบรก / VIP)", src:IMG+"nbtc-cc-form-2.jpg"},
      {dept:"เอกสาร / อื่น ๆ", cap:"แบบฟอร์มรายละเอียดการจัดงาน กสทช. หน้า 3 (ทะเบียนรถ VIP)", src:IMG+"nbtc-cc-form-3.jpg"}]
  };

  const swap = (s, pairs) => pairs.reduce((t,[a,b])=>t.split(a).join(b), s);

  function patchMenus(){
    Object.keys(MENUS).forEach(k=>{
      const s=JSON.stringify(MENUS[k]);
      if(s.includes(SALMON[0])) MENUS[k]=JSON.parse(swap(s,[SALMON]));
    });
  }

  function patchFunc(id){
    const i=FUNCS.findIndex(x=>x.id===id);
    if(i<0) return false;
    const f=JSON.parse(swap(JSON.stringify(FUNCS[i]), FIX[id]));
    ADD.filter(a=>a[0]===id).forEach(([,dn,txt])=>{
      const d=(f.depts||[]).find(z=>z.n===dn);
      if(d && !d.t.includes(txt)) d.t.push(txt);
    });
    if(DEP_NOTE[id] && f.dep && !String(f.dep.when||"").includes(DEP_NOTE[id])) f.dep.when=(f.dep.when||"")+DEP_NOTE[id];
    FUNCS[i]=f;

    const st=state[id] || (state[id]={menu:f.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]});
    if(st.menuOverrides) st.menuOverrides=JSON.parse(swap(JSON.stringify(st.menuOverrides), FIX[id]));
    st.photos=st.photos||[];
    (PHOTOS[id]||[]).forEach((p,k)=>{
      if(!st.photos.some(q=>q.src===p.src)) st.photos.push({...p, id:id+"_f"+k});
    });
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
    catch(e){ console.error("[Banquet-Event] patch Kino/Dharmniti/NBTC failed:", e); }
  }, 3000);
})();
