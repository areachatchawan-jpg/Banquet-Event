# Banquet & Event — FINAL READY

ระบบจัดการ Banquet & Event สำหรับ Queensland และ Baiyoke Sky

## โครงสร้าง
- `index.html` — หน้าเว็บหลักและโครงสร้าง UI
- `css/style.css` — สี, layout, responsive/mobile, print
- `js/data.js` — Master Menu, ห้อง, งานตัวอย่าง/ข้อมูลตั้งต้น
- `js/core.js` — login, สิทธิ์, เปลี่ยนโรงแรม, dashboard/list
- `js/beo.js` — ใบสั่งงาน, รายละเอียดงาน, รับเงิน, checklist
- `js/media.js` — รูปแนบและดูรูปเต็มจอ
- `js/report.js` — รายงาน/KPI/ตรวจสอบ/พิมพ์รายงาน
- `js/wizard.js` — เพิ่มงาน 6 ขั้นตอน
- `js/admin.js` — ตั้งค่าระบบสำหรับ Admin
- `js/food-editor.js` — แก้เมนูเฉพาะ Event โดยไม่เปลี่ยน Master Menu
- `js/database.js` — Supabase load/save/sync

## ฐานข้อมูล
ใช้ Supabase เดิมของระบบ โดยใช้ตาราง:
- `be_functions`
- `be_settings`

ไม่มีการเปลี่ยน schema เพราะเมนูที่แก้เฉพาะ Event ถูกเก็บใน JSON state ของ Event (`menuOverrides`)

## จุดที่แก้หลัก
1. เพิ่มงานจาก Queensland / Baiyoke Sky / รวม 2 แห่งได้
2. เมื่อเลือก “รวม 2 แห่ง” ระบบไม่ส่ง `ALL` ไปเป็นโรงแรมจริง
3. เปลี่ยนโรงแรมใน Wizard แล้วห้องเปลี่ยนตามทันที
4. Sales ถูกจำกัดให้อยู่โรงแรมของตนเอง
5. Department ไม่เห็นปุ่มเพิ่มงานและเข้าหน้าตั้งค่าไม่ได้จาก navigation
6. โต๊ะจีนแบบ Fixed แก้รายการอาหารเฉพาะ Event ได้
7. Buffet ที่เป็นแบบเลือกจำนวนรายการมี checkbox และจำกัดจำนวนตาม `pick`
8. เพิ่ม/ลบ/แก้รายการอาหารเฉพาะ Event ได้
9. มี “คืนค่ามาตรฐาน” สำหรับเมนู Event
10. Master Menu ยังแยกออกจาก Event Override
11. รองรับงานหลายวัน, หลายห้อง, ใบสั่งงาน, checklist, รูปแนบ, ส่งงาน, report, KPI, Admin, print/PDF

## การนำขึ้น GitHub Pages
ให้นำไฟล์ทั้งหมดใน ZIP ไปแทนไฟล์เดิมที่ root ของ Repository `Banquet-Event` โดยคงโครงสร้าง `css/` และ `js/` ไว้

ไม่ต้องเปลี่ยน GitHub Pages จาก `main / (root)`

สำรอง `index.html` เดิมก่อนแทนที่เพื่อ rollback ได้ทันที
