import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StudentBreadcrumb = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");

  let urlMenu = [
    {
      title: <HomeOutlined />,
      href: "/",
    },
    {
      title: (
        <Link to={`/prob/list/student?lecture_no=${lectureNo}`}>
          {props.LectureName} 과제 목록
        </Link>
      ),
      pathElement: "/prob/list/student",
    },
    {
      title: (
        <Link to={`/prob/detail/student?lecture_no=${lectureNo}&as_no=${asNo}`}>
          {props.AssignmentName} 과제 상세
        </Link>
      ),
      pathElement: "/prob/detail/student",
    },
    {
      title: (
        <Link
          to={`/prob/feedback/student?lecture_no=${lectureNo}&as_no=${asNo}`}
        >
          {props.AssignmentName} 과제 피드백
        </Link>
      ),
      pathElement: "/prob/feedback/student",
    },
  ];

  // 경로에 따라 동적으로 브레드크럼 설정
  let breadcrumbItems = [];

  // 경로 포함 확인
  for (let i = 0; i < urlMenu.length; i++) {
    breadcrumbItems.push(urlMenu[i]);
    if (location.pathname.includes(urlMenu[i].pathElement)) {
      break;
    }
  }

  return (
    <StudentBreadcrumbDiv>
      <Breadcrumb separator=">" items={breadcrumbItems} />
    </StudentBreadcrumbDiv>
  );
};

export default StudentBreadcrumb;

const StudentBreadcrumbDiv = styled.div`
  margin: 20px 0 0 20px;
`;
