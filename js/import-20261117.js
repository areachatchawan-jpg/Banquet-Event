/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 17/11 บริษัท ปิ่นทองกรุ๊ป แมนเนจเม้นท์ แอนด์ คอนซัลแตนท์ — 17–18 พ.ย. 2569 (UPDATE FUNCTION 5/11/2026)
   ข้อมูลจาก BEO + คาดการณ์รายได้ + ข้อความ Backdrop + โลโก้ (img/20261117/)
   ============================================================= */
(function(){
  const MARK = "import_20261117_pinthong";
  const IMG = "img/20261117/";
  const MENU = "บุฟเฟ่ต์กลางวัน Crystal Grill ชั้น 82";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261117_pinthong", hotel:"BY", no:"17/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"Safety Officer at Management Level (English) — 2 วัน",
    company:"บริษัท ปิ่นทองกรุ๊ป แมนเนจเม้นท์ แอนด์ คอนซัลแตนท์ จำกัด (Pinthong Group)",
    contact:"คุณกนกวรรณ (ลูกจันทร์)", phone:"064-1939395", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-05", updAt:"5 พ.ย. 2569 (UPDATE FUNCTION)",
    taxId:"0105541000644",
    address:"เลขที่ 27 ถนนพระราม 2 แขวงท่าข้าม เขตบางขุนเทียน กรุงเทพมหานคร 10150",
    unit:"ท่าน", guarantee:10, setup:15, style:"Classroom", mode:"meal", price:1000,
    days:[
      {d:"2026-11-17", time:"08.00 – 17.00 น.", room:"Meeting Room 1 ชั้น 69", set:"Classroom 15 ที่นั่ง · 10 ท่าน set up 15", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ เจ้าหน้าที่ · ว่างเช้า 10.30 แซนด์วิชไก่ เอแคลร์ · ว่างบ่าย 14.30 กะหรี่พัฟไก่ เดนิชอัลมอนด์ · ไลน์เบรค Foyer ด้านหลัง"},
      {d:"2026-11-17", time:"11.00 – 13.00 น.", room:"Crystal Grill ชั้น 82", set:"Lunch 10 ท่าน set up 15 · Booking No 261102106", menu:MENU,
       note:"ห้องอาหาร Crystal Grill · Event ตั้งป้ายโต๊ะบนห้องอาหาร"},
      {d:"2026-11-18", time:"08.00 – 17.00 น.", room:"Meeting Room 1 ชั้น 69", set:"Classroom 15 ที่นั่ง · 10 ท่าน set up 15", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ เจ้าหน้าที่ · ว่างเช้า 10.30 พัฟไก่ ท็อฟฟี่เค้ก · ว่างบ่าย 14.30 พัฟทูน่า แยมโรลช็อกโกแลต"},
      {d:"2026-11-18", time:"11.00 – 13.00 น.", room:"Crystal Grill ชั้น 82", set:"Lunch 10 ท่าน set up 15 · Booking No 261102107", menu:MENU,
       note:"ห้องอาหาร Crystal Grill · Event ตั้งป้ายโต๊ะบนห้องอาหาร"}
    ],
    rev:[{n:"อาหารว่างเช้า × 2 วัน", price:150, qty:10, times:2},
         {n:"อาหารกลางวัน Crystal Grill ชั้น 82 × 2 วัน", price:700, qty:10, times:2},
         {n:"อาหารว่างบ่าย × 2 วัน", price:150, qty:10, times:2}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["07:00","น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่"],["08:00","เริ่มอบรม"],["10:30","อาหารว่างเช้า"],
          ["11:00","อาหารกลางวัน Crystal Grill ชั้น 82"],["14:30","อาหารว่างบ่าย"],["17:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "ติดตั้งป้ายบอกทางที่ชั้น 1 / ลิฟท์ลานจอด และหน้าห้องจัดงาน",
        "Backdrop: โลโก้ P.M.C. Pinthong Group · PINTHONG GROUP MANAGEMENT AND CONSULTANTS CO.,LTD · Safety Officer at Management Level (English) · Nov 17–18, 2026 · Baiyoke Sky Hotel",
        "จัดทำข้อความเวที (ติดตั้งหน้ากระจก ตรงข้ามห้อง)",
        "ป้าย WELCOME: NOV 17–18, 2026 TIME 08.00–17.00 HRS. AT MEETING ROOM 1, 69TH FLOOR, BAIYOKE SKY HOTEL",
        "รบกวน PR ทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:[
        "จัดเตรียมที่นั่งบนห้องอาหาร",
        "17/11/2026 ห้องอาหาร Crystal Grill ชั้น 82 Booking No 261102106",
        "18/11/2026 ห้องอาหาร Crystal Grill ชั้น 82 Booking No 261102107"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่งแบบ Classroom จำนวน 15 ที่นั่ง",
        "โต๊ะลงทะเบียนหน้าห้อง",
        "โต๊ะวิทยากรด้านหน้าเวที",
        "ไลน์เบรคตรง Foyer ด้านหลัง",
        "เครื่องแสกนบัตรจอดรถ"]},
      {n:"บาร์", who:"คุณวิรัตน์", t:["น้ำดื่มแบบขวดตลอดงานประชุม","เครื่องกดเครื่องกดกาแฟ, ชา"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "Notebook + LCD Projector + จอ Screen",
        "ไมค์ลอย 2 ตัว",
        "ปลั๊กพ่วง 3 ชุด",
        "เจ้าหน้าที่ Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"คุณปฐมกฤษณ์ · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณสุภาพ", t:[
        "07.00 น. น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่",
        "10.30 น. ว่างเช้า 17/11: แซนด์วิชไก่, เอแคลร์ · 18/11: พัฟไก่, ท็อฟฟี่เค้ก",
        "11.00 น. อาหารกลางวัน Crystal Grill ชั้น 82 (17–18/11)",
        "14.30 น. ว่างบ่าย 17/11: กะหรี่พัฟไก่, เดนิชอัลมอนด์ · 18/11: พัฟทูน่า, แยมโรลช็อกโกแลต"]},
      {n:"แม่บ้าน", who:"คุณโสภา · โทน (-)", t:["ดอกไม้โต๊ะลงทะเบียน / โต๊ะวิทยากร / โต๊ะเบรค"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถชั้น 6 ตั้งป้ายว่า \"PINTHONG GROUP\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ / คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "ป้ายตั้งโต๊ะบนห้องอาหาร"]}
    ],
    sales:"MAHADEE", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 17/11 (UPDATE FUNCTION 5/11/2026)", src:IMG+"pinthong-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 20,000 บาท", src:IMG+"pinthong-revenue.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"ข้อความ Backdrop / ป้าย", src:IMG+"pinthong-backdrop.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โลโก้ P.M.C. Pinthong Group", src:IMG+"pinthong-logo.jpg"}
  ];

  function ensureMenus(){
    let added=false;
    for(const [k,v] of Object.entries(MENUS_NEW)) if(!MENUS[k]){ MENUS[k]=v; added=true; }
    if(added && typeof rebuildMenuOrder==="function") rebuildMenuOrder();
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    ensureMenus();
    if(m.data) return true;

    syncBusy=true;
    try{
      const now=new Date().toISOString();
      if(!FUNCS.some(y=>y.id===EV.id)){
        state[EV.id]={ menu:EV.days.map(d=>initSel(d.menu)), done:new Set(), menuOverrides:{},
                       photos:PHOTOS.map((p,i)=>({...p, id:EV.id+"_i"+i})) };
        const payload={ f:EV, st:packState(EV.id) };
        const {error}=await sb.from(T_FUNC).upsert({ id:EV.id, data:payload, updated_at:now });
        if(error){ delete state[EV.id]; throw error; }
        FUNCS.push(EV);
        lastHash[EV.id]=snapFunc(EV);
        FUNCS.sort((a,b)=> a.days[0].d===b.days[0].d ? (a.no<b.no?-1:1) : (a.days[0].d<b.days[0].d?-1:1));
      }
      const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:[EV.id] }, updated_at:now });
      if(error) throw error;
    } finally { syncBusy=false; }

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] imported 17/11 Pinthong");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Pinthong failed:", e); }
  }, 2500);
})();
