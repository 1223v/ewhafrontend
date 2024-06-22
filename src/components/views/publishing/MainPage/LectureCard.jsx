import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropdownModal from "../../Modal/DropdownModal";
import LectureTag from "./LectureTag";

// 메인페이지 - 강의 카드
function LectureCard({
  id,
  name,
  count,
  year,
  semester,
  major,
  seperated,
  professor,
}) {
  const userinfos = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div
      className="lectureCard"
      onClick={() => navigate(`/prob/list/professor?lecture_no=${id}`)}
    >
      <div className="lectureCard_name-wrapper">
        <div className="lectureCard_name">{name}</div>
        {userinfos?.userData?.role === 3 && (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownModal lectureNo={id} />
          </div>
        )}
      </div>

      {userinfos?.userData?.role === 3 ? (
        <span className="lectureCard_count">{count}개 게시중</span>
      ) : (
        <span className="lectureCard_count">{professor} 교수님</span>
      )}
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
