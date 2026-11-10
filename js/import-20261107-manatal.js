/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 11/11 บริษัท มานาตัล จำกัด — Manatal Party 2026 · 7 พ.ย. 2569
     (FINAL FUNCTION 28/10/2026 + ใบแก้ไข 6/11/2026 การันตี 50 → 61, set up 60 → 70)
   ============================================================= */
(function(){
  const MARK = "import_20261107_manatal";
  const IMG = "img/20261107/";
  const MENU = "บุฟเฟ่ต์เมนู A Kontent Space (7 พ.ย. 69 · Manatal)";

  const MENUS_NEW = {
    [MENU]:[{g:"BUFFET MENU A – Manatal 7/11/26", fixed:[
      "Bread Corner: ขนมปังต่าง ๆ",
      "ซุป: ต้มแซ่บซี่โครงหมู · ซุปเห็ดทรัฟเฟิล-ครัวซองต์",
      "Appetizer: มันฝรั่งทอด · หอยจ๊อ · เกี๊ยวกรอบไส้หมู · ปอเปี๊ยะทอด",
      "Appetizer: ลาบไก่ · ยำวุ้นเส้น · พิซซ่าหน้าไส้กรอกรวม / หน้าผักรวม · กุ้งค็อกเทล + ซอสค็อกเทล",
      "Salad Bar + มิกซ์สลัด 2 รายการ · Dressing: เธาซันไอแลนด์ / ฝรั่งเศส / อิตาลี / น้ำส้มหมัก / ซอสหวาน / ซีซาร์",
      "Hot Dish: อกไก่ราดมัชรูมซอส · ปลากะพงทอดกับทาร์ทาร์ซอส",
      "Hot Dish: แกงมัสมั่นไก่ · ถั่วหวานผัดปลาหมึก · ข้าวผัด · บะหมี่ฮกเกี้ยน",
      "Pasta: ผัดมักกะโรนีกุ้ง · สปาเก็ตตี้ ซอสคาโบนาร่า / มารินาร่า + ขนมปังเนยกระเทียม",
      "Premium Station: Cutting — หมูอบย่าง พายปลา ผักสามสี มันอบชีส · ซอสแอปเปิ้ล / ซอสทาร์ทาร์",
      "Demon: ผัดไทยกุ้งตะกาด · ก๋วยเตี๋ยวเย็นตาโฟ และ ก๋วยเตี๋ยวต้มยำลูกชิ้นปลาไข่หวาน",
      "Japanese: บะหมี่เย็น-เทมปุระ · ปูอัด / ไข่หวาน / ปลาดิบ (จานรวม) · Maki 4 ไส้ · Nigiri 4 หน้า · ซุปเต้าเจี้ยว · ข้าวแกงกะหรี่ + ทงคัตสึ",
      "ของหวาน: เค้กต่าง ๆ · ผลไม้ตามฤดูกาล · ขนมไทยชิ้น · ไอศกรีม · ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน (3): บัวลอยเผือก · เต้าทึงเย็น · กล้วยบวชชี"
    ]}]
  };

  const EV = {
    id:"q20261107_manatal", hotel:"BY", no:"11/11", doc:"Final", status:"ยืนยันแล้ว", kind:"งานเลี้ยงบริษัท",
    title:"Manatal Party 2026",
    company:"บริษัท มานาตัล จำกัด",
    contact:"คุณรวินท์พร อมรพรวิวัฒน์", phone:"090-0695444", email:"",
    onsite:"", diet:"", ver:2, miles:{}, created:"2026-10-28", updAt:"6 พ.ย. 2569 (ใบแก้ไข · เพิ่มการันตี)",
    taxId:"0105560097348",
    address:"26/51, 26/56-58 อาคารอรกานต์ ชั้น 14 และ 16 ซอยชิดลม ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    unit:"ท่าน", guarantee:61, setup:70, style:"Round", mode:"meal", price:900,
    days:[
      {d:"2026-11-07", time:"18.00 – 00.00 น.", room:"Kontent Space", set:"Round โต๊ะกลม 8 โต๊ะ ๆ ละ 8 ท่าน (ชั้น 19) · การันตี 61 set up 70 (เดิม 50 / 60)", menu:MENU,
       note:"18.30 บุฟเฟ่ต์เมนู A รวม Soft drink · เบียร์สดสิงห์ 3 ถัง · คาราโอเกะ · ค่าล่วงเวลา 1 ชม. · ธีมสีสดหลากหลาย"}
    ],
    rev:[{n:"Buffet Dinner รวม Soft drink (Kontent Space ชั้น 19)", price:900, qty:61, times:1},
         {n:"เบียร์สดสิงห์ (ถัง)", price:8500, qty:3, times:1},
         {n:"คาราโอเกะ", price:3000, qty:1, times:1},
         {n:"ค่าล่วงเวลา 1 ชั่วโมง", price:10000, qty:1, times:1}],
    dep:{amt:25050, when:"มัดจำแล้ว ใบเสร็จ AJ260925034 · ส่วนที่เหลือชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"},
    pays:[{d:"—", amt:25050, note:"มัดจำ — ใบเสร็จ AJ260925034"}],
    prog:[["18:00","เปิดงาน / ลงทะเบียน"],["18:30","บุฟเฟ่ต์มื้อค่ำ เมนู A"],["23:00","ล่วงเวลา 1 ชั่วโมง"],["00:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: โลโก้ Manatal · Manatal Party 2026 · 7 NOVEMBER 2026 BAIYOKE SKY HOTEL",
        "จัดทำข้อความเวที และซุ้มถ่ายรูป (ธีมสีสดหลากหลาย)",
        "PR ป้าย Welcome: Manatal Party 2026 · 7 November 2026 Time 18.00–00.00 hrs · At Kontent Space, 19 Floor Baiyoke Sky Hotel",
        "รบกวน PR จัดทำป้ายบอกทาง (ธีมสีสดหลากหลาย)"]},
      {n:"F&B Office", who:"", t:["จัดเตรียมป้ายเมนูอาหาร (รายการตามแนบ)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะกลม 8 โต๊ะ ๆ ละ 8 ท่าน (การันตีเพิ่มเป็น 61 set up 70)",
        "ซุ้มถ่ายรูป ซ้ายมือทางเข้า",
        "โต๊ะลงทะเบียนในห้อง ขวามือทางเข้า",
        "ไลน์อาหารในห้อง",
        "เครื่องสแกนบัตร"]},
      {n:"บาร์", who:"", t:["เครื่องดื่ม Soft Drink เสิร์ฟตลอดงาน","เบียร์สดสิงห์ 3 ถัง"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "Notebook + จอ LED screen",
        "อุปกรณ์แสง สี เสียง",
        "ช่าง Stand by ตลอดงาน",
        "คาราโอเกะ",
        "ไมค์ลอย 3 ตัว"]},
      {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "18.30 น. อาหารบุฟเฟ่ต์พร้อมเสิร์ฟ — บุฟเฟ่ต์เมนูจัดเลี้ยง A (รายการตามแนบ)",
        "การันตีเพิ่มจาก 50 เป็น 61 ท่าน (ใบแก้ไข 6/11)"]},
      {n:"แม่บ้าน", who:"คุณโสภา · สีสดหลากสี", t:[
        "Stand Flower ดอกไม้บนเวที",
        "แจกันบนโต๊ะรับประทานอาหาร จำนวน 8 โต๊ะ",
        "ดอกไม้ตกแต่งซุ้มถ่ายรูป"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถชั้น 6A จำนวน 9 คัน ตั้งป้าย \"บริษัท มานาตัล จำกัด\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณวิระดา / คุณจีรวรรณ", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "จัดเตรียมคูปองชมวิว จำนวน 50 ใบ"]}
    ],
    sales:"MAHADEE", event:"PORNTIP", approve:"NOPPADON", seed:"",
    adj:[{date:"6 พ.ย. 2569", topic:"ขอเพิ่มจำนวนการันตี", ver:2, by:"มาฮาดี อีแต",
          cc:"Account / Banquet / ครัว 80 / Bakery / Fruit Court / Steward / F&B / ครัว 15",
          from:["การันตี 50 ท่าน Set up 60 ท่าน"], to:["การันตี 61 ท่าน Set up 70 ท่าน"]}]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 11/11 (FINAL FUNCTION 28/10/2026)", src:IMG+"manatal-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบแก้ไข 6 พ.ย. 2569 — การันตี 50 → 61 ท่าน, Set up 60 → 70", src:IMG+"manatal-adjustment.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 83,500 บาท (คิดที่ 50 ท่าน) · มัดจำ 25,050", src:IMG+"manatal-revenue.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู A หน้า 1", src:IMG+"manatal-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู A หน้า 2", src:IMG+"manatal-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"บุฟเฟ่ต์เมนู A หน้า 3", src:IMG+"manatal-menu-3.jpg"}
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
    console.info("[Banquet-Event] imported 11/11 Manatal");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Manatal failed:", e); }
  }, 2500);
})();
