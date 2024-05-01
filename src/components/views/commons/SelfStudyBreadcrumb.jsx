import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SelfStudyBreadcrumb = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");

  const urlMenu = [
    {
      title: <HomeOutlined />,
      href: "/",
    },
    {
      title: <Link to={`/prob/selfstudys`}>{props.LectureName} 과제 목록</Link>,
      pathElement: "/prob/selfstudys",
    },
    {
      title: (
        <Link to={`/prob/selfstudys/detail?as_no=${asNo}`}>
          {props.AssignmentName} 과제 상세
        </Link>
      ),
      pathElement: "/prob/selfstudys/detail",
    },
  ];

  const urlMenu2 = [
    {
      title: (
        <Link to={`/prob/selfstudys/add`}>
          {props.LectureName} 과제 생성하기
        </Link>
      ),
      pathElement: "/prob/selfstudys/add",
    },

    {
      title: (
        <Link to={`/prob/selfstudys/mod?as_no=${asNo}`}>
          {props.AssignmentName} 과제 수정하기
        </Link>
      ),
      pathElement: "/prob/selfstudys/mod",
    },
    {
      title: (
        <Link to={`/prob/feedback/professor?as_no=${asNo}`}>
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
    <SelfStudyBreadcrumbDiv>
      <Breadcrumb separator=">" items={breadcrumbItems} />
    </SelfStudyBreadcrumbDiv>
  );
};

export default SelfStudyBreadcrumb;

const SelfStudyBreadcrumbDiv = styled.div`
  margin: 20px 0 0 20px;
`;
