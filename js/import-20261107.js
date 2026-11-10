/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 15/11 บริษัท มัลคา-อามิท (ประเทศไทย) — Staff Party 2026 "Retro Rewind" 7 พ.ย. 2569
     (UPDATE FUNCTION 3/11/2026 + ใบแก้ไข 6/11/2026 การันตี 350 → 400)
   ============================================================= */
(function(){
  const MARK = "import_20261107_malca";
  const IMG = "img/20261107/";
  const MENU = "บุฟเฟ่ต์เมนู B Rainbow Hall (7 พ.ย. 69 · Malca-Amit)";

  const MENUS_NEW = {
    [MENU]:[{g:"BUFFET MENU B (100 ท่านขึ้นไป) – Malca-Amit 7/11/26", fixed:[
      "Bread Corner: ขนมปังต่าง ๆ",
      "ซุป (2): กระเพาะปลา · ซุปเห็ดทรัฟเฟิล-ครัวซองต์",
      "Appetizer: มันฝรั่งทอด · หอยจ๊อ · ปอเปี๊ยะทอด · ลาบไก่",
      "Appetizer: ยำวุ้นเส้นทะเล หมูยอ · พิซซ่าหน้าไส้กรอกรวม · กุ้งค็อกเทล + ซอสค็อกเทล",
      "Salad Bar + สลัดรวม 2 รายการ · Dressing: เธาซันไอแลนด์ / ฝรั่งเศส / อิตาลี / น้ำส้มหมัก / ซอสหวาน / ซีซาร์",
      "Hot Dish: ปลากะพงทอดราดซอสเลมอนแคปเปอร์ · หมูอบราดมัชรูมซอส · อกไก่อบราดฮันนี่มัสตาร์ด · กุ้งพริกเกลือ",
      "อาหารไทย (2): สตูว์ไก่แบบไทย · พะแนงหมูตุ๋น",
      "ทะเลรวมผัดผงกะหรี่ หรือ ผัดฉ่าทะเล (ไม่ได้ระบุ) · ข้าวผัดคะน้าปลาเค็ม หรือ ข้าวผัดหยางโจว (ไม่ได้ระบุ) · บะหมี่ฮกเกี้ยน",
      "Pasta: ผัดมักกะโรนี · สปาเก็ตตี้ ซอสคาโบนาร่า / มารินาร่า + ขนมปังเนยกระเทียม",
      "ซุ้มขนมจีน (2): น้ำยากะทิ · แกงเขียวหวานลูกชิ้นปลากราย",
      "ซุ้มน้ำพริก (2): น้ำพริกกะปิ · น้ำพริกอ่อง",
      "Premium Station: ซุ้มอาหารทะเล — กุ้งแม่น้ำย่าง กุ้งขาวเกษตรลวก ปลาหมึกย่าง หอยแมลงภู่ลวก",
      "และซุ้มข้าวหน้าล้น: ข้าวคลุกน้ำปลาทะเลปลาแกะ · ข้าวแซลมอนไข่ดอง · ข้าวไข่ข้นกุ้งกระเทียมพริกขี้หนูสด",
      "Demon: ผัดไทยกุ้งกรอบ · ก๋วยเตี๋ยวชาบูน้ำตกหมู / เนื้อ",
      "Japanese: บะหมี่เย็น-เทมปุระรวม · ปูอัด / ไข่หวาน / ปลาดิบ (จานรวม) · Maki 4 ไส้ · Nigiri 4 หน้า · ซุปเต้าเจี้ยว · ข้าวแกงกะหรี่ + ทงคัตสึ",
      "ของหวาน: เค้กต่าง ๆ · ผลไม้ตามฤดูกาล · ขนมไทยชิ้น · ข้าวเหนียวมะม่วงทรงเครื่อง · ไอศกรีม · ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน (3): บัวลอยเผือก · กล้วยบวชชี · ปลากริม",
      "22.00 น. Food Stall: บะหมี่เกี๊ยว / หมูแดง · ข้าวต้มหมู (ซุ้มละ 50 ท่าน)"
    ]}]
  };

  const EV = {
    id:"q20261107_malca", hotel:"BY", no:"15/11", doc:"Final", status:"ยืนยันแล้ว", kind:"งานเลี้ยงบริษัท",
    title:"Staff Party 2026 \"Retro Rewind\" — Malca-Amit × ILT",
    company:"บริษัท มัลคา-อามิท (ประเทศไทย) จำกัด",
    contact:"คุณเบบี้", phone:"", email:"",
    onsite:"", diet:"", ver:2, miles:{}, created:"2026-11-03", updAt:"6 พ.ย. 2569 (ใบแก้ไข · เพิ่มการันตี)",
    taxId:"0105531048776",
    address:"919/6 อาคารจิวเวลรี่เทรดเซ็นเตอร์ ชั้นที่ 5 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    unit:"ท่าน", guarantee:400, setup:410, style:"Round table", mode:"meal", price:850,
    days:[
      {d:"2026-11-07", time:"17.30 – 00.00 น.", room:"Rainbow Hall", set:"Round table 39 โต๊ะ โต๊ะละ 10 + ห้อง VIP 2 โต๊ะ โต๊ะละ 8 (ชั้น 17) · การันตี 400 ท่าน (เดิม 350 set up 360)", menu:MENU,
       note:"ลูกค้าเข้า Set Up 6.11.2026 เวลา 22.30 น. · 14.00 น. จุด Check in ห้องพัก หน้าห้องสกายรูม · 18.00 บุฟเฟ่ต์เมนู B รวม Soft drink · 22.00 ซุ้มบะหมี่เกี๊ยว/หมูแดง + ซุ้มข้าวต้มหมู · ลูกค้านำเหล้า-เบียร์ + บูธเบียร์ 2 บูธเข้ามาเอง"}
    ],
    rev:[{n:"Buffet Dinner นานาชาติ รวม Soft drink (Rainbow Hall 17)", price:850, qty:400, times:1},
         {n:"ซุ้มบะหมี่เกี๊ยว-หมูแดง (สำหรับ 50 ท่าน)", price:8000, qty:1, times:1},
         {n:"ซุ้มข้าวต้มหมู (สำหรับ 50 ท่าน)", price:5000, qty:1, times:1}],
    dep:{amt:50000, when:"มัดจำแล้ว ใบเสร็จ AJ260915024 · ส่วนที่เหลือชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"},
    pays:[{d:"15/09/2026", amt:50000, note:"มัดจำ เงินโอน — ใบเสร็จ AJ260915024"}],
    prog:[["14:00","จุด Check in ห้องพัก หน้าห้องสกายรูม"],["17:30","เปิดห้อง / ลงทะเบียน"],["18:00","บุฟเฟ่ต์มื้อค่ำ เมนู B"],
          ["22:00","ซุ้มบะหมี่เกี๊ยว/หมูแดง + ซุ้มข้าวต้มหมู"],["00:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: MALCA-AMIT | ILT · STAFF PARTY 2026 · 7.11.2026 · RETRO Rewind (ตามรูปแนบ)",
        "PR ป้าย WELCOME: 7 NOVEMBER 2026 TIME 18.00–00.00 HRS. AT RAINBOW HALL, 17TH FLOOR BAIYOKE SKY HOTEL",
        "จัดทำป้ายบอกทาง (ป้าย 17th Floor ตามรูปแนบ)"]},
      {n:"F&B Office", who:"", t:["จัดเตรียมป้ายเมนูอาหาร"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะกลมรับประทานอาหาร จำนวน 39 โต๊ะ ๆ ละ 10 ที่นั่ง (VIP ....... โต๊ะ) — การันตีเพิ่มเป็น 400 ท่าน",
        "ลูกค้านำเข้าเวที · โต๊ะวางของข้างเวที",
        "โต๊ะคอนโทรลเครื่องเสียงข้างเวที",
        "โต๊ะคอนโทรลระบบไฟหลังห้อง",
        "โต๊ะลงทะเบียนตรงข้ามบันไดเลื่อน",
        "โต๊ะหน้าห้องสกายรูม จุด Check in ห้องพัก เวลา 14.00 น.",
        "บล็อกไม้ 6 บล็อก สำหรับซุ้มถ่ายภาพ (ลูกค้าตกแต่งเอง)",
        "ห้อง VIP โต๊ะกลม 2 โต๊ะ ๆ ละ 8 ที่นั่ง",
        "ไลน์อาหารบริเวณ Foyer",
        "ลูกค้านำเข้าบูธเบียร์ ตั้งที่ Foyer จำนวน 2 บูธ",
        "ลูกค้าเข้ามา Set Up วันที่ 6.11.2026 เวลา 22.30 น.",
        "** ใบแก้ไข 6/11 เพิ่มการันตีเป็น 400 แต่ไม่ระบุ set up (ในระบบใส่ 410) — ยืนยันกับ Sales **"]},
      {n:"บาร์", who:"คุณวิรัตน์", t:[
        "เครื่องดื่ม Soft Drink เสิร์ฟตลอดงาน",
        "ลูกค้านำเข้าเครื่องดื่มเหล้า-เบียร์",
        "บูธเบียร์ 2 บูธ อยู่ที่ Foyer (ตามแปลน)"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED Screen + Notebook",
        "ลูกค้านำเข้าวงดนตรี พร้อมระบบแสง สี เสียง",
        "ช่าง Stand by ตลอดงาน",
        "ลูกค้าเข้ามา Set Up วันที่ 6.11.2026 เวลา 22.30 น."]},
      {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ, คุณผุสดี", t:[
        "18.00 น. อาหารมื้อค่ำแบบบุฟเฟ่ต์พร้อมเสิร์ฟ — บุฟเฟ่ต์เมนู B (รายการตามแนบ)",
        "22.00 น. ซุ้มบะหมี่เกี๊ยว / หมูแดง 2 ซุ้ม (50 ท่าน/ซุ้ม)",
        "22.00 น. ซุ้มข้าวต้มหมู 2 ซุ้ม (50 ท่าน/ซุ้ม)",
        "การันตีเพิ่มจาก 350 เป็น 400 ท่าน (ใบแก้ไข 6/11)",
        "** BEO ส่วนครัวระบุซุ้มบะหมี่เกี๊ยว/หมูแดง 2 ซุ้ม + ข้าวต้มหมู 2 ซุ้ม แต่ราคาและคาดการณ์รายได้ (310,500) คิดอย่างละ 1 ซุ้ม — ยืนยันจำนวนซุ้มกับ Sales **"]},
      {n:"แม่บ้าน", who:"คุณโสภา · โทนสี Colourful สีสด", t:[
        "Stand Flower บนเวที 1 คู่",
        "ดอกไม้โต๊ะรับประทานอาหาร 39 โต๊ะ (VIP ....... โต๊ะ)",
        "ดอกไม้โต๊ะลงทะเบียน"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณธนินทร์, คุณอนุชิต", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถ VIP ชั้น 6B, 7B ใกล้ลิฟท์ ทะเบียนรถ (** แจ้งตาม **)",
        "ที่จอดรถชั้น 6, 7 ตั้งป้าย \"Malca Party\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ, คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยในงาน",
        "จัดเตรียมคูปองชมวิว"]}
    ],
    sales:"PONGPAT", event:"PORNTIP", approve:"NOPPADON", seed:"",
    adj:[{date:"6 พ.ย. 2569", topic:"เพิ่มจำนวนการันตี", ver:2, by:"พงษ์พัฒน์ ผู้พัฒน์",
          cc:"Account / Banquet / ครัว 80 / Bakery / Fruit Court / Steward / F&B / ครัว 15",
          from:["การันตี 350 ท่าน"], to:["การันตี 400 ท่าน"]}]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 15/11 (UPDATE FUNCTION 3/11/2026)", src:IMG+"malca-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบแก้ไข 6 พ.ย. 2569 — การันตี 350 → 400 ท่าน", src:IMG+"malca-adjustment.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 310,500 บาท (คิดที่ 350 ท่าน)", src:IMG+"malca-revenue.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบเสร็จมัดจำ 50,000 บาท AJ260915024", src:IMG+"malca-receipt.jpg"},
    {dept:"ฝ่ายจัดเลี้ยง", cap:"แปลน Rainbow Hall: โต๊ะ 39 + VIP Room 2 โต๊ะ + Buffet line / Beer ที่ Foyer", src:IMG+"malca-floorplan.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"Backdrop Retro Rewind (แนวนอน)", src:IMG+"malca-backdrop.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โปสเตอร์ Retro Rewind (แนวตั้ง)", src:IMG+"malca-poster.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"ป้ายบอกทาง 17th Floor", src:IMG+"malca-sign-17fl.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"ป้ายแนวตั้ง (Story)", src:IMG+"malca-story.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู B หน้า 1", src:IMG+"malca-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู B หน้า 2", src:IMG+"malca-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู B หน้า 3", src:IMG+"malca-menu-3.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู B หน้า 4", src:IMG+"malca-menu-4.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Food Stall: บะหมี่เกี๊ยว/หมูแดง 8,000 · ข้าวต้ม 5,000 (50 ท่าน/ซุ้ม)", src:IMG+"malca-food-stall.jpg"}
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
    console.info("[Banquet-Event] imported 15/11 Malca-Amit (BY)");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Malca failed:", e); }
  }, 2500);
})();
