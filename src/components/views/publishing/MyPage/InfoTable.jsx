import { InfoTableData } from "./InfoTableData";
import { InfoTableProfile } from "./InfoTableProfile";

import "./Info.css";

// 마이페이지 - 기본 정보 테이블
export const InfoTable = ({ 
  modify,
  editableUserInfo,
  setEditableUserInfo,
  userInfo
}) => {
  
  return (
    <div className="infoTable">
      <InfoTableProfile 
        userInfo={userInfo}
      />
      <InfoTableData 
        userInfo={userInfo}
        modify={modify}
        editableUserInfo={editableUserInfo}
        setEditableUserInfo={setEditableUserInfo}
      />
    </div>
  )
}