import React from 'react';
import { IoPowerSharp } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import useFetchLectureCode from '../../../../hooks/useFetchLectureCode';
import useModifyLectureCode from '../../../../hooks/useModifyLectureCode';
import { Toggle } from '../../Toggle/Toggle';
import StudentCodeItem from './StudentCodeItem';

export const StudentCodeBox = () => {
  const location = useLocation();
  const lecture_no = +location.search.split("=")[1];
  
  const { fetchLectureCode, code } = useFetchLectureCode(lecture_no);
  const { modifyLectureCode } = useModifyLectureCode(lecture_no);

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
          {/* TODO: update date get에도 넣어달라고 하기 */}
          <span>2024년 06월 15일</span>
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