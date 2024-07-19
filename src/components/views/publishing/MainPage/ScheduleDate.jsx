import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePagenation } from "../../../../hooks/usePagenation";
import { Paging } from "../../Paging/Paging";
import ProfessorScheduleDateBox from "./ProfessorScheduleDateBox";
import { ScheduleEmptyBox } from "./ScheduleEmptyBox";
import StudentScheduleDateBox from "./StudentScheduleDateBox";

// 메인페이지 - 일자별 일정
function ScheduleDate({ value, schedules }) {
  const userinfos = useSelector((state) => state.user);
  const isProfessor = userinfos?.userData?.role === 3;
  const ScheduleBox = isProfessor
    ? ProfessorScheduleDateBox
    : StudentScheduleDateBox;
  const { pageNumbers, currentPage, setCurrentPage } =
    usePagenation(schedules?.length, 3);

  useEffect(() => {}, [currentPage]);
  useEffect(() => setCurrentPage(1), [value]);

  return (
    <div className="scheduleDate">
      <span className="scheduleDate__day">
        {dayjs(value).format("YYYY.MM.DD")}
      </span>
      <div className="scheduleDate__wrapper">
        <div className="scheduleDate__wrapper__item">
          {schedules?.length > 0 ? (
            schedules?.slice(0 
              + 3 * 
              (currentPage - 1)
              , 3 
              + 3 * 
              (currentPage - 1)
            ).map((item, idx) => {
              const commonProps = {
                isLast: 2 === idx % 3 || idx === schedules.length - 1,
                asId: item.assignment_no,
                lectureId: item.lecture_no,
                name: item.as_name,
                type: item.as_type,
                startDate: item.open_time,
                endDate: item.limit_time,
              };

              return (
                <React.Fragment key={item.assignment_no}>
                  {isProfessor ? (
                    <ScheduleBox
                      {...commonProps}
                      studentCount={item.student_count}
                      doneCount={item.done_count}
                    />
                  ) : (
                    <ScheduleBox {...commonProps} done={item.done} />
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <ScheduleEmptyBox />
          )}
          {schedules?.length > 3 &&
            <Paging
              numbers={pageNumbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default ScheduleDate;
