window.BE = {
  me: null,
  hotel: "QL",
  view: "events",
  settingsView: "menus",
  funcs: [],
  states: {},
  settings: {},
  db: null,
  dbReady: false,
  syncing: false,
  lastHash: {},
  lastSettings: "",
  editEventId: null,
  editMenu: null
};

const DEFAULT_USERS = [
  {code:"ADMIN", pin:"1234", name:"ชัชวาล (ผู้ดูแลระบบ)", role:"admin", title:"ผู้ดูแลระบบ"},
  {code:"QL01", pin:"1234", name:"PAPHAON", role:"sales", hotel:"QL", title:"Sales · Queensland"},
  {code:"BY01", pin:"1234", name:"NARIN", role:"sales", hotel:"BY", title:"Sales · Baiyoke Sky"},
  {code:"KITCHEN", pin:"1234", name:"ครัวและเบเกอรี่", role:"dept", dept:"ครัว / เบเกอรี่", title:"ฝ่ายครัว · ดูอย่างเดียว"}
];
const DEFAULT_ROOMS = {
  QL:["Diamond Dome 1 ชั้น 22","Diamond Dome 2 ชั้น 22","Diamond Dome 1+2 (รวม) ชั้น 22","Event Hall 02 ชั้น 22","VIP Room ชั้น 22","Pre-Function Area ชั้น 22","Foyer 1 ชั้น 22","Foyer 2 ชั้น 22","Mum's Bistro ชั้น 20"],
  BY:["Rainbow Hall","Rainbow I","Rainbow II","Sky Room 1 – Small","Sky Room 2 – Big","V.I.P. Room","Kontent Space"]
};
const DEFAULT_KINDS = ["ประชุมสัมมนา","งานแต่งงาน","พิธีหมั้น","พิธีมงคลสมรส","งานเลี้ยงบริษัท","คอนเสิร์ต / Meet & Greet","งานโต๊ะจีน","อื่น ๆ"];
const DEFAULT_STAFF = {sales:["—","PAPHAON","SIKSAKA","NUTTAWUT","NARIN"],event:["—","PORNTIP","พรทิพย์"],approve:["—","PATCHARAPOL","PACHARAPOL"]};
const DEFAULT_DEPTS = [
  {n:"ฝ่ายจัดเลี้ยง",who:"",t:["จัดโต๊ะและที่นั่งตามแบบ","โต๊ะลงทะเบียนหน้าห้อง","ยืนยันผังห้องกับลูกค้า"]},
  {n:"ครัว / เบเกอรี่",who:"",t:["ยืนยันเมนูกับครัว","เวลาเสิร์ฟอาหาร"]},
  {n:"ช่าง / อุปกรณ์",who:"",t:["ไมค์และเครื่องเสียง","จอ LED / โปรเจกเตอร์"]},
  {n:"แม่บ้าน",who:"",t:["ผ้าปูและดอกไม้ตกแต่ง","ดูแลความสะอาดระหว่างงาน"]},
  {n:"รปภ. / ที่จอดรถ",who:"",t:["ที่จอดรถผู้ร่วมงาน","เดินตรวจภายในงาน"]}
];
function clone(v){return JSON.parse(JSON.stringify(v));}
function esc(v){return String(v==null?"":v).replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));}
function money(v){return Number(v||0).toLocaleString("th-TH");}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("on");setTimeout(()=>el.classList.remove("on"),1800);}
function setSync(text,kind=""){const el=document.getElementById("syncStatus");if(!el)return;el.textContent=text;el.className="sync "+kind;}
function visibleEvent(x){
  const m=BE.me;if(!m)return false;
  if(m.role==="admin")return true;
  if(m.role==="sales")return x.hotel===m.hotel && (x.sales===m.name || x.event===m.name);
  if(m.role==="dept")return (x.depts||[]).some(d=>d.n===m.dept);
  return false;
}
