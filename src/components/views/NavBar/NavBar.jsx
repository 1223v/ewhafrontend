import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/image";
import { API_URL } from "../../Config";
import "./NavBar.css";

function NavBar() {
  let navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 훅 사용
  const [isActive, setActive] = useState("false");
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveLink = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <div>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar__logo">
          <Link to="/">
            <img
              src={IMAGES.logo}
              style={{ height: "33px", marginTop: "5px" }}
              alt="ewha_logo"
            />
          </Link>
        </div>

        <ul className={"navbar__menu" + (isActive ? "" : " active")}>
          <li className={isActiveLink("/")}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActiveLink("/prob/selfstudys")}>
            <Link to="/prob/selfstudys">자습용 과제</Link>
          </li>
          <li className={isActiveLink("https://cyber.ewha.ac.kr")}>
            <Link to="https://cyber.ewha.ac.kr">사이버캠퍼스</Link>
          </li>
          <li className={isActiveLink("/qna")}>
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
        <Link to="#" className="navbar__toggleBtn" onClick={onNavtoggleHandler}>
          <i className="fa-solid fa-bars"></i>
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
