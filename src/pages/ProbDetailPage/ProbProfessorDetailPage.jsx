import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import FileDownload from "../../components/views/Fileload/FileDownload";
import NavBar from "../../components/views/NavBar/NavBar";
import Timeformat from "../../components/views/commons/Timeformat";
import ProbSubmitTable from "../ProbSubmitListPage/ProbSubmitTable";

function ProbProfessorDetailPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userinfos = useSelector((state) => state.user);

  const [ProbInfo, setProbInfo] = useState([]);
  const [ProbInfoOpenTime, setProbInfoOpenTime] = useState(""); //게시일 Getter Setter
  const [ProbInfoCloseTime, setProbInfoCloseTime] = useState(""); //마감일 Getter Setter

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/detail?as_no=${asNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data) {
          setProbInfo(response.data);
          setProbInfoOpenTime(response.data.open_time);
          setProbInfoCloseTime(response.data.limit_time);
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

  const onDeleteButton = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      Axios.delete(`${API_URL}api/prob/handle?as_no=${asNo}`, {
        withCredentials: true,
      })
        .then((response) => {
          // 요청이 성공한 경우의 처리
          if (response.data.isSuccess) {
            message.success("과제가 삭제되었습니다.");
            navigate(`/prob/list/professor?lecture_no=${lectureNo}`);
          } else {
            message.error("과제 삭제에 실패했습니다. 다시 확인해주세요.");
            navigate("/");
          }
        })
        .catch((error) => {
          message.error("과제 삭제에 실패했습니다. 다시 확인해주세요.");
          navigate("/");
        });
    }
  };
  return (
    <LectureBackgroudDiv>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          {userinfos?.userData?.role === 3 ? (
            <StyledLink to={`/prob/list/professor?lecture_no=${lectureNo}`}>
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
          ) : (
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
          )}
        </LectureBackDiv>

        <LectureTitleDiv>강의명: {ProbInfo.lecture_name}</LectureTitleDiv>
        <LectureGroupDiv>
          <FeedbackBtnDiv>
            <FeedbackLink
              to={`/prob/mod?as_no=${asNo}&lecture_no=${lectureNo}`}
            >
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
      </LectureAddFormDiv>

      <SubmitTableDiv>
        <ProbSubmitTable />
      </SubmitTableDiv>
    </LectureBackgroudDiv>
  );
}

export default ProbProfessorDetailPage;

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

const SubmitTableDiv = styled.div`
  margin: auto;
  background-color: #ffffff;
  width: 800px;
  height: 100%;
  @media screen and (max-width: 830px) {
    width: auto;
    margin: 10px;
  }
`;

const LectureTitleDiv = styled.div`
  font-size: 1.2rem;
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
