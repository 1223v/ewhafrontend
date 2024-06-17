import React from 'react';

import { CurrentLec } from '../../components/views/publishing/MyPage/CurrentLec';
import { Info } from '../../components/views/publishing/MyPage/Info';
import "./MyPagePublishingPage.css";

function MyPagePublishingPage() {
  return (
    <main id='mypageWapper'>
      <div className='mypageWrapper__content-banner'></div>
      <div className='mypageWrapper__content'>
        <Info />
        <CurrentLec />
      </div>
    </main>
  )
}

export default MyPagePublishingPage