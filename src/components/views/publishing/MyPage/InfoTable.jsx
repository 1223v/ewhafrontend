import { InfoTableData } from "./InfoTableData";
import { InfoTableProfile } from "./InfoTableProfile";

import "./Info.css";

// 마이페이지 - 기본 정보 테이블
export const InfoTable = () => {
  return (
    <div className="infoTable">
      <InfoTableProfile />
      <InfoTableData />
    </div>
  )
}