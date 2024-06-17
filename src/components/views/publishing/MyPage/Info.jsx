import { MYPAGE } from "../../../../constants/text";
import { InfoTable } from "./InfoTable";

import "./Info.css";

// 마이페이지 - 기본 정보
export const Info = () => {
  return (
    <section id="info">
      <div className="info-header">
        <span className="info-header__title">{MYPAGE.TITLE.info}</span>
        <span className="info-header__btn">{MYPAGE.BTN.modify}</span>
      </div>
      <InfoTable />
    </section>
  )
}