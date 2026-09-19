function renderPhotos(){
  const x=f(); if(!x) return;
  const s=state[cur];
  phWho.textContent=x.title;
  const cats=["ทั้งหมด",...deptNames(x)];
  if(!cats.includes(phCat)) phCat="ทั้งหมด";
  catbar.innerHTML=cats.map(c=>{
    const n = c==="ทั้งหมด"? s.photos.length : s.photos.filter(p=>p.dept===c).length;
    return `<button aria-pressed="${phCat===c}" onclick="setCat('${c.replace(/'/g,"")}')">${c}${n?" "+n:""}</button>`;
  }).join("");
  const shown = phCat==="ทั้งหมด"? s.photos : s.photos.filter(p=>p.dept===phCat);
  view = shown;
  phgrid.innerHTML = shown.map((p,i)=>`<div class="ph">
      <button class="phview" type="button" onclick="openLB(${i})" aria-label="เปิดรูป ${esc(p.cap)}">
        <img src="${p.src}" alt="${esc(p.cap)}" loading="lazy"><span class="tag">${esc(p.dept)} — ${esc(p.cap)}</span>
      </button>
      ${canEdit()?`<button class="phdel" type="button" onclick="deletePhoto('${esc(p.id)}');event.stopPropagation()">🗑 ลบ</button>`:''}</div>`).join("")
    + `<button class="add" onclick="picker.click()"><span style="font-size:22px">＋</span>เพิ่มรูป</button>`;
  if(!shown.length) phgrid.insertAdjacentHTML("afterbegin",
    `<div class="empty" style="grid-column:1/-1">ยังไม่มีรูปของฝ่ายนี้ กดเพิ่มรูปเพื่อแนบผังห้อง แบบป้าย หรือรูปตัวอย่าง</div>`);
}
function setCat(c){ phCat=c; renderPhotos(); }
let upDept=null;
function addTo(dept){ upDept=dept; picker.click(); }
picker.addEventListener("change", async e=>{
  const files=[...e.target.files]; e.target.value="";
  const dept = upDept || (phCat==="ทั้งหมด" ? OTHER : phCat);
  upDept=null;
  for(const file of files){
    const src=await shrink(file);
    state[cur].photos.push({id:"p"+Date.now()+Math.random(), dept, cap:file.name.replace(/\.[^.]+$/,""), src});
  }
  renderPhotos(); renderBEO(); renderSend();
});
function openDeptLB(dept,i){ view=state[cur].photos.filter(p=>p.dept===dept); openLB(i); }
function deletePhoto(photoId){
  const x=f(); if(!x || !canEdit()) return;
  const st=state[x.id]; if(!st) return;
  const photo=st.photos.find(p=>p.id===photoId); if(!photo) return;
  askConfirm("ลบรูปภาพ", `ต้องการลบรูป “${esc(photo.cap)}” ใช่หรือไม่?`, ()=>{
    st.photos=st.photos.filter(p=>p.id!==photoId);
    if(view.some(p=>p.id===photoId)){
      view=view.filter(p=>p.id!==photoId);
      if(lb.classList.contains("on")){
        if(!view.length){ closeLB(); }
        else { idx=Math.min(idx,view.length-1); paint(); }
      }
    }
    renderPhotos(); renderBEO(); renderSend(); renderRev(); autoSync();
    toast("ลบรูปแล้ว");
  });
}

function shrink(file, max=1280, q=.7){
  return new Promise(res=>{
    const img=new Image(), url=URL.createObjectURL(file);
    img.onload=()=>{
      const s=Math.min(1,max/Math.max(img.width,img.height));
      const c=document.createElement("canvas");
      c.width=Math.round(img.width*s); c.height=Math.round(img.height*s);
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);
      URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg",q));
    };
    img.onerror=()=>{ URL.revokeObjectURL(url); res(""); };
    img.src=url;
  });
}

/* ---------------- lightbox ---------------- */
let view=[], idx=0, sc=1, tx=0, ty=0, start=null;
const lbimg=document.getElementById("lbimg");
function openLB(i){ idx=i; sc=1; tx=ty=0; paint(); lb.classList.add("on"); document.body.style.overflow="hidden"; }
function closeLB(){ lb.classList.remove("on"); document.body.style.overflow=""; }
function step(d){ idx=(idx+d+view.length)%view.length; sc=1; tx=ty=0; paint(); }
function paint(){
  const p=view[idx]; if(!p) return closeLB();
  lbimg.src=p.src; lbcap.textContent=p.cap; lbn.textContent=(idx+1)+" / "+view.length; apply();
}function deleteCurrentPhoto(){
  const p=view[idx]; if(!p) return;
  deletePhoto(p.id);
}

function apply(){ lbimg.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`; lbhint.style.opacity = sc>1?0:1; }
function clamp(){
  const m=(sc-1)*lbimg.clientWidth/2, n=(sc-1)*lbimg.clientHeight/2;
  tx=Math.max(-m,Math.min(m,tx)); ty=Math.max(-n,Math.min(n,ty));
}
const dist=t=>Math.hypot(t[0].clientX-t[1].clientX, t[0].clientY-t[1].clientY);
lb.addEventListener("touchstart",e=>{
  lbimg.classList.add("dragging");
  if(e.touches.length===2) start={mode:"pinch", d:dist(e.touches), sc};
  else start={mode:"pan", x:e.touches[0].clientX, y:e.touches[0].clientY, tx, ty};
},{passive:true});
lb.addEventListener("touchmove",e=>{
  if(!start) return;
  if(start.mode==="pinch" && e.touches.length===2){ sc=Math.max(1,Math.min(5,start.sc*dist(e.touches)/start.d)); clamp(); apply(); }
  else if(start.mode==="pan" && sc>1){ tx=start.tx+(e.touches[0].clientX-start.x); ty=start.ty+(e.touches[0].clientY-start.y); clamp(); apply(); }
  e.preventDefault();
},{passive:false});
lb.addEventListener("touchend",e=>{
  lbimg.classList.remove("dragging");
  if(start && start.mode==="pan" && sc===1 && e.changedTouches.length){
    const dx=e.changedTouches[0].clientX-start.x;
    if(Math.abs(dx)>60) step(dx<0?1:-1);
  }
  if(e.touches.length===0) start=null;
},{passive:true});
let lastTap=0;
lbimg.addEventListener("click",()=>{ const now=Date.now(); if(now-lastTap<320){ sc=sc>1?1:2.6; tx=ty=0; apply(); } lastTap=now; });
lb.addEventListener("wheel",e=>{ e.preventDefault(); sc=Math.max(1,Math.min(5,sc*(e.deltaY<0?1.12:.89))); if(sc===1) tx=ty=0; clamp(); apply(); },{passive:false});
let md=null;
lbimg.addEventListener("mousedown",e=>{ if(sc>1){ md={x:e.clientX,y:e.clientY,tx,ty}; e.preventDefault(); }});
window.addEventListener("mousemove",e=>{ if(md){ tx=md.tx+e.clientX-md.x; ty=md.ty+e.clientY-md.y; clamp(); apply(); }});
window.addEventListener("mouseup",()=>md=null);
window.addEventListener("keydown",e=>{
  if(!lb.classList.contains("on")) return;
  if(e.key==="Escape") closeLB();
  if(e.key==="ArrowRight") step(1);
  if(e.key==="ArrowLeft") step(-1);
});

/* ---------------- executive report ---------------- */
let scope="one";
