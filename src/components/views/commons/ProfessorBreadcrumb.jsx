import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const ProfessorBreadcrumb = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");

  const urlMenu = [
    {
      title: <HomeOutlined />,
      href: "/",
    },
    {
      title: (
        <Link to={`/prob/list/professor?lecture_no=${lectureNo}`}>
          {props.LectureName} 과제 목록
        </Link>
      ),
      pathElement: "/prob/list/professor",
    },
    {
      title: (
        <Link
          to={`/prob/detail/professor?lecture_no=${lectureNo}&as_no=${asNo}`}
        >
          {props.AssignmentName} 과제 상세
        </Link>
      ),
      pathElement: "/prob/detail/professor",
    },
  ];

  const urlMenu2 = [
    {
      title: (
        <Link to={`/prob/add?lecture_no=${lectureNo}`}>
          {props.LectureName} 과제 생성하기
        </Link>
      ),
      pathElement: "/prob/add",
    },

    {
      title: (
        <Link to={`/prob/mod?lecture_no=${lectureNo}&as_no=${asNo}`}>
          {props.AssignmentName} 과제 수정하기
        </Link>
      ),
      pathElement: "/prob/mod",
    },
    {
      title: (
        <Link
          to={`/prob/feedback/professor?lecture_no=${lectureNo}&as_no=${asNo}`}
        >
          {props.AssignmentName} 과제 피드백
        </Link>
      ),
      pathElement: "/prob/feedback/professor",
    },
  ];

  // 경로에 따라 동적으로 브레드크럼 설정
  let breadcrumbItems = [];

  // 경로 포함 확인
  for (let i = 0; i < urlMenu.length; i++) {
    if (
      urlMenu2.filter((item) => item.pathElement === location.pathname)
        .length === 1
    ) {
      breadcrumbItems = urlMenu;
      if (urlMenu2[0].pathElement === location.pathname) {
        // 과제 생성하기 일경우 과제 상세 빼기
        delete breadcrumbItems[2];
      }
      breadcrumbItems.push(
        urlMenu2.filter((item) => item.pathElement === location.pathname)[0]
      );
      break;
    }
    breadcrumbItems.push(urlMenu[i]);

    if (location.pathname.includes(urlMenu[i].pathElement)) {
      break;
    }
  }

  return (
    <ProfessorBreadcrumbDiv>
      <Breadcrumb separator=">" items={breadcrumbItems} />
    </ProfessorBreadcrumbDiv>
  );
};

export default ProfessorBreadcrumb;

const ProfessorBreadcrumbDiv = styled.div`
  margin: 20px 0 0 20px;
`;
