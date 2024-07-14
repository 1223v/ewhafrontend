import Axios from "axios";
import { useCallback } from "react";
import { API_URL } from "../components/Config";

const useDeleteLecture = (
  fetchLectures
) => {
  const deleteLecture = 
  useCallback(
    (lectureNo) => {
      
      if (window.confirm("삭제하시겠습니까?")) {
        Axios.get(`${API_URL}api/lecture/delete?lecture_no=${lectureNo}`, {
          withCredentials: true,
        }).then((response) => {
          // 요청이 성공한 경우의 처리
          alert(response.data.msg);
          fetchLectures();
        });
      }
    },
    [fetchLectures]
  );

  return deleteLecture;
};
export default useDeleteLecture;
