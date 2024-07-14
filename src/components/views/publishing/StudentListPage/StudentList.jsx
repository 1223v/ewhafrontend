import React from 'react';
import { useLocation } from 'react-router-dom';
import { STUDENTLIST } from '../../../../constants/text';
import useFetchStudentWaitList from '../../../../hooks/useFetchStudentWait';
import { StudentListTable } from './StudentListTable';

import "./StudentList.css";

export const StudentList = () => {
  const location = useLocation();
  const lecture_no = +location.search.split("=")[1];

  const { studentList, waitList, applyStudent } = useFetchStudentWaitList(lecture_no);
  console.log(studentList, waitList);
  
  return (
    <div className='studentList'>
      <StudentListTable 
        title="수강생 목록"
        header={STUDENTLIST.STUDENT}
        tableList={studentList}
      />
      <StudentListTable 
        title="대기 목록"
        header={STUDENTLIST.WAIT}
        tableList={waitList}
        applyStudent={applyStudent}
      />
    </div>
  )
}
