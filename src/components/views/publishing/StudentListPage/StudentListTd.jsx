import classNames from 'classnames';
import React from 'react';
import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { STUDENTLIST } from '../../../../constants/text';


export const StudentListTd = ({ idx, data, isWait }) => {
  console.log(idx);
  return (
    <tr className={classNames('studentListTd', {
      dimmed: idx % 2 == 1
    })}>
      {
        isWait && 
        <td
          className={classNames(`wd-15`)}
        >
          <span
            className={classNames("studentListTd__status", { 
              wait : data.status,
              reject: !data.status
            })}
          >{STUDENTLIST.STATUS[data.status]}</span>
        </td>
      }
      <td
        className={classNames("studentListTd__name", `wd-15`)}
      >
        <span>{data.user_name}</span>
      </td>
      <td
        className={classNames("studentListTd__major", `wd-20`)}
      >
        <span>{data.major}</span>
      </td>
      <td
        className={classNames("studentListTd__email", `wd-25`)}
      >
        <span>{data.email}</span>
      </td>
      {/* TODO: 등록일 없음 */}
      {!isWait &&
        <td
          className={classNames("studentListTd__email",`wd-25`)}
        >
        	<span>{data.registerDate}</span>
        </td>
      }

      {isWait && 
        <td
          className={classNames("studentListTd__btn",`wd-25`)}
        >
	 <span className='studentListTd-btn reject'>
	  <IoClose
	   style={{'color': '#EA4C4C'}}
	  />
          <span>거절</span>
	 </span>
	 <span
	  className='studentListTd-btn accept'
	 >
	  <IoCheckmark 
	   style={{'color': '#1A845C'}}
	  />
          <span>수락</span>
	 </span>
        </td>
      }
    </tr>
  )
}
