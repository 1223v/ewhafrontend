import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 수강생 조회 페이지 - 수강생 수락 / 거절 custom hook
const useLectureApply = (lecture_no) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const lectureApply = async (user_no, status) => {
    const body = {
      lecture_no: lecture_no,
      user_no: user_no,
      status: status
    };

    try {
      const response = await Axios.post(`${API_URL}api/lecture/apply`, body, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { lectureApply, loading, error };
};

export default useLectureApply;
