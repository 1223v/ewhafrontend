import React from 'react'
import { StudentListTd } from './StudentListTd'
import { StudentListTh } from './StudentListTh'

export const StudentListTable = ({ title, header, tableList, applyStudent }) => {
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
          {tableList?.map((data, idx) => (
            <StudentListTd 
              key={idx}
              idx={idx}
              data={data}
              isWait={title === "대기 목록" ? true : false}
              applyStudent={applyStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}