import { Row, message } from "antd";
import Axios from "axios";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import SimInterpretationAudioplay from "../../components/views/AudioRecord/SimInterpretationAudioplay";
import LoadingPage from "../../components/views/LoadingPage/LoadingPage";
import SimMusicPlayLoading from "../../components/views/LoadingPage/SimMusicPlayLoading";
import NavBar from "../../components/views/NavBar/NavBar";
import AudiorecordGridCard from "../../components/views/commons/AudiorecordGridCard";
import SimAudiorecordGridcard from "../../components/views/commons/SimAudiorecordGridcard";

function SimInterpretationPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const [Audiolist, setAudiolist] = useState([]); // 영역별 음원 리스트
  const [Regionmusic, setRegionmusic] = useState("");
  const [Playmusic, setPlaymusic] = useState(false); // 음악 실행 -> 누르면 play() 실행
  const [Submitlist, setSubmitlist] = useState(""); // 임시저장되어 들어간 과제
  const [Realsubmit, setRealsubmit] = useState([]); // 현재 제출한 과제의 양
  const [Disable, setDisable] = useState(0); // 현재 위치한 구간 => 저장 버튼 누르면 1씩 증가
  const [Endlength, setEndlength] = useState(-1); // 총 제출해야할 과제의 양
  const [WaveSuferLoading, setWaveSuferLoading] = useState(false); // 재생 전 wavesurfer 로딩
  const [loading, setLoading] = useState(false); //로딩페이지 로딩
  const [MusicLoading, setMusicLoading] = useState(false); //음악 재생 중
  const [Startmusic, setStartmusic] = useState(false); //음악 시작
  const [Keyword, setKeyword] = useState(""); // 키워드
  const [AssignName, setAssignName] = useState(""); // 과제 이름
  const [AssignType, setAssignType] = useState(""); // 과제 타입
  const [AssignSpeed, setAssignSpeed] = useState(1); // 과제 속도

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      // 메시지 설정
      e.preventDefault(); // 기본 이벤트를 취소

      console.log("beforeunload");
    });
    const history = createBrowserHistory();

    // 이전 페이지로의 이동을 막습니다.
    history.block((location) => {
      console.log(location);
      if (location.action === "POP" || location.action === "PUSH") {
        window.location.href = "/prob/detail/student?lecture_no=94&as_no=635";
        //return false; // 이동을 차단
      }

      return null;
    });

    return () => {
      // 컴포넌트가 언마운트 될 때 history.block을 해제
      history.block(null);
    };
  }, []);

  useEffect(() => {
    Axios.get(
      `${API_URL}api/prob/record?lecture_no=${lectureNo}&as_no=${asNo}`,
      {
        withCredentials: true,
      }
    )
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
          navigate(
            `/prob/detail/student?lecture_no=${lectureNo}&as_no=${asNo}`
          );
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

  const onSubmitButton = () => {
    if (window.confirm("과제를 저장하고 제출하시겠습니까?")) {
      if (Realsubmit.length === Endlength) {
        let body = {
          submitUUID: Realsubmit,
          as_no: asNo,
          lecture_no: lectureNo,
        };

        Axios.post(`${API_URL}api/prob/submit`, body, {
          withCredentials: true,
        })
          .then((response) => {
            message.success("저장을 완료했습니다.");
            navigate(
              `/prob/detail/student?lecture_no=${lectureNo}&as_no=${asNo}`
            );
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

  return (
    <LectureBackgroudDiv>
      {loading ? <LoadingPage /> : null}
      {MusicLoading ? <SimMusicPlayLoading regionIndex={Disable} /> : null}
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/detail/student?lecture_no=${lectureNo}&as_no=${asNo}`}
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

      <SimInterpretationAudioplay
        Regionmusic={Regionmusic}
        Playmusic={Playmusic}
        setWaveSuferLoading={setWaveSuferLoading}
        setPlaymusic={setPlaymusic}
        setMusicLoading={setMusicLoading}
        MusicLoading={MusicLoading}
        Startmusic={Startmusic}
        setStartmusic={setStartmusic}
        Speedmusic={AssignSpeed}
      />

      <ExplanationDiv>
        “원문재생을 누르면 원문재생과 녹음이 동시에 시작됩니다. 원문 재생 완료
        후 ‘삐’소리가 납니다. 통역을 마치고 정지버튼을 눌러 저장하세요.”
      </ExplanationDiv>

      <div style={{ width: "auto", margin: "20px auto" }}>
        <Row>
          <AudiorecordGridCard Keyword={Keyword} />
          {Audiolist?.map((Wavaudio, index) => (
            <React.Fragment key={index}>
              <SimAudiorecordGridcard
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
                Startmusic={Startmusic}
                setStartmusic={setStartmusic}
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

export default SimInterpretationPage;

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
