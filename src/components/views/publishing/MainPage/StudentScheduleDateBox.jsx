import React from "react";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";
import ScheduleDateBoxInfo from "./ScheduleDateBoxInfo";

// 메인페이지 - 일자별 일정 박스
function StudentScheduleDateBox({
  isLast,
  asId,
  lectureId,
  name,
  type,
  startDate,
  endDate,
  done,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="scheduleDateBox student"
      onClick={() =>
        navigate(`/prob/detail/student?as_no=${asId}&lecture_no=${lectureId}`)
      }
    >
      <div className="scheduleDateBox-box">
        <div className="scheduleDateBox-box__line ">
          {/* <div className="scheduleDateBox__line__circle">
          </div> */}
          <p className="scheduleDateBox__line line_style"></p>
        </div>
        <div className="scheduleDateBox-info">
          <ScheduleDateBoxInfo
            name={name}
            type={type}
            startDate={startDate}
            endDate={endDate}
          />
          <span className="scheduleDateBox-info__complete">
            {done === 0 ? <span>미제출</span> : <span>제출 완료</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudentScheduleDateBox;
