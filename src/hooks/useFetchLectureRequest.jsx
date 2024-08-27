import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 마이페이지 - 강의 신청 목록 custom hook
const useFetchLectureRequest = (lecture_no) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchLectureRequest = async () => {
    try {
      const response = await Axios.get(`${API_URL}api/lecture/request`, {
        withCredentials: true,
      });
      console.log(response);
      setLectures(response.data.lecture_list);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectureRequest();
  }, []);

  return { lectures, loading, error };
};

export default useFetchLectureRequest;
