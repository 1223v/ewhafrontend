import Axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/Config";

// 메인페이지 - 일자별 일정 custom hook
const useFetchUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUser = async (date) => {
      try {
        const response = await Axios.get(`${API_URL}api/user`, {
          withCredentials: true,
        });
  
        setUserInfo(response.data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { userInfo, loading, error };
};

export default useFetchUser;
