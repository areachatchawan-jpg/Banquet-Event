/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 13/11 มหาวิทยาลัยสวนดุสิต คณะโรงเรียนการท่องเที่ยวและการบริการ
     Byenior 66 Entrepreneurship in Hospitality and Tourism business · 6 พ.ย. 2569 (FINAL FUNCTION 2/11/2026)
   ข้อมูลจาก BEO + Buffet Menu A (ไฮไลต์รายการที่เลือก) (img/20261106/sdu-*)
   ============================================================= */
(function(){
  const MARK = "import_20261106_sdu";
  const IMG = "img/20261106/";
  const MENU = "บุฟเฟ่ต์จัดเลี้ยง A (6 พ.ย. 69 · ม.สวนดุสิต Byenior 66)";

  const MENUS_NEW = {
    [MENU]:[{g:"Buffet Menu A – Event 6.11.2026 (ม.สวนดุสิต)", fixed:[
      "Bread Corner: ขนมปังต่าง ๆ",
      "ซุป: ต้มแซ่บซี่โครงหมู · ซุปเห็ดทรัฟเฟิล - ครัวซองต์",
      "Appetizer: มันฝรั่งทอด · หอยจ๊อ · เกี๊ยวกรอบไส้หมู · ปอเปี๊ยะทอด · ลาบไก่ · ยำวุ้นเส้น · พิซซ่าหน้าไส้กรอกรวม / พิซซ่าหน้าผักรวม · กุ้งค็อกเทล + ซอสค็อกเทล",
      "Salad Bar: ผักสลัด มะเขือเทศเชอร์รี่ แตงกวา หอมใหญ่ แครอท ข้าวโพดต้ม ถั่วลันเตาต้ม ลูกเดือยต้ม · มิกซ์สลัด 2 รายการ · Dressing: เธาซันไอแลนด์ / ฝรั่งเศส / อิตาลี / น้ำส้มหมัก / ซอสหวาน / ซีซ่าร์",
      "Hot Dish: อกไก่ราดมัชรูมซอส · ปลากะพงทอดกับทาทาร์ซอส · สตูว์ไก่แบบไทย (ไก่ชิ้นใหญ่) · พะแนงหมูตุ๋น · ข้าวผัด · บะหมี่ฮกเกี้ยน",
      "Pasta: ผัดมักกะโรนีกุ้ง · สปาเก็ตตี้ ซอสคาโบนาร่า / มารินาร่าซีฟู้ด + ขนมปังเนยกระเทียม",
      "Premium Station: ซุ้มข้าวหน้าล้น — ข้าวคลุกน้ำปลาทะเลปลาแกะ · ข้าวแซลมอนไข่ดอง · ข้าวไข่ข้นกุ้งกระเทียมพริกขี้หนู",
      "Demon: ผัดไทยกุ้งตะกาด · ก๋วยเตี๋ยวเย็นตาโฟ · ก๋วยเตี๋ยวต้มยำลูกชิ้นปลาไข่หวาน",
      "Japanese: บะหมี่เย็น-เทมปุระ · ปูอัด / ไข่หวาน / ปลาดิบ (จานรวม) · Maki 4 ไส้ · Nigiri 4 หน้า · ซุปเต้าเจี้ยว · ข้าวแกงกะหรี่ + ทงคัตสึ",
      "ของหวาน: เค้กต่าง ๆ · ผลไม้ตามฤดูกาล · ขนมไทยชิ้น · ไอศกรีม · ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน (3): ครองแครงแก้ว · เต้าทึงเย็น · กล้วยบวชชี",
      "เครื่องดื่ม: Soft Drink เสิร์ฟตลอดงาน"
    ]}]
  };

  const EV = {
    id:"q20261106_sdu", hotel:"BY", no:"13/11", doc:"Final", status:"ยืนยันแล้ว", kind:"อื่น ๆ",
    title:"Byenior 66 Entrepreneurship in Hospitality and Tourism business",
    company:"มหาวิทยาลัยสวนดุสิต คณะโรงเรียนการท่องเที่ยวและการบริการ สาขาผู้ประกอบการธุรกิจบริการและการท่องเที่ยว",
    contact:"คุณกมล", phone:"082-3926691", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-02", updAt:"2 พ.ย. 2569 (FINAL FUNCTION)",
    taxId:"", address:"",
    unit:"ท่าน", guarantee:130, setup:140, style:"โต๊ะกลม", mode:"meal", price:750,
    days:[
      {d:"2026-11-06", time:"17.30 – 22.30 น.", room:"Kontent Space", set:"Round โต๊ะกลม 15 โต๊ะ ๆ ละ 10 ท่าน (VIP คุณครู 1 โต๊ะ) · ชั้น 19 · 130 ท่าน set up 140 · ไลน์บุฟเฟ่ต์ในห้อง · ซุ้มถ่ายรูปบล็อกไม้ บล็อกกลม", menu:MENU,
       note:"บุฟเฟ่ต์มื้อค่ำ 19.00 น. (ไฟล์ Excel ระบุ 19.00 · รูป BEO ระบุ 11.00 — ยืนยันกับครัว) · ธีมคัลเลอร์ฟูล หลากหลายสี · คูปองชมวิว 130 ใบ · VIP คุณครู 1 โต๊ะ"}
    ],
    rev:[{n:"บุฟเฟ่ต์มื้อค่ำ รวม Soft drink (Kontent Space ชั้น 19)", price:750, qty:130, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["17:30","ลงทะเบียน / เริ่มงาน"],["19:00","บุฟเฟ่ต์มื้อค่ำ (บุฟเฟ่ต์จัดเลี้ยง A)"],["22:30","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟท์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: Byenior 66 Entrepreneurship in Hospitality and Tourism business · 6 November 2026 · Baiyoke Sky Hotel",
        "ซุ้มถ่ายรูป 1 ซุ้ม พร้อมข้อความ · ธีมคัลเลอร์ฟูล หลากหลายสี",
        "ป้ายต้อนรับ: ยินดีต้อนรับผู้เข้าร่วมงาน · Byenior 66 Entrepreneurship in Hospitality and Tourism business · 6 November 2026 Time 17.30 – 22.30 · @ Kontent Space Fl 19",
        "รบกวน PR จัดทำป้ายบอกทาง (ธีมคัลเลอร์ฟูล หลากหลายสี)"]},
      {n:"F&B Office", who:"", t:["จัดเตรียมป้ายเมนูอาหาร (รายการตามแนบ — บุฟเฟ่ต์จัดเลี้ยง A)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะกลม 15 โต๊ะ (โต๊ะละ 10 ท่าน) · VIP คุณครู 1 โต๊ะ",
        "ไลน์อาหารบุฟเฟ่ต์ในห้อง",
        "ซุ้มถ่ายรูปบล็อกไม้ บล็อกกลม",
        "โต๊ะลงทะเบียนในห้อง",
        "เครื่องสแกนบัตรจอดรถพร้อมพนักงานดูแล"]},
      {n:"บาร์", who:"", t:["เครื่องดื่ม Soft Drink เสิร์ฟตลอดงาน"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "LED Projector + Notebook + จอ Screen",
        "อุปกรณ์แสง สี เสียง",
        "ช่าง Stand by ตลอดงาน",
        "โต๊ะ Control ไฟและเครื่องเสียงหน้าห้องช่าง"]},
      {n:"ครัว / เบเกอรี่", who:"บุฟเฟ่ต์จัดเลี้ยง คุณรวีวรรณ / คุณผุสดี", t:[
        "19.00 น. บุฟเฟ่ต์มื้อค่ำพร้อมเสิร์ฟ — บุฟเฟ่ต์เมนูจัดเลี้ยง A (รายการตามแนบ) ** รูป BEO พิมพ์ 11.00 น. ยืนยันเวลา **",
        "ซุป: ต้มแซ่บซี่โครงหมู · ซุปเห็ดทรัฟเฟิล-ครัวซองต์ · Hot: สตูว์ไก่แบบไทย (ไก่ชิ้นใหญ่) · พะแนงหมูตุ๋น",
        "Premium: ซุ้มข้าวหน้าล้น · Demon: ผัดไทยกุ้งตะกาด / ก๋วยเตี๋ยวเย็นตาโฟ / ต้มยำลูกชิ้นปลาไข่หวาน",
        "ขนมไทยหม้อร้อน: ครองแครงแก้ว · เต้าทึงเย็น · กล้วยบวชชี",
        "จัดอาหาร VIP คุณครู 1 โต๊ะ"]},
      {n:"แม่บ้าน", who:"คุณโสภา · ธีมคัลเลอร์ฟูล หลากหลายสี", t:[
        "Stand Flower บนเวที 1 คู่",
        "ดอกไม้ที่โต๊ะลงทะเบียน",
        "ดอกไม้ที่โต๊ะรับประทานอาหาร 15 โต๊ะ",
        "ดอกไม้ที่ซุ้มถ่ายรูป บล็อกไม้ บล็อกกลม"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถชั้น 7 ตั้งป้าย \"มหาวิทยาลัยสวนดุสิต\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณวิระดา / คุณจิรวรรณ", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "จัดทำคูปองชมวิว 130 ใบ"]}
    ],
    sales:"PONGPAT", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 13/11 (FINAL FUNCTION 2/11/2026)", src:IMG+"sdu-beo.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu A – Event 6.11.2026 หน้า 1", src:IMG+"sdu-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu A – Event 6.11.2026 หน้า 2", src:IMG+"sdu-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu A – Event 6.11.2026 หน้า 3", src:IMG+"sdu-menu-3.jpg"}
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
        const {error}=await sb.from(T_FUNC).upsert({ id:EV.id, data:{ f:EV, st:packState(EV.id) }, updated_at:now });
        if(error){ delete state[EV.id]; throw error; }
        FUNCS.push(EV);
        lastHash[EV.id]=snapFunc(EV);
        FUNCS.sort((a,b)=> a.days[0].d===b.days[0].d ? (a.no<b.no?-1:1) : (a.days[0].d<b.days[0].d?-1:1));
      }
      const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:[EV.id] }, updated_at:now });
      if(error) throw error;
    } finally { syncBusy=false; }

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] imported 13/11 SDU");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import SDU failed:", e); }
  }, 2500);
})();
