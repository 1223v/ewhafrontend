import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import LectureListPage from "./Sections/LectureListPage";
import StudentAddModal from "../StudentAddModal/StudentAddModal";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../Config";

const Year = [
  { value: "2026", label: "2026년" },
  { value: "2025", label: "2025년" },
  { value: "2024", label: "2024년" },
  { value: "2023", label: "2023년" },
  { value: "2022", label: "2022년" },
  { value: "2021", label: "2021년" },
];

const Semester = [
  { value: "1학기", label: "1학기" },
  { value: "2학기", label: "2학기" },
  { value: "여름학기", label: "여름학기" },
  { value: "겨울학기", label: "겨울학기" },
];

const Major = [
  { value: "한일번역", label: "한일번역" },
  { value: "한일통역", label: "한일통역" },
  { value: "한중번역", label: "한중번역" },
  { value: "한중통역", label: "한중통역" },
  { value: "한영번역", label: "한영번역" },
  { value: "한영통역", label: "한영통역" },
  { value: "한불번역", label: "한불번역" },
  { value: "한불통역", label: "한불통역" },
];

const Separated = [
  { value: "1분반", label: "1분반" },
  { value: "2분반", label: "2분반" },
  { value: "3분반", label: "3분반" },
  { value: "4분반", label: "4분반" },
  { value: "5분반", label: "5분반" },
  { value: "6분반", label: "6분반" },
  { value: "7분반", label: "7분반" },
  { value: "8분반", label: "8분반" },
];

function LectureAddPage() {
  let navigate = useNavigate();
  const userinfos = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [Liststudent, setListstudent] = useState([]);
  const [Titlelist, setTitlelist] = useState("");
  const [Yearlist, setYearlist] = useState("2023");
  const [Semesterlist, setSemesterlist] = useState("1학기");
  const [Majorlist, setMajorlist] = useState("한일통역");
  const [Separatedlist, setSeparatedlist] = useState("1분반");
  const [Professorlist, setProfessorlist] = useState(
    `${userinfos?.userData?.name}`
  );
  const [Studentlist, setStudentlist] = useState("");
  const [Allstudentlist, setAllstudentlist] = useState("");

  const onTitleChange = (e) => {
    setTitlelist(e.currentTarget.value);
  };

  const onYearChange = (e) => {
    setYearlist(e.currentTarget.value);
  };

  const onSemesterChange = (e) => {
    setSemesterlist(e.currentTarget.value);
  };

  const onMajorChange = (e) => {
    setMajorlist(e.currentTarget.value);
  };

  const onSeparatedChange = (e) => {
    setSeparatedlist(e.currentTarget.value);
  };

  const onProfessorChange = (e) => {
    setProfessorlist(e.currentTarget.value);
  };

  const onStudentChange = (e) => {
    setStudentlist(e.currentTarget.value);
  };

  const onSaveButton = () => {
    let body = {
      lecture_name: Titlelist,
      lecture_year: Yearlist,
      lecture_semester: Semesterlist,
      lecture_major: Majorlist,
      lecture_separated: Separatedlist,
      lecture_professor: Professorlist,
      lecture_attendee: Liststudent,
    };

    Axios.post(`${API_URL}api/lecture/create`, body, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.msg);
        navigate("/");
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        navigate(-1);
      });
  };

  const onClickButton = () => {
    setIsOpen(true);
  };

  const onRemove = (item) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  useEffect(() => {
    const CheckedStudentList = [];
    const CheckedStudentsList = [];
    for (let i = 0; i < checkedList.length; i++) {
      CheckedStudentList[0] = Allstudentlist.filter(
        (obj) => obj.email === checkedList[i]
      );
      CheckedStudentsList.push(CheckedStudentList[0][0]);
    }

    setListstudent(CheckedStudentsList);
  }, [checkedList]);

  useEffect(() => {
    Axios.get(`${API_URL}api/lecture/create`, {
      withCredentials: true,
    })
      .then((response) => {
        // 요청이 성공한 경우의 처리
        setAllstudentlist(response.data.userlist);
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
        <LectureTitleDiv>강의 생성하기</LectureTitleDiv>
      </div>
      <LectureAddFormDiv>
        <LectureNameDiv>
          <LectureName>강의명</LectureName>
          <LectureNameinputDiv>
            <LectureNameinput
              type="text"
              placeholder=" 강의명을 적어주세요"
              size="10"
              maxlength="8"
              value={Titlelist}
              onChange={onTitleChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>학습 연도</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              className="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
              onChange={onYearChange}
              value={Yearlist}
            >
              {Year.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>학습 학기</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              className="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
              onChange={onSemesterChange}
              value={Semesterlist}
            >
              {Semester.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>개설 전공</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              className="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
              onChange={onMajorChange}
              value={Majorlist}
            >
              {Major.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>학습 분반</LectureName>
          <LectureNameinputDiv style={{ marginTop: "10px" }}>
            <select
              id="countries"
              className="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
              onChange={onSeparatedChange}
              value={Separatedlist}
            >
              {Separated.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <LectureNameDiv>
          <LectureName>담당교수</LectureName>
          <LectureNameinputDiv>
            <LectureNameinput
              type="text"
              placeholder={userinfos?.userData?.name}
              size="10"
              maxlength="8"
              value={Professorlist}
              onChange={onProfessorChange}
            />
          </LectureNameinputDiv>
        </LectureNameDiv>
        <hr style={{ background: "#d3d3d3", height: "1px", border: "0" }} />
        <div>
          <LectureNameDiv>
            <LectureName>수강생 명단</LectureName>
            <LectureName2>
              <StudentAddButton onClick={onClickButton}>
                + 추가
              </StudentAddButton>
              {isOpen && (
                <StudentAddModal
                  open={isOpen}
                  setCheckedList={setCheckedList}
                  Checklist={checkedList}
                  studentslist={Allstudentlist}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                />
              )}
            </LectureName2>
          </LectureNameDiv>
          <div>
            <LectureListPage Liststudent={Liststudent} onRemove={onRemove} />
          </div>
        </div>
      </LectureAddFormDiv>
      <LectureCreateDiv>
        <LectureCreateButton onClick={onSaveButton}>
          생성하기
        </LectureCreateButton>
      </LectureCreateDiv>
    </LectureBackgroudDiv>
  );
}

export default LectureAddPage;

const LectureBackgroudDiv = styled.div`
  background-color: #f7f7fa;
  width: 100%;
  height: 1500px;
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
  padding-left: 10px;
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
