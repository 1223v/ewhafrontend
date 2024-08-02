import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDENTLIST } from '../../../../constants/text';

export const RequestLecTd = ({
  idx,
  lec_no,
  lecture_name,
  professor,
  lecClass,
  status
}) => {
  const baseClass = "currentLecTd";
  const navigate = useNavigate();
  
  const toLecturePage = (id) => {
    console.log(id);
    navigate(`/prob/list/professor?lecture_no=${id}`);
  }
  
  return (
    <tr 
      className={`${baseClass}`}
      onClick={() => toLecturePage(lec_no)}
    >
      <td className={classNames(baseClass, "wd-10")}>
        <span className={`${baseClass}__no`}>{idx}</span>
      </td>
      <td className={classNames(baseClass, "wd-25")}>
        <span className={`${baseClass}__name`}>{lecture_name}</span>
      </td>
      <td className={classNames(baseClass, "wd-20")}>
        <span className={`${baseClass}__sep`}>{lecClass}</span>
      </td>
      <td className={classNames(baseClass, "wd-15")}>
        <span className={`${baseClass}__professor`}>{professor}</span>
      </td>
      <td className={classNames(baseClass, "wd-20")}>
        <span className={`${baseClass}__date`}>2024년 1월 1일</span>
      </td>
      <td className={classNames(baseClass, "wd-10")}>
        <span
          className={classNames("studentListTd__status", { 
            wait : status,
            reject: !status
          })}
          >{STUDENTLIST.STATUS[status]}</span>
      </td>
    </tr>
  )
}