import React, { useEffect, useState } from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row } from "antd";
import { API_URL } from "../../components/Config";
import LoadingPage from "../../components/views/LoadingPage/LoadingPage";
import { useSelector } from "react-redux";

function TranslationPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userinfos = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false); //로딩페이지 로딩

  return (
    <LectureBackgroudDiv>
      {loading ? <LoadingPage /> : null}

      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link to={"/"} style={{ color: "black", padding: "7px" }}>
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
        <LectureTitleDiv>과제명</LectureTitleDiv>
      </div>

      <FeedbackDiv>
        <Original>
          <h4>원문 </h4>
          <OriginalBox>asdfasdf</OriginalBox>
        </Original>

        <Interpretation>
          <h4>통역 전사문</h4>
          <InterpretationBox placeholder="여기에 입력하세요"></InterpretationBox>
        </Interpretation>
      </FeedbackDiv>

      <LectureCreateDiv>
        <LectureCreateButton>제출하기</LectureCreateButton>
      </LectureCreateDiv>
    </LectureBackgroudDiv>
  );
}

export default TranslationPage;

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
    text-align: center;
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
