import classNames from "classnames";
import React from "react";
import { HiArrowPath } from "react-icons/hi2";
import { MAIN } from "../../../../constants/text";
import LectureTag from "./LectureTag";

// 메인페이지 - 선택한 태그 리스트
function LectureFilterList({ tags, onRemove, onClear }) {
  return (
    <div className="lectureFilterList">
      {tags?.map((item, index) => (
        <LectureTag
          className={classNames(item.tagColor, { appear: tags.length > 0 })}
          txt={item.txt}
          key={index}
          closeAbsence={true}
          onRemove={() => onRemove(item.txt)}
        />
      ))}
      {tags?.length > 0 && (
        <span className="lectureFilterList-btn" onClick={onClear}>
          <HiArrowPath />
          <span>{MAIN.BTN.reset}</span>
        </span>
      )}
    </div>
  );
}

export default LectureFilterList;
