import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CurrentLecTd = ({
  idx,
  lec_no,
  lecture_name,
  major,
  separated,
  assignment_count,
  attendee_count
}) => {
  const baseClass = "currentLecTd";
  const navigate = useNavigate();

  const movePage = (id) => {
    console.log(id);
    navigate(`/prob/list/professor?lecture_no=${id}`);
  }

  return (
    <tr onClick={() => movePage(lec_no)}>
      <td className={classNames(baseClass, "wd-10")}>
        <span className={`${baseClass}__no`}>{idx}</span>
      </td>
      <td className={classNames(baseClass, "wd-25")}>
        <span className={`${baseClass}__name`}>{lecture_name}</span>
      </td>
      <td className={classNames(baseClass, "wd-20")}>
        <span className={`${baseClass}__sep`}>{major} {separated}</span>
      </td>
      <td className={classNames(baseClass, "wd-20")}>
        <span className={`${baseClass}__asCnt`}>{assignment_count}개 게시중</span>
      </td>
      <td className={classNames(baseClass, "wd-10")}>
        <span className={`${baseClass}__atCnt`}>{attendee_count}명</span>
      </td>
      <td className={classNames(baseClass, "wd-15")}>
        <span className={`${baseClass}__btn`}>수강생 조회</span>
      </td>
    </tr>
  )
}