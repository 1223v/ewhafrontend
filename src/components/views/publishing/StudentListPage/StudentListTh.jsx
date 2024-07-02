import classNames from 'classnames'
import React from 'react'

export const StudentListTh = ({ data }) => {
  return (
    <tr className='studentListTh'>
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