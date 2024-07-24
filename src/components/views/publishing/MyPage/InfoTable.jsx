import { InfoTableData } from "./InfoTableData";
import { InfoTableProfile } from "./InfoTableProfile";

import { useContext } from "react";
import "./Info.css";
import { InfoContext } from "./InfoProvider";

// 마이페이지 - 기본 정보 테이블
export const InfoTable = ({ 
  userInfo
}) => {
  const { modify, editableUserInfo, setEditableUserInfo } = useContext(InfoContext);

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