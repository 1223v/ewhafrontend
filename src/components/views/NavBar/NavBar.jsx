import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";
import "./NavBar.css";

function NavBar() {
  let navigate = useNavigate();
  const [isActive, setActive] = useState("false");

  const onNavtoggleHandler = (event) => {
    event.preventDefault();
    setActive(!isActive);
  };

  const onLogoutHandler = () => {
    Axios.get(`${API_URL}api/user/logout`, { withCredentials: true }).then(
      (response) => {
        if (response.data.logoutSuccess) {
          navigate("/login");
        } else {
          alert("Error");
        }
      }
    );
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrdCGZ%2FbtssUHrof3e%2F3xVEEtMcV1EMBqvSWEnNk0%2Fimg.png"
              style={{ height: "55px", marginTop: "5px" }}
              alt="ewha_logo"
            />
          </Link>
        </div>

        <ul className={"navbar__menu" + (isActive ? "" : " active")}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/lecture_add">강의 생성</Link>
          </li>
          <li>
            <Link to="https://cyber.ewha.ac.kr/">사이버캠퍼스</Link>
          </li>
          <li>
            <Link to="/">Q&A</Link>
          </li>
        </ul>

        <ul className={"navbar__icons" + (isActive ? "" : " active")}>
          <li>
            <Link to="/login" onClick={onLogoutHandler}>
              로그아웃
            </Link>
          </li>
        </ul>
        <Link to="#" className="navbar__toogleBtn" onClick={onNavtoggleHandler}>
          <i className="fa-solid fa-bars"></i>
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
