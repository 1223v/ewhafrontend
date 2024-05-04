import { Row, message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import SeqInterpretationAudioplay from "../../components/views/AudioRecord/SeqInterpretationAudioplay";
import LoadingPage from "../../components/views/LoadingPage/LoadingPage";
import SeqMusicPlayLoading from "../../components/views/LoadingPage/SeqMusicPlayLoading";
import NavBar from "../../components/views/NavBar/NavBar";
import AudiorecordGridCard from "../../components/views/commons/AudiorecordGridCard";
import SeqAudiorecordGridcard from "../../components/views/commons/SeqAudiorecordGridCard";

function SelfSeqInterpretationPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const [Audiolist, setAudiolist] = useState([]); // 영역별 음원 리스트
  const [Regionmusic, setRegionmusic] = useState(""); // 현재 재생되고 있는 음원
  const [Playmusic, setPlaymusic] = useState(false); // 음악 실행 -> 누르면 play() 실행
  const [Submitlist, setSubmitlist] = useState(""); // 임시저장되어 들어간 과제
  const [Realsubmit, setRealsubmit] = useState([]); // 현재 제출한 과제의 양
  const [Disable, setDisable] = useState(0); // 현재 위치한 구간 => 저장 버튼 누르면 1씩 증가
  const [Endlength, setEndlength] = useState(-1); // 총 제출해야할 과제의 양
  const [WaveSuferLoading, setWaveSuferLoading] = useState(false); // 재생 전 wavesurfer 로딩
  const [loading, setLoading] = useState(false); //로딩페이지 로딩
  const [MusicLoading, setMusicLoading] = useState(false); //음악 재생 중 로딩
  const [Keyword, setKeyword] = useState(""); // 키워드
  const [AssignName, setAssignName] = useState(""); // 과제 이름
  const [AssignType, setAssignType] = useState(""); // 과제 타입
  const [MusicEnd, setMusicEnd] = useState(false); // 음악이 끝났는지 확인
  const [AssignSpeed, setAssignSpeed] = useState(1); // 과제 속도

  const onSubmitButton = () => {
    if (window.confirm("과제를 저장하고 제출하시겠습니까? ")) {
      if (Realsubmit.length === Endlength) {
        let body = {
          submitUUID: Realsubmit,
          as_no: asNo,
        };

        Axios.post(`${API_URL}api/prob/self/submit`, body, {
          withCredentials: true,
        })
          .then((response) => {
            message.success("저장을 완료했습니다.");
            navigate(`/prob/selfstudys/detail?as_no=${asNo}`);
          })
          .catch((error) => {
            // 요청이 실패한 경우의 처리
            console.error(error);
            alert("저장을 실패했습니다. 다시 시도해주세요.");
          });
      } else {
        alert("녹음 혹은 업로드부터 진행해주세요.");
      }
    }
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/self/record?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        // 요청이 성공한 경우의 처리
        if (response.data.isSuccess) {
          console.log(response.data);
          setAudiolist(response.data.audio_regions_url);
          setEndlength(response.data.audio_regions_url.length);
          setAssignName(response.data.as_name);
          setKeyword(response.data.keyword);
          setAssignType(response.data.as_type);
          setAssignSpeed(response.data.as_speed);
        } else {
          message.error(response.data.message);
          navigate(`/prob/selfstudys/detail?as_no=${asNo}`);
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        message.error("녹음 관련 에러입니다. 관리자에게 문의해주세요.");
        navigate("/");
      });
  }, []);

  useEffect(() => {
    console.log(Realsubmit);
    if (Realsubmit.length === Endlength) {
      alert("과제를 완료했습니다. 저장해주세요.");
    }
  }, [Realsubmit]);

  return (
    <LectureBackgroudDiv>
      {loading ? <LoadingPage /> : null}
      {MusicLoading ? <SeqMusicPlayLoading regionIndex={Disable} /> : null}
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/selfstudys/detail?as_no=${asNo}`}
            style={{ color: "black", padding: "7px" }}
          >
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
        <LectureTitleDiv>
          {AssignName} ({AssignType})
        </LectureTitleDiv>
      </div>

      <SeqInterpretationAudioplay
        Regionmusic={Regionmusic}
        Playmusic={Playmusic}
        setWaveSuferLoading={setWaveSuferLoading}
        setPlaymusic={setPlaymusic}
        setMusicLoading={setMusicLoading}
        MusicLoading={MusicLoading}
        setMusicEnd={setMusicEnd}
        Speedmusic={AssignSpeed}
      />
      <ExplanationDiv>
        원문재생을 누르면 원문이 재생되고 삐소리가 나면 녹음이 시작됩니다. 삐
        소리 후 통역하고, 완료하면 정지버튼을 눌러 저장합니다. 정지버튼을 누르면
        바로 다음 구간 원문이 재생됩니다
      </ExplanationDiv>

      <div style={{ width: "auto", margin: "20px" }}>
        <Row>
          <AudiorecordGridCard Keyword={Keyword} />
          {Audiolist?.map((Wavaudio, index) => (
            <React.Fragment key={index}>
              <SeqAudiorecordGridcard
                region_index={parseInt(Wavaudio.region_index)}
                Wavaudio={Wavaudio}
                setRegionmusic={setRegionmusic}
                WaveSuferLoading={WaveSuferLoading}
                setWaveSuferLoading={setWaveSuferLoading}
                setLoading={setLoading}
                Playmusic={Playmusic}
                setPlaymusic={setPlaymusic}
                setSubmitlist={setSubmitlist}
                Submitlist={Submitlist}
                setRealsubmit={setRealsubmit}
                Realsubmit={Realsubmit}
                setDisable={setDisable}
                Disable={Disable}
                MusicLoading={MusicLoading}
                MusicEnd={MusicEnd}
                setMusicEnd={setMusicEnd}
              />
            </React.Fragment>
          ))}
        </Row>
      </div>
      {Realsubmit.length === Endlength && (
        <LectureCreateDiv>
          <LectureCreateButton onClick={onSubmitButton}>
            저장하고 제출하기
          </LectureCreateButton>
        </LectureCreateDiv>
      )}
    </LectureBackgroudDiv>
  );
}

export default SelfSeqInterpretationPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

const ExplanationDiv = styled.div`
  width: auto;
  margin: 20px;
  text-align: center;
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
