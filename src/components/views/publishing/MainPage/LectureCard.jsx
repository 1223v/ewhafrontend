import React from "react";
import { useNavigate } from "react-router-dom";
import LectureTag from "./LectureTag";

// 메인페이지 - 강의 카드
function LectureCard({ id, name, count, year, semester, major, seperated }) {
  const navigate = useNavigate();
  return (
    <div className="lectureCard" onClick={() => navigate(`/prob/list/professor?lecture_no=${id}`)}>
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
