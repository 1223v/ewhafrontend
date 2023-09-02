import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useCookies } from "react-cookie"; // useCookies import
import { API_URL } from "../../Config";

function NavBar() {
  let navigate = useNavigate();
  const [isActive, setActive] = useState("false");
  const [cookies, setCookie, removeCookie] = useCookies([]);

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
            <Link to="/lecture_add">과제 생성</Link>
          </li>
          <li>
            <Link to="/prob_feedback">제출확인</Link>
          </li>
          <li>
            <Link to="/">Q&A</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>

        <ul className={"navbar__icons" + (isActive ? "" : " active")}>
          <li>
            <Link to="/login" onClick={onLogoutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
