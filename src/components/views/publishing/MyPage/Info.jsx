import { MYPAGE } from "../../../../constants/text";
import { InfoTable } from "./InfoTable";

import { useState } from "react";
import "./Info.css";

// 마이페이지 - 기본 정보
export const Info = () => {
  const [modify, setModify] = useState(true);
  return (
    <section id="info">
      <div className="info-header">
        <span className="info-header__title">{MYPAGE.TITLE.info}</span>
        {
          !modify ?
          <span className="info-header__btn" onClick={() => setModify(true)}>{MYPAGE.BTN.modifyOff}</span> : 
          <span className="info-header__btn" onClick={() => setModify(false)}>{MYPAGE.BTN.modifyOn}</span>
        }
      </div>
      <InfoTable 
        modify={modify}
      />
    </section>
  )
}