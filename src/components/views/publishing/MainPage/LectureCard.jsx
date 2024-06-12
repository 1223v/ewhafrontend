import React from "react";
import LectureTag from "./LectureTag";

// 메인페이지 - 강의 카드
function LectureCard({ name, count, year, semester, major, seperated }) {
  return (
    <div className="lectureCard">
      <span className="lectureCard_name">{name}</span>
      <span className="lectureCard_count">{count}개 게시중</span>
      <div className="lectureCard_tag">
        <LectureTag
          className="gr"
          txt={`${year}-${semester}`}
          closeAbsence={false}
        />
        <LectureTag
          className="bl"
          txt={`${major} ${seperated}`}
          closeAbsence={false}
        />
      </div>
    </div>
  );
}

export default LectureCard;
