import React from "react";
import { MYPAGE } from "../../../../constants/text";
import { usePagenation } from "../../../../hooks/usePagenation";
import { Paging } from "../../Paging/Paging";
import { CurrentLecTd } from "./CurrentLecTd";
import { CurrentLecTh } from "./CurrentLecTh";

// 마이페이지 - 진행 중의 강의 테이블
export const CurrentLecTable = ({ lectures }) => {
  const filteredLectures = lectures?.filter(el => el.year === MYPAGE.CURRENT_LEC.year && el.semester === MYPAGE.CURRENT_LEC.semester);
  const { pageNumbers, currentPage, setCurrentPage } =
    usePagenation(filteredLectures.length);
  return (
    <>
      <table className="currentLecTable">
        <thead>
          <CurrentLecTh />
        </thead>
        <tbody>
          {
            filteredLectures
            ?.map((lec, idx) => (
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
      {filteredLectures?.length > 6 &&
        <Paging
          numbers={pageNumbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </>
  )
}