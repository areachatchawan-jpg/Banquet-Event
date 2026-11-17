/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 29/11 บริษัท วี เทค คอนซัลติ้ง จำกัด — โครงการส่งเสริมวินัยการเงินในชุมชน
     ภายใต้การดูแลของการเคหะแห่งชาติ ปี 2569 (ปีที่ 12) · อาทิตย์ 22 พ.ย. 2569
     Rainbow Hall ชั้น 17 + กลางวัน Bangkok Balcony ชั้น 81 (FUNCTION 17/11/2026)
   ============================================================= */
(function(){
  const MARK = "import_20261122_wetech";
  const IMG = "img/20261122/";
  const MENU = "บุฟเฟ่ต์กลางวัน Bangkok Balcony ชั้น 81";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261122_wetech", hotel:"BY", no:"29/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"โครงการส่งเสริมวินัยการเงินในชุมชน ภายใต้การดูแลของการเคหะแห่งชาติ ปี 2569 (ปีที่ 12) — วี เทค คอนซัลติ้ง",
    company:"บริษัท วี เทค คอนซัลติ้ง จำกัด (สำนักงานใหญ่)",
    contact:"คุณณัฐณิชา จันทร์พงษ์", phone:"087-356-4372", email:"natnicha@wetechconsulting.co",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-17", updAt:"17 พ.ย. 2569 (FUNCTION)",
    taxId:"0105566006808",
    address:"944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ห้องเลขที่ S25060 ชั้นที่ 25 โครงการสามย่านมิตรทาวน์ ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    unit:"ท่าน", guarantee:162, setup:170, style:"Classroom", mode:"meal", price:950,
    days:[
      {d:"2026-11-22", time:"08.00 – 12.00 น.", room:"Rainbow Hall", set:"ชั้น 17 · Classroom 162 ที่นั่ง · 162 ท่าน set up 170 · โซฟาผู้บริหาร 6 ท่าน ข้างเวที", menu:"ไม่มีอาหาร",
       note:"10.40 เบรคเช้า (ไลน์เบรคในห้อง): แซนวิชแฮมชีส · เอแคลร์ · วุ้นผลไม้"},
      {d:"2026-11-22", time:"11.00 – 13.00 น.", room:"Bangkok Balcony ชั้น 81", set:"Lunch 162 ท่าน set up 170 · โต๊ะ VIP 2 โต๊ะ ๆ ละ 10 ท่าน", menu:MENU,
       note:"11.00 น. รับประทานอาหารกลางวันบุฟเฟ่ต์ ห้องอาหาร Bangkok Balcony ชั้น 81 (เมนูห้องอาหารชั้น 81)"}
    ],
    rev:[{n:"อาหารว่างเช้า", price:250, qty:162, times:1},
         {n:"Buffet Lunch (Bangkok Balcony 81FL)", price:700, qty:162, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิตหลังเสร็จสิ้นงาน"}, pays:[],
    prog:[["07:00","น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่"],["08:00","ลงทะเบียน / เริ่มอบรม"],
          ["10:40","อาหารว่างเช้า"],["11:00","อาหารกลางวัน Bangkok Balcony ชั้น 81"],["12:00","ปิดอบรม (Rainbow Hall)"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: ** โลโก้แจ้งตาม ** · โครงการส่งเสริมวินัยการเงินในชุมชน ภายใต้การดูแลของการเคหะแห่งชาติ ปี 2569 (ปีที่ 12) · วันที่ 22 พฤศจิกายน 2569 โรงแรมใบหยกสกาย",
        "จัดทำข้อความ LED",
        "ป้ายต้อนรับ: ยินดีต้อนรับผู้เข้าร่วมอบรม · ** โลโก้แจ้งตาม ** · โครงการส่งเสริมวินัยการเงินในชุมชน ภายใต้การดูแลของการเคหะแห่งชาติ ปี 2569 (ปีที่ 12) · วันอาทิตย์ที่ 22 พ.ย. 2569 เวลา 08.00–12.00 น. · ณ ห้องเรนโบว์ ฮอลล์ ชั้น 17 โรงแรมใบหยกสกาย",
        "รบกวน PR ทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:[
        "รับประทานอาหารกลางวัน ห้องอาหาร Bangkok Balcony ชั้น 81",
        "จัดเตรียมโต๊ะ VIP 2 โต๊ะ ๆ ละ 10 ท่าน"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่งแบบ Classroom จำนวน 162 ท่าน ลงแก้วน้ำดื่ม หลอด กระดาษ ปากกา",
        "โพเดียม 1 ตัว ตั้งไว้ตรงกลางเวที",
        "โต๊ะสำหรับวางของรางวัลด้านข้างเวที โต๊ะนั่ง 3 จำนวน 2 ชุด",
        "โต๊ะลงทะเบียนหน้าห้อง (โต๊ะยาวนั่ง 3 ท่าน) จำนวน 1 ชุด",
        "โซฟาของผู้บริหารจำนวน 6 ท่าน ด้านข้างเวที พร้อมโต๊ะวางแก้ว",
        "ไลน์เบรคบริเวณในห้อง",
        "เครื่องสแกนบัตรจอดรถพร้อมพนักงานดูแล"]},
      {n:"บาร์", who:"", t:[
        "น้ำดื่มแบบขวดตลอดงานประชุม",
        "เครื่องกดกาแฟ, ชา ช่วงเบรค"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "Notebook + LED Projector + จอ Screen",
        "ไมค์ลอย 4 ตัว (ไมค์ที่โพเดียม, โต๊ะวิทยากร)",
        "ปลั๊กพ่วงจำนวน 5 ชุด",
        "เจ้าหน้าที่ Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"ผู้ควบคุมบุฟเฟ่ต์ห้องอาหาร · อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "07.00 น. น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่",
        "10.40 น. อาหารว่างเช้าพร้อมเสิร์ฟ: แซนวิชแฮมชีส · เอแคลร์ · วุ้นผลไม้",
        "11.00 น. รับประทานอาหารกลางวัน ห้องอาหาร Bangkok Balcony ชั้น 81 (เมนูห้องอาหารชั้น 81)"]},
      {n:"แม่บ้าน", who:"คุณโสภา · สีฟ้า-ขาว", t:[
        "ดอกไม้ Flower Stand 1 คู่ (บนเวที) / โพเดียม / โต๊ะลงทะเบียน / โต๊ะวิทยากร"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถ VIP ที่ชั้น 6A (ทะเบียนแจ้งตาม)",
        "ที่จอดรถที่ชั้น 6A, 6B ตั้งป้ายว่า \"ธนาคารอาคารสงเคราะห์\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณวิระดา / คุณจีรวรรณ", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "จัดเตรียมป้ายวิทยากร \"ธนาคารอาคารสงเคราะห์, การเคหะแห่งชาติ\"",
        "ยอดรวมประมาณ 153,900 บาท (เบรค 250 × 162 = 40,500 + กลางวัน 700 × 162 = 113,400) · ชำระหลังเสร็จสิ้นงาน",
        "** โลโก้ Backdrop / ป้าย และทะเบียนรถ VIP ยังแจ้งตาม **"]}
    ],
    sales:"PAPHAON", event:"PORNTIP", approve:"WARA / NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 29/11 (FUNCTION 17/11/2026)", src:IMG+"wetech-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 153,900 บาท", src:IMG+"wetech-revenue.jpg"}
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
    console.info("[Banquet-Event] imported BY 29/11 WeTech");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import WeTech failed:", e); }
  }, 2500);
})();
