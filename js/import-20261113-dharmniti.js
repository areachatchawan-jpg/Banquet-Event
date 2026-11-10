/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 19/11 บริษัท ฝึกอบรมและสัมมนาธรรมนิติ — 13 พ.ย. 2569 (FINAL FUNCTION 09/11/2026)
   ข้อมูลจาก BEO + แปลน Sky Room + คาดการณ์รายได้ (img/20261113/dharmniti-*)
   ============================================================= */
(function(){
  const MARK = "import_20261113_dharmniti";
  const IMG = "img/20261113/";
  const MENU = "บุฟเฟ่ต์กลางวัน Bangkok Sky ชั้น 76/78";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261113_dharmniti", hotel:"BY", no:"19/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"อบรม ข้อควรระวังในการยื่นงบการเงินปี 2569 และการเตรียมความพร้อมสำหรับการนำส่งงบการเงินปี 2570",
    company:"บริษัท ฝึกอบรมและสัมมนาธรรมนิติ จำกัด",
    contact:"คุณอรพรรณ", phone:"0-2574-1588", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-09", updAt:"9 พ.ย. 2569 (FINAL FUNCTION)",
    taxId:"0105533001556",
    address:"178 อาคารธรรมนิติ ชั้น 4 ซอยเพิ่มทรัพย์ (ประชาชื่น 20) ถนนประชาชื่น แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 10800",
    unit:"ท่าน", guarantee:75, setup:85, style:"Classroom", mode:"meal", price:700,
    days:[
      {d:"2026-11-13", time:"09.00 – 16.30 น.", room:"Sky Room", set:"Classroom 85 ท่าน (ชั้น 17) · 75 ท่าน set up 85 · แปลนลูกค้า 90 ที่", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่ · ว่างเช้า 10.30 แซนด์วิชทูน่า + เดนิชอัลมอนด์ · ว่างบ่าย 14.30 ชิโอะปัง + ท็อฟฟี่เค้ก · ไลน์เบรคตรงข้ามบันไดเลื่อน"},
      {d:"2026-11-13", time:"12.00 – 13.00 น.", room:"Bangkok Sky ชั้น 76/78", set:"Lunch 75 ท่าน set up 85", menu:MENU,
       note:"บุฟเฟ่ต์กลางวันห้องอาหาร Bangkok Sky (ครัวระบุชั้น 78) · Event ตั้งป้ายห้องอาหาร"}
    ],
    rev:[{n:"อาหารว่างเช้า", price:125, qty:75, times:1},
         {n:"Buffet Lunch (Bangkok Sky ชั้น 76/78)", price:500, qty:75, times:1},
         {n:"อาหารว่างบ่าย", price:125, qty:75, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิตหลังเสร็จสิ้นงาน"}, pays:[],
    prog:[["07:00","น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่"],["09:00","ลงทะเบียน / เริ่มอบรม"],["10:30","อาหารว่างเช้า"],
          ["12:00","อาหารกลางวัน Bangkok Sky ชั้น 78"],["14:30","อาหารว่างบ่าย"],["16:30","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: โลโก้ธรรมนิติ · บริษัท ฝึกอบรมและสัมมนาธรรมนิติ จำกัด · ข้อควรระวังในการยื่นงบการเงินปี 2569 และการเตรียมความพร้อมสำหรับการนำส่งงบการเงินปี 2570 · วันที่ 13 พ.ย. 2569 โรงแรมใบหยกสกาย",
        "จัดทำข้อความ LED",
        "ป้ายต้อนรับ: ยินดีต้อนรับผู้เข้าร่วมอบรม · วันศุกร์ที่ 13 พ.ย. 2569 เวลา 09.00–16.30 น. ณ ห้องสกายรูม ชั้น 17",
        "รบกวน PR ทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:["รับประทานอาหารกลางวัน ห้องอาหาร Bangkok Sky ชั้น 76/78"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่งแบบ Classroom จำนวน 85 ท่าน ลงแก้ว น้ำดื่ม หลอด กระดาษ ปากกา",
        "โพเดียม 1 ตัว ข้างเวที",
        "โต๊ะวิทยากรหน้าเวที สำหรับ 1 ท่าน + ทิชชู่ + น้ำร้อน + หลอด",
        "โต๊ะลงทะเบียนหน้าห้อง (โต๊ะยาวนั่ง 3 ท่าน) จำนวน 2 ชุด",
        "โต๊ะรับชำระเงินหน้าห้อง (โต๊ะยาวนั่ง 3 ท่าน)",
        "ไลน์เบรคบริเวณตรงข้ามบันไดเลื่อน",
        "เครื่องสแกนบัตรจอดรถพร้อมพนักงานดูแล"]},
      {n:"บาร์", who:"คุณชายุตรี", t:["น้ำดื่มแบบขวดตลอดงานประชุม"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "Notebook + LCD Projector + จอ Screen",
        "ไมค์ลอย 2 ตัว (ไมค์ที่โพเดียม, โต๊ะวิทยากร)",
        "เจ้าหน้าที่ Stand by ตลอดงาน",
        "สาย LAN ที่โต๊ะวิทยากร (สำหรับ Zoom)"]},
      {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "07.00 น. น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่",
        "10.30 น. อาหารว่างเช้าพร้อมเสิร์ฟ: แซนด์วิชทูน่า + เดนิชอัลมอนด์",
        "12.00 น. อาหารกลางวัน ห้องอาหาร Bangkok Sky ชั้น 78",
        "14.30 น. อาหารว่างบ่ายพร้อมเสิร์ฟ: ชิโอะปัง + ท็อฟฟี่เค้ก"]},
      {n:"แม่บ้าน", who:"คุณโสภา", t:["ดอกไม้ Flower Stand 1 คู่ (บนเวที) / โพเดียม / โต๊ะลงทะเบียน / โต๊ะวิทยากร"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถ VIP ชั้น 6 จำนวน 1 คัน ทะเบียน 6กร1961 (วิทยากรธรรมนิติ)",
        "ที่จอดรถชั้น 6 ประมาณ 15 คัน สำหรับผู้เข้าร่วมประชุม ตั้งป้าย \"ธรรมนิติ\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ / คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "ป้ายวิทยากร ดร.วิทยา อรุณศิริเพ็ชร",
        "ป้ายตั้งห้องอาหารมื้อกลางวัน"]}
    ],
    sales:"NUTTAWUT", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 19/11 (FINAL FUNCTION 09/11/2026)", src:IMG+"dharmniti-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 56,250 บาท", src:IMG+"dharmniti-revenue.jpg"},
    {dept:"ฝ่ายจัดเลี้ยง", cap:"แปลน Sky Room ชั้น 17 Classroom 90 ที่ + Foyer (ไลน์อาหารว่าง / ลงทะเบียน / โต๊ะการเงิน)", src:IMG+"dharmniti-floorplan.jpg"}
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
    console.info("[Banquet-Event] imported 19/11 Dharmniti");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import Dharmniti failed:", e); }
  }, 2500);
})();
