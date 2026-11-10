/* =============================================================
   One-time import (Queensland)
   - ใบ 20/11 CUD27 โรงเรียนสาธิตจุฬาฯ — งานเลี้ยงรุ่น "มาเหอะ คิดถึง" 14 พ.ย. 2569 (FINAL FUNCTION 10/11/2026)
   ข้อมูลจากใบ BEO + เมนูบุฟเฟ่ต์ 3 หน้า + Backdrop / โปสเตอร์ (img/20261114/)
   ============================================================= */
(function(){
  const MARK = "import_20261114_cud27";
  const IMG = "img/20261114/";
  const MENU = "บุฟเฟ่ต์อาหารค่ำ CUD 27 (14 พ.ย. 69)";

  const MENUS_NEW = {
    [MENU]:[{g:"BUFFET MENU CUD 27 – 14 NOVEMBER 2026", fixed:[
      "Bread Corner: ขนมปังต่าง ๆ",
      "ซุป: ซุปซี่โครงหมูตุ๋นยาจีน (บักกุ๊ดเต๋) หรือ ซุปเห็ดทรัฟเฟิล-ครัวซองต์",
      "Appetizer: หมูแดดเดียว + เนื้อแดดเดียว + ข้าวเหนียว",
      "Appetizer: มันฝรั่งทอด · ข้าวเกรียบ + น้ำพริกเผา · ปีกไก่(กลาง)ทอดเกลือ",
      "Appetizer: ขนมปังหน้าหมู + อาจาด · ปอเปี๊ยะทอด",
      "Appetizer: ลาบไก่ (เผ็ดน้อย เตรียมพริกป่นแยกให้แขกใส่เอง) · ยำวุ้นเส้น (เผ็ดน้อย)",
      "Appetizer: พิซซ่าหน้าฮาวายเอี้ยน / พิซซ่าหน้าซีฟู้ด · กุ้งค็อกเทล + ซอสค็อกเทล",
      "Salad Bar: ผักสลัด มะเขือเทศเชอร์รี่ แตงกวา หอมใหญ่ แครอท ข้าวโพดต้ม ถั่วลันเตาต้ม ลูกเดือยต้ม + มิกซ์สลัด 2 รายการ",
      "Dressing: เธาซันไอแลนด์ / ฝรั่งเศส / อิตาลี / น้ำส้มหมัก / ซอสหวาน / ซีซาร์",
      "Hot Dish: อกไก่ราดซอสเห็ด · ปลากะพงทอดกับซอสทาร์ทาร์ · สตูไก่แบบไทย",
      "Hot Dish: ถั่วหวานผัดปลาหมึก · ข้าวผัดหยางโจว · บะหมี่ฮกเกี้ยน",
      "Pasta: กระทงกุ้งตัวเล็ก Shrimp Gratin (เชฟสมบัติ)",
      "Pasta: สปาเก็ตตี้ ซอสคาโบนาร่าเบคอน เห็ด แฮม / ซอสทะเลรวมมารินาร่า + ขนมปังเนยกระเทียม",
      "Premium Station (เลือก 1): Cutting หมูอบ ย่าง พายปลา ผักสามสี มันอบชีส ซอสแอปเปิ้ล/ทาร์ทาร์ หรือ ซุ้มข้าวหน้าล้น (ข้าวไข่ข้นกุ้งกระเทียมพริกขี้หนู / ข้าวหน้าเนื้อ + ไข่ออนเซ็น) — รอยืนยันว่าเลือกอันไหน",
      "Demon: ผัดไทยกุ้งกรอบ · ก๋วยเตี๋ยวชาบูน้ำตกหมู / เนื้อ",
      "Japanese: บะหมี่เย็น-เทมปุระ · ปูอัด / ไข่หวาน / ปลาดิบ (ปลาสด) เสิร์ฟแบบ 1 จานรวม · ไข่ตุ๋น (เสิร์ฟเป็นถ้วย)",
      "Japanese: Maki ข้าวห่อไส้รวม / ไส้ปูอัด / ไส้ไข่หวาน / ไส้แตง · ซุปเต้าเจี้ยว · ข้าวแกงกะหรี่ + เทมปุระ ผัก + กุ้ง (Tonkatsu)",
      "ของหวาน: เค้กต่าง ๆ · ผลไม้ตามฤดูกาล · ขนมไทยชิ้น · ไอศกรีม · ขนมน้ำแข็งใส",
      "ขนมไทยหม้อร้อน (3 รายการ): บัวลอยเผือก · เต้าทึงเย็น · กล้วยบวชชี",
      "21.00 น. น้ำร้อน + มาม่าคัพ"
    ]}]
  };

  const EV = {
    id:"q20261114_cud27", hotel:"QL", no:"20/11", doc:"Final", status:"ยืนยันแล้ว", kind:"อื่น ๆ",
    title:"งานเลี้ยงรุ่น CUD 27 \"มาเหอะ. คิดถึง\"",
    company:"โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย (CUD27)",
    contact:"คุณนภดล", phone:"", email:"",
    onsite:"", diet:"ลาบไก่ / ยำวุ้นเส้น เผ็ดน้อย (พริกป่นแยก)", ver:1, miles:{}, created:"2026-11-10", updAt:"10 พ.ย. 2569 (FINAL FUNCTION)",
    taxId:"", address:"",
    unit:"ท่าน", guarantee:70, setup:80, style:"Round table", mode:"meal", price:750,
    days:[
      {d:"2026-11-14", time:"18.00 – 23.00 น.", room:"Diamond Dome 2 ชั้น 22", set:"Round table 8 โต๊ะ โต๊ะละ 10 ท่าน · 70 ท่าน set up 80", menu:MENU,
       note:"18.00 น. อาหารค่ำบุฟเฟ่ต์พร้อมทาน (รวม Soft drink) · 21.00 น. น้ำร้อน + มาม่าคัพ · ลูกค้านำเข้าวงดนตรี+เครื่องเสียง SET 15.00 น. · ลูกค้านำสลัดเข้ามาเอง"}
    ],
    rev:[{n:"อาหารค่ำบุฟเฟ่ต์ (รวม Soft drink) — ราคาพิเศษ", price:750, qty:70, times:1},
         {n:"เบียร์สด LEO 1 ถัง (ราคาต้นทุน)", price:3000, qty:1, times:1}],
    dep:{amt:0, when:"ชำระเป็นเงินสด หรือบัตรเครดิต ณ วันงาน"}, pays:[],
    prog:[["15:00","วงดนตรีลูกค้าเข้า SET เครื่องเสียง"],["18:00","เปิดงาน · อาหารค่ำบุฟเฟ่ต์พร้อมทาน"],
          ["21:00","น้ำร้อน + มาม่าคัพ"],["23:00","ปิดงาน"]],
    depts:[
      {n:"Artist / Backdrop / ป้าย", who:"คุณธิตราวรรณ · ผู้รับผิดชอบ คุณอติศักดิ์", t:[
        "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
        "Backdrop: ไฟล์ \"มาเหอะ. คิดถึง\" CUD 27 (ตามรูปแนบ) · เวทีใช้จอ LED",
        "ป้ายต้อนรับ / โปสเตอร์แนวตั้ง: SAT 14 NOV 2026 · AT DIAMOND DOME 2, 22ND FLOOR (ตามรูปแนบ)",
        "รบกวน PR ทำป้ายบอกทางโปสเตอร์ 2 ชุด"]},
      {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
        "ที่นั่งโต๊ะกลม 8 โต๊ะ โต๊ะละ 10 ท่าน",
        "บล็อคไม้สำหรับซุ้มถ่ายรูปหน้าห้อง",
        "โต๊ะลงทะเบียนหน้าห้อง",
        "โต๊ะไลน์อาหารในห้อง + นอกห้อง",
        "โต๊ะวางของด้านข้างเวที",
        "บาร์ในห้อง และบาร์จำหน่ายเครื่องดื่ม เหล้า เบียร์ ไวน์",
        "เวลา 21.00 น. น้ำร้อน นำเข้ามาม่าคัพ",
        "เก้าอี้นักดนตรี 4 ตัว",
        "เวทีขนาด 6 × 3 เมตร ยกจอไว้บนเวที",
        "ลูกค้านำเข้าสลัด กรุณาดูการจัดวาง"]},
      {n:"บาร์", who:"คุณวิรัตน์", t:[
        "น้ำดื่ม Soft drink ตลอดงาน",
        "แก้วไวน์ ถังน้ำแข็ง ที่คีบ สำหรับแขกที่ต้องการชงเอง",
        "เบียร์ LEO 1 ถัง (3,000 บาท ราคาต้นทุน)",
        "ตู้แช่เครื่องดื่มสำหรับขาย",
        "เคาท์เตอร์บาร์สวยงาม"]},
      {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
        "จอ LED + Notebook",
        "ระบบแสง สี เสียง",
        "ไมค์ลอย 4 ตัว, ขาตั้งไมค์ 2 อัน, ขาตั้งโน้ต 2 อัน",
        "ลูกค้านำเข้าวงดนตรี + เครื่องเสียง (SET 15.00 น.)",
        "ชุดคาราโอเกะ",
        "เวทีขนาด 6 × 3 เมตร ยกจอไว้บนเวที",
        "ช่าง Stand by ตลอดงาน"]},
      {n:"ครัว / เบเกอรี่", who:"บุฟเฟ่ต์จัดเลี้ยง คุณปฐมกฤษณ์", t:[
        "18.00 น. อาหารมื้อค่ำพร้อมทาน (เมนูตามแนบ)",
        "21.00 น. น้ำร้อน + มาม่าคัพ",
        "ลูกค้านำเข้าสลัด กรุณาดูการจัดวาง",
        "Premium Station เลือกได้ 1 — รอยืนยัน Cutting หรือ ซุ้มข้าวหน้าล้น"]},
      {n:"แม่บ้าน", who:"คุณอังคณา / คุณโสภา · ธีมสีชมพู ครีม โอรส", t:[
        "ดอกไม้โต๊ะลงทะเบียน",
        "ดอกไม้ Stand Flower 1 คู่ บนเวที",
        "ดอกไม้ซุ้มถ่ายรูป",
        "ดอกไม้โต๊ะกลม จำนวน 8 โต๊ะ"]},
      {n:"รปภ. / ที่จอดรถ", who:"คุณอาทิตย์", t:[
        "ที่จอดรถ ชั้น 1, 2 ตั้งป้าย \"CUD27\"",
        "อำนวยความสะดวกแขกที่มาร่วมงาน"]},
      {n:"Event", who:"คุณพรทิพย์", t:["ตรวจสอบความเรียบร้อยในงาน"]}
    ],
    sales:"NATTAWUT", event:"PORNTIP", approve:"PACHARAPOL", seed:"", adj:[]
  };

  const PHOTOS = [
    {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 20/11 (FINAL FUNCTION 10/11/2026)", src:IMG+"cud27-beo.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"Backdrop จอ LED (แนวนอน)", src:IMG+"cud27-backdrop.jpg"},
    {dept:"Artist / Backdrop / ป้าย", cap:"โปสเตอร์ป้ายต้อนรับ / ป้ายบอกทาง (แนวตั้ง)", src:IMG+"cud27-poster.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ CUD 27 หน้า 1", src:IMG+"cud27-menu-1.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ CUD 27 หน้า 2", src:IMG+"cud27-menu-2.jpg"},
    {dept:"ครัว / เบเกอรี่", cap:"เมนูบุฟเฟ่ต์ CUD 27 หน้า 3", src:IMG+"cud27-menu-3.jpg"}
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
    console.info("[Banquet-Event] imported 20/11 CUD27");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import CUD27 failed:", e); }
  }, 2500);
})();
