# Final Test Report

วันที่ทดสอบ: 19 กันยายน 2026

## Static checks
- JavaScript ทุกไฟล์ผ่าน `node --check`
- ตรวจโครงสร้าง HTML และลำดับ script แล้ว
- แยก HTML/CSS/JS ออกจากไฟล์เดิมเพื่อแก้ไขง่ายขึ้น

## Automated integration checks
ทดสอบด้วย Chromium แบบ headless พร้อม Supabase mock เพื่อทดสอบ workflow โดยไม่แก้ข้อมูล Production:

### Hotel / Event
- Admin login
- Queensland
- Baiyoke Sky
- รวม 2 แห่ง
- เพิ่มงานจากหน้ารวม 2 แห่ง
- ค่าเริ่มต้นของโรงแรมจริงไม่ใช้ `ALL`
- ห้องเปลี่ยนตามโรงแรม
- สร้าง Event ใหม่
- เปิด Event / ใบสั่งงาน

### Menu
- โต๊ะจีน 11,500 บาท/โต๊ะ
- เปิด Event Menu Editor
- แก้รายการอาหารเฉพาะ Event
- บันทึก override
- คืนค่าเมนูมาตรฐาน
- Buffet group ที่มี `pick` จำกัดจำนวนการเลือก
- เพิ่ม/ลบ/แก้รายการอาหารใน Event
- ตรวจว่าการแก้ Event ไม่แก้ Master Menu
- ตรวจว่า `menuOverrides` ถูกเก็บใน state ที่ sync กับฐานข้อมูล

### Modules
- รวมงาน
- ใบสั่งงาน
- รูปแนบ
- ส่งงาน
- ใบสรุป/Sheet
- รายงาน/KPI
- Admin
- Master Menu
- ห้องจัดงาน
- ฐานข้อมูล/Sync

### Permissions
- Admin เห็นทุกระบบ
- Sales ถูกจำกัดโรงแรมของตนเอง
- Sales ยังเพิ่มงานโรงแรมของตนเองได้
- Department ไม่สามารถเปิด Admin/Report และไม่มีสิทธิ์เพิ่มงาน
- Navigation guard ป้องกันการเปิดหน้า Admin/Report/Add โดยตรงเมื่อไม่มีสิทธิ์

## Production limitation
การทดสอบครั้งนี้ไม่ได้เขียน/ลบข้อมูลจริงใน Supabase Production และเครื่องมือทดสอบไม่สามารถ resolve network ไปยัง Supabase ภายนอกได้ จึงไม่ได้อ้างว่าได้ทดสอบการเชื่อมต่อ Production แบบ live network แล้ว

Source ยังคงใช้ Supabase URL/ตารางเดิมของระบบเดิม เพื่อให้ deploy แล้วเชื่อมข้อมูลชุดเดิมได้
