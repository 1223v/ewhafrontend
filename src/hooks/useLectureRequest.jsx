import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 학생 수강신청 custom hook
const useLectureRequest = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const lectureRequest = async (code) => {
    const body = {
      code: code
    };

    try {
      const response = await Axios.post(`${API_URL}api/lecture/request`, body, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { lectureRequest, loading, error };
};

export default useLectureRequest;
