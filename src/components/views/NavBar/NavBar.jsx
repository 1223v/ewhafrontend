import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Ewha from "./ewha_logo.png";
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
              src={Ewha}
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
