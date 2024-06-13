import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import useFetchCalendars from '../../../../hooks/useFetchCalendar';
import useFetchSchedules from '../../../../hooks/useFetchSchedules';
import "./Schedule.css";
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleDate from './ScheduleDate';

// 메인페이지 - 달력 + 일자별 일정
export function Schedule() {
  const [value, onChange] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(dayjs(new Date()).format("YYYY-MM"));
  const { fetchSchedules, schedules, loading, error } = useFetchSchedules(value);
  const { fetchCalendars, calendars } = useFetchCalendars(value);

  // 달
  // // const compareMonth = (newDate, currentMonth) => {
  //   if(currentMonth === dayjs(newDate).format("YYYY-MM")) return true;
  //   else return false;
  // }
  useEffect(() => {
    fetchSchedules(value);
    fetchCalendars(value);
  }, [value]);

  return (
    <section id='schedule'>
      <div className='schedule__wrapper'>
        <ScheduleCalendar
          value={value}
          onChange={onChange}
          mark={calendars}
        />
        <ScheduleDate
          value={value}
          schedules={schedules}
        />
      </div>
    </section>
  )
}
