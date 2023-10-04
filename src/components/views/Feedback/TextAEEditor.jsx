import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";
import { message } from "antd";

const TextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  const [Url, setUrl] = useState("");
  const [Textae, setTextae] = useState("");
  let teae = {};

  const elementRef = useRef(null);

  const handleMouseUp = () => {
    const textContent = JSON.parse(elementRef.current.textContent);

    props.setSectioncontent(textContent.denotations);
    props.setDatacontent(textContent.denotations);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${API_URL}api/feedback/textae?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${userNo}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.isSuccess) {
          setUrl(response.data.url);
          const response2 = await Axios.get(`${response.data.url}`, {
            withCredentials: true,
          });

          props.setSectioncontent(response2.data.denotations);
          setTextae(response2.data);
          teae = response2.data;
          console.log(teae);

          // 이제 여기서 editor를 초기화하고 teae를 설정할 수 있습니다.
          const [editor] = window.initializeTextAEEditor();
          editor.annotation = teae;
        } else {
          message.error(response.data.msg);
          navigate(
            `/prob/feedback/manage?lecture_no=${lectureNo}&as_no=${asNo}`
          );
        }
      } catch (error) {
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        id="my_text-ae_editor"
        className="textae-editor"
        mode="edit"
        inspect="annotation"
        onMouseUp={handleMouseUp}
      ></div>
      <div id="annotation" ref={elementRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default TextAEEditor;
