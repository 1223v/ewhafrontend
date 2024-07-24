import React, { createContext, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [modify, setModify] = useState(true);
  const [editableUserInfo, setEditableUserInfo] = useState({});

  return (
    <InfoContext.Provider value={{ modify, setModify, editableUserInfo, setEditableUserInfo }}>
      {children}
    </InfoContext.Provider>
  );
};
