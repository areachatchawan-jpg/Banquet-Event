/* =============================================================
   One-time import (Queensland)
   - ใบ 15/11 บริษัท คาร์แลค (ไทย-เยอรมัน) จำกัด — 18 พ.ย. 2569 (UPDATE FUNCTION 05/11/2026)
   ข้อมูลจากใบ BEO + คาดการณ์รายได้ + เมนู + แปลนห้อง + ใบเสร็จมัดจำ + ใบเสนอราคา (img/20261118/)
   ทำงานครั้งเดียว: บันทึกงานลงฐานข้อมูล แล้วเขียน marker ใน be_settings
   ============================================================= */
(function(){
  const MARK = "import_20261118_carlack";
  const IMG = "img/20261118/";
  const MENU = "บุฟเฟ่ต์กลางวัน Mum's Bistro (18 พ.ย. 69 · คาร์แลค)";

  const MENUS_NEW = {
    [MENU]:[{g:"รายการในชุดเมนู 18/11/26 (คาร์แลค)", fixed:[
      "ซุป: ต้มข่าไก่",
      "ยำ / สลัดคลุก: ยำหมูย่าง",
      "ของทอด: หอยจ๊อ, ปอเปี๊ยะ",
      "Mixed Salad: สลัดผลไม้ (เลือกมา 1 จาก 2 รายการ — รอยืนยัน)",
      "สลัดบาร์ + Dressing (เธาซันไอแลนด์ / อิตาลี / ซอสหวาน / ฝรั่งเศส / น้ำส้มหมัก)",
      "ซุ้มน้ำพริก: น้ำพริกกะปิ, น้ำพริกลงเรือ + เครื่องเคียง",
      "ข้าวสวย",
      "ผัด: ผัดบร็อคโคลี่ซอสไข่กุ้ง, ทะเลผัดฉ่า",
      "แกง: ปีกไก่ตุ๋นฟัก, แกงส้มผักรวม + กุ้ง",
      "ทอด/อบ: ** ยังไม่ได้เลือก (2 รายการ) **",
      "ไข่: ** ยังไม่ได้เลือก (1 รายการ) **",
      "ซุ้มขนมจีน: น้ำพริก + แกงเขียวหวานลูกชิ้นปลากราย",
      "ข้าวผัด: ข้าวผัดหยางโจว",
      "เส้น: ผัดไทยกุ้งสด",
      "ซุ้มก๋วยเตี๋ยว (Demon): ก๋วยเตี๋ยวชาบูหมูน้ำตก",
      "ซุ้ม Cutting: หมูย่างจิ้มแจ่ว / หมูย่างน้ำตก",
      "พิซซ่า และเฟรนช์ฟราย",
      "ซุ้มญี่ปุ่น: ข้าวห่อไส้รวม / ไข่หวาน / ปูอัด / แตง, บะหมี่เย็น-เทมปุระ",
      "ของหวาน: เค้กต่าง ๆ, ผลไม้ตามฤดูกาล, ขนมไทยชิ้น, ไอศกรีม หรือ ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน: ปลากริม"
    ]}]
  };

  const EV = {
    id:"q20261118_carlack", hotel:"QL", no:"15/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"ประชุมอบรม LIQUI MOLY — บริษัท คาร์แลค (ไทย-เยอรมัน) จำกัด",
    company:"บริษัท คาร์แลค (ไทย-เยอรมัน) จำกัด",
    contact:"คุณบอย", phone:"099-429-3555", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-05", updAt:"5 พ.ย. 2569 (UPDATE FUNCTION)",
    taxId:"0105525036737",
    address:"1506 ซอยกาญจนาภิเษก008 แขวงบางแค เขตบางแค กรุงเทพฯ 10160",
    unit:"ท่าน", guarantee:125, setup:135, style:"Classroom", mode:"meal", price:800,
    days:[
      {d:"2026-11-18", time:"08.00 – 17.00 น.", room:"Diamond Dome 1 ชั้น 22", set:"Classroom 125 ท่าน set up 135 (ตามแปลน: ผู้เข้าอบรม 126 + ทีมงานพ่อมด 4 + ทีม LIQUI MOLY 12 = 142 ที่)", menu:"ไม่มีอาหาร",
       note:"ลูกค้าเข้า SET UP 17.11.2026 เวลา 16.00 น. · ว่างเช้า 09.00 / ว่างบ่าย 14.00 (เมนู ** แจ้งตาม **) · ไลน์อาหารว่างที่ Foyer"},
      {d:"2026-11-18", time:"12.00 – 13.00 น.", room:"Mum's Bistro ชั้น 20", set:"Lunch 125 ท่าน set up 135", menu:MENU,
       note:"บุฟเฟ่ต์กลางวันตามเมนูแนบ (BEO ช่องครัวเขียน 'Mum's Bistro ชั้น 22' — ห้องอยู่ชั้น 20)"}
    ],
    rev:[{n:"อาหารว่างเช้า 150 บาท", price:150, qty:125, times:1},
         {n:"Buffet Lunch (Mum's Bistro ชั้น 20)", price:500, qty:125, times:1},
         {n:"อาหารว่างบ่าย 150 บาท", price:150, qty:125, times:1}],
    dep:{amt:27000, when:"มัดจำแล้ว ใบเสร็จ AC3-261020002 (ออกแทน AC3-261029001) · ส่วนที่เหลือวางบิล ติดต่อคุณเล็ก 084-915-1826"},
    pays:[{d:"20/10/2026", amt:27000, note:"มัดจำ โอนเงิน — ใบเสร็จ AC3-261020002 (ออกแทนเลขที่ AC3-261029001 วันที่ 29/10/2026)"}],
    prog:[["08:00","เริ่มงาน / ลงทะเบียน"],["09:00","อาหารว่างเช้าพร้อมเสิร์ฟ (Foyer)"],
          ["12:00","อาหารกลางวันบุฟเฟ่ต์ Mum's Bistro ชั้น 20"],["14:00","อาหารว่างบ่ายพร้อมเสิร์ฟ (Foyer)"],["17:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: ** แจ้งตาม ** · จัดทำไฟล์แบล็คดรอปที่เวที",
        "ป้ายต้อนรับ: ยินดีต้อนรับ (** แจ้งตาม **) · วันพุธที่ 18 พ.ย. 2569 เวลา 09.00–17.00 น. เชิญห้องไดมอนด์โดม 1 ชั้น 22",
        "รบกวน PR จัดทำป้ายบอกทาง ปริ้น 2 ชุด"]},
      {n:"F&B Office", who:"คุณวิรัตน์", t:["จัดทำป้ายเมนูอาหารบุฟเฟ่ต์ (รายการตามแนบ)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะคลาสรูม 126 ที่นั่ง + โต๊ะทีมงาน 8 โต๊ะ (ตามแปลน)",
        "กระดาษ ปากกา น้ำดื่ม หลอด บนโต๊ะประชุม",
        "โต๊ะสตูลสูงคลุมผ้า + เก้าอี้สตูล 1 ชุด บนเวที",
        "โซฟารับรอง",
        "ฟลิปชาร์ตพร้อมกระดาษ + ปากกา 1 ชุด",
        "โพเดียมใสข้างเวที 1 ตัว",
        "โต๊ะเจ้าหน้าที่ข้างเวที",
        "โต๊ะลงทะเบียนหน้าห้อง",
        "โต๊ะสังเกตุการณ์ข้างห้อง 9 ที่นั่ง",
        "ไลน์อาหารว่างที่ Foyer",
        "ที่แสตมป์บัตรจอดรถ"]},
      {n:"บาร์", who:"คุณวิรัตน์", t:["เครื่องกดกาแฟ พร้อมชา ช่วงเบรค","น้ำดื่ม ตลอดงาน"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "ไมค์ลอย 4 ตัว",
        "Notebook + LED",
        "ปลั๊กไฟ 8 ชุด",
        "จอ TV หน้าเวที",
        "Pointer",
        "ระบบแสง สี เสียง",
        "เจ้าหน้าที่ Stand by ตลอดงาน",
        "ลูกค้าเข้ามา SET UP วันที่ 17.11.2026 เวลา 16.00 น."]},
      {n:"ครัว / เบเกอรี่", who:"คุณปฐมกฤษณ์ · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "09.00 น. อาหารว่างเช้าพร้อมเสิร์ฟ (** แจ้งตาม **)",
        "12.00 น. อาหารกลางวันบุฟเฟ่ต์ ที่ Mum's Bistro (รายการอาหารตามแนบ)",
        "14.00 น. อาหารว่างบ่ายพร้อมเสิร์ฟ (** แจ้งตาม **)"]},
      {n:"แม่บ้าน", who:"คุณอังคณา / คุณโสภา · ธีมสีแดง-น้ำเงิน", t:[
        "ดอกไม้ Stand Flower บนเวที",
        "ดอกไม้โต๊ะวิทยากร, โพเดียม 1 ห้อง, โต๊ะลงทะเบียน"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณอาทิตย์", t:[
        "ที่จอดรถผู้ร่วมงาน ตั้งป้าย \"LIQUI MOLY\"",
        "ที่จอดรถ VIP ชั้น 2 ใกล้ลิฟท์ 6 คัน ทะเบียน (** แจ้งตาม **)",
        "เจ้าหน้าที่เดินตรวจความเรียบร้อยบริเวณงานเป็นระยะ",
        "ลูกค้าเข้ามา SET UP วันที่ 17.11.2026 เวลา 16.00 น."]},
      {n:"Event", who:"คุณพรทิพย์", t:["ตรวจสอบความเรียบร้อยในงาน"]}
    ],
    sales:"NATTAWUT", event:"PORNTIP", approve:"PACHARAPOL", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 15/11 (UPDATE FUNCTION 05/11/2026)", src:IMG+"carlack-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 100,000 บาท", src:IMG+"carlack-revenue.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบเสร็จมัดจำ 27,000 บาท AC3-261020002", src:IMG+"carlack-receipt.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบเสนอราคา 24/09/2026 (900 บาท/ท่าน, 100 ท่าน — ฉบับเดิม)", src:IMG+"carlack-quotation.jpg"},
    {dept:"ฝ่ายจัดเลี้ยง", cap:"แปลน DD1 Classroom 142 ที่ (ผู้เข้าอบรม 126 + พ่อมด 4 + LIQUI MOLY 12)", src:IMG+"carlack-floorplan.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ 18/11 หน้า 1", src:IMG+"carlack-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ 18/11 หน้า 2", src:IMG+"carlack-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ 18/11 หน้า 3", src:IMG+"carlack-menu-3.jpg"}
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
    console.info("[Banquet-Event] imported 15/11 Carlack");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Carlack failed:", e); }
  }, 2500);
})();
