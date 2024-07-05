import React from "react";
import { CurrentLecTd } from "./CurrentLecTd";
import { CurrentLecTh } from "./CurrentLecTh";

// 마이페이지 - 진행 중의 강의 테이블
export const CurrentLecTable = ({ lectures }) => {
  return (
    <table className="currentLecTable">
      <thead>
        <CurrentLecTh />
      </thead>
      <tbody>
        {
          lectures?.map((lec, idx) => (
            <React.Fragment key={lec.lecture_no}>
              <CurrentLecTd 
                idx={idx + 1}
                lec_no={lec.lecture_no}
                lecture_name={lec.lecture_name}
                major={lec.major}
                separated={lec.separated}
                assignment_count={lec.assignment_count}
                attendee_count={lec.attendee_count}
              />
            </React.Fragment>
          ))
        }
      </tbody>
    </table>
  )
}