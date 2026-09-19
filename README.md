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
