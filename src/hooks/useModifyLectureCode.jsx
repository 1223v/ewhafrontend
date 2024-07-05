import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 일자별 일정 custom hook
const useModifyLectureCode = (lecture_no) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const modifyLectureCode = async (status) => {
    const body = {
      lecture_no: lecture_no,
      status: status
    };

    try {
      const response = await Axios.post(`${API_URL}api/lecture/code`, body, {
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

  return { modifyLectureCode, loading, error };
};

export default useModifyLectureCode;
