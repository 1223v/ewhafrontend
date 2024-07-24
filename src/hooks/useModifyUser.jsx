import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 마이페이지 - 개인정보 수정 custom hook
const useModifyUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const modifyUser = async ({
    name,
    major
  }) => {
    const body = {
      name: name,
      major: major
    };

    try {
      const response = await Axios.put(`${API_URL}api/user`, body, {
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

  return { modifyUser, loading, error };
};

export default useModifyUser;
