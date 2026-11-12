/* =============================================================
   One-time import (Queensland)
   - ใบ 24/11 จุฬาฯ 17 (CU17) — "จุฬาฯ 17 หวาน มัน เผ็ด 70 ยังแจ๋ว"
     Party · อังคาร 17 พ.ย. 2569 · Diamond Dome 1 ชั้น 22 (FUNCTION 12/11/2026)
   ข้อมูลจาก BEO 24/11 + คาดการณ์รายได้ + โลโก้ + โปสเตอร์ลูกค้า 2 แบบ (img/20261117/cu17-*)
   เมนู: บุฟเฟ่ต์ B — รายการแจ้งตาม (ใช้ชุดเลือก "บุฟเฟ่ต์ B (100 ท่านขึ้นไป)" ที่มีอยู่)
   ============================================================= */
(function(){
  const MARK = "import_20261117_cu17";
  const IMG = "img/20261117/";
  const MENU = "บุฟเฟ่ต์ B (100 ท่านขึ้นไป)";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261117_cu17", hotel:"QL", no:"24/11", doc:"Final", status:"ยืนยันแล้ว", kind:"อื่น ๆ",
    title:"งานเลี้ยงสังสรรค์ จุฬาฯ 17 (CU17) — จุฬาฯ 17 หวาน มัน เผ็ด 70 ยังแจ๋ว",
    company:"จุฬาฯ 17 (CU17)",
    contact:"คุณปรางค์ทิพย์ / คุณสุริยะ", phone:"081-485-8023", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-12", updAt:"12 พ.ย. 2569 (FUNCTION)",
    taxId:"", address:"",
    unit:"ท่าน", guarantee:210, setup:220, style:"Round", mode:"meal", price:720,
    days:[
      {d:"2026-11-17", time:"11.00 – 16.00 น.", room:"Diamond Dome 1 ชั้น 22", set:"Round โต๊ะกลม 26 โต๊ะ ๆ ละ 10 ท่าน + โต๊ะพิธีกร/นักแสดง 1 โต๊ะ 13 ท่าน · 210 ท่าน set up 220 · Dance Floor 7.30 × 4.80 ม.", menu:MENU,
       note:"12.00 น. บุฟเฟ่ต์ B รวม Soft Drink (รายการแจ้งตาม) · ไลน์อาหารบริเวณ Foyer VIP · ลูกค้าเข้า Set up 09.00 น. · คาราโอเกะเข้า Set up 09.00 น. · Foyer DD2 / ห้อง DD2 กั้นพาทิชั่นเป็นห้องแต่งตัว-เปลี่ยนชุด"}
    ],
    rev:[{n:"Buffet lunch รวม Soft Drink (720 บาท · ลด 20% จาก 900 โดยคุณพันธ์เลิศ ใบหยก)", price:720, qty:210, times:1}],
    dep:{amt:0, when:"ชำระเป็นบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["09:00","ลูกค้าเข้า Set up · คาราโอเกะเข้า Set up"],["11:00","เริ่มงาน / ลงทะเบียน"],
          ["12:00","บุฟเฟ่ต์อาหารกลางวัน เมนู B"],["16:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: โลโก้ CU17 (วงกลมชมพู) · จุฬาฯ 17 หวาน มัน เผ็ด · 70 ยังแจ๋ว · วันที่ 17 พฤศจิกายน 2569 · ณ โรงแรมควีนสแลนด์",
        "เวทีใช้จอ LED",
        "จัดทำป้ายถือ \"Series 7\" จำนวน 1 ป้าย",
        "จัดทำข้อความติดซุ้มถ่ายภาพบนบล็อกไม้ 6 บล็อก + รูปสะพานพระราม 7",
        "ป้ายต้อนรับ: ยินดีต้อนรับ · จุฬาฯ 17 หวาน มัน เผ็ด 70 ยังแจ๋ว · วันอังคารที่ 17 พ.ย. 2569 เวลา 11.00–16.00 น. · เชิญที่ห้องไดมอนด์โดม 1 ชั้น 22 โรงแรมควีนสแลนด์",
        "PR ทำป้ายบอกทางโปสเตอร์ 1 ชุด ขนาด 42 × 60 ซม. และใส่ทีวีหน้าห้อง 1 จุด"]},
      {n:"F&B Office", who:"คุณอิศรานุรักษ์", t:["จัดเตรียมป้ายเมนูอาหาร (เมนูตามแนบ — บุฟเฟ่ต์ B แจ้งตาม)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณอิศรานุรักษ์ / คุณวิรัตน์", t:[
        "โต๊ะกลมรับประทานอาหาร 26 โต๊ะ / โต๊ะละ 10 ท่าน",
        "ไลน์อาหารบริเวณ Foyer VIP",
        "รถเข็นเค้ก (ลูกค้านำเค้กเข้ามา)",
        "โต๊ะลงทะเบียนหน้าห้อง พร้อมโต๊ะวางของที่ระลึกด้านข้าง",
        "ซุ้มถ่ายรูปบล็อกไม้หน้าห้อง ก่อนทางเข้าห้องน้ำ",
        "โหลแก้วจับฉลาก",
        "โต๊ะวางของด้านข้างเวที 2 คู่",
        "พาทิชั่นกั้น Foyer DD2 เป็นห้องแต่งตัว · ในห้อง DD2 พาทิชั่นกั้นเปลี่ยนชุด",
        "โต๊ะกลมรับประทานอาหาร 1 โต๊ะ 13 ท่าน (พิธีกรและนักแสดง พร้อมลงอาหาร)",
        "ลูกค้าเข้า SET UP 09.00 น.",
        "** โต๊ะ 26 × 10 = 260 ที่ + โต๊ะพิธีกร 13 ที่ แต่การันตี 210 set up 220 — ยืนยันจำนวนโต๊ะกับ Sales **"]},
      {n:"บาร์", who:"คุณอิศรานุรักษ์ / คุณชายศรี", t:[
        "เครื่องดื่ม Soft Drink เสิร์ฟตลอดงาน",
        "แก้วไวน์ — ลูกค้านำไวน์เข้ามา"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED + Notebook · เพลงจุฬาฯ",
        "ไมค์ลอย 4 ตัว พร้อมลำโพง (ใช้ช่วงพิธีกร)",
        "ลูกค้านำเข้าเครื่องเสียงและคาราโอเกะ (ตั้งหน้า Control sound) · คาราโอเกะเข้า Set up 09.00 น.",
        "ช่าง Stand by ตลอดงาน",
        "ช่างไม้: ปู Dance Floor ขนาด 7.30 × 4.80 ม. ห่างจากเวที 1 เมตร"]},
      {n:"ครัว / เบเกอรี่", who:"คุณปฐมกฤษณ์ · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "12.00 น. อาหารมื้อกลางวันแบบบุฟเฟ่ต์พร้อมเสิร์ฟ — เมนูบุฟเฟ่ต์ B",
        "** รายการเมนูบุฟเฟ่ต์ B ลูกค้าแจ้งตาม — ระบบใส่ค่าเริ่มต้นของชุด B ไว้ก่อน แก้ในแท็บเมนูเมื่อได้รายการ **",
        "โต๊ะพิธีกร / นักแสดง 13 ท่าน ลงอาหาร"]},
      {n:"แม่บ้าน", who:"คุณอังคณา · โทนสีชมพู-ขาว", t:[
        "Stand Flower บนเวที 1 คู่ และโต๊ะลงทะเบียน",
        "ดอกไม้ซุ้มถ่ายรูปหน้าห้อง · ดอกไม้ที่รถเข็นเค้ก",
        "แจกันดอกไม้ที่โต๊ะรับประทานอาหาร 26 โต๊ะ",
        "ดอกไม้ตกแต่งตามไลน์อาหาร"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "ที่จอดรถชั้น 1 จำนวน 5 คัน ตั้งป้าย (ทะเบียนแจ้งตาม)",
        "ที่จอดรถผู้ร่วมงาน ตั้งป้าย \"CU17\""]},
      {n:"Event", who:"คุณพรทิพย์", t:[
        "ดูแลความเรียบร้อยภายในงาน",
        "จัดทำป้ายตั้งโต๊ะ (แจ้งตาม)",
        "ยอดรวม 151,200 บาท (720 × 210 · ลด 20% จาก 900) · ชำระบัตรเครดิต ณ วันงาน"]}
    ],
    sales:"NUTTAWUT", event:"PORNTIP", approve:"PACHARAPOL", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 24/11 (FUNCTION 12/11/2026)", src:IMG+"cu17-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 151,200 บาท (ลด 20%)", src:IMG+"cu17-revenue.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โลโก้ CU17 (วงกลมชมพู)", src:IMG+"cu17-logo.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โปสเตอร์ลูกค้า — สะพานพระราม 7 (ใช้รูปสะพานที่ซุ้มถ่ายภาพ)", src:IMG+"cu17-poster-1.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โปสเตอร์ลูกค้า — The Hills Are Alive with Friendship & Joy", src:IMG+"cu17-poster-2.jpg"}
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
    console.info("[Banquet-Event] imported 24/11 CU17");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import CU17 failed:", e); }
  }, 2500);
})();
