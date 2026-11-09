/* =========================================================
   calendar.js — ปฏิทินงาน: แต่ละวันมีงานที่โรงแรมไหน กี่งาน
   แสดงทั้ง 2 โรงแรมเสมอ (ตามสิทธิ์ที่ผู้ใช้ดูได้)
   ========================================================= */
const THMONFULL=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
let calYM=todayStr().slice(0,7), calSel=todayStr();

function calJobsOn(dateStr){
  return FUNCS.filter(x=>visible(x) && x.days.some(d=>d.d===dateStr));
}
function calMove(n){
  const [y,m]=calYM.split("-").map(Number), d=new Date(y,m-1+n,1);
  calYM=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
  calSel = todayStr().slice(0,7)===calYM ? todayStr() : calYM+"-01";
  renderCal();
}
function calToday(){ calYM=todayStr().slice(0,7); calSel=todayStr(); renderCal(); }
function calPick(ds){ calSel=ds; renderCal(); }

function renderCal(){
  const box=document.getElementById("calBox"); if(!box || !me) return;
  const [y,m]=calYM.split("-").map(Number);
  const first=new Date(y,m-1,1), nDays=new Date(y,m,0).getDate(), lead=first.getDay(), t=todayStr();
  const ds=d=>calYM+"-"+String(d).padStart(2,"0");

  // สรุปทั้งเดือน
  const monthJobs=FUNCS.filter(x=>visible(x) && x.days.some(d=>d.d.slice(0,7)===calYM));
  const mQL=monthJobs.filter(x=>x.hotel==="QL").length, mBY=monthJobs.filter(x=>x.hotel==="BY").length;
  const busy=new Set(); monthJobs.forEach(x=>x.days.forEach(d=>{ if(d.d.slice(0,7)===calYM) busy.add(d.d); }));

  let cells="";
  for(let i=0;i<lead;i++) cells+=`<div class="cc empty"></div>`;
  for(let d=1; d<=nDays; d++){
    const k=ds(d), jobs=calJobsOn(k);
    const q=jobs.filter(x=>x.hotel==="QL").length, b=jobs.filter(x=>x.hotel==="BY").length;
    const clash=jobs.some(x=>clashesOf(x).some(c=>c.d===k));
    const cls=["cc", k===t?"today":"", k===calSel?"sel":"", jobs.length?"has":"", k<t?"past":""].join(" ");
    cells+=`<button class="${cls}" onclick="calPick('${k}')" aria-label="${d} ${THMONFULL[m-1]} · Queensland ${q} งาน · Baiyoke Sky ${b} งาน">
      <span class="dn">${d}${clash?`<i class="cx" title="มีห้องชน">!</i>`:""}</span>
      ${q?`<span class="hq ql">Q <b>${q}</b></span>`:""}${b?`<span class="hq by">B <b>${b}</b></span>`:""}
    </button>`;
  }

  // รายละเอียดวันที่เลือก
  const sel=calJobsOn(calSel);
  const group=h=>{
    const list=sel.filter(x=>x.hotel===h).sort((a,c)=>{
      const ta=(a.days.find(d=>d.d===calSel)||{}).time||"", tc=(c.days.find(d=>d.d===calSel)||{}).time||"";
      return ta<tc?-1:1; });
    if(!list.length) return "";
    return `<div class="calh ${h==="QL"?"ql":"by"}"><img src="${LOGO[h]}" alt=""><b>${HOTELNAME[h]}</b><span>${list.length} งาน</span></div>`
      + list.map(x=>{
          const rows=x.days.filter(d=>d.d===calSel);
          return `<button class="calj" onclick="calOpen('${x.id}')">
            <div class="ct">${rows.map(r=>`<b>${r.time}</b><span>${r.room}</span>`).join("")}</div>
            <div class="cb"><h4>${x.title}</h4>
              <div class="foot"><span class="tag2">ใบ ${x.no}</span><span class="tag2">${x.kind}</span>
                <span class="tag2">${x.mode==="rent"?"เช่าห้อง":x.mode==="pack"?"เหมาแพ็กเกจ":x.guarantee+" "+x.unit}</span>
                <span class="stt"><s></s>${x.status}</span>${wfTags(x)}</div></div>
          </button>`;
        }).join("");
  };
  const qn=sel.filter(x=>x.hotel==="QL").length, bn=sel.filter(x=>x.hotel==="BY").length;

  box.innerHTML=`
    <div class="calbar">
      <button class="ghost" onclick="calMove(-1)" aria-label="เดือนก่อน">‹</button>
      <h2>${THMONFULL[m-1]} ${y+543}</h2>
      <button class="ghost" onclick="calMove(1)" aria-label="เดือนถัดไป">›</button>
      <button class="ghost" style="margin-left:auto" onclick="calToday()">วันนี้</button>
    </div>
    <div class="calsum">
      <span><i class="ql"></i>Queensland <b>${mQL}</b> งาน</span>
      <span><i class="by"></i>Baiyoke Sky <b>${mBY}</b> งาน</span>
      <span>วันที่มีงาน <b>${busy.size}</b> วัน</span>
    </div>
    <div class="calgrid">${THDAY.map(d=>`<div class="cw">${d}</div>`).join("")}${cells}</div>
    <div class="card" style="margin-top:14px">
      <div class="band"><span>${thDate(calSel,true)}</span><span class="who">${sel.length?`รวม ${sel.length} งาน · Queensland ${qn} · Baiyoke ${bn}`:"ไม่มีงาน"}</span></div>
      <div class="pad">${sel.length? group("QL")+group("BY") : `<div class="empty" style="padding:14px 0">วันนี้ยังไม่มีงาน</div>`}</div>
    </div>`;
}
function calOpen(id){
  const x=FUNCS.find(y=>y.id===id); if(!x) return;
  if(hotel!=="ALL" && hotel!==x.hotel && !(me && me.role==="sales")){ setHotel(x.hotel); }
  open_(id);
}
