import {
  BarChartOutlined,
  EditOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Button, FloatButton, message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import OriginAudioplay from "../../components/views/Audio/OriginAudioplay";
import StudentAudioplay from "../../components/views/Audio/StudentAudioplay";
import ProfessorResultSheet from "../../components/views/Feedback/ProfessorResultSheet";
import TextAEEditor from "../../components/views/Feedback/TextAEEditor";
import NavBar from "../../components/views/NavBar/NavBar";
import FeedbackGridCard from "../../components/views/commons/FeedbackGridCard";
import Timeformat from "../../components/views/commons/Timeformat";

function ProfessorProbFeedbackPage() {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no"); // 학생 번호
  const [FeedbackResult, setFeedbackResult] = useState(false); // 총평 바텀시트 open 여부
  const [NewAttributeCount, setNewAttributeCount] = useState(""); // 새로운 속성 개수
  const [Datacontent, setDatacontent] = useState(false); // textaeeditor 데이터 변경 감지
  const [TextContent, setTextContent] = useState(""); // textaeeditor text 데이터
  const [Sectioncontent, setSectioncontent] = useState([]); // textaeeditor Denotations 데이터
  const [AttributesContent, setAttributesContent] = useState([]); // textaeeditor Attributes 데이터
  const [SubmitAttributesContent, setSubmitAttributesContent] = useState([]); // textaeeditor Attributes 피드백 반영 데이터
  const [StudentInfo, setStudentInfo] = useState(""); // 학생 정보
  const [AssignmentName, setAssignmentName] = useState(""); // 과제 이름
  const [AssignType, setAssignType] = useState(""); // 과제 타입
  const [LimitTime, setLimitTime] = useState(""); // 마감 시간
  const [SubmitTime, setSubmitTime] = useState(""); // 제출 시간
  const [StudentAudio, setStudentAudio] = useState([]); // 학생 구간 녹음 자료
  const [OriginAudio, setOriginAudio] = useState([]); // 원본 구간 음원 자료
  const [OriginText, setOriginText] = useState(""); // 원본 텍스트 자료
  const [STTText, setSTTText] = useState(""); // STT된 텍스트 자료
  const [OriginSelectAudio, setOriginSelectAudio] = useState(""); // 원본 선택된 음원
  const [StudentSelectAudio, setStudentSelectAudio] = useState(""); // 학생 선택된 음원
  const [Checking, setChecking] = useState(true); // 원문, stt 토글
  const [Synchronization, setSynchronization] = useState(false); // 원본 / 학생 동기화
  const [SynchronizationPlay, setSynchronizationPlay] = useState(false); // 원본 / 학생 동기화 플레이
  const [SynchronizationskipForward, setSynchronizationskipForward] =
    useState(false); // 원본 / 학생 동기화 빨리감기
  const [SynchronizationskipBackward, setSynchronizationskipBackward] =
    useState(false); // 원본 / 학생 동기화 되감기
  const [SynchronizationMove, setSynchronizationMove] = useState(0); // 원본 / 학생 동기화 특정 시간으로 이동
  const [Anchoring, setAnchoring] = useState(""); // textaeeditor Anchoring 데이터
  const [ChoiceAnchor, setChoiceAnchor] = useState(""); // textaeeditor Anchoring 데이터

  /**
   * 원문, stt 토글
   */
  const onSttTextChange = () => {
    setChecking(false);
  };

  /**
   * 원문, stt 토글
   */
  const onOriginTextChange = () => {
    setChecking(true);
  };

  const onResultBottomSheetClick = () => {
    setFeedbackResult(true);
  };

  const onGraphClick = () => {
    navigate(
      `/prob/graph/professor?lecture_no=${lectureNo}&as_no=${asNo}&user_no=${userNo}`
    );
  };

  /**
   * TextAEEditor의 데이터를 불러오는 함수
   */
  useEffect(() => {
    Axios.get(
      `${API_URL}api/feedback/info?as_no=${asNo}&student_no=${userNo}`,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.isSuccess) {
          // 요청이 성공한 경우의 처리
          console.log(response.data);
          setStudentInfo(response.data.student_name);
          setLimitTime(response.data.limit_time);
          setSubmitTime(response.data.submit_time);
          setStudentAudio(response.data.student_audio);
          setOriginAudio(response.data.assignment_audio);
          setOriginText(response.data.original_text);
          setSTTText(response.data.original_tts);
          setAssignType(response.data.as_type);
          setAssignmentName(response.data.assignment_name);
        } else {
          message.error(response.data.message);

          navigate(
            `/prob/detail/professor?lecture_no=${lectureNo}&as_no=${asNo}`
          );
        }
      })

      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/detail/professor?as_no=${asNo}&lecture_no=${lectureNo}`}
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
          {AssignmentName} 과제 피드백 : {StudentInfo}{" "}
          <LectureSubTitleDiv>
            (제출 시간 : <Timeformat dateString={SubmitTime} /> , 마감 시간{" "}
            <Timeformat dateString={LimitTime} />)
          </LectureSubTitleDiv>
        </LectureTitleDiv>
      </div>
      <FeedbackDiv>
        <Original>
          <h4>
            원문{" "}
            {AssignType !== "번역" && (
              <ChangeDiv>
                <Button
                  onClick={onOriginTextChange}
                  style={{
                    backgroundColor: Checking ? "#05422b" : "#d9d9d9",
                    color: Checking ? "white" : "black",
                  }}
                  disabled={Checking}
                >
                  원문
                </Button>
                <Button
                  onClick={onSttTextChange}
                  style={{
                    backgroundColor: !Checking ? "#05422b" : "#d9d9d9",
                    color: !Checking ? "white" : "black",
                  }}
                  disabled={!Checking}
                >
                  STT
                </Button>
              </ChangeDiv>
            )}
          </h4>
          <OriginalBox>{Checking ? OriginText : STTText}</OriginalBox>
        </Original>

        <Interpretation>
          <h4>{AssignType !== "번역" ? "통역 전사문" : "번역"}</h4>
          <InterpretationBox className="textae-container">
            <TextAEEditor
              Datacontent={Datacontent}
              setDatacontent={setDatacontent}
              setTextContent={setTextContent}
              Sectioncontent={Sectioncontent}
              setSectioncontent={setSectioncontent}
              setAttributesContent={setAttributesContent}
              setSubmitAttributesContent={setSubmitAttributesContent}
              setNewAttributeCount={setNewAttributeCount}
              Anchoring={Anchoring}
              setChoiceAnchor={setChoiceAnchor}
            />
          </InterpretationBox>
        </Interpretation>

        <Estimation>
          <h4>피드백</h4>
          <EstimationBox>
            {Sectioncontent?.map((lesson, index) => (
              <React.Fragment key={index}>
                <FeedbackGridCard
                  id={lesson.id}
                  begin={lesson.span.begin}
                  end={lesson.span.end}
                  obj={lesson.obj}
                  Datacontent={Datacontent}
                  setDatacontent={setDatacontent}
                  TextContent={TextContent}
                  AttributesContent={AttributesContent}
                  Sectioncontent={Sectioncontent}
                  SubmitAttributesContent={SubmitAttributesContent}
                  NewAttributeCount={NewAttributeCount}
                  setAnchoring={setAnchoring}
                  ChoiceAnchor={ChoiceAnchor}
                />
              </React.Fragment>
            ))}
          </EstimationBox>
        </Estimation>
      </FeedbackDiv>

      {AssignType !== "번역" && (
        <MusicPlayer>
          <LectureCreateDiv>
            <OriginAudioplay
              OriginAudio={OriginAudio}
              SelectAudio={OriginSelectAudio}
              setSelectAudio={setOriginSelectAudio}
              setSynchronization={setSynchronization}
              Synchronization={Synchronization} // 원본 / 학생 동기화
              SynchronizationPlay={SynchronizationPlay} // 원본 / 학생 동기화 플레이
              SynchronizationskipBackward={SynchronizationskipBackward} // 원본 / 학생 동기화 되감기
              SynchronizationskipForward={SynchronizationskipForward} // 원본 / 학생 동기화 빨리감기
              setSynchronizationskipForward={setSynchronizationskipForward} // 원본 / 학생 동기화 빨리감기 변경
              setSynchronizationskipBackward={setSynchronizationskipBackward} // 원본 / 학생 동기화 되감기 변경
              setSynchronizationPlay={setSynchronizationPlay} // 원본 / 학생 동기화 플레이 변경
              SynchronizationMove={SynchronizationMove} // 원본 / 학생 동기화 특정 시간으로 이동
            />
          </LectureCreateDiv>

          <LectureCreateDiv2>
            <StudentAudioplay
              StudentAudio={StudentAudio}
              SelectAudio={StudentSelectAudio}
              setSelectAudio={setStudentSelectAudio}
              OriginAudio={OriginAudio}
              setOriginSelectAudio={setOriginSelectAudio}
              SynchronizationPlay={SynchronizationPlay} // 원본 / 학생 동기화 플레이
              setSynchronizationPlay={setSynchronizationPlay} // 원본 / 학생 동기화 플레이 변경
              SynchronizationskipBackward={SynchronizationskipBackward} // 원본 / 학생 동기화 되감기
              setSynchronizationskipBackward={setSynchronizationskipBackward} // 원본 / 학생 동기화 되감기 변경
              SynchronizationskipForward={SynchronizationskipForward} // 원본 / 학생 동기화 빨리감기
              setSynchronizationskipForward={setSynchronizationskipForward} // 원본 / 학생 동기화 빨리감기 변경
              Synchronization={Synchronization} // 원본 / 학생 동기화
              setSynchronization={setSynchronization} // 원본 / 학생 동기화 변경
              setSynchronizationMove={setSynchronizationMove} // 원본 / 학생 동기화 특정 시간으로 이동
            />
          </LectureCreateDiv2>
        </MusicPlayer>
      )}

      <FloatButton.Group
        trigger="click"
        style={{ right: 20, bottom: 200, zIndex: 3 }}
        icon={<BarChartOutlined />}
      >
        <FloatButton
          icon={<LineChartOutlined />}
          onClick={onGraphClick}
          tooltip={<div>그래프 보기</div>}
        />

        <FloatButton
          icon={<EditOutlined />}
          onClick={onResultBottomSheetClick}
          tooltip={<div>총평 작성</div>}
        />
      </FloatButton.Group>
      <ProfessorResultSheet
        Result={FeedbackResult}
        setResult={setFeedbackResult}
      />
    </div>
  );
}
export default ProfessorProbFeedbackPage;

const ChangeDiv = styled.div`
  float: right;
`;

const FeedbackDiv = styled.div`
  margin: 0 auto;
  position: relative;
  min-height: 1800px;
  @media screen and (min-width: 1000px) {
    width: 1400px;
    margin: none;
    min-height: 800px;
  }
`;

const Original = styled.div`
  font-size: 12px;
  margin: 0 auto;
  max-width: 800px;
  padding: 15px;
  @media screen and (min-width: 1000px) {
    margin-top: 20px;
    position: absolute;
    left: 0px;

    width: 450px;
    height: 580px;

    border: 1px solid #d3d3d3;
    border-radius: 4px;

    background-color: #f9f9f9;
    text-align: center;
  }
`;

const OriginalBox = styled.div`
  width: auto;
  height: 500px;
  overflow-y: auto;
  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  text-align: start;

  background-color: #f9f9f9;
`;

const Interpretation = styled.div`
  font-size: 12px;
  margin: 0 auto;
  max-width: 800px;
  padding: 15px;
  @media screen and (min-width: 1000px) {
    margin-top: 20px;
    position: absolute;
    left: 480px;

    width: 450px;
    height: 580px;

    border: 1px solid #d3d3d3;
    border-radius: 4px;

    background-color: #f9f9f9;
  }
`;

const InterpretationBox = styled.div`
  width: auto;
  height: auto;
  max-height: 500px;
  overflow-y: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;

const Estimation = styled.div`
  font-size: 12px;
  margin: 0 auto;
  max-width: 800px;
  padding: 15px;
  @media screen and (min-width: 1000px) {
    margin-top: 20px;
    position: absolute;
    left: 1010px;
    width: 300px;
    height: 580px;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    background-color: #f9f9f9;

    text-align: center;
  }
`;

const EstimationBox = styled.div`
  padding: 10px;
  display: flex;
  width: auto;
  height: 272px;
  overflow-x: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
  @media screen and (min-width: 1000px) {
    height: 500px;
    display: block;
  }
`;

const LectureCreateDiv = styled.div`
  position: fixed;
  bottom: 6rem;
  width: 100%;
  left: 0;
  z-index: 3;
  -webkit-box-align: center;
  align-items: center;

  height: 6rem;
  background: rgb(255, 255, 255);
  box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
  @media screen and (min-width: 1000px) {
    bottom: 0px;
    width: 50%;
    border-left: solid 3px;
  }
`;

const LectureCreateDiv2 = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  right: 0;
  z-index: 3;
  -webkit-box-align: center;
  align-items: center;
  height: 6rem;
  background: rgb(255, 255, 255);
  box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
  @media screen and (min-width: 1000px) {
    bottom: 0px;
    width: 50%;
    border-left: solid 3px;
  }
`;

const MusicPlayer = styled.div`
  display: flex;
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
  font-size: 1.2rem;
  line-height: 1.5;
  color: #2b2d36;
  font-weight: 700;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 17px;
`;

const LectureSubTitleDiv = styled.div`
  font-size: 1rem;
  line-height: 1;
  color: #2b2d36;
  font-weight: 500;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 10px;
`;
