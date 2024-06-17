import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
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
  return (
    <div className="scheduleDate">
      <span className="scheduleDate__day">
        {dayjs(value).format("YYYY.MM.DD")}
      </span>
      <div className="scheduleDate__wrapper">
        {/* <div className="scheduleDateBox-box__line">
          {schedules?.length > 0 && (
            <>
            <div className='scheduleDateBox-box__line__circle'>
              <span className={`scheduleDateBox__line__circle__item a`}></span>
              <span className={`scheduleDateBox__line__circle__item b`}></span>
              <span className={`scheduleDateBox__line__circle__item c`}></span>
            </div>
            <p className="scheduleDateBox__line"></p>
            </>
          )}
        </div> */}
        <div className="scheduleDate__wrapper__item">
          {schedules?.length > 0 ? (
            schedules?.slice(0, 3).map((item, idx) => {
              const commonProps = {
                isLast:
                  schedules.length - 1 >= 3 ? 2 : schedules.length - 1 === idx,
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
        </div>
      </div>
    </div>
  );
}

export default ScheduleDate;
