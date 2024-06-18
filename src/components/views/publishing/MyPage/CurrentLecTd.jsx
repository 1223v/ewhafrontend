import classNames from 'classnames';
import React from 'react';

export const CurrentLecTd = ({
  idx,
  lecture_name,
  major,
  separated,
  assignment_count,
  attendee_count
}) => {
  return (
    <tr>
      <td className={classNames("currentLecTd", "wd-10")}>
        <span className="currentLecTd__no">{idx}</span>
      </td>
      <td className={classNames("currentLecTd", "wd-25")}>
        <span className="currentLecTd__name">{lecture_name}</span>
      </td>
      <td className={classNames("currentLecTd", "wd-20")}>
        <span className="currentLecTd__sep">{major} {separated}</span>
      </td>
      <td className={classNames("currentLecTd", "wd-20")}>
        <span className="currentLecTd__asCnt">{assignment_count}개 게시중</span>
      </td>
      <td className={classNames("currentLecTd", "wd-10")}>
        <span className="currentLecTd__atCnt">{attendee_count}명</span>
      </td>
      <td className={classNames("currentLecTd", "wd-15")}>
        <span className="currentLecTd__btn">수강생 조회</span>
      </td>
    </tr>
  )
}