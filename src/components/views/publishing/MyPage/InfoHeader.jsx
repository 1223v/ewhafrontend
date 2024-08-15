import React, { useContext } from 'react';
import { MYPAGE } from '../../../../constants/text';

import useLogout from '../../../../hooks/useLogout';
import "./Info.css";
import { InfoContext } from './InfoProvider';

// 마이페이지 - 기본정보 테이블 헤더
export const InfoHeader = ({
  handleModify
}) => {
  const { modify, setModify } = useContext(InfoContext);
  const { onLogoutHandler } = useLogout();

  return (
    <div className="info-header">
      <span className="info-header__title">{MYPAGE.TITLE.info}</span>
      {
        !modify ?
        (
          <div className='info-btn__pc'>
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
          <div className='info-btn__pc'>
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
    </div>
  )
}