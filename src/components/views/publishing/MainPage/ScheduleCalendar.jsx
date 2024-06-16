import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { Calendar } from 'react-calendar';

import "../../../../../node_modules/react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import { ScheduleCalendarNext } from './ScheduleCalendarNext';
import { ScheduleCalendarPrev } from './ScheduleCalendarPrev';

// 메이페이지 - 달력
function ScheduleCalendar({ 
  value, 
  onChange,
  mark 
}) {
  // const { value, onChange } = useSchedules();

  // 년 & 월 변경
  const handleMonthChange = (e) => {
    console.log(e);
    onChange(dayjs(e.activeStartDate).toDate());
  }

  // 일자 변경
  const handleDate = (e) => {
    console.log(e);
    onChange(e);
  }
  
  return (
    <div className='scheduleCalendar'>
      <Calendar 
        value={value}
        onChange={handleDate}
        formatDay={(local, date) => dayjs(date).format("D")}
        prevLabel={
          <ScheduleCalendarPrev 
            value={value}
            onChange={onChange}
          />
        }
        nextLabel={
          <ScheduleCalendarNext
            value={value}
            onChange={onChange}
          />
        }
        next2Label={null}
        prev2Label={null}
        onDrillDown={handleMonthChange}
        tileContent={({ date, view }) => {

          const html = [];
          mark?.forEach((m, i) => {
            const formattedDate = dayjs(date).format("YYYY-MM-DD");
            if (m === formattedDate) {
              const isSelected = formattedDate === dayjs(value).format("YYYY-MM-DD");
              html.push(
                <div 
                  key={i}
                  className={classNames("dot", { selected: isSelected })}
                ></div>
              );
            }
          });
          return html;
      }}
        // calendarType="gregory"
        // minDetail="year"
      />
    </div>
  )
}

export default ScheduleCalendar