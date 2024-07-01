import React from 'react';
import NavBar from '../../components/views/NavBar/NavBar';

import { StudentCode } from '../../components/views/publishing/StudentListPage/StudentCode';
import { StudentList } from '../../components/views/publishing/StudentListPage/StudentList';
import "./StudentListPublishingPage.css";

function StudentListPublishingPage () {
  return (
    <main id='studentListWrapper'>
      <NavBar />
      <div className='studentListWrapper__content'>
        <StudentCode />
        <StudentList />
      </div>
    </main>
  )
}

export default StudentListPublishingPage;