import { message } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MAIN } from '../../../../constants/text';
import useLectureRequest from "../../../../hooks/useLectureRequest";
import Form from '../../Form/Form';
import { Modal } from '../../Modal/Modal';
import CodeForm from './CodeForm';
import { LectureBtn } from "./LectureBtn";

import "./LectureList.css";

function LectureListHeader() {
  const navigate = useNavigate();
  const { lectureRequest } = useLectureRequest();
  const userinfos = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false); // 모달 오픈 여부
  const onOpen = () => setIsOpen(true); // 모달 열기
  const onClose = () => setIsOpen(false); // 모달 닫기

  const defaultValues = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
  }

  const methods = useForm({
    defaultValues: defaultValues
  });


  function dictToCustomString(dict) {
    const values = Object.keys(dict).sort((a, b) => a - b).map(key => dict[key]);
    
    const part1 = values.slice(0, 4).join('');
    const part2 = values.slice(4).join('');
    
    return `${part1}-${part2}`;
}

  const handleCreateLecture = () => navigate('/lecture_add');
  const handleLectureRequest = async (code) => {
    try {
      const { data } = await lectureRequest(code);
      if (data.isSuccess) {
        message.success("수강 신청이 완료되었습니다.")
        methods.reset(defaultValues);
      }
      else message.error("존재하지 않는 강의이거나 이미 신청한 강의입니다.");
    } catch (error) {
      message.error("수강 신청 중 오류가 발생했습니다.");
    }
  };


  const onSubmit = (data) => {
    const isEvery = Object.values(data).every(value => value !== '');
    
    if (!isEvery) {
      message.error("전체 코드를 입력해주세요.");
      return;
    }
    const code = dictToCustomString(data);
    handleLectureRequest(code);
    onClose();
  }
  return (
    <>
      <div className="lectureList__header">
        <h2>{MAIN.TITLE}</h2>
        {userinfos?.userData?.role === 3 ? 
          <LectureBtn
            onClick={handleCreateLecture}
          >{MAIN.BTN.create}</LectureBtn> : 
          <LectureBtn
            onClick={onOpen}
          >수강신청</LectureBtn>
        }

        <Modal
          isOpen={isOpen}
        >
          <Form
            onClose={onClose}
            methods={methods}
            onSubmit={onSubmit}
          >
            <div className='lectureList__header__modal'>
              <span className='lectureList__header__modal-title'>강의코드 입력</span>
              <span className='lectureList__header__modal-subTitle'>강의 코드를 통해 수강신청을 진행하실 수 있습니다.</span>
              <CodeForm />
            </div>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default LectureListHeader