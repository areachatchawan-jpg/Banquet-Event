# Banquet & Event — Final Test Report

## Build scope
- Queensland + Baiyoke Sky
- Single add-event action on the main Event List page
- Event-specific menu overrides for Chinese set menus and buffet menus
- Photo upload and photo deletion with confirmation
- Supabase persistence via `be_functions` and `be_settings`
- Role-based access: Admin / Sales / Department

## Automated checks completed
- JavaScript syntax check: PASS for all JS files
- Local asset/reference check: PASS for all local CSS/JS references
- HTML duplicate ID check: PASS
- Inline handler reference check: PASS
- Main Event List add-event button count: PASS (1)
- Monthly duplicate add-event buttons removed: PASS
- Photo delete function exists and filters the event photo state: PASS
- Photo deletion triggers `autoSync()`: PASS
- Lightbox delete action exists: PASS
- Database empty-table guard clears bundled sample events after a successful empty query: PASS
- Sales hotel guard: PASS
- Master Menu vs Event Menu override separation: PASS by source-level verification

## Important production behavior
1. `index.html` is the only main entry point at repository root.
2. `＋ เพิ่มงาน` appears once on the main Event List page. Admin's separate settings page may contain its own add button by design.
3. Event photo deletion removes the photo from the event state and triggers database synchronization.
4. A successful empty `be_functions` query no longer resurrects bundled demo/sample jobs.
5. Event-specific food edits are stored in `menuOverrides` and do not modify the Master Menu.

## Verification limitation
A full live-browser interaction test against the deployed GitHub Pages/Supabase environment could not be completed inside the isolated execution environment used for this build. The package was therefore validated with source-level, syntax, structural, and module-level checks; production data was not modified during testing.

## Print / PDF Verification - 19 Sep 2026
- BEO print template rebuilt around the existing sample layout: Final Function bar, Banquet Event Order header, hotel logo, function/date/status, event detail table, pricing/payment, 2-column department blocks, menu/program/adjustment blocks, and approval signature row.
- Removed the hard-coded `PAGE 1 / 1` label so multi-page jobs do not show an incorrect page count.
- Print CSS explicitly restores the BEO header (`.print-sheet .top`) so the site header rule does not hide the printable document header.
- A4 portrait print layout verified with a generated 2-page test PDF.
- Verified no clipped header, missing logo, overlapping department blocks, or broken table structure in the rendered test pages.
- Browser Print / Save as PDF continues to use the print template via the existing print flow.
