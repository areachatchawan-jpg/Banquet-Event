/* =============================================================
   One-time import (Queensland) — ร่าง FUNCTION
   - ใบ 29/11 งานเลี้ยงค่าย VESC 8 5 6 7 8 9 — Party · เสาร์ 21 พ.ย. 2569
     Diamond Dome 1 ชั้น 22 · 17.00–22.00 (ร่าง · FUNCTION 17/11/2026)
   ข้อมูลจาก BEO + คาดการณ์รายได้ + กำไร/ขาดทุน F&B (img/20261121/vesc-*)
   ============================================================= */
(function(){
  const MARK = "import_20261121_vesc";
  const IMG = "img/20261121/";
  const MENU = "บุฟเฟ่ต์มื้อค่ำ 900 (21 พ.ย. 69 · VESC — รายการแจ้งตาม)";

  const MENUS_NEW = {
    [MENU]:[{g:"บุฟเฟ่ต์มื้อค่ำ 900 บาท รวม Soft Drink — รายการอาหารแจ้งตาม", fixed:[
      "** รายการอาหารยังไม่ได้รับ (BEO: แจ้งตาม) **",
      "เครื่องดื่ม: Soft Drink ตลอดงาน · ชา / กาแฟร้อนแบบพ็อต · ลูกค้านำไวน์เข้า (เตรียมแก้วไวน์)"
    ]}]
  };

  const EV = {
    id:"q20261121_vesc", hotel:"QL", no:"29/11", doc:"ร่าง", status:"รอยืนยัน", kind:"อื่น ๆ",
    title:"งานเลี้ยงค่าย VESC 8 5 6 7 8 9",
    company:"งานเลี้ยงค่าย VESC 8 5 6 7 8 9",
    contact:"คุณจอมพงศ์ (CU) — ตามใบกำไร/ขาดทุน · BEO ยังไม่ระบุ", phone:"", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-17", updAt:"17 พ.ย. 2569 (ร่าง FUNCTION)",
    taxId:"", address:"",
    unit:"ท่าน", guarantee:100, setup:110, style:"Round", mode:"meal", price:900,
    days:[
      {d:"2026-11-21", time:"17.00 – 22.00 น.", room:"Diamond Dome 1 ชั้น 22", set:"Round โต๊ะกลม 14 โต๊ะ ๆ ละ 8 ท่าน · 100 ท่าน set up 110", menu:MENU,
       note:"17.00 น. อาหารมื้อค่ำบุฟเฟ่ต์พร้อมเสิร์ฟ (รายการแจ้งตาม) · ไลน์บุฟเฟ่ต์ในห้อง · คาราโอเกะ · ลูกค้านำไวน์เข้า"}
    ],
    rev:[{n:"Buffet Dinner รวม Soft Drink (Diamond Dome 1 ชั้น 22)", price:900, qty:100, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["17:00","เริ่มงาน · บุฟเฟ่ต์มื้อค่ำ"],["22:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: *** แจ้งตาม *** · วันเสาร์ที่ 21 พฤศจิกายน 2569 · โรงแรมควีนสแลนด์",
        "เพิ่มข้อความที่ซุ้มถ่ายรูป 1 จุด",
        "ป้ายต้อนรับ: ยินดีต้อนรับ *** แจ้งตาม *** · วันเสาร์ที่ 21 พ.ย. 2569 เวลา 17.00–22.00 น. · ห้องไดมอนด์โดม 1 ชั้น 22 โรงแรมควีนสแลนด์",
        "รบกวน PR จัดทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:["จัดทำป้ายเมนูอาหารที่ไลน์บุฟเฟ่ต์ (*** แจ้งตาม ***)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "โต๊ะลงทะเบียนหน้าห้อง",
        "ซุ้มถ่ายรูปบล็อกไม้หน้าห้อง",
        "โต๊ะสำหรับวาง ชา / กาแฟร้อนแบบพ็อต",
        "โต๊ะกลม 14 โต๊ะ / โต๊ะละ 8 ท่าน",
        "ไลน์อาหารบุฟเฟ่ต์ในห้อง",
        "** BEO เป็นร่าง — รอ Final Function **"]},
      {n:"บาร์", who:"", t:[
        "เสิร์ฟน้ำดื่ม Soft Drink ตลอดงาน",
        "ลูกค้านำเข้าไวน์ จัดเตรียมแก้วไวน์"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "ไมค์ลอย 3 ตัว + ไมค์โพเดียม",
        "คาราโอเกะ + จอคาราโอเกะ",
        "Notebook + LED Screen",
        "เจ้าหน้าที่ Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"คุณปฐมกฤษณ์ · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "17.00 น. อาหารมื้อค่ำพร้อมเสิร์ฟ — *** รายการแจ้งตาม ***",
        "ใบกำไร/ขาดทุน: Food cost 25% = 19,116.40 บาท · Cook 3 · Bar 1 · Waiter 7 · Steward 2"]},
      {n:"แม่บ้าน", who:"คุณอังคณา / คุณโสภา · ธีมสีชมพู", t:[
        "ดอกไม้ที่โต๊ะต้อนรับ, ดอกไม้ที่โพเดียม 1 ตัว",
        "ดอกไม้ที่โต๊ะรับประทานอาหาร จำนวน 14 โต๊ะ",
        "ดอกไม้ที่ซุ้มถ่ายรูป"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณอาทิตย์", t:[
        "ที่จอดรถชั้น 1 ตั้งป้ายว่า *** แจ้งตาม ***",
        "เจ้าหน้าที่เดินตรวจความเรียบร้อยบริเวณงานเป็นระยะ"]},
      {n:"Event", who:"คุณพรทิพย์", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "ยอดรวม 90,000 บาท (900 × 100) · ชำระเงินสด / บัตรเครดิต ณ วันงาน",
        "ใบกำไร/ขาดทุน F&B: รายได้สุทธิ 76,465.59 · ต้นทุนรวม 36,119.58 · กำไร 40,346.01 (52.76%)",
        "** ใบกำไร/ขาดทุนระบุห้อง Mum's Bistro ชั้น 20 แต่ BEO ระบุ Diamond Dome 1 ชั้น 22 · ผู้ติดต่อใน BEO ว่าง (ใบกำไร/ขาดทุนเขียน คุณจอมพงศ์ CU) · โต๊ะ 14 × 8 = 112 ที่ (set up 110) — ยืนยันกับ Sales (PONGPAT) **",
        "** Backdrop / ป้าย / เมนู / ป้ายที่จอดรถ ยังแจ้งตาม **"]}
    ],
    sales:"PONGPAT", event:"PORNTIP", approve:"PACHARAPOL", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 29/11 VESC (ร่าง · FUNCTION 17/11/2026)", src:IMG+"vesc-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 90,000 บาท", src:IMG+"vesc-revenue.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"กำไร/ขาดทุน F&B — กำไร 40,346.01 (52.76%) · ระบุห้อง Mum's Bistro", src:IMG+"vesc-pnl.jpg"}
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
    console.info("[Banquet-Event] imported QL 29/11 VESC (draft)");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import VESC failed:", e); }
  }, 2500);
})();
