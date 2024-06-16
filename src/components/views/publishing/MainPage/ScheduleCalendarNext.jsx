import dayjs from 'dayjs';
import { IoChevronForwardOutline } from "react-icons/io5";

export const ScheduleCalendarNext = ({
  value,
  onChange
}) => {
  return (
    <div className='scheduleCalendar__img'
      onClick={() => {
        const newValue = dayjs(value).add(1, 'month').startOf('month').toDate();
        onChange(newValue);
        console.log(newValue);
      }}
    >
      <IoChevronForwardOutline />
    </div>
  )
}