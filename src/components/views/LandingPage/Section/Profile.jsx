import React from "react";
import styled from "styled-components";

function Profile(props) {
  return (
    <div className="profile_class2">
      <img src={props.userImg} className="profile_img" alt="img" />
      <div className="user_icons">
        <i className="fa-regular fa-envelope"></i>
        <i className="fa-solid fa-book-bookmark"></i>
        <i className="fa-regular fa-bell"></i>
      </div>
      <Profilename>{props.userName}</Profilename>
      <Profilemajor>{props.userRole}</Profilemajor>
    </div>
  );
}

export default Profile;

const Profilename = styled.div`
  margin-bottom: 8px;
  font-weight: 600;
`;

const Profilemajor = styled.div`
  font-size: 12px;
  color: #00000098;
  margin-bottom: 8px;
  font-weight: 500;
`;
