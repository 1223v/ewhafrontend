import classNames from 'classnames';
import React from 'react';
import { MYPAGE } from '../../../../constants/text';

import "./CurrentLec.css";

export const CurrentLecTh = () => {
  return (
    <tr>
      {
        MYPAGE.CUR_TABLE.th.map((item) => (
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