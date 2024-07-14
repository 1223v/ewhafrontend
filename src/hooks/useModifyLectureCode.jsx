import { message } from "antd";
import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 수강생 조회 페이지 - 코드 on/off custom hook
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
      message.success(`코드가 ${!status ? "비": ""}활성화되었습니다.`);
      return response.data;
    } catch (error) {
      setError(error);
      message.error("오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { modifyLectureCode, loading, error };
};

export default useModifyLectureCode;
