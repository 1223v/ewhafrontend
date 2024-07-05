import React from 'react';

import NavBar from '../../components/views/NavBar/NavBar';
import { CurrentLec } from '../../components/views/publishing/MyPage/CurrentLec';
import { Info } from '../../components/views/publishing/MyPage/Info';
import "./MyPagePublishingPage.css";

function MyPagePublishingPage() {
  return (
    <main id='mypageWapper'>
      <NavBar />
      <div className='mypageWrapper__content'>
        <Info />
        <CurrentLec />
      </div>
      <div className='mypageWrapper__content-banner'></div>
    </main>
  )
}

export default MyPagePublishingPage