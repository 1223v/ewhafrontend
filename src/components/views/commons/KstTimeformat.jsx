import React from "react";

function KstTimeformat({ dateString }) {
  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const kstOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Seoul", // KST 시간대 지정
      };
      const kstDateStr = new Intl.DateTimeFormat("ko-KR", kstOptions).format(
        date
      );

      // "오후 05:00"과 같은 형태로 반환된 문자열을 "2023.01.01 오후 5:00" 형태로 조정할 수 있습니다.
      // 이 예시에서는 직접적인 문자열 조정은 하지 않았습니다.
      return kstDateStr;
    }
  };

  return <span>{formatDate(dateString)}</span>;
}

export default KstTimeformat;
