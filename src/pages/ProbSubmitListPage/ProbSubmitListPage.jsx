import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../../components/views/NavBar/NavBar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../components/Config';
import { LuRefreshCw } from 'react-icons/lu';
import Timeformat from '../../components/views/commons/Timeformat';
import styled from 'styled-components';
import ZipFileDownload from '../../components/views/Fileload/ZipFileDownload';

function ProbSubmitList() {
    let navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const lectureNo = params.get('lecture_no');
    const asNo = params.get('as_no');
    const [People, setPeople] = useState([]);

    useEffect(() => {
        Axios.get(
            `${API_URL}api/probsubmit/list?lecture_no=${lectureNo}&as_no=${asNo}`,
            {
                withCredentials: true,
            }
        )
            .then((response) => {
                // 요청이 성공한 경우의 처리
                console.log('test', response.data);
                console.log(response.data.userList);
                setPeople(response.data.userList);
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리

                navigate('/login');
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex' }}>
                <LectureBackDiv>
                    <Link
                        to={`/prob/detail/professor?as_no=${asNo}&lecture_no=${lectureNo}`}
                        style={{ color: 'black', padding: '7px' }}
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
                <LectureTitleDiv>제출 확인</LectureTitleDiv>
            </div>
            <div style={{ marginTop: '50px' }}>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto grid place-items-center lg:px-8">
                        <div className="py-2 align-middle inline-block min-w-3/5 sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                이름 | Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                제출시간
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                제출여부
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                횟수
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                횟수 추가 (+1)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Feedback
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                결과 DownLoad
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {People?.map((person) => (
                                            <tr key={person.email}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src="https://cdn-icons-png.flaticon.com/512/17/17797.png"
                                                                alt="UserImage"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {person.name}(
                                                                {person.major})
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {person.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-center text-gray-500">
                                                        {person.submit_time !==
                                                            '' ||
                                                        person.submit_time !==
                                                            null ? (
                                                            <Timeformat
                                                                dateString={
                                                                    person.submit_time
                                                                }
                                                            />
                                                        ) : (
                                                            '없음'
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {person.check !== false ? (
                                                        <span className="px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Submitted
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            No Submitted
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {person.submit_count +
                                                        person.chance_count}{' '}
                                                    {'(+' +
                                                        person.chance_count +
                                                        ')'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                                    <LuRefreshCw size="18" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {person.check !== false && (
                                                        <Link
                                                            to={`/prob/feedback/professor?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${person.user_no}`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            FeedBack
                                                        </Link>
                                                    )}
                                                    {person.check === false && (
                                                        <div>제출 안함</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <ZipFileDownload
                                                        UserNo={person.user_no}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProbSubmitList;

const LectureBackDiv = styled.div`
    background-color: #85889914;
    border-radius: 7px;
    margin: 20px;
    height: 34px;
    width: 40px;
    color: black;
`;
const LectureTitleDiv = styled.div`
    font-size: 1.5rem;
    line-height: 1.5;
    color: #2b2d36;
    font-weight: 700;
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap');
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 17px;
`;
