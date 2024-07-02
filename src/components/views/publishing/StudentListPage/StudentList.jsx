import React from 'react';
import { STUDENTLIST } from '../../../../constants/text';
import { StudentListTable } from './StudentListTable';

import { useLocation } from 'react-router-dom';
import useFetchWaitList from '../../../../hooks/useFetchWaitList';
import "./StudentList.css";

export const StudentList = () => {
  const location = useLocation();
  const lecture_no = +location.search.split("=")[1];
  const { waitList } = useFetchWaitList(lecture_no);
  console.log(waitList);
  return (
    <div className='studentList'>
      <StudentListTable 
        title="수강생 목록"
        header={STUDENTLIST.STUDENT}
      />
      <StudentListTable 
        title="대기 목록"
        header={STUDENTLIST.WAIT}
      />
    </div>
  )
}