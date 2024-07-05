import React from 'react';

import "./StudentCode.css";
import { StudentCodeBox } from './StudentCodeBox';

export const StudentCode = () => {
  return (
    <section className='studentCode'>
      <span className='studentCode__title'>한일번역 AAAA반</span>
      <StudentCodeBox />
    </section>
  )
}