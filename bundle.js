/* MCBBS Module
id = mext.bundle
name = MExt 模块整合
version = 1.0.0
description = 整合后的 MExt 模块。
updateURL = https://cdn.jsdelivr.net/gh/MCBBS-Loader/Integration-Motion@main/bundle.js
author = MExt
*/
// Fix
var $ = MCBBS.$;
var unsafeWindow = window;
var dlg = console.log;
MCBBS.createConfig(
  "myReportReason",
  "自定义举报理由",
  "text",
  "在举报时提供自定义的举报理由，以英文逗号分开。"
);
let getReasons = () => {
  let reportReason = MCBBS.getConfigVal("myReportReason", "").split(",");
  let rrstr = '<p class="mtn mbn">';
  $(reportReason).each((i, v) => {
    rrstr +=
      "<label><input type=\"radio\" name=\"report_select\" class=\"pr\" onclick=\"$('report_other').style.display='none';$('report_msg').style.display='none';$('report_message').value='" +
      v +
      '\'" value="' +
      v +
      '"> ' +
      v +
      "</label><br>";
  });
  rrstr += "</p>";
  return rrstr;
};
let hookReportWin = () => {
  if ($("#report_reasons[appended]").length > 0) {
    return false;
  }
  let reportContent = getReasons();
  $("#report_reasons").attr("appended", "true").before(reportContent);
};
$("#append_parent").on("DOMNodeInserted", hookReportWin);
$("head").append(`<style>#scrolltop {
bottom: 270px!important;
visibility: visible;
overflow-x: hidden;
width: 75px;
}
.scrolltopa {
transition-duration: .15s;
margin-left: -40px;
opacity: 0;
}
.scrolltopashow {
margin-left: 0px;
opacity: 1;
}</style>`);
unsafeWindow.showTopLink = () => {
  let ft = $("#ft")[0];
  if (ft) {
    let scrolltop = $("#scrolltop")[0];
    if (!scrolltop) {
      return false;
    }
    let scrolltopbtn = $(".scrolltopa");
    let scrollHeight = parseInt(document.body.getBoundingClientRect().top);
    let basew = parseInt(ft.clientWidth);
    let sw = scrolltop.clientWidth;
    if (basew < 1000) {
      let left = parseInt(fetchOffset(ft)["left"]);
      left = left < sw ? left * 2 - sw : left;
      scrolltop.style.left = basew + left + 44 + "px";
    } else {
      scrolltop.style.left = "auto";
      scrolltop.style.right = 0;
    }
    if (scrollHeight < -100) {
      scrolltopbtn.addClass("scrolltopashow");
    } else {
      scrolltopbtn.removeClass("scrolltopashow");
    }
  }
};
showTopLink();
const clearAutoPlay = () => {
  $("iframe[id*=iframe_mp3]:not([id*=no_autoplay])").each((i, v) => {
    // 重构播放器,去除自动播放属性
    let player = document.createElement("iframe");
    let hidden = document.createElement("div");
    hidden.id = v.id;
    hidden.style.display = "none";
    player.id = v.id + "_no_autoplay";
    player.width = v.width;
    player.height = v.height;
    player.frameBorder = v.frameBorder;
    player.allow = v.allow;
    player.src = v.src.replace("&auto=1", "");
    v.after(hidden);
    v.after(player);
    v.remove();
    dlg("Canceled all autoplay");
  });
};
$(this).on("ThreadPreviewOpened ThreadFlushFinished NewReplyAppended", () => {
  setTimeout(clearAutoPlay, 100);
});
$(clearAutoPlay);
