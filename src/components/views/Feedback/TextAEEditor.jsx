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
  };

  useEffect(() => {
    if (elementRef.current.textContent) {
      const textContent = JSON.parse(elementRef.current.textContent);
      const textString = JSON.stringify(textContent);
      props.setDatacontent(textContent);
      console.log(textContent);
    }
  }, [props.Load]);

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
        console.error(error);
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

const animation = keyframes`
50% {
  transform: scale(0.92);
}
`;

const StartBtn = styled.button`
  display: flex;
  justify-content: center;

  width: calc(100% - 32px);
  height: 54px;
  line-height: 54px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background: #5849ff;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 400;

  margin: 10px;
  &:active {
    animation: ${animation} 0.2s;
  }
`;
