import dayjs from "dayjs";
import { useState } from "react";

export const useSchedules = () => {
  const [value, onChange] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(dayjs(value).format("YYYY-MM"));

  // 월자 비교
  const compareMonth = (month) => {
    if (dayjs(month).format("YYYY-MM") !== currentMonth) return true;
    else return false;
  };

  return { value, onChange, compareMonth, currentMonth, setCurrentMonth};
}