import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        <Link to="/">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="selfstudy">
        <Link to="/prob/selfstudys">
          자습용 과제
        </Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/">
          Contact Us
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;