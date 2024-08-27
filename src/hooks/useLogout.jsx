import { message } from "antd";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/Config";

// 로그아웃
const useLogout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const onLogoutHandler = async () => {
    try {
      const response = await Axios.get(`${API_URL}api/user/logout`, {
        withCredentials: true,
      });
      if (response.data.logoutSuccess) {
        navigate("/login");
        message.success("로그아웃 성공하였습니다.");
      }
    } catch (error) {
      setError(error);
      message.error("오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { onLogoutHandler, loading, error };
};

export default useLogout;
