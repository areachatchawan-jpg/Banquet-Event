# Banquet & Event — Final QA Report

## Scope
Final local QA pass for Queensland Hotel Bangkok + Baiyoke Sky, focused on event creation, hotel separation, menu editing, photo deletion, BEO print/PDF, and Summary/Check print.

## Automated / browser smoke tests
- Main "เพิ่มงาน" button visible: **PASS**
- Duplicate visible main add buttons: **PASS — 1 visible main button**
- Add-event default hotel: **PASS — Queensland**
- Queensland room options: **PASS — 10**
- Baiyoke Sky room options: **PASS — 8**
- Chinese set menu per-event edit: **PASS**
- Buffet menu per-event edit: **PASS**
- Master menu editor present: **PASS**
- Image delete: **PASS — before 1 / after 0**
- BEO title rendered: **PASS — BANQUET EVENT ORDER**
- Queensland BEO hotel identity: **PASS**
- Baiyoke Sky BEO hotel identity: **PASS**
- BEO print header visible under print CSS: **PASS**
- Summary report cards: **PASS — 12 sections/cards detected**
- Page JavaScript errors during smoke test: **PASS — 0 errors**

## PDF checks
- Queensland BEO: **PASS — 1 page, A4**
- Baiyoke Sky BEO: **PASS — 1 page, A4**
- Summary/Check report: **PASS — 7 pages, A4**

## BEO print corrections included
- Hotel-specific header and logo
- BANQUET EVENT ORDER / FUNCTION NO. / PAGE
- Function date and status
- Hotel strip (Queensland / Baiyoke Sky)
- Company / Contact / Phone / Event rows
- Date / Time / Function Room / Guarantee / Set Up table
- PRICE / PAYMENT
- Two-column department structure with full-width continuation rows when needed
- Department title normalization for Banquet Arrangement, F&B Office / Entertainment, Bar Arrangement, Chef / Kitchen / Bakery, Engineering / Equipment, Artist / Backdrop, Security / Parking, Housekeeping, Event, Program
- Signature row
- A4 print layout and print header visibility
- Photo aspect-ratio override to prevent artificial blank space
- Cache-busting query strings for CSS and print-related JS

## Regression protection
The Summary/Check reporting logic was not replaced. The existing report pipeline remains in place, with print styling applied through the print-fix override.

## Files intentionally excluded
Backup files such as `style.css.bak` and `wizard.js.bak` are not included in the final deployment package.
