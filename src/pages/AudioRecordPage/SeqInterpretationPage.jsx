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
import MusicPlayLoading from "../../components/views/LoadingPage/MusicPlayLoading";

function SeqInterpretationPage() {
  // let navigate = useNavigate();

  // const location = useLocation();
  // const data = location.state;
  // const [Audiolist, setAudiolist] = useState([]);
  // const [Regionmusic, setRegionmusic] = useState("");
  // const [Originmusic, setOriginmusic] = useState("");
  // const [Playmusic, setPlaymusic] = useState(false);
  // const [Assignmentnum, setAssignmentnum] = useState("");
  // const [Submitlist, setSubmitlist] = useState("");
  // const [Realsubmit, setRealsubmit] = useState([]);
  // const [Disable, setDisable] = useState(0);
  // const [Endlength, setEndlength] = useState(-1);
  // const [Endmusic, setEndmusic] = useState(false); //음악 종료시점 확인
  // const [WaveSuferLoading, setWaveSuferLoading] = useState(false); // 재생 전 wavesurfer 로딩
  const [loading, setLoading] = useState(false); //로딩페이지 로딩
  // const [MusicLoading, setMusicLoading] = useState(false); //음악 재생 중

  // useEffect(() => {
  //     Axios.get(`${API_URL}api/prob/submit?lecture_no=${data.num}&as_no=${data.asnum}`, {
  //         withCredentials: true,
  //     })
  //         .then((response) => {
  //             // 요청이 성공한 경우의 처리

  //             let Music_URL = `${API_URL}` + response.data.as_info.upload_url;
  //             console.log("submit", response.data);
  //             setAudiolist(response.data.wav_url);
  //             setEndlength(response.data.wav_url.length);
  //             setOriginmusic(Music_URL);
  //             setAssignmentnum(response.data.as_info.as_no);
  //         })
  //         .catch((error) => {
  //             // 요청이 실패한 경우의 처리
  //             console.error(error);
  //             navigate(-1);
  //         });
  // }, []);

  // useEffect(() => {
  //     console.log(Realsubmit);
  //     if (Realsubmit.length === Endlength) {
  //         alert("과제를 완료했습니다. 제출해주세요.");
  //     }
  // }, [Realsubmit]);

  // const onSubmitButton = () => {
  //     console.log(Realsubmit);
  //     console.log(Endlength);
  //     if (window.confirm("과제 제출하시겠습니까?")) {
  //         if (Realsubmit.length === Endlength) {
  //             let body = {
  //                 submitUUID: Realsubmit,
  //                 as_no: data.asnum,
  //                 lecture_no: data.num,
  //             };

  //             Axios.post(`${API_URL}api/prob/submit`, body, {
  //                 withCredentials: true,
  //             })
  //                 .then((response) => {
  //                     console.log(response.data);
  //                     alert("제출을 완료했습니다.");
  //                     navigate(-1);
  //                 })
  //                 .catch((error) => {
  //                     // 요청이 실패한 경우의 처리
  //                     console.error(error);
  //                     navigate(-1);
  //                 });
  //         } else {
  //             alert("녹음 혹은 업로드부터 진행해주세요.");
  //         }
  //     }
  // };

  return (
    <LectureBackgroudDiv>
      {loading ? <LoadingPage /> : null}
      {/*
            {MusicLoading ? <MusicPlayLoading /> : null}
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

            <Audioplay
                Regionmusic={Regionmusic}
                Originmusic={Originmusic}
                Playmusic={Playmusic}
                setWaveSuferLoading={setWaveSuferLoading}
                setPlaymusic={setPlaymusic}
                setEndmusic={setEndmusic}
                Endmusic={Endmusic}
                setMusicLoading={setMusicLoading}
                MusicLoading={MusicLoading}
            />

            <div style={{ width: "auto", margin: "20px auto" }}>
                <Row>
                    {Audiolist?.map((Wavaudio, index) => (
                        <React.Fragment key={index}>
                            <AudiorecordGridcard
                                region_index={parseInt(Wavaudio.region_index)}
                                Wavaudio={Wavaudio}
                                setRegionmusic={setRegionmusic}
                                WaveSuferLoading={WaveSuferLoading}
                                setWaveSuferLoading={setWaveSuferLoading}
                                setLoading={setLoading}
                                Playmusic={Playmusic}
                                setPlaymusic={setPlaymusic}
                                Assignmentnum={Assignmentnum}
                                setSubmitlist={setSubmitlist}
                                Submitlist={Submitlist}
                                setRealsubmit={setRealsubmit}
                                Realsubmit={Realsubmit}
                                setDisable={setDisable}
                                Disable={Disable}
                                setEndmusic={setEndmusic}
                                Endmusic={Endmusic}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            <LectureCreateDiv>
                <LectureCreateButton onClick={onSubmitButton}>제출하기</LectureCreateButton>
            </LectureCreateDiv>
			*/}
    </LectureBackgroudDiv>
  );
}

export default SeqInterpretationPage;

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
