import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import NavBar from "../../components/views/NavBar/NavBar";

function SelfTranslationPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");

  const [OriginalText, setOriginalText] = useState(""); //원문
  const [AssignName, setAssignName] = useState(""); // 과제 이름
  const [AssignType, setAssignType] = useState(""); // 과제 타입
  const [InterpretationText, setInterpretationText] = useState(""); //통역 전사문

  const onTextChange = (e) => {
    setInterpretationText(e.target.value);
  };

  const onSubmitButton = () => {
    if (window.confirm("과제를 저장하고 제출하시겠습니까?")) {
      let body = {
        translate_text: InterpretationText,
        as_no: asNo,
      };

      Axios.post(`${API_URL}api/prob/self/translate`, body, {
        withCredentials: true,
      })
        .then((response) => {
          if (response.data) {
            message.success("최종제출을 눌러주세요.");
            navigate(`/prob/selfstudys/detail?as_no=${asNo}`);
          } else {
            message.error("저장을 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          // 요청이 실패한 경우의 처리
          console.error(error);
          navigate("/");
        });
    }
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/self/translate?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.isSuccess) {
          // 요청이 성공한 경우의 처리

          setOriginalText(response.data.original_text);
          setAssignName(response.data.as_name);
          setAssignType(response.data.as_type);
          setInterpretationText(response.data.translate_text);
        } else {
          message.error(response.data.message);

          navigate(`/prob/selfstudys/detail?as_no=${asNo}`);
        }
      })

      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, []);

  return (
    <LectureBackgroudDiv>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/selfstudys/detail?as_no=${asNo}`}
            style={{ color: "black", padding: "7px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -5 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Link>
        </LectureBackDiv>
        <LectureTitleDiv>
          {AssignName}({AssignType})
        </LectureTitleDiv>
      </div>

      <FeedbackDiv>
        <Original>
          <h4>원문 </h4>
          <OriginalBox>{OriginalText}</OriginalBox>
        </Original>

        <Interpretation>
          <h4>번역</h4>
          <InterpretationBox
            placeholder="여기에 입력하세요"
            onChange={onTextChange}
            value={InterpretationText}
          ></InterpretationBox>
        </Interpretation>
      </FeedbackDiv>

      <LectureCreateDiv>
        <LectureCreateButton onClick={onSubmitButton}>
          저장하고 제출하기
        </LectureCreateButton>
      </LectureCreateDiv>
    </LectureBackgroudDiv>
  );
}

export default SelfTranslationPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 100%;
`;

const LectureBackDiv = styled.div`
  background-color: #85889914;
  border-radius: 7px;
  margin: 20px;
  height: 34px;
  width: 40px;
  color: black;
`;

const LectureTitleDiv = styled.div`
  font-size: 1.4rem;
  line-height: 1.5;
  color: #2b2d36;
  font-weight: 700;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 17px;
`;

const LectureCreateDiv = styled.div`
  position: fixed;
  bottom: 0px;
  z-index: 8;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: rgb(255, 255, 255);
  box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
`;

const LectureCreateButton = styled.button`
  height: 3rem;
  font-size: 0.975rem;
  font-weight: 800;
  line-height: 1.375rem;
  width: 100%;
  border-radius: 0.5rem;
  margin: 20px;
  color: #fff;
  background-color: #2e462f;
  border-color: transparent;
`;

const FeedbackDiv = styled.div`
  margin: 0 auto;
  position: relative;
  min-height: 1400px;
  @media screen and (min-width: 1000px) {
    display: flex;

    margin: 40px;
    height: 50%;
    min-height: 700px;
  }
`;

const Original = styled.div`
  font-size: 12px;
  max-width: 800px;
  padding: 15px;
  @media screen and (min-width: 1000px) {
    margin-left: auto;

    width: 50%;
    height: 580px;

    border: 1px solid #d3d3d3;
    border-radius: 4px 0px 0px 4px;

    background-color: #f9f9f9;
  }
`;

const OriginalBox = styled.div`
  width: auto;
  height: 500px;
  overflow-y: auto;
  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;

const Interpretation = styled.div`
  font-size: 12px;
  margin-right: auto;
  max-width: 800px;
  padding: 15px;
  @media screen and (min-width: 1000px) {
    width: 50%;
    height: 580px;

    border: 1px solid #d3d3d3;
    border-radius: 0px 4px 4px 0px;

    background-color: #f9f9f9;
  }
`;

const InterpretationBox = styled.textarea`
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  border: solid 1px #d3d3d3;
  resize: none;
  background-color: #ffffff;
  overflow-y: auto;
  font-size: 0.875rem;
  line-height: 1.375rem;
  border-radius: 0.5rem;
  padding: 0.75rem;
`;
