import React, { useContext } from 'react';
import { MYPAGE } from '../../../../constants/text';

import "./Info.css";
import { InfoContext } from './InfoProvider';

// 마이페이지 - 기본정보 테이블 헤더
export const InfoHeader = ({
  handleModify
}) => {
  const { modify, setModify } = useContext(InfoContext);
  return (
    <div className="info-header">
      <span className="info-header__title">{MYPAGE.TITLE.info}</span>
      {
        !modify ?
        (
          <span>
            <span 
              className="info-header__btn cancle" 
              onClick={() => setModify(true)}
            >{MYPAGE.BTN.cancle}</span>
            <span 
              className="info-header__btn" 
              onClick={handleModify}
            >{MYPAGE.BTN.modifyOff}</span>
          </span>
        ) : 
        <span 
          className="info-header__btn" 
          onClick={() => setModify(false)}
        >{MYPAGE.BTN.modifyOn}</span>
      }
    </div>
  )
}