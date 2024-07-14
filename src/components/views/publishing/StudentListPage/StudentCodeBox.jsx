import dayjs from 'dayjs';
import React from 'react';
import { IoPowerSharp } from "react-icons/io5";
import { Toggle } from '../../Toggle/Toggle';
import StudentCodeItem from './StudentCodeItem';

export const StudentCodeBox = ({
  code,
  updateTime,
  fetchLectureCode,
  modifyLectureCode
}) => {

  return (
    <div className='studentCodeBox'>
      <div className='studentCodeBox__left'>
        <p>
          <span>수강생 코드</span>
          <Toggle
            on={code ? true : false}
            setToggle={modifyLectureCode}
            fetchLectureCode={fetchLectureCode}
          />
        </p>
        <span className='studentCodeBox__left-date'>
          <span>최근 활성화 일시:</span>
          <span>{updateTime && dayjs(updateTime).format("YYYY년 MM월 DD일")}</span>
        </span>
      </div>
      {code ? (
        <StudentCodeItem code={code}/>
      ) : (
        <div className='studentCodeBox__off'>
          <IoPowerSharp />
          <span>코드 비활성화 상태입니다.</span>
        </div>
      )}
    </div>
  )
}