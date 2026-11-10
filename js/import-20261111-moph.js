/* =============================================================
   One-time import (Baiyoke Sky)
   - ใบ 18/11 สำนักงานปลัดกระทรวงสาธารณสุข กองสาธารณสุขฉุกเฉิน — Workshop 11–13 พ.ย. 2569 (FUNCTION 06/11/2026)
   ============================================================= */
(function(){
  const MARK = "import_20261111_moph";
  const IMG = "img/20261111/";
  const MENU = "บุฟเฟ่ต์กลางวัน Bangkok Sky ชั้น 76/78";
  const MENUS_NEW = {};
  const BK = "Bangkok Sky ชั้น 76/78";

  const EV = {
    id:"q20261111_moph", hotel:"BY", no:"18/11", doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
    title:"ประชุมเชิงปฏิบัติการการสื่อสารความเสี่ยงและการประชาสัมพันธ์ และการมีส่วนร่วมของชุมชน เพื่อบริหารจัดการด้านการแพทย์และสาธารณสุข (3 วัน)",
    company:"สำนักงานปลัดกระทรวงสาธารณสุข กองสาธารณสุขฉุกเฉิน",
    contact:"คุณเนลินญาน์ รังสิมาเลิศธรรม (ปู)", phone:"088-2812805", email:"",
    onsite:"", diet:"", ver:1, miles:{}, created:"2026-11-06", updAt:"6 พ.ย. 2569 (FUNCTION)",
    taxId:"0994000241810",
    address:"เลขที่ 88/20 ถ.ติวานนท์ ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000",
    unit:"ท่าน", guarantee:100, setup:110, style:"Classroom", mode:"meal", price:750,
    days:[
      {d:"2026-11-11", time:"08.00 – 12.00 น.", room:"Rainbow Hall", set:"Classroom 100 ท่าน set up 110 (ชั้น 17) · BEO จัดโต๊ะคลาสรูม 130 ที่ + โต๊ะสังเกตการณ์ท้ายห้อง 6", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช (เจ้าหน้าที่/วิทยากร) · ว่างเช้า 10.00 แซนด์วิชแฮมชีส (แฮมไก่) + บัวลอย · ลูกค้าเข้า Set แสง สี เสียง 10/11 เวลา 17.00 น."},
      {d:"2026-11-11", time:"12.00 – 13.00 น.", room:BK, set:"Lunch 90 ท่าน set up 100 (VIP 2 โต๊ะ ๆ ละ 8)", menu:MENU, note:"เมนูห้องอาหารชั้น 76/78 · ที่นั่งชั้น 76"},
      {d:"2026-11-11", time:"13.00 – 17.00 น.", room:"Rainbow Hall", set:"Classroom 75 ท่าน set up 85 (ชั้น 17)", menu:"ไม่มีอาหาร",
       note:"ว่างบ่าย 14.30 ซอสเซสโรล (แป้งพาย) + เอแคลร์ · ไลน์อาหารว่างด้านหลังห้อง Rainbow Hall"},
      {d:"2026-11-12", time:"08.00 – 17.00 น.", room:"Kontent Space", set:"Classroom 75 ท่าน set up 85 (ชั้น 19) · เช้าคลาสรูม 80 ที่ + สังเกตการณ์ 6 · บ่ายแบ่งกลุ่ม 5 กลุ่ม ๆ ละ 15", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช · ว่างเช้า 10.00 แซนด์วิชทูน่า + ครองแครงกะทิ · ว่างบ่าย 14.30 ครัวซองท์ไส้แฮม (แฮมไก่) + แยมโรลส้ม · ฟลิปชาร์ตกลุ่มละ 1 ชุด"},
      {d:"2026-11-12", time:"12.00 – 13.00 น.", room:BK, set:"Lunch 75 ท่าน set up 85", menu:MENU, note:"เมนูห้องอาหารชั้น 76/78"},
      {d:"2026-11-13", time:"08.00 – 17.00 น.", room:"Kontent Space", set:"Classroom 75 ท่าน set up 85 (ชั้น 19) · เช้าแบ่งกลุ่ม 5 กลุ่ม ๆ ละ 15 · บ่ายคลาสรูม 80 ที่", menu:"ไม่มีอาหาร",
       note:"07.00 น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช · ว่างเช้า 10.00 พัฟไก่ + เดนิชอัลมอนด์ · ว่างบ่าย 14.30 ขนมปังไส้หมูหยอง + เค้กท็อฟฟี่"},
      {d:"2026-11-13", time:"12.00 – 13.00 น.", room:BK, set:"Lunch 75 ท่าน set up 85", menu:MENU, note:"เมนูห้องอาหารชั้น 76/78"}
    ],
    rev:[{n:"11/11 อาหารว่างเช้า", price:125, qty:100, times:1},
         {n:"11/11 Buffet Lunch (Bangkok Sky ชั้น 76/78)", price:500, qty:90, times:1},
         {n:"11/11 อาหารว่างบ่าย", price:125, qty:75, times:1},
         {n:"12–13/11 อาหารว่างเช้า + บ่าย", price:125, qty:75, times:4},
         {n:"12–13/11 Buffet Lunch (Bangkok Sky ชั้น 76/78)", price:500, qty:75, times:2}],
    dep:{amt:0, when:"วางบิล (ติดต่อนางสาวสิรามล มีทองแสน นักวิชาการเงินและบัญชี 099-2365324)"}, pays:[],
    prog:[["07:00","น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช สำหรับเจ้าหน้าที่และวิทยากร (ทั้ง 3 วัน)"],["08:00","เริ่มประชุม"],
          ["10:00","อาหารว่างเช้า"],["12:00","อาหารกลางวัน Bangkok Sky ชั้น 76/78"],["14:30","อาหารว่างบ่าย"],["17:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
        "Stand Poster ที่ชั้น 1 / ลิฟท์ลานจอด และหน้าห้องจัดงาน",
        "Backdrop: โลโก้ กระทรวงสาธารณสุข + WHO Thailand · ประชุมเชิงปฏิบัติการการสื่อสารความเสี่ยงและการประชาสัมพันธ์ และการมีส่วนร่วมของชุมชน เพื่อบริหารจัดการด้านการแพทย์และสาธารณสุข (Workshop on Risk Communication, Public Relations, and Community Engagement for Medical and Public Health Management) · วันที่ 11–13 พ.ย. 2569 ณ โรงแรมใบหยกสกาย",
        "ป้ายต้อนรับ: ยินดีต้อนรับผู้เข้าร่วม · 11 พ.ย. 2569 ณ ห้องเรนโบว์ ฮอลล์ ชั้น 17 · 12–13 พ.ย. 2569 ณ ห้องคอนเทนต์ สเปซ ชั้น 19",
        "รบกวน PR ทำป้ายบอกทาง"]},
      {n:"F&B Office", who:"", t:[
        "จัดเตรียมที่นั่งบนห้อง Bangkok Sky ชั้น 76",
        "ที่นั่ง VIP จำนวน 2 โต๊ะ ๆ ละ 8 ที่นั่ง"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "— 11.11.2026 ห้อง Rainbow Hall ชั้น 17 —",
        "โต๊ะลงทะเบียนตรงข้ามบันไดเลื่อน",
        "โซฟาหลุยส์หน้าโต๊ะ Classroom สำหรับ VIP",
        "โต๊ะคลาสรูมแถวแรกผูกโบว์ทอง",
        "โต๊ะคลาสรูม สำหรับ 130 ที่นั่ง + โต๊ะสังเกตการณ์ท้ายห้อง 6 ที่นั่ง",
        "โพเดียม 2 ตัว บนเวทีและข้างเวที · โซฟาข้างเวที",
        "วิทยากรบนเวที สำหรับ 2 ที่นั่ง (หลังเปิดงาน)",
        "Foyer เจ้าหน้าที่จัดบูธ · ห้อง VIP เป็นห้องรับรอง",
        "ไลน์อาหารว่างที่ด้านหลังห้อง Rainbow Hall",
        "ผ้าขอบเวทีสีดำ · แท่นกล่าวเปิด 2 อัน + แฟ้มรองเซ็นต์ 8 อัน",
        "เครื่องแสกนบัตรจอดรถ พร้อมเจ้าหน้าที่ดูแล",
        "— 12–13.11.2026 ห้อง Kontent Space ชั้น 19 —",
        "12/11 ช่วงเช้าจัดคลาสรูม 80 ที่นั่ง + โต๊ะสังเกตการณ์หน้าห้องซาวน์ 6 ที่นั่ง",
        "12/11 ช่วงบ่ายจัดโต๊ะแบ่งกลุ่ม 5 กลุ่ม ๆ ละ 15 ที่นั่ง พร้อมฟลิปชาร์ตกลุ่มละ 1 ชุด",
        "13/11 ช่วงเช้าจัดโต๊ะแบ่งกลุ่ม 5 กลุ่ม ๆ ละ 15 ที่นั่ง พร้อมฟลิปชาร์ตกลุ่มละ 1 ชุด",
        "13/11 ช่วงบ่ายจัดคลาสรูม 80 ที่นั่ง",
        "ไลน์อาหารว่างที่ไลน์ดำ · โพเดียมข้างเวที",
        "โต๊ะลงทะเบียนในห้องซ้ายมือ · โซฟาข้างเวที",
        "โต๊ะวิทยากรบนเวทีสำหรับ 2 ท่าน"]},
      {n:"บาร์", who:"", t:["น้ำดื่มแบบขวดตลอดงานประชุม","เครื่องกดกาแฟ, ชา ช่วงเบรค"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED Screen + Notebook",
        "ไมค์ลอย 3 ตัว + ไมค์โพเดียม 1 ตัว",
        "Pointer · ปลั๊กพ่วง 12 ชุด",
        "เจ้าหน้าที่ Stand by ตลอดงาน",
        "11.11.2026 ลูกค้านำเข้าระบบแสง สี เสียง (เข้า Set 10.11.69 เวลา 17.00 น.)"]},
      {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
        "07.00 น. เซ็ตน้ำเต้าหู้ + ปาท่องโก๋ + เดนิช สำหรับเจ้าหน้าที่และวิทยากร ทั้ง 3 วัน",
        "10.00 น. ว่างเช้า 11/11: แซนด์วิชแฮมชีส (แฮมไก่) + บัวลอย · 12/11: แซนด์วิชทูน่า + ครองแครงกะทิ · 13/11: พัฟไก่ + เดนิชอัลมอนด์",
        "12.00 น. อาหารกลางวันที่ห้องอาหาร Bangkok Sky ชั้น 76/78 (เมนูห้องอาหาร)",
        "14.30 น. ว่างบ่าย 11/11: ซอสเซสโรล (แป้งพาย) + เอแคลร์ · 12/11: ครัวซองท์ไส้แฮม (แฮมไก่) + แยมโรลส้ม · 13/11: ขนมปังไส้หมูหยอง + เค้กท็อฟฟี่"]},
      {n:"แม่บ้าน", who:"คุณโสภา · โทนสีฟ้า-ขาว-เขียว", t:[
        "ดอกไม้ Flower Stand 1 คู่ (บนเวที), โต๊ะลงทะเบียน, โต๊ะวิทยากร",
        "ดอกไม้ที่โซฟารับรอง"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
        "ที่จอดรถ VIP ชั้น 6A ตั้งป้าย (ทะเบียน ** แจ้งตาม **)",
        "ที่จอดรถ 7A, 7B ตั้งป้าย \"สำนักงานปลัดกระทรวงสาธารณสุข\"",
        "เจ้าหน้าที่เดินตรวจบริเวณงาน"]},
      {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณจีรวรรณ / คุณวิระดา", t:[
        "ตรวจสอบความเรียบร้อยภายในงาน",
        "ป้ายวิทยากร + ป้ายกลุ่ม",
        "ป้ายบนห้องอาหาร"]}
    ],
    sales:"NATTAWUT", event:"PORNTIP", approve:"NOPPADON", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 18/11 (FUNCTION 06/11/2026) — หน้าหลัก", src:IMG+"moph-beo.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"ใบ BEO 18/11 — หน้าครัว / Event (อาหารว่าง 3 วัน)", src:IMG+"moph-beo-kitchen.jpg"},
    {dept:"เอกสาร / อื่น ๆ", cap:"คาดการณ์รายได้ 3 วัน รวม 179,375 บาท", src:IMG+"moph-revenue.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โลโก้ กระทรวงสาธารณสุข", src:IMG+"moph-logo-moph.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โลโก้ World Health Organization Thailand", src:IMG+"moph-logo-who.jpg"}
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
    console.info("[Banquet-Event] imported 18/11 MOPH");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import MOPH failed:", e); }
  }, 2500);
})();
