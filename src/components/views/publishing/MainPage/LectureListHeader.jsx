import { message } from 'antd';
import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MAIN } from '../../../../constants/text';
// import useLectureRequest from "../../../../hooks/useLectureRequest";
import { LectureBtn } from "./LectureBtn";

function LectureListHeader() {
  const navigate = useNavigate();
  // const { lectureRequest } = useLectureRequest();
  const userinfos = useSelector((state) => state.user);

  const handleCreateLecture = () => navigate('/lecture_add');
  const handleLectureRequest = () => {
    // const { data } = lectureRequest("0199-4423");
    // console.log(data);
    // TODO: 강의 코드 입력 api 연결
    message.error("개발 중입니다. 추후 강의 코드 입력 버튼으로 변경할 예정입니다.");
  };
  return (
    <div className="lectureList__header">
      <h2>{MAIN.TITLE}</h2>
      {userinfos?.userData?.role === 3 ? 
        <LectureBtn
          onClick={handleCreateLecture}
        >{MAIN.BTN.create}</LectureBtn> : 
        <LectureBtn
          onClick={handleLectureRequest}
        >개발중</LectureBtn>
      }
    </div>
  )
}

export default LectureListHeader