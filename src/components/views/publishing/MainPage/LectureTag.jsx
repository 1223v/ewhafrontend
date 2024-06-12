import React from "react";
import { CgClose } from "react-icons/cg";

// 메인페이지 - 필터링 태그 (학기, 분반)
function LectureTag({ className, txt, closeAbsence, onRemove }) {
  return (
    <div className={`lectureTag flex_row_center ${className}`}>
      <span>{txt}</span>
      {closeAbsence && (
        <span onClick={onRemove}>
          <CgClose size="13" className={`lectureTagCloseIcon ${className}`} />
        </span>
      )}
    </div>
  );
}

export default LectureTag;
