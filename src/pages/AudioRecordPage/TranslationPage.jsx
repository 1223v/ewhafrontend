import React, { useEffect, useState } from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row } from "antd";
import SimAudiorecordGridcard from "../../components/views/commons/SimAudiorecordGridcard";
import SimInterpretationAudioplay from "../../components/views/AudioRecord/SimInterpretationAudioplay";
import { API_URL } from "../../components/Config";
import LoadingPage from "../../components/views/LoadingPage/LoadingPage";
import { useSelector } from 'react-redux';

function TranslationPage() {
	let navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const lectureNo = params.get("lecture_no");
    const asNo = params.get("as_no");
    const userinfos = useSelector((state) => state.user);
	
	const [loading, setLoading] = useState(false); //로딩페이지 로딩


    return (
        <LectureBackgroudDiv>
            {loading ? <LoadingPage /> : null}
            
            <NavBar />
             <div style={{ display: "flex" }}>
				<LectureBackDiv>
                    <Link to={"/"} style={{ color: "black", padding: "7px" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 -5 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                            />
                        </svg>
                    </Link>
                </LectureBackDiv>
                <LectureTitleDiv>과제명</LectureTitleDiv>
            </div>

            

            <div style={{ width: "auto", margin: "20px auto" }}>
                
            </div>
            <LectureCreateDiv>
                <LectureCreateButton >제출하기</LectureCreateButton>
            </LectureCreateDiv>
			
        </LectureBackgroudDiv>
    );
}

export default TranslationPage;

const LectureBackgroudDiv = styled.div`
    background-color: #f7f7fa;
    width: 100%;
    height: 100%;
    min-height: 1500px;
`;

const LectureBackDiv = styled.div`
    background-color: #85889914;
    border-radius: 7px;
    margin: 20px;
    height: 34px;
    width: 40px;
    color: black;
`;

const LectureTitleDiv = styled.div`
    font-size: 1.4rem;
    line-height: 1.5;
    color: #2b2d36;
    font-weight: 700;
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
    font-family: "Noto Sans KR", sans-serif;
    margin-top: 17px;
`;

const LectureCreateDiv = styled.div`
    position: fixed;
    bottom: 0px;
    z-index: 8;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: 4rem;
    background: rgb(255, 255, 255);
    box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
`;

const LectureCreateButton = styled.button`
    height: 3rem;
    font-size: 0.975rem;
    font-weight: 800;
    line-height: 1.375rem;
    width: 100%;
    border-radius: 0.5rem;
    margin: 20px;
    color: #fff;
    background-color: #2e462f;
    border-color: transparent;
`;
