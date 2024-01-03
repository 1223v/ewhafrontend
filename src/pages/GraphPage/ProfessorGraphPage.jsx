import { Select, message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import NavBar from "../../components/views/NavBar/NavBar";

function ProfessorGraphPage() {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");

  const [DeliveryList, setDeliveryList] = useState([]); // 전달력 리스트
  const [AccuracyList, setAccuracyList] = useState([]); // 내용 정확도 리스트
  const [DeliveryDetailList, setDeliveryDetailList] = useState([]); // 전달력 디테일 리스트
  const [AccuracyDetailList, setAccuracyDetailList] = useState([]); // 내용 정확도 디테일 리스트
  const [DeliveryDetail, setDeliveryDetail] = useState([]); // 전달력 디테일
  const [AccuracyDetail, setAccuracyDetail] = useState([]); // 내용 정확도 디테일
  const [AssignType, setAssignType] = useState(""); // 과제 타입

  const options = {
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: "전달력 결과",
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["침묵(silence)", "필러(filler)", "백트레킹(backtracking)", "기타"],
    },
  };

  const options2 = {
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: "내용 정확도 결과",
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["오역(translation_error)", "누락(omission)", "표현(expression)", "억양(intonation)", "문법오류(grammar_error)", "기타"],
    },
  };

  const options3 = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "전달력 결과",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["침묵", "필러", "백트래킹", "기타"],
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const options4 = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "내용 정확도 결과",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["오역", "누락", "표현", "억양", "문법오류", "기타"],
    },
    yaxis: {},
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const onStudentChange = (value) => {
    setDeliveryDetail(
      DeliveryDetailList.filter((item) => item.name === value).map(
        (item) => item.data
      )[0]
    );
    setAccuracyDetail(
      AccuracyDetailList.filter((item) => item.name === value).map(
        (item) => item.data
      )[0]
    );
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/feedback/professor/graph?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.isSuccess) {
          // 요청이 성공한 경우의 처리
          console.log(response.data);
          setDeliveryList(response.data.Delivery);
          setAccuracyList(response.data.Accuracy);
          setDeliveryDetailList(response.data.DeliveryDetail);
          setAccuracyDetailList(response.data.AccuracyDetail);
          setAssignType(response.data.as_type);
        } else {
          message.error(response.data.message);

          navigate(
            `/prob/feedback/professor?lecture_no=${lectureNo}&as_no=${asNo}`
          );
        }
      })

      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/feedback/professor?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${userNo}`}
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
        <LectureTitleDiv>학생 비교 그래프</LectureTitleDiv>
      </div>
      <StyledNewWishList>
        <StyledButtonWrapper>
          {AssignType !== "번역" && (
            <ChartInDiv>
              <ReactApexChart
                options={options}
                series={DeliveryList}
                type="radar"
              />
            </ChartInDiv>
          )}
          <ChartInDiv>
            <ReactApexChart
              options={options2}
              series={AccuracyList}
              type="radar"
            />
          </ChartInDiv>
        </StyledButtonWrapper>
        <SelectUserDiv>
          <Name>확인하고자 하는 학생을 선택해주세요.</Name>
          <NameinputDiv>
            <Select
              placeholder="학생 선택"
              style={{
                width: 120,
              }}
              onChange={onStudentChange}
              options={DeliveryDetailList.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
          </NameinputDiv>
        </SelectUserDiv>
        <StyledButtonWrapper>
          {AssignType !== "번역" && (
            <ChartInDiv>
              <ReactApexChart
                options={options3}
                series={DeliveryDetail}
                type="bar"
              />
            </ChartInDiv>
          )}
          <ChartInDiv>
            <ReactApexChart
              options={options4}
              series={AccuracyDetail}
              type="bar"
            />
          </ChartInDiv>
        </StyledButtonWrapper>
      </StyledNewWishList>
    </div>
  );
}

export default ProfessorGraphPage;

const ChartInDiv = styled.div`
  border-bottom: 3px solid #00aaff;
  border-top: 3px solid #00aaff;
  color: black;
  text-align: center;
  margin-left: 10px;
  width: 500px;
  @media screen and (max-width: 768px) {
    width: 400px;
  }
  @media screen and (max-width: 360px) {
    width: 350px;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: center;
  & > button {
    width: 5.8rem;
    height: 5.8rem;
    border: 0.1rem solid gray;
    border-radius: 0.8rem;
    background-color: white;
  }

  & > button > img {
    width: 2.4rem;
    height: 2.4rem;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const SelectUserDiv = styled.div``;

const StyledNewWishList = styled.div`
  padding: 3.3rem 2.2rem 3.6rem 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > input {
    width: 85%;
    padding: 0.5rem 1rem;
    border: 0.1rem solid gray;
    border-radius: 0.8rem;
    margin-bottom: 1.8rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.7rem;
  }

  & > input:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem black;
  }

  & > div {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: gray;
    margin-bottom: 1rem;
  }

  & > button {
    width: 98%;
    font-weight: 600;
    font-size: 1rem;
    line-height: 2.3rem;
    margin-bottom: 30px;
    border-radius: 0.6rem;
    color: white;
    background-color: #452b75;
  }

  & > button:disabled {
    background-color: gray;
  }
`;

const NameinputDiv = styled.div`
  flex-grow: 2;
  margin-top: 10px;
  display: flex; // Flex container로 만들기
  justify-content: center; // 가로 방향 중앙 정렬
  align-items: center; // 세로 방향 중앙 정렬
`;

const Name = styled.div`
  margin: 20px;
  flexgrow: 1;
  fontweight: 500;
  font-size: 1rem;
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
  margin-top: 17px;
`;
