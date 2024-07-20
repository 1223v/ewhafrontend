import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const RightMenu = ({ mode, onLogoutHandler }) => {
  const userinfos = useSelector((state) => state.user);
  
  return (
    <Menu mode={mode} >
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">{userinfos?.userData?.name}</span>
          </>
        }
      >
        
        <Menu.Item key="about-us">
          <Link to="/mypage" >
          <UserOutlined /> 마이페이지
          </Link>
        </Menu.Item>
        <Menu.Item key="log-out" onClick={onLogoutHandler}>
        
          <LogoutOutlined /> 로그아웃
          
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;