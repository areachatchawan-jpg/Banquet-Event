# Banquet & Event — Final Ready

ระบบจัดการ Banquet & Event สำหรับ Queensland และ Baiyoke Sky

## โครงสร้าง
- `index.html` — หน้าเว็บหลัก
- `css/style.css` — UI / Responsive / Theme
- `js/core.js` — Login / สิทธิ์ / Dashboard / รายการงาน
- `js/wizard.js` — เพิ่มงาน 6 ขั้นตอน
- `js/beo.js` — ใบสั่งงานและรายละเอียด Event
- `js/food-editor.js` — แก้เมนูเฉพาะ Event
- `js/media.js` — เพิ่ม/ดู/ลบรูป
- `js/database.js` — Supabase persistence
- `js/admin.js` — ตั้งค่าระบบ
- `js/report.js` — Report / KPI
- `js/data.js` — Master data

## จุดที่แก้ใน Final
- เอาปุ่ม `＋ เพิ่มงาน` ซ้ำจากหัวเดือนออก เหลือปุ่มหลักจุดเดียวในหน้า "รวมงาน"
- รองรับ Queensland / Baiyoke Sky / รวม 2 แห่ง โดยแยกห้องตามโรงแรม
- เมนูโต๊ะจีนและบุฟเฟ่ต์แก้เฉพาะ Event ได้
- เพิ่ม / แก้ / ลบรายการอาหารใน Event ได้
- มีปุ่มคืนค่าเมนูมาตรฐาน
- เพิ่มรูปได้และลบรูปได้ พร้อมยืนยันก่อนลบ
- ลบรูปแล้ว sync กลับฐานข้อมูลผ่าน state ของ Event
- ถ้าฐานข้อมูลตอบกลับว่าไม่มีงานเลย ระบบจะไม่โหลดงานตัวอย่างจาก `data.js` กลับมา
- คง Supabase เดิมและตาราง `be_functions`, `be_settings`

## Deploy
วางไฟล์ทั้งหมดใน repository root และใช้ GitHub Pages `main / (root)`

ดูผลตรวจใน `TEST-REPORT.md`


## BEO Print Layout Fix — 19 Sep 2026
- Function Order / ใบสั่งงาน now uses a fixed two-column department layout matching the reference style.
- Hotel identity is explicit in the printed header for Queensland Hotel Bangkok vs Baiyoke Sky Hotel Bangkok.
- Existing event, price, payment, department, menu, program, and approval data remain data-driven; no new business data is invented.
- The Summary/Check report print path is unchanged.

## Workflow Update — 9 Nov 2026 (ลดการประชุม)
- `js/workflow.js` (ใหม่)
  - **เวอร์ชันใบสั่งงาน**: ทุกงานมี V1, V2… ปุ่ม "＋ ออกใบแก้ไข" ในการ์ดสถานะงาน ใส่หัวข้อ/รายละเอียด และติ๊กแผนกที่ได้รับผลกระทบ
  - **แผนกกดรับทราบ**: ทุกการ์ดแผนกมีแถบสถานะ ยังไม่รับทราบ / รับทราบแล้ว / ต้องรับทราบใหม่ (เมื่อมีใบแก้ไข) ผู้ใช้แผนกกด "รับทราบ" เอง หรือ Sales/Admin บันทึกแทนได้ และมีปุ่ม "มีคำถาม"
  - **เส้นตาย D-14 / D-7 / D-3 / D-1**: ติ๊กเมื่อทำเสร็จ ขึ้นสีแดงเมื่อเลยกำหนด
  - **ตรวจห้องชน**: วันเดียวกัน + เวลาทับกัน + ห้องรวม (เช่น Dome 1+2 ชนกับ Dome 1) ไม่นับห้องอาหาร/เอาท์เล็ต
  - แท็กบนการ์ดหน้ารวมงาน: ⚠ ห้องชน · รอรับทราบ N แผนก · ❓ คำถาม · ⏰ เลย D-x
- ฟิลด์ใหม่: อีเมล, ผู้ติดต่อหน้างาน, ข้อจำกัด/แพ้อาหาร (แสดงในใบ BEO, ข้อความส่ง LINE และใบพิมพ์)
- ใบพิมพ์ BEO แสดง `UPDATE FUNCTION วันที่` + เลขเวอร์ชัน
- แก้บั๊กวันที่เลื่อนไป 1 วันในเวลาไทย (ตอนเพิ่มงานใหม่และเพิ่มวันในหน้าตั้งค่า)
- ข้อมูลใหม่ทั้งหมดเก็บในตัวงาน จึงบันทึกลง Supabase ตาราง `be_functions` เดิมโดยไม่ต้องแก้ฐานข้อมูล
- **หน้าปฏิทิน** (`js/calendar.js`): ดูทั้งเดือน แต่ละวันแสดง Q = Queensland / B = Baiyoke Sky พร้อมจำนวนงาน, ! = มีห้องชน แตะวันที่เพื่อดูรายการงานแยกตามโรงแรม และแตะงานเพื่อเปิดใบสั่งงาน
- **KPI ใหม่** "รับทราบใบสั่งงานก่อนวันงาน" (น้ำหนัก 15) นับเฉพาะงานที่จัดตั้งแต่ 9 พ.ย. 2569
