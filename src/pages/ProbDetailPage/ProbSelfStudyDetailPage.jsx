import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import FileDownload from "../../components/views/Fileload/FileDownload";
import SubmitFileUpload from "../../components/views/Fileload/SubmitFileUpload";
import NavBar from "../../components/views/NavBar/NavBar";
import SelfStudyBreadcrumb from "../../components/views/commons/SelfStudyBreadcrumb";

function ProbSelfStudyDetailPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const [ProbInfo, setProbInfo] = useState([]);
  const [MusicFile, setMusicFile] = useState([]); //음원 파일
  const [ProbStatus, setProbStatus] = useState(false); // 이벤트 발생시 상태를 저장하는 변수

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/self/detail?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data) {
          setProbInfo(response.data);
        } else {
          message.error("다시 시도해주세요.");
          navigate("/");
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error("알 수 없는 에러가 발생했습니다.");
        console.log(error);
        navigate("/login");
      });
  }, [ProbStatus]);

  const onProbCancelClick = () => {
    if (
      window.confirm(
        "과제 제출을 취소하시겠습니까? 학생의 과제 결과가 모두 사라집니다. 학생이 처음부터 다시 과제를 해야 합니다."
      )
    ) {
      let body = {
        as_no: asNo,
      };
      Axios.post(`${API_URL}api/prob/self/cancel?as_no=${asNo}`, body, {
        withCredentials: true,
      })
        .then((response) => {
          // 요청이 성공한 경우의 처리
          if (response.data) {
            message.success("과제가 취소되었습니다.");
            setProbStatus(!ProbStatus);
          } else {
            message.error("과제 취소에 실패했습니다. 다시 확인해주세요.");
            navigate("/");
          }
        })
        .catch((error) => {
          // 요청이 실패한 경우의 처리
          message.error("알 수 없는 에러가 발생했습니다.");
          navigate("/login");
        });
    }
  };

  const onLastSubmitClick = async () => {
    if (
      window.confirm(
        "최종제출 하시겠습니까? 제출 후에는 과제하기를 다시 할 수 없습니다."
      )
    ) {
      try {
        // MusicFile의 길이가 0이 아니면 첫 번째 요청 시작
        if (MusicFile.length !== 0) {
          let submitFile = {
            submitUUID: MusicFile,
            as_no: asNo,
          };

          let response = await Axios.post(
            `${API_URL}api/prob/self/submit`,
            submitFile,
            {
              withCredentials: true,
            }
          );

          // 첫 번째 요청에 대한 응답을 처리할 로직 (예: 상태 업데이트 등)
          if (response.data.isSuccess) {
            message.success(response.data.message);
          } else {
            message.error(response.data.message);
            navigate(`/prob/selfstudys`);
          }
        }

        // 두 번째 요청 시작 (MusicFile의 길이와 상관없이 항상 실행)
        let body = {
          as_no: asNo,
        };
        await Axios.put(`${API_URL}api/prob/self/end`, body, {
          withCredentials: true,
        }).then((response) => {
          // 두 번째 요청에 대한 응답을 처리할 로직
          if (response.data.isSuccess) {
            message.success(response.data.message);
            navigate(`/prob/selfstudys`);
          } else {
            message.error(response.data.message);
            navigate(`/prob/selfstudys`);
          }
        });
      } catch (error) {
        message.error(error);
        //navigate("/");
      }
    }
  };

  const onDeleteButton = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      Axios.delete(`${API_URL}api/prob/self/handle?as_no=${asNo}`, {
        withCredentials: true,
      })
        .then((response) => {
          // 요청이 성공한 경우의 처리
          if (response.data.isSuccess) {
            message.success("과제가 삭제되었습니다.");
            navigate(`/prob/selfstudys`);
          } else {
            message.error("과제 삭제에 실패했습니다. 다시 확인해주세요.");
            navigate("/");
          }
        })
        .catch((error) => {
          message.error("과제 삭제에 실패했습니다. 다시 확인해주세요.");
          console.log(error);
          navigate("/");
        });
    }
  };
  return (
    <LectureBackgroudDiv>
      <NavBar />
      <SelfStudyBreadcrumb
        LectureName={"자습"}
        AssignmentName={ProbInfo.as_name}
      />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <StyledLink to={`/prob/selfstudys`}>
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
          </StyledLink>
        </LectureBackDiv>

        <LectureTitleDiv>{ProbInfo.as_name} 과제 상세</LectureTitleDiv>
        <LectureGroupDiv>
          <FeedbackBtnDiv>
            <FeedbackLink to={`/prob/selfstudys/mod?as_no=${asNo}`}>
              <FaRegEdit size={28} />
            </FeedbackLink>
          </FeedbackBtnDiv>
          <FeedbackBtnDiv onClick={onDeleteButton}>
            <MdDeleteOutline size={30} />
          </FeedbackBtnDiv>
        </LectureGroupDiv>
      </div>
      <LectureAddFormDiv>
        <LectureNameDiv>
          <LectureName>제 목</LectureName>
          <LectureNameinputDiv>{ProbInfo.as_name}</LectureNameinputDiv>
        </LectureNameDiv>
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 종류</LectureName>
          <LectureNameinputDiv>{ProbInfo.as_type}</LectureNameinputDiv>
        </LectureNameDiv>
        {ProbInfo.as_type !== "번역" && (
          <div>
            <LectureHr />
            <LectureNameDiv>
              <LectureName>키워드</LectureName>
              <LectureDescriptionDiv>{ProbInfo.keyword}</LectureDescriptionDiv>
            </LectureNameDiv>
          </div>
        )}
        <LectureHr />
        <LectureNameDiv>
          <LectureName>첨부 파일</LectureName>
          <LectureNameinputDiv>
            {ProbInfo.file_path ? (
              <FileDownload
                DownloadUrl={ProbInfo.file_path}
                FileName={ProbInfo.file_name}
              />
            ) : (
              "첨부파일이 없습니다."
            )}
          </LectureNameinputDiv>
        </LectureNameDiv>
        <LectureHr />
        <LectureNameDiv>
          <LectureName>과제 설명</LectureName>
          <LectureDescriptionDiv>{ProbInfo.detail}</LectureDescriptionDiv>
        </LectureNameDiv>
        {ProbInfo.end_submission === false && ProbInfo.as_type !== "번역" && (
          <div>
            <LectureHr />
            <ProbMusicDiv>
              <LectureName>음원 제출</LectureName>
              <LectureNameinputDiv>
                <SubmitFileUpload
                  MusicFile={MusicFile}
                  setMusicFile={setMusicFile}
                />
              </LectureNameinputDiv>
            </ProbMusicDiv>
          </div>
        )}
      </LectureAddFormDiv>

      <BtnDiv>
        <FeedbackBtnDiv>
          {ProbInfo.end_submission ? (
            <button
              className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-red-700 font-semibold py-2 px-4 border border-red-500 rounded m-2"
              onClick={onProbCancelClick}
            >
              최종 제출 취소
            </button>
          ) : (
            <button
              className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-2"
              onClick={onLastSubmitClick}
            >
              최종 제출
            </button>
          )}
        </FeedbackBtnDiv>
        <ProbBtnDiv>
          {ProbInfo.end_submission === false ? (
            <div>
              {ProbInfo.as_type === "순차통역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/selfSeqInterpretation?as_no=${asNo}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : ProbInfo.as_type === "동시통역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/selfSimInterpretation?as_no=${asNo}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : ProbInfo.as_type === "번역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/selfTranslation?as_no=${asNo}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : null}
            </div>
          ) : (
            ProbInfo.feedback === true && (
              <StyledLink
                className="text-green-500 hover:text-green-700"
                to={`/prob/self/feedback?as_no=${asNo}`}
              >
                <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                  피드백 확인
                </button>
              </StyledLink>
            )
          )}
        </ProbBtnDiv>
      </BtnDiv>
    </LectureBackgroudDiv>
  );
}

