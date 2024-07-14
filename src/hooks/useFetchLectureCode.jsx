import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 일자별 일정 custom hook
const useFetchLectureCode = (lecture_no) => {
  const [code, setCode] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchLectureCode = async () => {
    try {
      const response = await Axios.get(`${API_URL}api/lecture/code?lecture_no=${lecture_no}`, {
        withCredentials: true,
      });
      setCode(response.data.code);
      setLectureName(response.data.lecture_name);
      setUpdateTime(response.data.update_time);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectureCode();
  }, []);

  return { fetchLectureCode, lectureName, updateTime, code, loading, error };
};

export default useFetchLectureCode;
