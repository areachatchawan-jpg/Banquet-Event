/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 21/11 สำนักงาน กสทช. — อบรม Content Credit ครั้งที่ 4 · 13 พ.ย. 2569 (FINAL FUNCTION 10/11/2026)
   ข้อมูลจากใบ BEO + คาดการณ์รายได้ + Backdrop (img/20261113/)
   ============================================================= */
(function(){
  const MARK = "import_20261113_nbtc_cc";
  const IMG = "img/20261113/";
  const MENU = "บุฟเฟ่ต์กลางวัน Crystal Grill ชั้น 82";
  const MENUS_NEW = {};

  const EV = {
    id:"q20261113_nbtc_cc", hotel:"BY", no:"21/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"อบรม การสร้างความรู้ความเข้าใจเกี่ยวกับระบบการสะสมเครดิตเชิงสังคมจากเนื้อหา (Content Credit) ในกิจการโทรทัศน์ฯ ครั้งที่ 4",
    company:"สำนักงาน กสทช.",
    contact:"คุณวรลักษณ์", phone:"084-660-6446", email:"aboutbeau@gmail.com",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-10", updAt:"10 พ.ย. 2569 (FINAL FUNCTION)",
    taxId:"0994000049447",
    address:"87 ถนนพหลโยธิน ซอย 8 แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400",
    unit:"ท่าน", guarantee:80, setup:90, style:"Classroom", mode:"meal", price:950,
    days:[
      {d:"2026-11-13", time:"08.00 – 17.00 น.", room:"Rainbow Hall", set:"Classroom 80 ที่นั่ง + I-Shape เจ้าหน้าที่ 10 ที่ (ชั้น 17) · 80 ท่าน set up 90", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่ · ว่างเช้า 10.30 ครัวซองท์ไส้แฮม เค้กกาแฟ วุ้นผลไม้ · ว่างบ่าย 14.30 ซอสเซสโรล มัฟฟินกล้วยหอม ผลไม้ · ไลน์เบรคที่ Foyer"},
      {d:"2026-11-13", time:"11.00 – 13.00 น.", room:"Crystal Grill ชั้น 82", set:"Lunch 80 ท่าน set up 90 (VIP 2 โต๊ะ โต๊ะละ 8 ท่าน)", menu:MENU,
       note:"บุฟเฟ่ต์กลางวันห้องอาหาร Crystal Grill · Event ตั้งป้ายห้องอาหารมื้อกลางวัน"}
    ],
    rev:[{n:"อาหารว่างเช้า", price:150, qty:80, times:1},
         {n:"อาหารกลางวัน (ชั้น 82)", price:650, qty:80, times:1},
         {n:"อาหารว่างบ่าย", price:150, qty:80, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิตหลังเสร็จสิ้นงาน"}, pays:[],
    prog:[["07:00","น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่"],["08:00","ลงทะเบียน / เริ่มอบรม"],["10:30","อาหารว่างเช้า (Foyer)"],
          ["11:00","อาหารกลางวันบุฟเฟ่ต์ Crystal Grill ชั้น 82"],["14:30","อาหารว่างบ่าย (Foyer)"],["17:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: โลโก้ กสทช. + ข้อความการอบรม Content Credit ครั้งที่ 4 วันศุกร์ที่ 13 พ.ย. 2569 ณ โรงแรมใบหยกสกาย (ตามรูปแนบ)",
        "ป้ายต้อนรับ: ยินดีต้อนรับผู้เข้าร่วม · วันศุกร์ที่ 13 พ.ย. 2569 เวลา 08.00–17.00 น.",
        "รบกวน PR ทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:[
        "รับประทานอาหารกลางวัน ห้องอาหาร Crystal Grill ชั้น 82",
        "ที่นั่ง VIP จำนวน 2 โต๊ะ โต๊ะละ 8 ท่าน (ลงอาหาร)"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่ง Classroom จำนวน 80 ที่นั่ง",
        "โต๊ะ I-Shape ด้านหลังสำหรับเจ้าหน้าที่ 10 ที่นั่ง",
        "ไลน์เบรคที่ Foyer",
        "โซฟารับรองในห้อง VIP",
        "เครื่องสแกนบัตรจอดรถพร้อมพนักงานดูแล",
        "โต๊ะลงทะเบียน",
        "โพเดียม"]},
      {n:"บาร์", who:"", t:["น้ำดื่มเสิร์ฟตลอดการประชุม","เครื่องกดกาแฟช่วงเบรค"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED Projector + Notebook",
        "ไมค์ลอย 4 ตัว",
        "ปลั๊กพ่วงตามจุด อย่างละ 1 ชุด",
        "โต๊ะวางคอมเพื่อฉาย 2 ตัว",
        "ช่าง Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "07.00 น. น้ำเต้าหู้ + ปาท่องโก๋ สำหรับเจ้าหน้าที่",
        "10.30 น. อาหารว่างเช้าพร้อมเสิร์ฟ: ครัวซองท์ไส้แฮม, เค้กกาแฟ, วุ้นผลไม้",
        "11.00 น. อาหารกลางวัน ห้องอาหาร Crystal Grill ชั้น 82",
        "14.30 น. อาหารว่างบ่ายพร้อมเสิร์ฟ: ซอสเซสโรล, มัฟฟินกล้วยหอม, ผลไม้"]},
      {n:"แม่บ้าน", who:"คุณโสภา · ธีมสีแดง / เหลือง", t:[
        "ดอกไม้ Flower Stand 1 คู่ (บนเวที)",
        "ดอกไม้บนโพเดียม / โต๊ะวิทยากร / โต๊ะลงทะเบียน"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
        "ที่จอดรถ VIP 7 คัน ชั้น 7A ทะเบียน: 5 ขด 7922, 4 ขค 1232, 5 กฐ 558, 1 ขย 3576, 7 ขฬ 9226, 1 กบ 5125, 4 กอ 9536 (ตาม BEO)",
        "ที่จอดรถ VIP 1 คัน ชั้น 1 ทะเบียน 2 กพ 512",
        "ที่จอดรถผู้ร่วมประชุม ตั้งป้าย \"กสทช\""]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ / คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "ป้ายวิทยากร",
        "ป้ายตั้งห้องอาหารมื้อกลางวัน"]}
    ],
    sales:"PAPHAON", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 21/11 (FINAL FUNCTION 10/11/2026)", src:IMG+"nbtc-cc-beo.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 76,000 บาท", src:IMG+"nbtc-cc-revenue.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"Backdrop / ป้ายต้อนรับ กสทช. Content Credit ครั้งที่ 4", src:IMG+"nbtc-cc-backdrop.jpg"}
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
    console.info("[Banquet-Event] imported 21/11 NBTC Content Credit");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import NBTC CC failed:", e); }
  }, 2500);
})();
