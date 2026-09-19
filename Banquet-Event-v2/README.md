# Banquet & Event v2

โครงสร้างใหม่สำหรับ Queensland + Baiyoke Sky โดยใช้ Supabase เดิม

## จุดที่แก้หลัก
- หน้าเพิ่มงานใช้ได้จาก Queensland, Baiyoke Sky และ “รวม 2 แห่ง”
- “รวม 2 แห่ง” ไม่ถูกส่งเป็นรหัสโรงแรม `ALL` ไปหาห้องอีกต่อไป
- เมนูโต๊ะจีน/บุฟเฟ่ต์แก้เฉพาะ Event ได้ โดยไม่แก้ Master Menu
- คืนค่าเมนูมาตรฐานได้
- แก้ Master Menu ได้จากตั้งค่า
- ใช้ตาราง `be_functions` และ `be_settings` เดิม

## วิธีใช้
1. แตก ZIP แล้วเปิดผ่าน static web server หรือ GitHub Pages
2. Supabase เดิมถูกตั้งไว้ใน `js/config.js`
3. Login เริ่มต้นสำหรับทดสอบ: ADMIN / 1234

## หมายเหตุ
Version นี้ตั้งใจเป็นโครงใหม่ที่อ่านง่ายและแยกไฟล์ ไม่ควรนำไปแทน Production จนกว่าจะทดสอบกับข้อมูลจริงครบทุกหน้าที่ต้องการ
