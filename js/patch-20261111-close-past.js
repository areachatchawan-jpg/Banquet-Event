/* =============================================================
   One-time patch (ทั้ง 2 โรงแรม) — ปิดงานที่จบแล้วถึงวันที่ 10 พ.ย. 2569
   ตามคำสั่ง 11 พ.ย. 2569: "งานไหนจบแล้ว สั่งปิดงานและลงเงินให้ครบ งานจบแล้วตรวจครบแล้ว"
   - เฉพาะงานที่วันสุดท้าย <= 2026-11-10 และยังไม่ปิด (งานวันที่ 11 พ.ย. เป็นต้นไปไม่แตะ)
   - ติ๊กงานฝ่ายครบทุกรายการ · บันทึกรับเงินส่วนที่เหลือให้ครบยอด · ปิดงาน
   - ใบ 2/11 กรุงศรี: มีมัดจำ 53,580 (AJ260915023) แต่ยังไม่ได้ลงรับ → ลงมัดจำแยกก่อน
   - QL 10/11 อายิโนะโมะโต๊ะ: อาหารว่าง 150 บาท มี 2 มื้อ (เช้า + บ่าย) แต่ลงไว้ 1 มื้อ
     → แก้เป็น 2 มื้อ ยอดรวม 38,000 ตรงกับใบเสร็จ AC3-261002003 (เดิมแสดงรับเกิน 6,000)
   ทำครั้งเดียว (marker patch_20261111_close_past)
   ============================================================= */
(function(){
  const MARK = "patch_20261111_close_past";
  const CUTOFF = "2026-11-10";
  const PAYDAY = "2026-11-11";
  const NEED = ["patch_20261110_kino_dharmniti_nbtc","patch_20261110_malca_mwit","patch_20261110_rotary_pinthong_moph"];

  const lastDay = x => x.days.map(d=>d.d).sort().slice(-1)[0];
  const term = x => {
    const w=String((x.dep&&x.dep.when)||"");
    if(/วางบิล|เครดิต\s*\d+\s*วัน|credit/i.test(w)) return "วางบิลเครดิต";
    return "เงินสด/บัตร/โอน ตาม BEO";
  };

  function fixOne(x){
    if(x.id==="q20261110_ajinomoto"){
      x.rev.forEach(r=>{ if(/อาหารว่าง 150/.test(r.n) && (r.times||1)===1){ r.n="อาหารว่าง 150 บาท/มื้อ (เช้า + บ่าย)"; r.times=2; } });
    }
    x.pays=x.pays||[];
    if(x.dep && x.dep.amt>0 && received(x)===0)
      x.pays.push({d:"—", amt:x.dep.amt, note:"มัดจำ — "+String(x.dep.when||"").split("·")[0].trim()});
    const left=total(x)-received(x);
    if(left>0) x.pays.push({d:thDate(PAYDAY), amt:left, note:"ชำระครบ ("+term(x)+") · ปิดงานย้อนหลัง"});

    const st=state[x.id] || (state[x.id]={menu:x.days.map(d=>initSel(d.menu)),done:new Set(),menuOverrides:{},photos:[]});
    st.done=st.done||new Set();
    x.depts.forEach((d,di)=>(d.t||[]).forEach((_,ti)=>st.done.add(di+"-"+ti)));

    const who=(typeof me!=="undefined" && me && me.name) ? me.name : "Admin";
    x.closed=true; x.closedBy=who+" (ปิดงานย้อนหลัง)"; x.closedAt=thDate(PAYDAY,true);
    x.status="ปิดงานแล้ว";
  }

  async function run(){
    if(!dbOn || !sb || !dbReady || syncBusy) return false;
    const m=await sb.from(T_SET).select("id").eq("id",MARK).maybeSingle();
    if(m.error && m.error.code!=="PGRST116") throw m.error;
    if(m.data) return true;
    const pre=await sb.from(T_SET).select("id").in("id",NEED);
    if(pre.error) throw pre.error;
    if((pre.data||[]).length<NEED.length) return false;   // รอ patch 10 พ.ย. ทำงานให้ครบก่อน

    const list=FUNCS.filter(x=>!x.closed && lastDay(x)<=CUTOFF);
    list.forEach(fixOne);
    await autoSync();
    if(lastDbError) return false;

    const now=new Date().toISOString();
    const {error}=await sb.from(T_SET).upsert({ id:MARK, data:{ at:now, ids:list.map(x=>x.id) }, updated_at:now });
    if(error) throw error;

    try{ renderList(); renderHero(false); renderRev(); if(cur){ renderBEO(); renderPhotos(); renderSend(); } }catch(e){}
    console.info("[Banquet-Event] closed", list.length, "past events");
    return true;
  }

  let tries=0;
  const t=setInterval(async ()=>{
    if(++tries>150){ clearInterval(t); return; }
    try{ if(await run()) clearInterval(t); }
    catch(e){ console.error("[Banquet-Event] close-past failed:", e); }
  }, 3500);
})();
