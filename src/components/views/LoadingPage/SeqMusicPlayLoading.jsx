import React, { useEffect } from "react";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";

function SeqMusicPlayLoading() {
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "auto";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  return (
    <ModalContainer>
      <Background>
        <LoadingText>음원이 재생중입니다.</LoadingText>
        <LoadingSubText>
          삐 소리 후 통역을 시작하고, 통역이 끝나면 정지버튼을 눌러주세요. 다음
          구간 원문이 재생됩니다.
        </LoadingSubText>
        <img
          src="https://blog.kakaocdn.net/dn/v1y1X/btssVWIC45r/jXKnj8okjiWI1EyZyAt7y0/img.gif"
          alt="로딩중"
          width="15%"
        />
      </Background>
    </ModalContainer>
  );
}

export default SeqMusicPlayLoading;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

const LoadingSubText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
