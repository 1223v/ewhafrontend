import React from 'react'
import { StudentListTd } from './StudentListTd'
import { StudentListTh } from './StudentListTh'

export const StudentListTable = ({ title, header }) => {
  return (
    <div className='studentListTable'>
      <span className='studentListTable__title'>{title}</span>

      <table>
        <thead>
          <StudentListTh 
            data={header}
          />
        </thead>
        <tbody>
          <StudentListTd 
            data={header}
          />
          <StudentListTd 
            data={header}
          />
          <StudentListTd 
            data={header}
          />
        </tbody>
      </table>
    </div>
  )
}