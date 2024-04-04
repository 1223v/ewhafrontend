import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import FileDownload from "../../components/views/Fileload/FileDownload";
import SubmitFileUpload from "../../components/views/Fileload/SubmitFileUpload";
import NavBar from "../../components/views/NavBar/NavBar";
import StudentBreadcrumb from "../../components/views/commons/StudentBreadcrumb";
import Timeformat from "../../components/views/commons/Timeformat";

function ProbStudentDetailPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");

  const userinfos = useSelector((state) => state.user);

  const [ProbInfo, setProbInfo] = useState([]);
  const [ProbInfoOpenTime, setProbInfoOpenTime] = useState(""); //게시일 Getter Setter
  const [ProbInfoCloseTime, setProbInfoCloseTime] = useState(""); //마감일 Getter Setter
  const [MusicFile, setMusicFile] = useState([]); //음원 파일

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
            lecture_no: lectureNo,
          };

          let response = await Axios.post(
            `${API_URL}api/prob/submit`,
            submitFile,
            {
              withCredentials: true,
            }
          );

          // 첫 번째 요청에 대한 응답을 처리할 로직 (예: 상태 업데이트 등)
          console.log(response.data);
        }

        // 두 번째 요청 시작 (MusicFile의 길이와 상관없이 항상 실행)
        let body = {
          as_no: asNo,
        };
        await Axios.put(`${API_URL}api/prob/end`, body, {
          withCredentials: true,
        }).then((response) => {
          // 두 번째 요청에 대한 응답을 처리할 로직
          if (response.data.isSuccess) {
            message.success(response.data.message);
            navigate(`/prob/list/student?lecture_no=${lectureNo}`);
          } else {
            message.error(response.data.message);
            navigate(`/prob/list/student?lecture_no=${lectureNo}`);
          }
        });
      } catch (error) {
        message.error(error);
        //navigate("/");
      }
    }
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/detail?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data) {
          setProbInfo(response.data);
          setProbInfoOpenTime(response.data.open_time);
          setProbInfoCloseTime(response.data.limit_time);
          console.log(response.data);
        } else {
          message.error("다시 시도해주세요.");
          navigate("/");
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    console.log(MusicFile);
  }, [MusicFile]);

  return (
    <LectureBackgroudDiv>
      <NavBar />
      <StudentBreadcrumb
        LectureName={ProbInfo.lecture_name}
        AssignmentName={ProbInfo.as_name}
      />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link
            to={`/prob/list/student?lecture_no=${lectureNo}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "9px",
            }}
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
          {ProbInfo.as_name} 과제 상세(강의명 : {ProbInfo.lecture_name})
        </LectureTitleDiv>
      </div>
      <LectureAddFormDiv>
        <LectureNameDiv>
          <LectureName>제 목</LectureName>
          <LectureNameinputDiv>{ProbInfo.as_name}</LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>과제 종류</LectureName>
          <LectureNameinputDiv>{ProbInfo.as_type}</LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>게시일</LectureName>
          <LectureNameinputDiv>
            <Timeformat dateString={ProbInfoOpenTime} />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>마감일</LectureName>
          <LectureNameinputDiv>
            <Timeformat dateString={ProbInfoCloseTime} />
          </LectureNameinputDiv>
        </LectureNameDiv>
        {userinfos?.userData?.role === 1 && (
          <div>
            {ProbInfo.as_type !== "번역" && (
              <div>
                <hr
                  style={{ background: "#d3d3d3", height: "1px", border: "0" }}
                />
                <LectureNameDiv>
                  <LectureName>녹음 횟수</LectureName>
                  <LectureNameinputDiv>
                    {ProbInfo.my_count === null ? 0 : ProbInfo.my_count} /{" "}
                    {ProbInfo.assign_count < 1000000
                      ? ProbInfo.assign_count + ProbInfo.chance_count
                      : "무제한"}
                  </LectureNameinputDiv>
                </LectureNameDiv>
              </div>
            )}
            <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
            <LectureNameDiv>
              <LectureName>최종제출 확인</LectureName>
              <LectureNameinputDiv>
                {ProbInfo.end_submission ? (
                  <AiOutlineCheck size="18" style={{ color: "green" }} />
                ) : (
                  <AiOutlineClose size="18" style={{ color: "red" }} />
                )}
              </LectureNameinputDiv>
            </LectureNameDiv>
            {ProbInfo.end_submission === 1 && (
              <div>
                <hr
                  style={{ background: "#d3d3d3", height: "1px", border: "0" }}
                />
                <LectureNameDiv>
                  <LectureName>평가 완료</LectureName>
                  <LectureNameinputDiv>
                    {ProbInfo.feedback ? "평가 완료" : "평가 중"}
                  </LectureNameinputDiv>
                </LectureNameDiv>
              </div>
            )}
          </div>
        )}
        {ProbInfo.as_type !== "번역" && (
          <div>
            <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
            <LectureNameDiv>
              <LectureName>키워드</LectureName>
              <LectureDescriptionDiv>{ProbInfo.keyword}</LectureDescriptionDiv>
            </LectureNameDiv>
          </div>
        )}
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
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

        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>과제 설명</LectureName>
          <LectureDescriptionDiv>{ProbInfo.detail}</LectureDescriptionDiv>
        </LectureNameDiv>
        {ProbInfo.end_submission === false && ProbInfo.as_type !== "번역" && (
          <div>
            <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
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
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>내 과제 확인</LectureName>
          <LectureNameinputDiv>
            {ProbInfo.file ? (
              <FileDownload
                DownloadUrl={ProbInfo.file}
                FileName={ProbInfo.file}
              />
            ) : (
              "첨부파일이 없습니다."
            )}
          </LectureNameinputDiv>
        </LectureNameDiv>
      </LectureAddFormDiv>

      <BtnDiv>
        <FeedbackBtnDiv>
          {ProbInfo.end_submission === false && (
            <button
              className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-2"
              onClick={onLastSubmitClick}
            >
              최종 제출
            </button>
          )}
        </FeedbackBtnDiv>
        <TestBtnDiv>
          {ProbInfo.end_submission === false ? (
            <div>
              {ProbInfo.as_type === "순차통역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/seqInterpretation?lecture_no=${lectureNo}&as_no=${asNo}&user_no=${userinfos?.userData?.user_no}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : ProbInfo.as_type === "동시통역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/simInterpretation?lecture_no=${lectureNo}&as_no=${asNo}&user_no=${userinfos?.userData?.user_no}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : ProbInfo.as_type === "번역" ? (
                <StyledLink
                  className="text-green-500 hover:text-green-700"
                  to={`/prob/submit/translation?lecture_no=${lectureNo}&as_no=${asNo}&user_no=${userinfos?.userData?.user_no}`}
                >
                  <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                    과제하기
                  </button>
                </StyledLink>
              ) : null}
            </div>
          ) : ProbInfo.feedback === true ? (
            <StyledLink
              className="text-green-500 hover:text-green-700"
              to={`/prob/feedback/student?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${userinfos?.userData?.user_no}`}
            >
              <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                피드백 확인
              </button>
            </StyledLink>
          ) : (
            /*<StyledLink
              className="text-green-500 hover:text-green-700"
              to={`/prob/check/student?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${userinfos?.userData?.user_no}`}
            >
              <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                과제 확인하기
              </button>
            </StyledLink>
            */
            <div>평가중입니다.</div>
          )}
        </TestBtnDiv>
      </BtnDiv>
    </LectureBackgroudDiv>
  );
}

export default ProbStudentDetailPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 100%;
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

const FeedbackBtnDiv = styled.div``;

const TestBtnDiv = styled.div``;

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
  line-height: 1.5;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  color: inherit;
  margin: 9px;
`;
