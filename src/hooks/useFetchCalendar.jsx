import Axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 달력 일정 리스트 custom hook
const useFetchCalendars = ({ date }) => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCalendars = async ( date ) => {
    try {
      const response = await Axios.get(`${API_URL}api/calendar?date=${dayjs(date).format("YYYY-MM-DD")}`, {
        withCredentials: true,
      });

      if (Array.isArray(response.data.date)) {
        setCalendars(response.data.date);
      } else {
        setCalendars([]);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  return { fetchCalendars, calendars, loading, error };
};

export default useFetchCalendars;
