import React from 'react';

import NavBar from "../../components/views/NavBar/NavBar";
import BannerSlider from '../../components/views/publishing/MainPage/BannerSlider';
import { LectureList } from '../../components/views/publishing/MainPage/LectureList';
import { Schedule } from '../../components/views/publishing/MainPage/Schedule';
import "./MainPublishingPage.css";

function MainPublishingPage() {
  return (
    <main id='mainWapper'>
      <NavBar />
      <BannerSlider />
      <div className='mainPublishingPage'>
        <LectureList />
        <Schedule />
      </div>
    </main>
  )
}

export default MainPublishingPage