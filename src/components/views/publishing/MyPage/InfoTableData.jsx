import React, { useContext, useEffect, useMemo, useState } from "react";
import { InfoTableDataItem } from "./InfoTableDataItem";

import { IMAGES } from "../../../../constants/image";
import { MYPAGE } from "../../../../constants/text";
import useLogout from "../../../../hooks/useLogout";
import { Modal } from "../../Modal/Modal";
import "./Info.css";
import { InfoContext } from "./InfoProvider";
import { PasswordForm } from "./PasswordForm";

const EditableField = ({ modify, value, children }) => {
  return modify ? <span>{value}</span> : children;
};

// 마이페이지 - 테이블 중 데이터 부분
export const InfoTableData = ({ 
  userInfo,
  handleModify
}) => {
  const { modify, setModify, editableUserInfo, setEditableUserInfo } = useContext(InfoContext);
  const majors = [
    {
      id: 0,
      name: "한일번역"
    },
    {
      id: 1,
      name: "한일통역"
    },
    {
      id: 2,
      name: "한중번역"
    },
    {
      id: 3,
      name: "한중통역"
    },
    {
      id: 4,
      name: "한영번역"
    },
    {
      id: 5,
      name: "한영통역"
    },
    {
      id: 6,
      name: "한불번역"
    },
    {
      id: 7,
      name: "한불통역"
    },
  ];

  const memorizedMajors = useMemo(() => {return majors}, []);

  const [isOpen, setIsOpen] = useState(false); // 모달 오픈 여부
  const onOpen = () => setIsOpen(true); // 모달 열기
  const onClose = () => setIsOpen(false); // 모달 닫기

  const [selectOpen, setSelectOpen] = useState(false); // select 오픈 여부
  const { onLogoutHandler } = useLogout();

  useEffect(() => {
    userInfo && setEditableUserInfo({
      name: userInfo.name,
      major: userInfo.major
    })
  }, [userInfo]);

  return (
    <div className="infoTableData">
      <InfoTableDataItem name="이름">
        <EditableField modify={modify} value={userInfo.name}>
          <input 
            value={editableUserInfo.name} 
            onChange={(e) => setEditableUserInfo((prev) => ({
              ...prev,
              name: e.target.value
            }))}
            className="infoTableData__input"
          />
        </EditableField>
      </InfoTableDataItem>
      <InfoTableDataItem name="이메일">{userInfo.email}</InfoTableDataItem>
      <InfoTableDataItem name="전공">
        <EditableField modify={modify} value={userInfo.major}>
          <div className="infoTableData__select">
            <div
              className={`infoTableData__select__button ${selectOpen && "active"}`}
              onClick={() => setSelectOpen((prev) => !prev)}
            >
              <span>{editableUserInfo.major}</span>
              <img src={IMAGES.arrow} alt="a" />
            </div>

            {/* selectbox */}
            <ul className={`infoTableData__select__button-box ${selectOpen ? "active" : ""}`}>
              <li
                className="infoTableData__select__button-box__item"
              >
                {
                  memorizedMajors.map((major) => 
                    <span 
                      key={major.id} 
                      className="infoTableData__select__button-box__item__txt"
                      onClick={() => {
                        setEditableUserInfo((prev) => ({
                          ...prev,
                          major: major.name
                        }));
                        setSelectOpen(false);
                      }}
                    >
                      {major.name}
                    </span>
                  )
                }
              </li>
            </ul>
          </div>
        </EditableField>
      </InfoTableDataItem>
      <InfoTableDataItem name="비밀번호">
        <span 
          className='infoTableDataItem__btn' 
          onClick={onOpen}
        >비밀번호 변경</span>
      </InfoTableDataItem>

      <>
        {
          !modify ?
          (
            <div className='info-btn__mobile'>
              <span 
                className="info-header__btn cancle" 
                onClick={() => setModify(true)}
              >{MYPAGE.BTN.cancle}</span>
              <span 
                className="info-header__btn" 
                onClick={handleModify}
              >{MYPAGE.BTN.modifyOff}</span>
            </div>
          ) : 
          (
            <div className='info-btn__mobile'>
              <span
                className="info-header__btn logout" 
                onClick={onLogoutHandler}
              >로그아웃</span>
              <span 
                className="info-header__btn" 
                onClick={() => setModify(false)}
              >{MYPAGE.BTN.modifyOn}</span>
            </div>
          )
        }
      </>

      {/* 비밀번호 변경 모달 React Portal */}
      {modify && (
        <Modal 
          isOpen={isOpen}
          onClose={onClose}
        >
          <PasswordForm 
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  )
}