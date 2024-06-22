import { Dropdown, Space } from "antd";
import React from "react";
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

function DropdownModal({ lectureNo }) {
  const onDeleteButton = () => {
    //   if (window.confirm('삭제하시겠습니까?')) {
    //     Axios.get(`${API_URL}api/lecture/delete?lecture_no=${props.num}`, {
    //         withCredentials: true,
    //     }).then((response) => {
    //         // 요청이 성공한 경우의 처리
    //         alert(response.data.msg);
    //         Axios.get(`${API_URL}api/lecture/list`, {
    //             withCredentials: true,
    //         }).then((response) => {
    //             // 요청이 성공한 경우의 처리
    //             props.setLectures(response.data.lecturelist);
    //             //props.setLectureStatus(!props.LectureStatus);
    //         });
    //     });
    // }
  };

  const items = [
    {
      label: (
        <StyleLink
          to={`/lecture_mod?lecture_no=${lectureNo}`}
          style={{ display: "flex" }}
        >
          <BiSolidPencil size="15" style={{ margin: "3px 10px 0px 0px" }} />
          수정하기
        </StyleLink>
      ),
      key: "0",
    },
    {
      label: (
        <StyleLink to={`/lecture_detail?lecture_no=${lectureNo}`}>
          <IoMdPerson size="15" style={{ margin: "3px 10px 0px 0px" }} />
          수강생 조회
        </StyleLink>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <DeleteBtn onClick={onDeleteButton}>
          <BiSolidTrash size="15" style={{ margin: "3px 10px 0px 0px" }} />
          삭제하기
        </DeleteBtn>
      ),
      key: "2",
    },
  ];

  return (
    <DivWarpper>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <StyleLink onClick={(e) => e.preventDefault()}>
          <BackgroundSpace>
            <PiDotsThreeBold size="20" />
          </BackgroundSpace>
        </StyleLink>
      </Dropdown>
    </DivWarpper>
  );
}

export default DropdownModal;

const DivWarpper = styled.div`
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  cursor: pointer;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const BackgroundSpace = styled(Space)`
  text-decoration: none;
  background: #85889914;
  padding: 2px 2px 0px 2px;
  border-radius: 6px;
`;

const DeleteBtn = styled.button`
  color: #772b31;
  border: 0;
  outline: 0;
  background: none;
  padding: 0px;
`;
