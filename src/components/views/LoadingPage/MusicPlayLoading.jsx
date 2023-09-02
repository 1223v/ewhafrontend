import React from 'react';
import styled from 'styled-components';



function MusicPlayLoading() {
  return (
    <Background>
      <LoadingText>음원이 재생중입니다.</LoadingText>
		  <LoadingSubText>음원 종료후 해당 구간이 녹음이 바로 진행됩니다.</LoadingSubText>
      <img src="https://blog.kakaocdn.net/dn/v1y1X/btssVWIC45r/jXKnj8okjiWI1EyZyAt7y0/img.gif" alt="로딩중" width="15%" />
    </Background>
  );
}

export default MusicPlayLoading;

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
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

const LoadingSubText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;