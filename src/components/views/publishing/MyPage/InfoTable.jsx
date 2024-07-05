import { InfoTableData } from "./InfoTableData";
import { InfoTableProfile } from "./InfoTableProfile";

import useFetchUser from "../../../../hooks/useFetchUser";
import "./Info.css";

// 마이페이지 - 기본 정보 테이블
export const InfoTable = ({ modify }) => {
  const {userInfo} = useFetchUser();
  return (
    <div className="infoTable">
      <InfoTableProfile 
        userInfo={userInfo}
      />
      <InfoTableData 
        userInfo={userInfo}
        modify={modify}
      />
    </div>
  )
}