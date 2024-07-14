import { Modal } from 'antd';
import classNames from 'classnames';
import dayjs from "dayjs";
import React, { useState } from 'react';
import { IoCheckmark, IoClose } from "react-icons/io5";
import { STUDENTLIST } from '../../../../constants/text';


export const StudentListTd = ({ idx, data, isWait, applyStudent }) => {
  const [isModalOpen, setIsModalOpen] = useState(0); // 1: 수락, 2: 거절

  const handleOk = async () => {
    applyStudent(data.user_no, isModalOpen === 1 ? true : false);
    setIsModalOpen(0);
  };

  const handleCancel = () => {
    setIsModalOpen(0);
  };

  return (
    <tr className={classNames('studentListTd', {
      dimmed: idx % 2 === 1
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
      {!isWait &&
        <td
          className={classNames("studentListTd__email",`wd-25`)}
        >
        	<span>{dayjs(data.register_time).format("YYYY년 MM월 DD일")}</span>
        </td>
      }

      {isWait && 
        <td
          className={classNames("studentListTd__btn",`wd-25`)}
        >
          {
            data.status && (
              <span 
                className='studentListTd-btn reject'
                onClick={() => setIsModalOpen(2)}
              >
                <IoClose
                  style={{'color': '#EA4C4C'}}
                />
                <span>거절</span>
              </span>
            )
          }
          <span
            className='studentListTd-btn accept'
            onClick={() => setIsModalOpen(1)}
          >
            <IoCheckmark 
              style={{'color': '#1A845C'}}
            />
            <span>수락</span>
          </span>

          <Modal title="수강신청 승인" open={isModalOpen ? true : false} onOk={handleOk} onCancel={handleCancel}>
            <p>수강신청을 {isModalOpen === 1 ? "수락" : "거절"}하시겠습니까?</p>
          </Modal>
        </td>
      }
    </tr>
  )
}
