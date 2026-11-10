/* =============================================================
   One-time import (Baiyoke Sky) — Central Pattana Team building 5 วัน
   - ใบ 4/11  Asset Group 5 — พุธ 4 พ.ย. 2569   · 109 ท่าน (FINAL FUNCTION 23/10/2026)
   - ใบ 5/11  Asset Group 5 — พฤหัส 5 พ.ย. 2569 · 109 ท่าน (FINAL FUNCTION 23/10/2026)
   - ใบ 6/11  Asset Group 4 — จันทร์ 9 พ.ย. 2569 · 104 ท่าน (FINAL FUNCTION 22/10/2026)
   - ใบ 7/11  Asset Group 5 — อังคาร 10 พ.ย. 2569 · 105 → 100 ท่าน (ใบแก้ไข 28 ต.ค. 2569)
   - ใบ 8/11  Asset Group 5 — จันทร์ 16 พ.ย. 2569 · 106 → 127 ท่าน set up 130 (ใบแก้ไข 28 ต.ค. 2569)
   ข้อมูลจากใบ BEO + ใบแก้ไข + แบบฟอร์มรายละเอียดลูกค้า Asset 5 + โปสเตอร์ (img/20261104/)
   ============================================================= */
(function(){
  const MARK = "import_20261104_cpn";
  const MENU_CG = "บุฟเฟ่ต์กลางวัน Crystal Grill ชั้น 82";
  const IMG = "img/20261104/";

  const G5 = {name:"Asset Group 5", branches:"Central Chaengwattana · Central Pinklao · Central Bangna · Central Rama 9 · Central Esplanade", poster:"cpn5-poster.jpg"};
  const G4 = {name:"Asset Group 4", branches:"Central Westgate · Central Rama 2", poster:"cpn4-poster.jpg"};

  const CC = "Account / Banquet / ครัว 18 / Bakery / Fruit Court / Steward / F&B / ครัว 15 / ครัว 80";

  function make(o){
    const g=o.g, pax=o.pax, set=o.setup;
    const thDay=o.th; // เช่น "วันพุธที่ 4 พ.ย. 2569"
    return {
      id:o.id, hotel:"BY", no:o.no, doc:"Final", status:"ยืนยันแล้ว", kind:"ประชุมสัมมนา",
      title:"Team building "+g.name+" — Central Pattana ("+g.branches+")",
      company:"บริษัท เซ็นทรัล พีเพิล ดีเวลลอปเมนท์ เซ็นเตอร์ จำกัด",
      contact:"คุณสุภาภรณ์ มีปลอด", phone:"081-444-5165", email:"mesupaporn@centralpattana.co.th",
      onsite:"", diet:"", ver:o.adj?2:1, miles:{}, created:o.created,
      updAt:o.adj? "28 ต.ค. 2569 (ใบแก้ไข · "+o.adj.topic+")" : o.final+" (FINAL FUNCTION)",
      taxId:"0105551040525",
      address:"999/9 ถ.พระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
      unit:"ท่าน", guarantee:pax, setup:set, style:"U-Shape", mode:"meal", price:950,
      days:[
        {d:o.d, time:"09.00 – 18.00 น.", room:"Rainbow Hall", set:"ชั้น 17 · U-Shape เฉพาะเก้าอี้ "+pax+" ท่าน · "+pax+" ท่าน set up "+set+(o.adj?" (ตามใบแก้ไข)":""), menu:"ไม่มีอาหาร",
         note:"07.30 น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช · ว่างเช้า 11.00 แซนวิชทูน่า, บราวนี่, ผลไม้ · ว่างบ่าย 17.00 ขนมปังไส้กรอกไก่, เค้กวานิลา (ใส่ถุงกระดาษ) · ไลน์เบรคที่ Foyer · ธีม ทอง-ขาว / ทอง-ดำ"},
        {d:o.d, time:"13.15 – 15.15 น.", room:"Crystal Grill ชั้น 82", set:"Lunch "+pax+" ท่าน set up "+set+" · VIP 2 โต๊ะ โต๊ะละ 6 ท่าน (ลงอาหาร)", menu:MENU_CG,
         note:"บุฟเฟ่ต์กลางวันห้องอาหาร Crystal Grill · Event ตั้งป้ายบนห้องอาหาร"}
      ],
      rev:[{n:"อาหารว่าง (2 มื้อ)", price:150, qty:pax, times:2},
           {n:"บุฟเฟ่ต์อาหารกลางวัน Crystal Grill ชั้น 82", price:650, qty:pax, times:1}],
      dep:{amt:0, when:"วางบิลเครดิต 30 วัน (ติดต่อวางบิล คุณสุภาภรณ์ มีปลอด 081-444-5165)"}, pays:[],
      prog:[["07:30","น้ำเต้าหู้ + ปาท่องโก๋ + เดนิช สำหรับเจ้าหน้าที่และวิทยากร"],["09:00","ลงทะเบียน / เริ่มกิจกรรม"],["11:00","อาหารว่างเช้า (Foyer)"],
            ["13:15","อาหารกลางวันบุฟเฟ่ต์ Crystal Grill ชั้น 82"],["17:00","อาหารว่างบ่าย (ใส่ถุงกระดาษ)"],["18:00","ปิดงาน"]],
      depts:[
        {n:"Artist / Backdrop / ป้าย", who:"คุณธิดารัตน์ · ผู้รับผิดชอบ คุณอภิศักดิ์", t:[
          "Stand Poster ที่ Lobby / ลิฟต์ลานจอด / หน้าห้องจัดงาน",
          "Backdrop: Central Pattana — Team building "+g.name+" (ตามโปสเตอร์แนบ · ลูกค้าขอให้ทีมออกแบบทำเอง)",
          "จัดทำข้อความ LED ธีม ทอง-ขาว / ทอง-ดำ",
          "ป้ายต้อนรับ: ยินดีต้อนรับ · "+thDay+" เวลา 09.00–18.00 น. ณ ห้องเรนโบว์ ฮอลล์ ชั้น 17 โรงแรมใบหยกสกาย",
          "รบกวน PR ทำป้ายบอกทาง ธีม ทอง-ขาว / ทอง-ดำ"]},
        {n:"F&B Office", who:"", t:[
          "รับประทานอาหารกลางวัน ห้องอาหาร Crystal Grill ชั้น 82 · "+pax+" ท่าน",
          "โต๊ะอาหารสำหรับ VIP จำนวน 2 โต๊ะ โต๊ะละ 6 ท่าน (ลงอาหาร)"]},
        {n:"ฝ่ายจัดเลี้ยง", who:"คุณวิรัตน์", t:[
          "ที่นั่งเฉพาะเก้าอี้แบบ U-Shape จำนวน "+pax+" ท่าน"+(o.adj?" (ตามใบแก้ไข · ใบ BEO เดิม "+o.adj.oldPax+" ท่าน)":""),
          "น้ำดื่มบน Station",
          "โต๊ะวิทยากรบนเวที สำหรับ 2 ท่าน + น้ำดื่ม + แก้วน้ำ + หลอด"+(g===G5?" (แบบฟอร์มลูกค้า: โต๊ะวิทยากร 1 ตัว สำหรับ 3 ท่าน — ยืนยันกับลูกค้า)":""),
          "โต๊ะลงทะเบียนหน้าห้อง จำนวน 1 ชุด",
          "ฟลิปชาร์ต จำนวน 5 ชุด พร้อมกระดาษ + ดินสอ",
          "ไลน์เบรคที่ Foyer",
          "โซฟารับรองในห้อง VIP, ห้องประชุมข้างเวที",
          "เครื่องสแกนบัตรจอดรถพร้อมพนักงานดูแล"]},
        {n:"บาร์", who:"", t:["น้ำดื่มแบบขวดตลอดงานประชุม","เครื่องกดกาแฟ, ชา ช่วงเบรค"]},
        {n:"ช่าง / อุปกรณ์", who:"คุณกรกฎ 089-0770436", t:[
          "Notebook + LED Screen + จอ Screen",
          "ไมค์ลอย 3 ตัว",
          "เจ้าหน้าที่ Stand by ตลอดงาน",
          "ปลั๊กพ่วง จำนวน 8 ชุด"]},
        {n:"ครัว / เบเกอรี่", who:"อาหารว่าง คุณเอกสันต์ · บุฟเฟ่ต์ คุณรวีวรรณ / คุณผุสดี", t:[
          "07.30 น. เซ็ตน้ำเต้าหู้ + ปาท่องโก๋ + เดนิช สำหรับเจ้าหน้าที่และวิทยากร",
          "11.00 น. อาหารว่างเช้าพร้อมเสิร์ฟ: แซนวิชทูน่า, บราวนี่, ผลไม้",
          "13.15 น. รับประทานอาหารกลางวัน ห้องอาหาร Crystal Grill ชั้น 82",
          "17.00 น. อาหารว่างบ่ายพร้อมเสิร์ฟ: ขนมปังไส้กรอกไก่, เค้กวานิลา (ใส่ถุงกระดาษ)"]},
        {n:"แม่บ้าน", who:"คุณโสภา (ทอง + ขาว)", t:["ดอกไม้ Flower Stand 1 คู่ (บนเวที) / โต๊ะลงทะเบียน / โต๊ะวิทยากร"]},
        {n:"รปภ. / ที่จอดรถ", who:"คุณนิพนธ์", t:[
          "รปภ. เดินตรวจภายในงาน และที่บริเวณหน้างาน",
          "ที่จอดรถ VIP ที่ชั้น 6A จำนวน 4 คัน \"ทะเบียนแจ้งตาม\"",
          "ที่จอดรถที่ชั้น 6A, 6B ตั้งป้ายว่า \"เซ็นทรัลพัฒนา\""]},
        {n:"Event", who:"คุณพรทิพย์ · Event in charge คุณวิระดา / คุณจีรวรรณ", t:[
          "ตรวจสอบความเรียบร้อยภายในงาน",
          "ป้ายตั้งบนห้องอาหาร"]}
      ],
      sales:"MAHADEE", event:"PORNTIP", approve:"NOPPADON", seed:"",
      adj:o.adj? [{date:"28 ต.ค. 2569", topic:o.adj.topic, ver:2, by:"ณัฐวุฒิ ชมภูบุตร (Sales Manager)", cc:CC,
                   from:["การันตี "+o.adj.oldPax+" ท่าน Set up "+o.adj.oldSet+" ท่าน"], to:["การันตี "+pax+" ท่าน Set up "+set+" ท่าน"]}] : []
    };
  }

  const E4 = make({id:"q20261104_cpn5", no:"4/11", g:G5, d:"2026-11-04", th:"วันพุธที่ 4 พ.ย. 2569", pax:109, setup:110, created:"2026-10-23", final:"23 ต.ค. 2569"});
  const E5 = make({id:"q20261105_cpn5", no:"5/11", g:G5, d:"2026-11-05", th:"วันพฤหัสบดีที่ 5 พ.ย. 2569", pax:109, setup:110, created:"2026-10-23", final:"23 ต.ค. 2569"});
  const E6 = make({id:"q20261109_cpn4", no:"6/11", g:G4, d:"2026-11-09", th:"วันจันทร์ที่ 9 พ.ย. 2569", pax:104, setup:110, created:"2026-10-22", final:"22 ต.ค. 2569"});
  const E7 = make({id:"q20261110_cpn5", no:"7/11", g:G5, d:"2026-11-10", th:"วันอังคารที่ 10 พ.ย. 2569", pax:100, setup:110, created:"2026-10-23", final:"23 ต.ค. 2569",
                   adj:{topic:"ลดจำนวนการันตี", oldPax:105, oldSet:110}});
  const E8 = make({id:"q20261116_cpn5", no:"8/11", g:G5, d:"2026-11-16", th:"วันจันทร์ที่ 16 พ.ย. 2569", pax:127, setup:130, created:"2026-10-23", final:"23 ต.ค. 2569",
                   adj:{topic:"เพิ่มจำนวนการันตี", oldPax:106, oldSet:110}});

  const poster = g => ({dept:"Artist / Backdrop / ป้าย", cap:"โปสเตอร์ Team building "+g.name+" ("+g.branches+")", src:IMG+g.poster});
  const beo = (no, f, file) => ({dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO "+no+" (FINAL FUNCTION "+f+")", src:IMG+file});

  const LIST = [
    [E4,[beo("4/11","23/10/2026","cpn5-beo-0411.jpg"), poster(G5)]],
    [E5,[beo("5/11","23/10/2026","cpn5-beo-0511.jpg"), poster(G5)]],
    [E6,[beo("6/11","22/10/2026","cpn4-beo-0911.jpg"), poster(G4)]],
    [E7,[beo("7/11","23/10/2026","cpn5-beo-1011.jpg"),
         {dept:"เอกสาร / อื่น ๆ", cap:"ใบ BEO 7/11 ฉบับลงนาม (Sales / Event / Chief Accountant / Approved)", src:IMG+"cpn5-beo-1011-signed.jpg"},
         {dept:"เอกสาร / อื่น ๆ", cap:"ใบแก้ไข 28 ต.ค. 2569 — การันตี 105 → 100 ท่าน (Set up 110)", src:IMG+"cpn5-adj-1011.jpg"},
         poster(G5)]],
    [E8,[beo("8/11","23/10/2026","cpn5-beo-1611.jpg"),
         {dept:"เอกสาร / อื่น ๆ", cap:"ใบแก้ไข 28 ต.ค. 2569 — การันตี 106 → 127 ท่าน · Set up 110 → 130", src:IMG+"cpn5-adj-1611.jpg"},
         poster(G5)]]
  ];

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;

    syncBusy=true;
    try{
      const now=new Date().toISOString();
      for(const [EV,PHOTOS] of LIST){
        if(FUNCS.some(y=>y.id===EV.id)) continue;
        state[EV.id]={ menu:EV.days.map(d=>initSel(d.menu)), done:new Set(), menuOverrides:{},
                       photos:PHOTOS.map((p,i)=>({...p, id:EV.id+"_i"+i})) };
        const payload={ f:EV, st:packState(EV.id) };
        const {error}=await sb.from(T_FUNC).upsert({ id:EV.id, data:payload, updated_at:now });
        if(error){ delete state[EV.id]; throw error; }
        FUNCS.push(EV);
        lastHash[EV.id]=snapFunc(EV);
      }
      FUNCS.sort((a,b)=> a.days[0].d===b.days[0].d ? (a.no<b.no?-1:1) : (a.days[0].d<b.days[0].d?-1:1));
      const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:LIST.map(x=>x[0].id) }, updated_at:now });
      if(error) throw error;
    } finally { syncBusy=false; }

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] imported Central Pattana 4/11, 5/11, 6/11, 7/11, 8/11");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] import 20261104 cpn failed:", e); }
  }, 2500);
})();
