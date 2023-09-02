import React from 'react';
import styled from 'styled-components';



function LoadingPage() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src="https://blog.kakaocdn.net/dn/UhsH3/btssT9PeQOh/P7djkKSkOl0X6ZOvKl4vok/img.gif" alt="로딩중" width="5%" />
    </Background>
  );
}

export default LoadingPage;

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