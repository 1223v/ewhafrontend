import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 일자별 일정 custom hook
const useFetchWaitList = (lecture_no) => {
  const [waitList, setWaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWaitList = async () => {
      try {
        const response = await Axios.get(`${API_URL}api/lecture/apply?lecture_no=${lecture_no}`, {
          withCredentials: true,
        });
        setWaitList(response.data.wait_list);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWaitList();
  }, []);

  return { waitList, loading, error };
};

export default useFetchWaitList;
