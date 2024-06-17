import React from 'react';

import "./Info.css";

// 마이페이지 - 기본정보 테이블 데이터 요소 (이름, 이메일, 전공, 비밀번호)
export const InfoTableDataItem = ({
  title,
  content
}) => {
  return (
    <p className='infoTableDataItem'>
      <span className='infoTableDataItem__title'>{title}</span>
      <span className='infoTableDataItem__content'>{content}</span>
    </p>
  )
}