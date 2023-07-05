import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StudentList from "./Sections/StudentList";

function StudentAddModal(props) {
  const handleClose = () => {
    props.onClose?.();
  };
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
	  console.log(props.Checklist);
  }, []);

  return (
    <Overlay>
      <ModalWrap>
        <CloseButton onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </CloseButton>
        <Contents>
          <h2>학생 명단</h2>

          <StudentList
            onClose={props.onClose}
            setCheckedList={props.setCheckedList}
            Checklist={props.Checklist}
            studentslist={props.studentslist}
          />
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}

export default StudentAddModal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    width: 400px;
  }
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
const Button = styled.button`
  margin: 15px auto auto;
  display: block;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #2e462f;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;
