import { message } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 수강생 조회 페이지 - 수강생 + 대기 목록 custom hook
const useFetchStudentWaitList = (lecture_no) => {
  const [studentList, setStudentList] = useState([]);
  const [waitList, setWaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentList();
    fetchWaitList();
  }, []);

  // 수강생 승인 / 거절
  const applyStudent = async (user_no, status) => {
    const body = {
      lecture_no: lecture_no,
      user_no: user_no,
      status: status
    };

    const hide = message.loading('승인 중입니다.');

    try {
      const response = await Axios.post(`${API_URL}api/lecture/apply`, body, {
        withCredentials: true,
      });

      console.log(response.data);

      await fetchStudentList();
      await fetchWaitList();
      hide();
      await message.success(`${status ? "수락" : "거절"} 되었습니다.`);

      return response.data;
    } catch (error) {
      setError(error);
      hide();
      message.error("승인 실패하였습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 수강생 목록 fetch
  const fetchStudentList = async () => {
    try {
      const response = await Axios.get(`${API_URL}api/lecture/students?lecture_no=${lecture_no}`, {
        withCredentials: true,
      });
      setStudentList(response.data.users);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 대기 목록 fetch
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

  return { studentList, waitList, applyStudent, loading, error };
};

export default useFetchStudentWaitList;
