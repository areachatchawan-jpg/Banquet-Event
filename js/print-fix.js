/* Banquet & Event — Print Fix v1.0
   Purpose: make "สรุป/ตรวจ > บันทึก / พิมพ์รายงาน" print with the same
   report layout/styles as the on-screen report.

   Root cause fixed:
   The old openPrintable() copied only inline <style> blocks and omitted
   the external css/style.css stylesheet. The print tab therefore rendered
   as mostly unstyled HTML.
*/
(function(){
  "use strict";

  function absUrl(href){
    try { return new URL(href, location.href).href; }
    catch(e){ return href; }
  }

  function collectStyles(){
    var links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(function(l){ return absUrl(l.getAttribute("href")); })
      .filter(Boolean);

    var inline = Array.from(document.querySelectorAll("style"))
      .map(function(s){ return s.textContent || ""; })
      .join("\n");

    return {links: links, inline: inline};
  }

  function safeTitle(title){
    return String(title || "Banquet Event Report")
      .replace(/[\\/:*?"<>|]/g, "")
      .slice(0, 80);
  }

  function openPrintable(sectionId, bodyClass, title){
    var secEl = document.getElementById(sectionId);
    if(!secEl){
      if(typeof window.toast === "function") window.toast("ไม่พบส่วนรายงานสำหรับพิมพ์");
      return;
    }

    /* Open immediately to avoid popup-blocking after async stylesheet loading. */
    var w = null;
    try { w = window.open("", "_blank"); } catch(e) {}

    if(!w){
      /* Fallback: print current document using the same report class. */
      try{
        var cls = bodyClass ? bodyClass.split(/\s+/).filter(Boolean) : [];
        cls.forEach(function(c){ document.body.classList.add(c); });
        window.print();
        setTimeout(function(){
          cls.forEach(function(c){ document.body.classList.remove(c); });
        }, 500);
      }catch(e){
        if(typeof window.toast === "function")
          window.toast("เบราว์เซอร์ไม่อนุญาตหน้าพิมพ์ กรุณาอนุญาต pop-up แล้วลองใหม่");
      }
      return;
    }

    var styles = collectStyles();
    var linksHtml = styles.links.map(function(href){
      return '<link rel="stylesheet" href="' +
        href.replace(/&/g,"&amp;").replace(/"/g,"&quot;") + '">';
    }).join("\n");

    var cls = bodyClass || "";
    var html = '<!DOCTYPE html><html lang="th" data-theme="light">' +
      '<head>' +
      '<meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>' + safeTitle(title) + '</title>' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&family=Noto+Serif+Thai:wght@500;600&display=swap" rel="stylesheet">' +
      linksHtml +
      '<style>' + styles.inline + '</style>' +
      '<style>' +
      'html,body{background:#fff!important;margin:0!important;padding:0!important}' +
      'body.repPrint #repHead{display:block!important}' +
      'body.repPrint .sectionhead,body.repPrint .scope{display:none!important}' +
      'body.repPrint .tabs,body.repPrint .top,body.repPrint .lb,body.repPrint .toast,' +
      'body.repPrint .modal,body.repPrint #gate,body.repPrint .prbar{display:none!important}' +
      'body.repPrint .view{display:none!important;padding-top:0!important}' +
      'body.repPrint #view-rev{display:block!important}' +
      'body.repPrint .shell{padding:0!important;max-width:none!important}' +
      'body.repPrint{--paper:#fff;--card:#fff;--ink:#1c171e;--muted:#5d5560;' +
      '--line:#cfc7c0;--soft:#F4F1ED;--band:#EAE3F0}' +
      'body.repPrint *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}' +
      '@page{size:A4;margin:9mm}' +
      '@media print{' +
        'body.repPrint .card{break-inside:avoid}' +
        'body.repPrint details.chk{break-inside:avoid}' +
        'body.repPrint .rgrid.two{grid-template-columns:1fr 1fr!important}' +
        'body.repPrint .kpis{grid-template-columns:repeat(4,1fr)!important}' +
      '}' +
      '</style>' +
      '</head><body class="' + cls + '">' +
      '<div class="prbar" style="padding:10px 0;max-width:1180px;margin:0 auto">' +
      '<button class="save" onclick="window.print()">พิมพ์ / บันทึก PDF</button>' +
      '</div>' +
      '<div class="shell">' + secEl.outerHTML + '</div>' +
      '</body></html>';

    try{
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();

      /* Wait for styles/fonts/images to settle before invoking print. */
      var printed = false;
      function doPrint(){
        if(printed) return;
        printed = true;
        try { w.print(); } catch(e) {}
      }

      if(w.document.readyState === "complete"){
        setTimeout(doPrint, 900);
      }else{
        w.addEventListener("load", function(){ setTimeout(doPrint, 500); }, {once:true});
        setTimeout(doPrint, 1800);
      }
    }catch(e){
      try { w.close(); } catch(_){}
      if(typeof window.toast === "function")
        window.toast("เปิดหน้าพิมพ์ไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  }

  /* Override the global used by report.js printReport()/printSheet(). */
  window.openPrintable = openPrintable;

  /* Add a marker so the page can be checked easily in DevTools. */
  window.__BANQUET_PRINT_FIX__ = "1.0";
})();
