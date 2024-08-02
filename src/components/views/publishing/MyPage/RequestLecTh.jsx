import classNames from 'classnames'
import React from 'react'
import { MYPAGE } from '../../../../constants/text'

function RequestLecTh() {
  return (
    <tr>
      {
        MYPAGE.REQUEST_TABLE.th.map((item) => (
          <th 
            key={item.id} 
            className={classNames("currentLecTh", `wd-${item.width}`)}
          >
            <span>{item.txt}</span>
          </th>
        ))
      }
    </tr>
  )
}

export default RequestLecTh