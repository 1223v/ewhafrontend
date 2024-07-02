import classNames from 'classnames'
import React from 'react'

export const StudentListTd = ({ data }) => {
  return (
    <tr className='studentListTd'>
      {
        data.map((item) => (
          <th
            key={item.id}
            className={classNames(`wd-${item.width}`)}
          >
            <span>{item.txt}</span>
          </th>
        ))
      }
    </tr>
  )
}