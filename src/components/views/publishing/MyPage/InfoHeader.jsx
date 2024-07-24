import React from 'react';
import { MYPAGE } from '../../../../constants/text';

import "./Info.css";

// 마이페이지 - 기본정보 테이블 헤더
export const InfoHeader = ({
  modify,
  setModify,
  handleModify
}) => {
  return (
    <div className="info-header">
      <span className="info-header__title">{MYPAGE.TITLE.info}</span>
      {
        !modify ?
        <span 
          className="info-header__btn" 
          onClick={handleModify}
        >{MYPAGE.BTN.modifyOff}</span> : 
        <span 
          className="info-header__btn" 
          onClick={() => setModify(false)}
        >{MYPAGE.BTN.modifyOn}</span>
      }
    </div>
  )
}