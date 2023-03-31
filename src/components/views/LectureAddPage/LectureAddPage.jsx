import React from "react";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";

function LectureAddPage() {
  return (
    <LectureBackgroudDiv>
      <NavBar />
      <div>
        <a href="#" style={{ backgroundColor: "#d3d3d3" }}>
          나가기
        </a>
        <div style={{ fontSize: "20px" }}>강의 생성하기</div>
      </div>
      <LectureAddFormDiv>
        <div>
          <div>강의명</div>
          <div>
            <input type="text" placeholder="강의명을 적어주세요" />
          </div>
        </div>
        <div>
          <div>연도</div>
          <div>
            <select class="inputStyle01" name="lecture_year">
              <option value="2031">2031</option>
              <option value="2030">2030</option>
              <option value="2029">2029</option>
              <option value="2028">2028</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023" selected="">
                2023
              </option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
        <div>
          <div>학기</div>
          <div>
            <select class="inputStyle01" name="lecture_semester">
              <option value="1학기">1학기</option>
              <option value="2학기">2학기</option>
              <option>여름학기</option>
              <option>겨울학기</option>
            </select>
          </div>
        </div>
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
  margin: 20px;
  background-color: #ffffff;
`;
