import dayjs from 'dayjs';
import { IoChevronBackOutline } from "react-icons/io5";

export const ScheduleCalendarPrev = ({
  value,
  onChange
}) => {
  return (
    <div className='scheduleCalendar__img'
      onClick={() => {
        const newValue = dayjs(value).subtract(1, 'month').startOf('month').toDate();
        onChange(newValue);
        console.log(newValue);
      }}
    >
      <IoChevronBackOutline />
    </div>
  )
}