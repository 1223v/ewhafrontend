import React, { useEffect, useState } from "react";
import NavBar from "../../components/views/NavBar/NavBar";
import styled from "styled-components";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../components/Config";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import FileDownload from "../../components/views/FileDownload/FileDownload";
import { useSelector } from "react-redux";

function ProbDetailPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const userinfos = useSelector((state) => state.user);

    const [ProbInfo, setProbInfo] = useState([]);
    const [ProbInfoOpenTime, setProbInfoOpenTime] = useState("");
    const [ProbInfoCloseTime, setProbInfoCloseTime] = useState("");

    const onSaveButton = () => {
        let body = {};

        Axios.post(`${API_URL}api/prob/detail?as_no=${data?.asnum}`, body, {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data) {
                    alert("과제를 생성했습니다.");
                    navigate("/");
                } else {
                    alert("과제 생성에 실패했습니다. 다시 시도해주세요.");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
                navigate(-1);
            });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const amPm = hours >= 12 ? "오후" : "오전";
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

        return `${year}.${month}.${day} ${amPm} ${formattedHours}:${minutes}`;
    }

    useEffect(() => {
        Axios.get(`${API_URL}api/prob/detail?as_no=176`, {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data) {
                    setProbInfo(response.data);
                    setProbInfoOpenTime(formatDate(response.data.open_time.replace("GMT", "")));
                    setProbInfoCloseTime(formatDate(response.data.limit_time.replace("GMT", "")));
                    console.log(response.data);
                } else {
                    alert("다시 시도해주세요.");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
                navigate(-1);
            });
    }, []);
    return (
        <LectureBackgroudDiv>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LectureBackDiv>
                    <Link
                        to={`/prob?lecture_no=${data?.num}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            margin: "9px",
                        }}
                        state={{ num: data?.num }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 -5 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                            />
                        </svg>
                    </Link>
                </LectureBackDiv>
                <LectureTitleDiv>과제</LectureTitleDiv>
            </div>
            <LectureAddFormDiv>
                <LectureNameDiv>
                    <LectureName>제 목</LectureName>
                    <LectureNameinputDiv>test</LectureNameinputDiv>
                </LectureNameDiv>
                <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                <LectureNameDiv>
                    <LectureName>게시일</LectureName>
                    <LectureNameinputDiv>{ProbInfoOpenTime}</LectureNameinputDiv>
                </LectureNameDiv>
                <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                <LectureNameDiv>
                    <LectureName>마감일</LectureName>
                    <LectureNameinputDiv>{ProbInfoCloseTime}</LectureNameinputDiv>
                </LectureNameDiv>
                {userinfos?.userData?.role === 1 && (
                    <div>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>녹음 횟수</LectureName>
                            <LectureNameinputDiv>
                                {ProbInfo.my_count === null ? 0 : ProbInfo.my_count} / {ProbInfo.assign_count}
                            </LectureNameinputDiv>
                        </LectureNameDiv>

                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>최종제출 확인</LectureName>
                            <LectureNameinputDiv>
                                {ProbInfo.end_submission === null ? (
                                    <AiOutlineClose size="18" style={{ color: "red" }} />
                                ) : (
                                    <AiOutlineCheck size="18" style={{ color: "green" }} />
                                )}
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>평가 완료</LectureName>
                            <LectureNameinputDiv>{ProbInfo.feedback ? "평가 완료" : "평가 중"}</LectureNameinputDiv>
                        </LectureNameDiv>
                    </div>
                )}
                <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                <LectureNameDiv>
                    <LectureName>키워드</LectureName>
                    <LectureDescriptionDiv>{ProbInfo.keyword}</LectureDescriptionDiv>
                </LectureNameDiv>
                <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                <LectureNameDiv>
                    <LectureName>첨부 파일</LectureName>
                    <LectureNameinputDiv>
                        <FileDownload DownloadUrl={ProbInfo.file_path} FileName={ProbInfo.file_name} />
                    </LectureNameinputDiv>
                </LectureNameDiv>
                <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                <LectureNameDiv>
                    <LectureName>과제 설명</LectureName>
                    <LectureDescriptionDiv>{ProbInfo.detail}</LectureDescriptionDiv>
                </LectureNameDiv>
            </LectureAddFormDiv>

            {userinfos?.userData?.role === 1 && (
                <BtnDiv>
                    <FeedbackBtnDiv>
                        {ProbInfo.end_submission === null && (
                            <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-2">
                                최종 제출
                            </button>
                        )}
                    </FeedbackBtnDiv>
                    <TestBtnDiv>
                        {ProbInfo.feedback === null ? (
                            <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                                과제하기
                            </button>
                        ) : (
                            <button className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2">
                                피드백 확인
                            </button>
                        )}
                    </TestBtnDiv>
                </BtnDiv>
            )}
        </LectureBackgroudDiv>
    );
}

export default ProbDetailPage;

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
    font-size: 1.5rem;
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
