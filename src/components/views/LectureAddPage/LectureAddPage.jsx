import React from "react";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import LectureListPage from "./Sections/LectureListPage";

function LectureAddPage() {
  return (
    <LectureBackgroudDiv>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <a
            href="#"
            style={{
              textDecoration: "none",
              margin: "9px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -5 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </a>
        </LectureBackDiv>
        <LectureTitleDiv>강의 생성하기</LectureTitleDiv>
      </div>
      <LectureAddFormDiv>
        <LectureNameDiv>
          <LectureName>강의명</LectureName>
          <LectureNameinputDiv>
            <LectureNameinput
              type="text"
              placeholder=" 강의명을 적어주세요"
              size="10"
              maxlength="8"
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>학습 연도</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option selected>연도</option>
              <option value="2024">2024 년</option>
              <option value="2023">2023 년</option>
              <option value="2022">2022 년</option>
              <option value="2021">2021 년</option>
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>학습 학기</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option selected>학기</option>
              <option value="1학기">1학기</option>
              <option value="2학기">2학기</option>
              <option value="여름학기">여름학기</option>
              <option value="겨울학기">겨울학기</option>
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <div>
          <div>개설전공</div>
          <div>
            <select class="inputStyle01" name="lecture_major">
              <option value="한일번역">한일번역</option>
              <option>한일통역</option>
              <option>한중번역</option>
              <option>한중통역</option>
              <option>한영번역</option>
              <option>한영통역</option>
              <option>한불번역</option>
              <option>한불통역</option>
            </select>
          </div>
        </div>
        <div>
          <div>분반</div>
          <div>
            <select class="inputStyle01" name="lecture_separated">
              <option value="1분반">1분반</option>
              <option>2분반</option>
              <option>3분반</option>
              <option>4분반</option>
              <option>5분반</option>
              <option>6분반</option>
              <option>7분반</option>
              <option>8분반</option>
              <option>9분반</option>
              <option>10분반</option>
            </select>
          </div>
        </div>
        <div>
          <div>담당교수</div>
          <div>
            <input
              type="text"
              class="inputStyle01"
              name="lecture_professor"
              value="교수"
            />
          </div>
        </div>
        <div>
          <div>수강생 명단</div>
          <div>
            <LectureListPage />
          </div>
        </div>
      </LectureAddFormDiv>
    </LectureBackgroudDiv>
  );
}

export default LectureAddPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 900px;
`;

const LectureAddFormDiv = styled.div`
  border: 0.0625rem solid #e1e1e8;
  border-radius: 0.5rem;
  margin: auto;
  background-color: #ffffff;
  width: 800px;
  @media screen and (max-width: 768px) {
    width: 320px;
  }
`;

const LectureTitleDiv = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  color: #2b2d36;
  font-weight: 700;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 17px;
`;

const LectureBackDiv = styled.div`
  background-color: #85889914;
  border-radius: 7px;
  margin: 20px;
  height: 34px;
  width: 40px;
  color: black;
`;

const LectureNameDiv = styled.div`
  font-size: 14px;

  display: flex;
  line-height: 1.5;
  color: #525364;
  width: 95%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin: 17px;
  @media screen and (max-width: 768px) {
    margin: 11px;
  }
`;

const LectureNameinput = styled.input`
  width: 100%;
  height: 48px;

  margin-top: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border: solid 1px #d3d3d3;
  border-radius: 9px;
  background-color: #ffffff;
  &:hover {
    outline: 2px solid #04653d;
  }
`;

const LectureNameinputDiv = styled.div`
  flex-grow: 2;
`;

const LectureName = styled.div`
  margin: 20px;
  flexgrow: 1;
  fontweight: 500;
`;
