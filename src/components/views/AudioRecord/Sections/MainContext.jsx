import React, { createContext, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = (props) => {
  const [audioURL, setAudioURL] = useState(
    "https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a"
  );
  const [audioExtension, setAudioExtension] = useState("");

  return (
    <MainContext.Provider
      value={{
        audioURL,
        setAudioURL,
        audioExtension,
        setAudioExtension
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
