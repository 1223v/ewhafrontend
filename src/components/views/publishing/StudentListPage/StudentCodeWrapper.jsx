import React from 'react';

import "./StudentCode.css";

export const StudentCodeWrapper = ({ lectureName, children }) => {
  return (
    <section className='studentCode'>
      <span className='studentCode__title'>{lectureName}반</span>
      {children}
    </section>
  )
}