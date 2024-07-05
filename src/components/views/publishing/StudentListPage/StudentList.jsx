import React from 'react';
import { STUDENTLIST } from '../../../../constants/text';
import { StudentListTable } from './StudentListTable';

import { useLocation } from 'react-router-dom';
// import useFetchWaitList from '../../../../hooks/useFetchWaitList';
import "./StudentList.css";

export const StudentList = () => {
  const location = useLocation();
  const lecture_no = +location.search.split("=")[1];
  // const { waitList } = useFetchWaitList(lecture_no);

  const waitList = [
    {
      "email": "dev_student@test.com", 
      "major": "\ud55c\uc77c\ubc88\uc5ed", 
      "status": true, 
      "user_name": "\ud559\uc0dd"
    },
    {
      "email": "dev_student@test.com", 
      "major": "\ud55c\uc77c\ubc88\uc5ed", 
      "status": true, 
      "user_name": "\ud559\uc0dd"
    },
    {
      "email": "1223v@test.com", 
      "major": "\ud55c\uc77c\ubc88\uc5ed", 
      "status": false, 
      "user_name": "\ud559\uc0dd"
    },
  ];

  return (
    <div className='studentList'>
      <StudentListTable 
        title="수강생 목록"
        header={STUDENTLIST.STUDENT}
        tableList={waitList}
      />
      <StudentListTable 
        title="대기 목록"
        header={STUDENTLIST.WAIT}
        tableList={waitList}
      />
    </div>
  )
}