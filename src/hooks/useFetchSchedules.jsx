import Axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 일자별 일정 custom hook
const useFetchSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async (date) => {
    try {
      const response = await Axios.get(`${API_URL}api/calendar/prob?date=${dayjs(date).format("YYYY-MM-DD")}`, {
        withCredentials: true,
      });

      if (Array.isArray(response.data.assignments)) {
        setSchedules(response.data.assignments);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchSchedules();
  // }, []);

  return { fetchSchedules, schedules, loading, error };
};

export default useFetchSchedules;
