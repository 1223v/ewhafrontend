import React, { useContext } from "react";
import { InfoHeader } from "./InfoHeader";
import { InfoContext, InfoProvider } from "./InfoProvider";
import { InfoTable } from "./InfoTable";

import { message } from "antd";
import useFetchUser from "../../../../hooks/useFetchUser";
import useModifyUser from "../../../../hooks/useModifyUser";
import "./Info.css";

// 마이페이지 - 기본 정보
export const Info = () => {
  const { modifyUser } = useModifyUser();
  const { fetchUser, userInfo } = useFetchUser();

  return (
    <InfoProvider>
      <UserInfoContent modifyUser={modifyUser} fetchUser={fetchUser} userInfo={userInfo} />
    </InfoProvider>
  );
};

const UserInfoContent = ({ modifyUser, fetchUser, userInfo }) => {
  const { modify, setModify, editableUserInfo, setEditableUserInfo } = useContext(InfoContext);

  const handleModify = async () => {
    setModify(true);
    console.log(editableUserInfo);
    try {
      const res = await modifyUser({
        name: editableUserInfo.name, 
        major: editableUserInfo.major
      });
      console.log(res);
      if (res.status === 200 && res.data.isSuccess) {
        message.success("회원정보가 수정되었습니다.");
        await fetchUser();
      } else {
        message.error("회원정보 수정에 실패하였습니다.");
      }
    } catch (err) {
      message.error("회원정보 수정 중 오류가 발생하였습니다.");
    }
  };

  return (
    <section id="info">
      <InfoHeader 
        handleModify={handleModify}
      />
      <InfoTable 
        userInfo={userInfo}
      />
    </section>
  );
};
