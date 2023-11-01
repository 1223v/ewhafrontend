import { Empty, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../Config";
import NavBar from "../NavBar/NavBar";
import GridCards from "./../commons/GridCards";
import "./LandingPage.css";
import CalenderComponent from "./Section/CalenderComponent";
import Profile from "./Section/Profile";
import SearchBar from "./Section/SearchBar";

function LandingPage() {
  let navigate = useNavigate();
  const [Lectures, setLectures] = useState([]);
  const [message, setMessage] = useState("");
  //const [LectureStatus, setLectureStatus] = useState(false);

  const userinfos = useSelector((state) => state.user);

  const handleSearchClick = (value) => {
    setMessage(value);
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/lecture/list`, {
      withCredentials: true,
    })
      .then((response) => {
        // 요청이 성공한 경우의 처리
        setLectures(response.data.lecturelist);
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        navigate("/login");
      });
  }, []); // 예외 처리 필요 무한으로 API가 날라감(강의로 판단하는 것이 아닌 삭제 유무에 따라 판별해야할듯함)

  return (
    <div>
      <NavBar />
      <div className="lecture_class">
        <Profile
          userName={userinfos?.userData?.name}
          userRole={userinfos?.userData?.role}
        />
        <SearchBar onSearchClick={handleSearchClick} />
        <div className="calender_Area">
          <CalenderComponent />
        </div>
        <div className="lecture_Area">
          <h3 style={{ paddingLeft: "20px" }}>
            강의 목록
            {userinfos?.userData?.role === 3 && (
              <nav className="class_menu">
                <Link to={"/lecture_add"}>
                  <CreateBtn
                    className="middle none center rounded-lg bg-green-900 py-2 px-6 text-xs uppercase text-white transition-all border-none"
                    data-ripple-light="true"
                  >
                    + 강의 생성하기
                  </CreateBtn>
                </Link>
              </nav>
            )}
          </h3>

          {Lectures?.length < 0 ? (
            <Empty />
          ) : (
            <Row>
              {Lectures?.map((lesson, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    lectureName={lesson.lecture_name}
                    num={lesson.lecture_no}
                    major={lesson.major}
                    professor={lesson.professor}
                    separated={lesson.separated}
                    year={lesson.year}
                    semester={lesson.semester}
                    setLectures={setLectures}
                    //setLectureStatus={setLectureStatus}
                    //LectureStatus={LectureStatus}
                  />
                </React.Fragment>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

const CreateBtn = styled.button`
  height: 2.5rem;
  padding: 0.5625rem 1rem;
  font-size: 0.875rem;
  line-height: 1.375rem;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;
