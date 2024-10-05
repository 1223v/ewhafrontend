import { Empty } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import NavBar from "../../components/views/NavBar/NavBar";
import SelfStudyBreadcrumb from "../../components/views/commons/SelfStudyBreadcrumb";

function ProbSelfStudysPage() {
  let navigate = useNavigate();
  const [Problist, setProblist] = useState([]);
  const [lectureName, setLectureName] = useState("");

  const onDetailPageMove = (as_no) => {
    navigate(`/prob/selfstudys/detail?as_no=${as_no}`);
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/self`, {
      withCredentials: true,
    })
      .then((response) => {
        // 요청이 성공한 경우의 처리

        // console.log(response.data);

        setLectureName(response.data.lecture_name);
        setProblist(response.data.prob_list);
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        navigate("/");
      });
  }, []);

  return (
    <div>
      <NavBar />
      <SelfStudyBreadcrumb LectureName={lectureName} />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link to={`/`} style={{ color: "black", padding: "7px" }}>
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
        <LectureTitleDiv>자습용 과제</LectureTitleDiv>
        <CreateDiv>
          {" "}
          <Link to={`/prob/selfstudys/add`}>
            <CreateBtn
              className="middle none center rounded-lg bg-green-900 py-2 px-6 text-xs uppercase text-white transition-all border-none"
              data-ripple-light="true"
            >
              + 자습용 과제 생성
            </CreateBtn>
          </Link>
        </CreateDiv>
      </div>
      {Problist?.length === 0 ? (
        <NoDataDiv>
          <Empty />
        </NoDataDiv>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-hidden">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto border-collapse">
                  <thead className="bg-gray-50 overflow-x-auto">
                    <tr>
                      <th
                        scope="col"
                        className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        No
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center">
                          제목
                        </span>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center">
                          완료여부
                        </span>
                      </th>

                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center">
                          시작일
                        </span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Problist?.map((assignment, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr
                            onClick={() => onDetailPageMove(assignment.as_no)}
                            className="cursor-pointer border-solid border-2 border-gray-200"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {assignment.as_name}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {assignment.end_submission ? "완료" : "미완료"}
                            </td>

                            {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {assignment.open_time}
                            </td> */}
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <MusicPlayDiv>
        <Link to={`/prob/selfstudys/add`}>
          <PlayBtn>
            <AiOutlinePlus size="25" />
          </PlayBtn>
        </Link>
      </MusicPlayDiv>
    </div>
  );
}

export default ProbSelfStudysPage;

const NoDataDiv = styled.div`
  margin-top: 25%;
`;

const MusicPlayDiv = styled.div`
  position: fixed;
  bottom: 64px;
  z-index: 2;

  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  border: none;
  background: rgb(255, 255, 255, 0);

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const PlayBtn = styled.button`
  background-color: rgb(5, 66, 43);
  height: 56px;
  width: 56px;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  float: right;
  margin-right: 20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
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
  line-height: 1.9;
  color: #2b2d36;
  font-weight: 700;
  margin-top: 17px;
`;

const CreateDiv = styled.div`
  margin: 20px;
  margin-left: auto;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CreateBtn = styled.button`
  height: 2.5rem;
  padding: 0.5625rem 1rem;
  font-size: 0.875rem;
  line-height: 1.375rem;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;
