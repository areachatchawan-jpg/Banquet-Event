/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 14/11 สมาคมนักเรียนเก่า โรงเรียนมหิดลวิทยานุสรณ์ — งานราตรีศรีตรัง ครั้งที่ 12
     "Connecting the Dots" · 14 พ.ย. 2569 (UPDATE FUNCTION 3/11/2026)
   ข้อมูลจาก BEO + แปลน Rainbow Hall + Buffet Menu (img/20261114/mwit-*)
   ============================================================= */
(function(){
  const MARK = "import_20261114_mwit";
  const IMG = "img/20261114/";
  const MENU = "บุฟเฟ่ต์นานาชาติ B (14 พ.ย. 69 · ราตรีศรีตรัง ครั้งที่ 12)";

  const MENUS_NEW = {
    [MENU]:[{g:"Buffet Menu สมาคมนักเรียนเก่า โรงเรียนมหิดลวิทยานุสรณ์ Event 14.11.2026", fixed:[
      "Bread Corner: ขนมปังต่าง ๆ",
      "ซุป (2): ต้มยำทะเล · ซุปครีมข้าวโพด",
      "Appetizer: เกี๊ยวกรอบไส้หมู · หอยจ๊อ · ปอเปี๊ยะทอด · ลาบไก่ · ยำไข่ดาว หมูยอ · พิซซ่าหน้าไส้กรอกรวม / พิซซ่าหน้าผักรวม · กุ้งค็อกเทล + ซอสค็อกเทล",
      "Salad Bar: ผักสลัด มะเขือเทศเชอร์รี่ แตงกวา หอมใหญ่ แครอท ข้าวโพดต้ม ถั่วลันเตาต้ม ลูกเดือยต้ม · สลัดรวม 2 รายการ · Dressing: เธาซันไอแลนด์ / ฝรั่งเศส / อิตาลี / น้ำส้มหมัก / ซอสหวาน / ซีซ่าร์",
      "Hot Dish: ปลากะพงทอดราดซอสเลมอนแคปเปอร์ · หมูอบราดมัชรูมซอส · อกไก่อบราดฮันนี่มัสตาด · กุ้งพริกเกลือ · สตูว์ไก่แบบไทย · พะแนงหมูตุ๋น · ทะเลรวมผัดผงกะหรี่ · ข้าวผัดหยางโจว · บะหมี่ฮกเกี้ยน",
      "Pasta: ผัดมักกะโรนี · สปาเก็ตตี้ ซอสคาโบนาร่า / มารินาร่าซีฟู้ด + ขนมปังเนยกระเทียม",
      "ซุ้มขนมจีน (2): ซาวน้ำกุ้งสับ · แกงเขียวหวานลูกชิ้นปลากราย",
      "ซุ้มน้ำพริก (2): น้ำพริกลงเรือ · น้ำพริกอ่อง",
      "Premium — Seafood Station: กุ้งแม่น้ำย่าง · กุ้งขาวเกษตรลวก · ปลาหมึกย่าง · หอยแมลงภู่ลวก + ซุ้มข้าวหน้าล้น (ข้าวคลุกน้ำปลาทะเลปลาแกะ · ข้าวแซลมอนไข่ดอง · ข้าวไข่ข้นกุ้งกระเทียมพริกขี้หนูสด)",
      "Demon: ผัดไทยกุ้งกรอบ · ก๋วยเตี๋ยวชาบูน้ำตกหมู / เนื้อ",
      "Japanese: บะหมี่เย็น-เทมปุระรวม · ปูอัด / ไข่หวาน / ปลาดิบ (จานรวม) · Maki 4 ไส้ · Nigiri 4 หน้า · ซุปเต้าเจี้ยว · ข้าวแกงกะหรี่ + ทงคัตสึ",
      "ของหวาน: เค้กต่าง ๆ · ผลไม้ตามฤดูกาล · ขนมไทยชิ้น · ข้าวเหนียวมะม่วงทรงเครื่อง · ไอศกรีม · ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน (3): บัวลอยเผือก · เต้าทึงเย็น · กล้วยบวชชี",
      "เครื่องดื่ม: Soft Drink เสิร์ฟตลอดงาน · เบียร์สด 30 ลิตร 2 ถัง (+ สำรอง 1 ถัง)"
    ]}]
  };

  const EV = {
    id:"q20261114_mwit", hotel:"BY", no:"14/11", doc:"Final", status:"ยืนยันแล้ว", kind:"อื่น ๆ",
    title:"งานราตรีศรีตรัง ครั้งที่ 12 — Connecting the Dots (The Twelfth Rātrī Sritrang)",
    company:"สมาคมนักเรียนเก่า โรงเรียนมหิดลวิทยานุสรณ์",
    contact:"คุณณัฐยา / คุณถัง", phone:"061-9414265", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-03", updAt:"3 พ.ย. 2569 (UPDATE FUNCTION)",
    taxId:"", address:"",
    unit:"ท่าน", guarantee:300, setup:310, style:"โต๊ะกลม", mode:"meal", price:900,
    days:[
      {d:"2026-11-14", time:"16.00 – 22.00 น.", room:"Rainbow Hall", set:"Round โต๊ะกลม 28 โต๊ะ ๆ ละ 10 ที่นั่ง (VIP 3 โต๊ะ) + High Table / Cocktail Zone สตูสูง 10 ตัว + เก้าอี้ 30 ตัว · ชั้น 17 · 300 ท่าน set up 310 · ไลน์บุฟเฟ่ต์ที่ Foyer · บูธ 5 บูธ · Kids Area", menu:MENU,
       note:"ลูกค้าเข้า Set Up 09.00 น. · ฟังบรรยาย 16.00–17.00 น. ก่อนเริ่มงาน · บุฟเฟ่ต์ 17.00 น. · ธีมเหลือง-น้ำเงิน · คูปองชมวิว 300 ใบ · ลูกค้านำวงดนตรี + ระบบแสงสีเสียงเข้ามาเอง"}
    ],
    rev:[{n:"บุฟเฟ่ต์มื้อค่ำนานาชาติ รวม Soft drink (Rainbow Hall)", price:900, qty:300, times:1},
         {n:"เบียร์สด 30 ลิตร (ถัง)", price:8500, qty:2, times:1}],
    dep:{amt:81000, when:"มัดจำ 81,000 บาท ตามใบเสร็จเลขที่ AJ260411021 · ส่วนที่เหลือชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["09:00","ลูกค้าเข้า Set Up (วงดนตรี / แสงสีเสียง / ตกแต่งบล็อกไม้หน้าห้อง VIP)"],
          ["16:00","ลงทะเบียน / ฟังบรรยาย (16.00–17.00 น.)"],["17:00","บุฟเฟ่ต์มื้อค่ำ + เบียร์สด"],["22:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟท์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop / ป้าย WELCOME: Connecting the Dots — The Twelfth Rātrī Sritrang · Saturday, November 14, 2026 · 16:00 Onwards · Baiyoke Sky Hotel BKK · Rainbow Hall 17th Floor (ไฟล์ตามแนบ)",
        "จัดทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:["จัดเตรียมป้ายเมนูอาหาร (Buffet Menu ตามแนบ)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะกลมรับประทานอาหาร 28 โต๊ะ ๆ ละ 10 ที่นั่ง (VIP 3 โต๊ะ หน้าเวที)",
        "โต๊ะสตูสูงด้านหลัง 10 ตัว + เก้าอี้ 30 ตัว (Cocktail Zone)",
        "โต๊ะวางของข้างเวที · โยงผ้าขอบเวทีสีน้ำเงิน",
        "บาร์ในห้อง (Beer & Soft Drink)",
        "โต๊ะ Control ข้างเวที โต๊ะยาว 2 คู่ + เก้าอี้ 5 ตัว",
        "เก้าอี้ Coffee shop 3 ตัว + สตู บนเวที",
        "โต๊ะสตู พร้อมเครื่องสแกนบัตรจอดรถ",
        "ไลน์อาหารบุฟเฟ่ต์ที่ Foyer (ตามแปลน 4 ไลน์)",
        "โต๊ะบูธ 5 บูธ (โต๊ะ 2 ตัวประกบ + เก้าอี้ 2 ตัว): 1 Srisukho Clinic · 2 ReServ · 3 Botio · 4 OCI x HLA · 5 สมาคมฯ",
        "โต๊ะลงทะเบียนแบบยาว เก้าอี้ 6 ตัว ตรงข้ามบันไดเลื่อน",
        "บล็อกไม้ 8 บล็อก หน้าห้อง VIP (ลูกค้าเข้ามาตกแต่งเอง)",
        "เครื่องมือรับประทานอาหาร, น้ำดื่ม, หลอด บนโต๊ะรับประทานอาหาร",
        "ลูกค้าเข้ามา Set Up เวลา 09.00 น."]},
      {n:"บาร์", who:"คุณวิรัตน์", t:[
        "Soft Drink เสิร์ฟตลอดงาน",
        "เบียร์สด (30 ลิตร) 2 ถัง ราคา 8,500 บาท/ถัง + สำรอง 1 ถัง — ** หัว BEO ระบุเบียร์สิงห์ / ส่วนบาร์ระบุเบียร์ช้าง ยืนยันยี่ห้อกับ Sales **",
        "บาร์น้ำในห้อง"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED Screen + Notebook",
        "ลูกค้านำเข้าวงดนตรี พร้อมระบบแสง สี เสียง",
        "ช่าง Stand by ตลอดงาน",
        "ลูกค้าเข้ามา Set Up เวลา 09.00 น."]},
      {n:"ครัว / เบเกอรี่", who:"บุฟเฟ่ต์จัดเลี้ยง คุณรวีวรรณ / คุณผุสดี", t:[
        "17.00 น. บุฟเฟ่ต์มื้อค่ำพร้อมเสิร์ฟ — บุฟเฟ่ต์เมนู B (รายการตามแนบ) ไลน์ที่ Foyer",
        "ซุป: ต้มยำทะเล · ซุปครีมข้าวโพด · Thai hot dish: สตูว์ไก่แบบไทย · พะแนงหมูตุ๋น",
        "Premium: Seafood Station + ซุ้มข้าวหน้าล้น · Demon: ก๋วยเตี๋ยวชาบูน้ำตกหมู / เนื้อ",
        "ขนมจีน: ซาวน้ำกุ้งสับ · แกงเขียวหวานลูกชิ้นปลากราย · น้ำพริก: ลงเรือ · อ่อง",
        "ขนมไทยหม้อร้อน: บัวลอยเผือก · เต้าทึงเย็น · กล้วยบวชชี",
        "จัดอาหารสำหรับ VIP 3 โต๊ะ"]},
      {n:"แม่บ้าน", who:"คุณโสภา · โทนสีเหลือง-น้ำเงิน", t:[
        "Stand Flower บนเวที 1 คู่ (สีเหลือง-น้ำเงิน)",
        "ดอกไม้ที่โต๊ะรับประทานอาหาร 28 โต๊ะ (VIP 3 โต๊ะ)",
        "ดอกไม้ที่โต๊ะสตูเตี้ยบนเวที, โต๊ะลงทะเบียน"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณธานินทร์, คุณอนุชิต", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถ VIP ชั้น 6A — ทะเบียนรถ ** แจ้งตามมา **",
        "ที่จอดรถชั้น 6–7 ตั้งป้าย \"Ratri Sritrang 12th (MWIT)\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ, คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยในงาน",
        "จัดทำป้าย VIP 2 ป้าย",
        "จัดทำป้ายบูธ 5 บูธ",
        "คูปองชมวิว 300 ใบ (Account)"]}
    ],
    sales:"NUTTAWUT", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 14/11 (UPDATE FUNCTION 3/11/2026)", src:IMG+"mwit-beo.jpg"},
    {dept:"ฝ่ายจัดเลี้ยง", cap:"แปลน Rainbow Hall ชั้น 17 — โต๊ะกลม 28 (VIP 1–3), Cocktail Zone, Kids Area, ไลน์บุฟเฟ่ต์, บูธ 1–5 ที่ Foyer", src:IMG+"mwit-floorplan.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"Backdrop / ป้าย WELCOME — Connecting the Dots", src:IMG+"mwit-backdrop.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu MWIT 14.11.2026 หน้า 1", src:IMG+"mwit-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu MWIT 14.11.2026 หน้า 2", src:IMG+"mwit-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu MWIT 14.11.2026 หน้า 3", src:IMG+"mwit-menu-3.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"Buffet Menu MWIT 14.11.2026 หน้า 4", src:IMG+"mwit-menu-4.jpg"}
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
    console.info("[Banquet-Event] imported 14/11 MWIT");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import MWIT failed:", e); }
  }, 2500);
})();
