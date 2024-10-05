import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 수강생 조회 페이지 - 수강생 목록  custom hook
const useFetchStudentList = (lecture_no) => {
  const [studentList, setStudentList] = useState([]);
  const [lectureName, setLectureName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await Axios.get(`${API_URL}api/lecture/students?lecture_no=${lecture_no}`, {
          withCredentials: true,
        });
        setWaitList(response.data.users);
	setLectureName(response.data.lecture_name);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentList();
  }, []);

  return { studentList, lectureName, loading, error };
};

export default useFetchStudentList;
