import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Row } from 'antd';
import Audioplay from './Sections/Audioplay';
import AudiorecordGridcard from './AudiorecordGridcard';

function AudioRecordPage() {
	let navigate = useNavigate();
	const location = useLocation();
	const data = location.state;

	useEffect(() => {
		Axios.get(
			`https://edu-trans.ewha.ac.kr:8443/api/prob/submit?lecture_no=${data.num}&as_no=${data.asnum}`,
			{
				withCredentials: true,
			}
		)
			.then((response) => {
				// 요청이 성공한 경우의 처리
				console.log(response.data);
			})
			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
				//navigate(-1);
			});
	}, []);

	return (
		<LectureBackgroudDiv>
			<NavBar />
			<div style={{ display: 'flex' }}>
				<LectureBackDiv>
					<Link to={'/'} style={{ color: 'black', padding: '7px' }}>
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
				<LectureTitleDiv>과제명</LectureTitleDiv>
			</div>
			<div style={{    width: '75%',
    text-align: 'center',
    margin: '0 auto'}}>
				<Audioplay /></div>
			

			<div>
				<Row>
					<AudiorecordGridcard key={1} />
					<AudiorecordGridcard key={2} />
					<AudiorecordGridcard key={3} />
					<AudiorecordGridcard key={4} />
					<AudiorecordGridcard key={5} />
				</Row>
			</div>
		</LectureBackgroudDiv>
	);
}

export default AudioRecordPage;

const LectureBackgroudDiv = styled.div`
	background-color: #f7f7fa;
	width: 100%;
	height: 100%;
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
	font-size: 1.4rem;
	line-height: 1.5;
	color: #2b2d36;
	font-weight: 700;
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap');
	font-family: 'Noto Sans KR', sans-serif;
	margin-top: 17px;
`;