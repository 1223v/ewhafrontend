import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import "./LandingPage.css";
import CalenderComponent from "./Section/CalenderComponent";
import Profile from "./Section/Profile";
import SearchBar from "./Section/SearchBar";
import GridCards from "./../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Lectures, setLectures] = useState([]);
  const listdivstart = '<div className="lecture_list">';
  const listdivend = "</div>";

  let request = [
    {
      num: 1,
      lecture: "한|일",
      title: "한일 통역 01분반",
      class: "01",
      dday: "6",
    },
    {
      num: 2,
      lecture: "한|중",
      title: "한일 통역 01분반",
      class: "02",
      dday: "5",
    },
    {
      num: 3,
      lecture: "한|러",
      title: "한일 통역 01분반",
      class: "03",
      dday: "7",
    },
    {
      num: 4,
      lecture: "한|영",
      title: "한일 통역 01분반",
      class: "04",
      dday: "32",
    },
    {
      num: 4,
      lecture: "한|영",
      title: "한일 통역 01분반",
      class: "04",
      dday: "32",
    },
  ];
  useEffect(() => {
    console.log(request[1]);
  }, []);
  return (
    <div>
      <NavBar />
      <div className="lecture_class">
        <Profile />
        <SearchBar />
        <div className="calender_Area">
          <CalenderComponent />
        </div>
        <div className="lecture_Area">
          <h3 style={{ paddingLeft: "20px" }}>
            강의 목록
            <nav className="class_menu">
              <a href="#" className="class_menu-link" data-menu="1">
                1 학기
              </a>
              <a href="#" className="class_menu-link" data-menu="2">
                2 학기
              </a>
            </nav>
          </h3>

          <Row>
            {request.map((lesson, index) => (
              <React.Fragment key={index}>
                <GridCards
                  lecture={lesson.lecture}
                  index={index}
                  num={lesson.num}
                  title={lesson.title}
                  dday={lesson.dday}
                />
              </React.Fragment>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
