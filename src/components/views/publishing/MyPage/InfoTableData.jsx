import React from "react";
import { MYPAGE } from "../../../../constants/text";
import { InfoTableDataItem } from "./InfoTableDataItem";

import "./Info.css";

// 마이페이지 - 테이블 중 데이터 부분
export const InfoTableData = () => {
  return (
    <div className="infoTableData">
      {
        MYPAGE.INFO_TABLE.map((item) => (
          <React.Fragment key={item.id}>
            <InfoTableDataItem
              title={item.txt}
              content={item.name} // TODO: API 연동하면 name으로 값 가져오기
            />
          </React.Fragment>
        ))
      }
    </div>
  )
}