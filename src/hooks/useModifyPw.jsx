import { message } from "antd";
import Axios from "axios";
import { useState } from "react";
import { API_URL } from "../components/Config";

// 마이페이지 - 비밀번호 변경 custom hook
const useModifyPw = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const modifyPw = async ({
    old_pw,
    new_pw
  }) => {
    const body = {
      old_password: old_pw,
      new_password: new_pw
    };

    try {
      const response = await Axios.post(`${API_URL}api/user/pw`, body, {
        withCredentials: true,
      });
      if (response.data.isSuccess) {
        message.success(`비밀번호가 변경되었습니다.`);
      } else {
        message.error(`${response.data.msg}`);
      }
      return response.data;
    } catch (error) {
      setError(error);
      message.error("오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { modifyPw, loading, error };
};

export default useModifyPw;
