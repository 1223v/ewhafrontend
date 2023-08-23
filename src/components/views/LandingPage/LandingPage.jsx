import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css';
import CalenderComponent from './Section/CalenderComponent';
import Profile from './Section/Profile';
import SearchBar from './Section/SearchBar';
import GridCards from './../commons/GridCards';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { API_URL } from "../../Config";


function LandingPage() {
	let navigate = useNavigate();
	const [Lectures, setLectures] = useState([]);
	const [message, setMessage] = useState('');
	const [LectureStatus, setLectureStatus] = useState(false);

	const userinfos = useSelector((state) => state.user);

	const handleSearchClick = (value) => {
		setMessage(value);
	};

	useEffect(() => {
		Axios.get(`${API_URL}api/lecture/list`, {
			withCredentials: true,
		}).then((response) => {
			// 요청이 성공한 경우의 처리
			setLectures(response.data.lecturelist);
		})
		.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
				navigate(-1);
			});
	}, []); // 예외 처리 필요 무한으로 API가 날라감(강의로 판단하는 것이 아닌 삭제 유무에 따라 판별해야할듯함)

	return (
		<div >
			<NavBar />
			<div className="lecture_class">
				<Profile
					userName={userinfos?.userData?.name}
					userRole={userinfos?.userData?.role}
				/>
				<SearchBar onSearchClick={handleSearchClick} />
				<div className="calender_Area">
					<CalenderComponent />
				</div>
				<div className="lecture_Area">
					<h3 style={{ paddingLeft: '20px' }}>
						강의 목록
						{userinfos?.userData?.role === 3 ? (
							<nav className="class_menu">
								<Link to={'/lecture_add'}>
									<button
										class="middle none center rounded-lg bg-green-900 py-2 px-6 font-sans text-xs font-bold uppercase text-white  transition-all border-none"
										data-ripple-light="true"
										style={{boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)"}}
									>
										+ 강의 개설
									</button>
								</Link>
							</nav>
						) : (
							''
						)}
					</h3>

					
					<Row>
						{Lectures?.map((lesson, index) => (
							<React.Fragment key={index}>
								<GridCards
									lectureName={lesson.lecture_name}
									num={lesson.lecture_no}
									major={lesson.major}
									professor={lesson.professor}
									separated={lesson.separated}
									year={lesson.year}
									semester={lesson.semester}
									setLectures={setLectures}
									setLectureStatus={setLectureStatus}
									LectureStatus={LectureStatus}
								/>
							</React.Fragment>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;