export default ProbSelfStudyDetailPage;

const LectureHr = styled.hr`
  background: #d3d3d3;
  height: 1px;
  border: 0;
`;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 100%;
`;

const LectureGroupDiv = styled.div`
  display: flex;
  margin-left: 30px;
`;

const LectureAddFormDiv = styled.div`
  border: 0.0625rem solid #e1e1e8;
  border-radius: 0.5rem;
  margin: auto;
  background-color: #ffffff;
  width: 800px;
  height: 100%;
  @media screen and (max-width: 830px) {
    width: auto;
    margin: 10px;
  }
`;

const FeedbackBtnDiv = styled.div`
  margin-top: 20px;
`;

const ProbBtnDiv = styled.div`
  margin-top: 20px;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 30px;
  width: 800px;
  height: 100%;
  @media screen and (max-width: 830px) {
    width: auto;
    margin: 10px;
  }
`;

const LectureTitleDiv = styled.div`
  font-size: 1.1rem;
  line-height: 2;
  color: #2b2d36;
  font-weight: 700;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 17px;
`;

const LectureBackDiv = styled.div`
  background-color: #85889914;
  border-radius: 7px;
  margin: 20px;
  height: 34px;
  width: 40px;
  color: black;
`;

const LectureNameDiv = styled.div`
  font-size: 14px;

  display: flex;
  line-height: 1.5;
  color: #525364;
  width: 95%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin: 10px 17px 0px 17px;
  @media screen and (max-width: 830px) {
    margin: 11px;
  }
`;

const LectureNameinputDiv = styled.div`
  flex-grow: 2;
  margin: 20px;
  color: black;
`;

const LectureDescriptionDiv = styled.div`
  flex-grow: 2;
  margin: 20px;
  color: black;
  max-width: 600px;
  word-break: break-all;
`;

const LectureName = styled.div`
  margin: 20px;
  flexgrow: 1;
  fontweight: 500;
  min-width: 80px;
`;

const ProbMusicDiv = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #525364;
  width: 95%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  margin: 17px;
  @media screen and (max-width: 830px) {
    margin: 11px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  color: inherit;
  margin: 9px;
`;

const FeedbackLink = styled(Link)`
  text-decoration: none;
  color: #333;
  color: inherit;
  margin: 9px;
`;
