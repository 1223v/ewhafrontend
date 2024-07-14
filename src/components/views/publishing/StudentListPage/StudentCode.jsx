import React from 'react';
import { useLocation } from 'react-router-dom';
import { StudentCodeBox } from './StudentCodeBox';
import { StudentCodeWrapper } from './StudentCodeWrapper';

import useFetchLectureCode from '../../../../hooks/useFetchLectureCode';
import useModifyLectureCode from '../../../../hooks/useModifyLectureCode';

export const StudentCode = () => {
  const location = useLocation();
  const lecture_no = +location.search.split("=")[1];

  const { fetchLectureCode, lectureName, updateTime, code } = useFetchLectureCode(lecture_no);
  const { modifyLectureCode } = useModifyLectureCode(lecture_no);

  return (
    <StudentCodeWrapper lectureName={lectureName}>
      <StudentCodeBox 
        code={code}
        updateTime={updateTime}
        fetchLectureCode={fetchLectureCode}
        modifyLectureCode={modifyLectureCode}
      />
    </StudentCodeWrapper>
  )
}