/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 27/11 โรงเรียนมัธยมวัดนายโรง — ทัศนศึกษา: บรรยายเกี่ยวกับโรงแรม + มารยาทบนโต๊ะอาหาร
     + ชมวิวชั้น 77 / 84 + กลางวันบุฟเฟ่ต์ · พุธ 18 พ.ย. 2569
     Rainbow Hall ชั้น 17 + Bangkok Sky ชั้น 76/78 (FUNCTION 16/11/2026)
   ============================================================= */
(function(){
  const MARK = "import_20261118_watnairong";
  const IMG = "img/20261118/";
  const MENU = "บุฟเฟ่ต์กลางวัน Bangkok Sky ชั้น 76/78";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261118_watnairong", hotel:"BY", no:"27/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"ทัศนศึกษา โรงเรียนมัธยมวัดนายโรง — บรรยายเกี่ยวกับโรงแรม + มารยาทบนโต๊ะอาหาร",
    company:"โรงเรียนมัธยมวัดนายโรง",
    contact:"คุณมาโนชย์", phone:"081-771-7182", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-16", updAt:"16 พ.ย. 2569 (FUNCTION)",
    taxId:"0994000172117",
    address:"658/2 แขวงอรุณอัมรินทร์ เขตบางกอกน้อย กรุงเทพฯ 10700",
    unit:"ท่าน", guarantee:140, setup:150, style:"Classroom", mode:"meal", price:500,
    days:[
      {d:"2026-11-18", time:"10.00 – 12.00 น.", room:"Rainbow Hall", set:"ชั้น 17 · Classroom 150 ที่นั่ง · 140 ท่าน set up 150", menu:"ไม่มีอาหาร",
       note:"10.00 ฟังบรรยายเกี่ยวกับโรงแรมใบหยกสกาย และมารยาทการรับประทานอาหาร · 12.00 ชมวิวที่จุดชมวิวชั้น 77 และชั้น 84"},
      {d:"2026-11-18", time:"11.00 – 13.00 น.", room:"Bangkok Sky ชั้น 76/78", set:"Lunch 140 ท่าน set up 150 · Booking No. 261106444", menu:MENU,
       note:"ครัว / กำหนดการ: รับประทานอาหารกลางวันบุฟเฟ่ต์ 13.00 น. (ตารางห้องใน BEO ระบุ 11.00–13.00)"}
    ],
    rev:[{n:"บุฟเฟ่ต์กลางวัน Bangkok Sky ชั้น 76/78", price:500, qty:140, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด บัตรเครดิต หรือโอนชำระ ในวันงาน"}, pays:[],
    prog:[["10:00","ฟังบรรยายเกี่ยวกับโรงแรมใบหยกสกาย และมารยาทการรับประทานอาหาร (Rainbow Hall)"],
          ["12:00","ชมวิวที่จุดชมวิวชั้น 77 และชั้น 84"],["13:00","รับประทานอาหารกลางวันบุฟเฟ่ต์ Bangkok Sky ชั้น 76/78"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "ติดตั้งป้ายบอกทางที่ชั้น 1 / ลิฟต์ลานจอด และหน้าห้องจัดงาน",
        "Backdrop: ** ไม่มี **",
        "PR Sign Board: ** ไม่มี **"]},
      {n:"F&B Office", who:"", t:[
        "จัดเตรียมโต๊ะรับประทานอาหารมื้อกลางวันที่ห้องอาหาร Bangkok Sky ชั้น 76 · Booking No. 261106444",
        "จัดเตรียมเจ้าหน้าที่บรรยายมารยาทบนโต๊ะอาหาร (คุณอดุลย์)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่งแบบ Classroom จำนวน 150 ที่นั่ง",
        "โต๊ะวิทยากร พร้อมน้ำดื่ม",
        "อุปกรณ์สำหรับบรรยายมารยาทบนโต๊ะอาหาร"]},
      {n:"บาร์", who:"คุณวิรัตน์", t:["** ไม่มี **"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "LED Projector + Notebook",
        "ไมค์ลอย จำนวน 3 ตัว",
        "เจ้าหน้าที่ Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"ผู้ควบคุมบุฟเฟ่ต์ห้องอาหาร · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "13.00 น. รับประทานอาหารมื้อกลางวันที่ห้องอาหาร Bangkok Sky ชั้น 76/78 — เมนูบุฟเฟ่ต์มื้อกลางวันห้องอาหาร",
        "** ตารางห้องระบุ 11.00–13.00 แต่ครัว / กำหนดการระบุ 13.00 น. — ยืนยันเวลากับ Sales (NUTTAWUT) **"]},
      {n:"แม่บ้าน", who:"คุณโสภา", t:[
        "Stand Flower 1 คู่ บนเวที",
        "ดอกไม้ที่โต๊ะวิทยากร"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถบัส จำนวน 4 คัน (ทะเบียนแจ้งตาม)"]},
      {n:"Event", who:"คุณพรทิพย์", t:[
        "ดูแลความเรียบร้อยภายในงาน",
        "ดูแลจัดเตรียมโต๊ะอุปกรณ์บรรยายมารยาทบนโต๊ะอาหาร",
        "HR (คุณสุชาลินี): จัดเตรียมเจ้าหน้าที่ พร้อมข้อมูลบรรยายเกี่ยวกับข้อมูลโรงแรม",
        "ยอดรวม 70,000 บาท (500 × 140) · ชำระเงินสด / บัตรเครดิต / โอน ณ วันงาน · ไม่มีใบคาดการณ์รายได้"]}
    ],
    sales:"NUTTAWUT", event:"PORNTIP", approve:"WARA / NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 27/11 (FUNCTION 16/11/2026)", src:IMG+"watnairong-beo.jpg"}
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
    console.info("[Banquet-Event] imported BY 27/11 วัดนายโรง");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Wat Nairong failed:", e); }
  }, 2500);
})();
