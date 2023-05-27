import React from "react";

function loadExternalJS() {
  const scriptJquery = document.createElement("script");
  scriptJquery.src = "https://textae.pubannotation.org/lib/textae.min.js";
  scriptJquery.async = true;

  // 생성된 script 요소들을 body에 붙여주세요
  document.body.appendChild(scriptJquery);
}

export default loadExternalJS;
