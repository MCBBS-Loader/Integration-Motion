/* MCBBS Module
id = mext.myreportreason
name = 自定义举报理由
description = 允许举报爱好者自定义举报理由。
author = MExt
*/
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
