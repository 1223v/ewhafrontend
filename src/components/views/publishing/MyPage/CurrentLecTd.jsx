import classNames from 'classnames'
import React from 'react'
import { MYPAGE } from '../../../../constants/text'

export const CurrentLecTd = () => {
  return (
    <tr>
      {
        MYPAGE.CUR_TABLE.td.map((item) => (
          <td 
            key={item.id} 
            className={classNames("currentLecTd", `wd-${item.width}`)}
          >
            <span>{item.txt}</span>
          </td>
        ))
      }
    </tr>
  )
}