import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import useFetchCalendars from '../../../../hooks/useFetchCalendar';
import useFetchSchedules from '../../../../hooks/useFetchSchedules';
import { useSchedules } from '../../../../hooks/useSchedules';
import "./Schedule.css";
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleDate from './ScheduleDate';

// 메인페이지 - 달력 + 일자별 일정
export function Schedule() {
  const [value, onChange] = useState(new Date());
  const { setCurrentMonth, compareMonth } = useSchedules();
  const { fetchSchedules, schedules, loading, error } = useFetchSchedules(value);
  const { fetchCalendars, calendars } = useFetchCalendars(value);

  useEffect(() => {
    const isChn = compareMonth(value);
    console.log(isChn);
    fetchSchedules(value);
    if (isChn) {
      setCurrentMonth(dayjs(value).format("YYYY-MM"));
      fetchCalendars(value)
    };
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
