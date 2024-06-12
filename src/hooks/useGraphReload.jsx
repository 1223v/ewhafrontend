import { message } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useGraphReload = (updateUrl, navigateUrl, initialReloadCheck) => {
  const [ReloadCheck, setReloadCheck] = useState(initialReloadCheck);
  const navigate = useNavigate();

  const reloadGraph = () => {
    Axios.get(updateUrl, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.isSuccess) {
          setReloadCheck(!ReloadCheck);
          message.success("그래프가 갱신되었습니다.");
        } else {
          message.error(response.data.message);
          navigate(navigateUrl);
        }
      })
      .catch((error) => {
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  };

  useEffect(() => {
    Axios.get(updateUrl, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.isSuccess) {
          setReloadCheck(!ReloadCheck);
          message.success("그래프가 갱신되었습니다.");
        } else {
          message.error(response.data.message);
          navigate(navigateUrl);
        }
      })
      .catch((error) => {
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, []);

  return { ReloadCheck, reloadGraph };
};

export default useGraphReload;
