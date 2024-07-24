import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/image";
import { API_URL } from "../../Config";
import LeftMenu from "./LeftMenu";
import "./NavBar.css";
import RightMenu from "./RightMenu";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
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

  const showDrawer = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
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

  let { pathname: location } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <Layout>
        <Layout.Header className="nav-header">
          <div style={{maxWidth: "1200px", textAlign:"center"}}>
          <div className="logo">
            <Link to="/">
              <img
                src={IMAGES.logo}
                style={{ height: "33px", marginTop: "15px" }}
                alt="ewha_logo"
              />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <ul>
                <li><Link to="/" className="hrefStyle">HOME</Link></li>
                <li><Link to="/prob/selfstudys" className="hrefStyle" >자습용 과제</Link></li>
                <li>CONTACT US</li>
              </ul>
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <Link to="/mypage" className="hrefStyle">
                <BsPersonCircle size={25} style={{margin:"20px 20px 0 0", color:"gray"}}/>
              </Link>
            </div>

            <Drawer
              
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={open}
              
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} onLogoutHandler={onLogoutHandler}/>
            </Drawer>
          </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
}

export default NavBar;
