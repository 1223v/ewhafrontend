import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import LoadingPage from "../LoadingPage/LoadingPage";
import styled from "styled-components";
import DragNDrop from "../Audio/Sections/DragNDrop";
import FileRead from "../Audio/Sections/FileRead";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";

const Week = [
    { value: "1주차", label: "1주차" },
    { value: "2주차", label: "2주차" },
    { value: "3주차", label: "3주차" },
    { value: "4주차", label: "4주차" },
    { value: "5주차", label: "5주차" },
    { value: "6주차", label: "6주차" },
    { value: "7주차", label: "7주차" },
    { value: "8주차", label: "8주차" },
    { value: "9주차", label: "9주차" },
    { value: "10주차", label: "10주차" },
    { value: "11주차", label: "11주차" },
    { value: "12주차", label: "12주차" },
    { value: "13주차", label: "13주차" },
    { value: "14주차", label: "14주차" },
    { value: "15주차", label: "15주차" },
    { value: "16주차", label: "16주차" },
];

const Startlanguage = [
    { value: "jp", label: "일본어" },
    { value: "ko", label: "한국어" },
    { value: "cn", label: "중국어" },
    { value: "en", label: "영어" },
    { value: "fr", label: "불어" },
];

const Endlanguage = [{ value: "ko", label: "한국어" }];

const AssignmentOption = [
    { value: "순차통역", label: "순차 통역" },
    { value: "동시통역", label: "동시 통역" },
    { value: "번역", label: "번역" },
];

const SpeedOption = [
    { value: 1.0, label: "1배속" },
    { value: 0.5, label: "0.5배속" },
    { value: 1.25, label: "1.25배속" },
    { value: 1.5, label: "1.5배속" },
    { value: 1.75, label: "1.75배속" },
    { value: 2.0, label: "2배속" },
];

function ProbModPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [Title, setTitle] = useState(""); //강의 제목
    const [Description, setDescription] = useState(""); // 강의 설명
    const [Weeklist, setWeeklist] = useState("");
    const [Limitlist, setLimitlist] = useState("");
    const [Startlanguagelist, setStartlanguagelist] = useState("");
    const [Endlanguagelist, setEndlanguagelist] = useState("ko");
    const [Assignmentlist, setAssignmentlist] = useState("");
    const [Speedlist, setSpeedlist] = useState("");
    const [Txtread, setTxtread] = useState("");
    const [Urlfile, setUrlfile] = useState("");
    const [regions, setRegions] = useState([]);
    const [Purposelist, setPurposelist] = useState("off");
    const [isChecked, setIsChecked] = useState(false);
    const [regionsCopy, setRegionsCopy] = useState([]);
    const [Music, setMusic] = useState("");
    const [loading, setLoading] = useState(true);
    const [Modregions, setModregions] = useState([]);

    useEffect(() => {
        Axios.get(`${API_URL}api/prob/modify?lecture_no=${data.num}&as_no=${data.asnum}`, {
            withCredentials: true,
        })
            .then((response) => {
                // 요청이 성공한 경우의 처리
                const date = new Date(response.data.as_list.limit_time);
                const isoString = date.toISOString(); // "2023-07-28T12:52:00.000Z"
                const formattedDatetime = isoString.slice(0, 16);
                const URL = `${API_URL}` + response.data.as_list.upload_url;
                setTitle(response.data.as_list.as_name);
                setAssignmentlist(response.data.as_list.as_type);
                setDescription(response.data.as_list.description);
                setLimitlist(formattedDatetime);
                setTxtread(response.data.as_list.original_text);
                setSpeedlist(response.data.as_list.speed);
                setStartlanguagelist(response.data.as_list.translang);
                setUrlfile(response.data.as_list.upload_url);
                setMusic(URL);
                setWeeklist(response.data.as_list.week);
                setModregions(response.data.audio_list);
                const objectsArray = response.data.audio_list.map((item) => {
                    return {
                        end: parseInt(item.end),
                        id: parseInt(item.region_index),
                        start: parseInt(item.start),
                    };
                });
                setRegions(objectsArray);

                // 원하는 작업 실행
                setLoading(false);
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
                navigate(-1);
            });
    }, []);

    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    };

    const onWeekChange = (e) => {
        setWeeklist(e.currentTarget.value);
    };

    const onLimitChange = (e) => {
        setLimitlist(e.target.value);
    };

    const onStartlanguageChange = (e) => {
        setStartlanguagelist(e.currentTarget.value);
    };

    const onEndlanguageChange = (e) => {
        setEndlanguagelist(e.currentTarget.value);
    };

    const onAssignmentChange = (e) => {
        setAssignmentlist(e.currentTarget.value);
    };

    const onSpeedChange = (e) => {
        setSpeedlist(e.currentTarget.value);
    };

    const onPurposeChange = (e) => {
        setIsChecked(!isChecked);
        setPurposelist(isChecked ? "off" : "open");
    };

    const onSaveButton = () => {
        if (Title === "") {
            return alert("제목을 설정해주세요.");
        }

        if (Description === "") {
            return alert("과제 설명을 적어주세요.");
        }

        if (Txtread === "") {
            return alert("원본파일이 비어있습니다.");
        }

        if (regionsCopy === "") {
            return alert("최소한 한개 이상의 구간을 설정해주세요.");
        }

        if (Urlfile === "") {
            return alert("음원 파일이 존재하지 않습니다. 음원을 추가해주세요.");
        }

        if (Limitlist === "") {
            return alert("과제 기한을 정해주세요.");
        }

        let body = {
            lecture_no: `${data?.num}`,
            as_no: `${data?.asnum}`,
            prob_sound_path: Urlfile,
            prob_week: Weeklist,
            prob_timeEnd: Limitlist,
            prob_name: Title,
            prob_type: Assignmentlist,
            prob_keyword: "",
            prob_translang_source: Startlanguagelist,
            prob_translang_destination: Endlanguagelist,
            prob_exp: Description,
            prob_replay: "무제한",
            prob_play_speed: Speedlist,
            prob_open: Purposelist,
            original_text: Txtread,
            prob_region: regionsCopy,
        };

        //let jsonString = JSON.stringify(body);
        Axios.post(`${API_URL}api/prob/modify`, body, {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.assignmentmodifySuccess) {
                    alert("과제를 수정했습니다.");
                    navigate(-1);
                } else {
                    alert("과제 수정에 실패했습니다. 다시 시도해주세요.");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리
                alert("과제 수정에 실패했습니다. 다시 시도해주세요.");
                navigate("/");
            });
    };
    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
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
                        <LectureTitleDiv>과제 수정하기</LectureTitleDiv>
                    </div>
                    <LectureAddFormDiv>
                        <LectureNameDiv>
                            <LectureName>과제 명</LectureName>
                            <LectureNameinputDiv>
                                <LectureNameinput
                                    type="text"
                                    placeholder=" 강의명을 적어주세요"
                                    size="10"
                                    maxlength="8"
                                    value={Title}
                                    onChange={onTitleChange}
                                />
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>과제 주차</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "10px" }}>
                                <select
                                    id="countries"
                                    class="bg-white-50 border border-green-900 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5"
                                    onChange={onWeekChange}
                                    value={Weeklist}
                                >
                                    {Week.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>과제 종류</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "10px" }}>
                                <select
                                    id="countries"
                                    class="bg-white-50 border border-green-900 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 "
                                    onChange={onAssignmentChange}
                                    value={Assignmentlist}
                                >
                                    {AssignmentOption.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>출발 언어</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "10px" }}>
                                <select
                                    id="countries"
                                    class="bg-white-50 border border-green-900 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5"
                                    onChange={onStartlanguageChange}
                                    value={Startlanguagelist}
                                >
                                    {Startlanguage.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </LectureNameinputDiv>
                            <LectureName>도착 언어</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "10px" }}>
                                <select
                                    id="countries"
                                    class="bg-white-50 border border-green-900 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5"
                                    onChange={onEndlanguageChange}
                                    value={Endlanguagelist}
                                >
                                    {Endlanguage.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>과제 기한</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "7px" }}>
                                <Purposeinput
                                    type="datetime-local"
                                    name="bday"
                                    value={Limitlist}
                                    onChange={onLimitChange}
                                />
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>재생 속도</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "10px" }}>
                                <select
                                    id="countries"
                                    class="bg-white-50 border border-green-900 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5"
                                    onChange={onSpeedChange}
                                    value={Speedlist}
                                >
                                    {SpeedOption.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>과제 용도</LectureName>
                            <LectureNameinputDiv style={{ marginTop: "20px", marginLeft: "20px" }}>
                                <input
                                    type="checkbox"
                                    id="remember-check"
                                    checked={isChecked}
                                    onChange={onPurposeChange}
                                />{" "}
                                자습용 과제
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <LectureNameDiv>
                            <LectureName>과제 설명</LectureName>
                            <LectureNameinputDiv>
                                <LectureNameinput
                                    type="text"
                                    placeholder="과제 설명해주세요."
                                    size="10"
                                    maxlength="8"
                                    value={Description}
                                    onChange={onDescriptionChange}
                                />
                            </LectureNameinputDiv>
                        </LectureNameDiv>
                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />

                        <div>
                            <DragNDrop
                                Urlfile={Urlfile}
                                setUrlfile={setUrlfile}
                                regions={regions}
                                setRegions={setRegions}
                                regionsCopy={regionsCopy}
                                setRegionsCopy={setRegionsCopy}
                                setMusic={setMusic}
                                Music={Music}
                                setModregions={setModregions}
                                Modregions={Modregions}
                            />
                        </div>

                        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
                        <div>
                            <FileRead setTxtreads={setTxtread} Txtreads={Txtread} />
                        </div>
                    </LectureAddFormDiv>
                    <LectureCreateDiv>
                        <LectureCreateButton onClick={onSaveButton}>수정하기</LectureCreateButton>
                    </LectureCreateDiv>
                </LectureBackgroudDiv>
            )}
        </div>
    );
}

export default ProbModPage;

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
    margin: 17px;
    @media screen and (max-width: 830px) {
        margin: 11px;
    }
`;

const LectureName2 = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 2;
`;

const LectureNameinput = styled.input`
    width: 100%;
    height: 48px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 10px;
    margin-right: 10px;
    box-sizing: border-box;
    margin-bottom: 8px;
    border: solid 1px #d3d3d3;
    border-radius: 9px;
    background-color: #ffffff;
    &:hover {
        outline: 2px solid #04653d;
    }
`;

const Purposeinput = styled.input`
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border: solid 1px #d3d3d3;
    border-radius: 9px;
    background-color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    &:hover {
        outline: 2px solid #04653d;
    }
`;

const LectureNameinputDiv = styled.div`
    flex-grow: 2;
`;

const LectureName = styled.div`
    margin: 20px;
    flexgrow: 1;
    fontweight: 500;
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

const StudentAddButton = styled.button`
    height: 2.5rem;
    font-size: 0.975rem;
    font-weight: 800;
    line-height: 1.375rem;

    border-radius: 0.5rem;
    margin: 12px 15px;
    color: #fff;
    background-color: #2e462f;
    border-color: transparent;
`;
