import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import TextAEEditor from './Sections/TextAEEditor';
import BottomSheetSection from './Sections/BottomSheetSection';
import StudentBottomSheet from './Sections/StudentBottomSheet';
import { useSelector } from 'react-redux';
import FeedbackGridCard from '../commons/FeedbackGridCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ProbFeedbackPage() {
	const location = useLocation();
	const data = location.state;
	const userinfos = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);
	const [Load, setLoad] = useState(false);
	const [Content, setContent] = useState('');
	const [Graphcontent, setGraphcontent] = useState([]);

	const onClickButton = () => {
		
		setOpen(!open);
		console.log(open);
	};

	const onSaveButton = () => {
		setLoad(!Load);
	};

	useEffect(() => {
		console.log(Content); //API를 위한 콘솔 로그
	}, [Content]);
	return (
		<div>
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
				<LectureTitleDiv>과제 피드백</LectureTitleDiv>
			</div>
			<FeedbackDiv>
				<Interpretation>
					<h4>통역 전사문</h4>
					<InterpretationBox>
						<TextAEEditor
							Load={Load}
							setContent={setContent}
							setGraphcontent={setGraphcontent}
						/>
					</InterpretationBox>
				</Interpretation>

				<Estimation>
					<h4>피드백</h4>
					<EstimationBox>
						<FeedbackGridCard />
						<FeedbackGridCard />
						<FeedbackGridCard />
						<FeedbackGridCard />
						<FeedbackGridCard />
					</EstimationBox>
				</Estimation>
			</FeedbackDiv>

			<LectureCreateDiv>
				<LectureCreateButton onClick={onClickButton}>그래프 보기</LectureCreateButton>
				<LectureCreateButton onClick={onClickButton}>총평</LectureCreateButton>
				<LectureCreateButton onClick={onSaveButton}>저장하기</LectureCreateButton>
			</LectureCreateDiv>

			{userinfos?.userData?.role === 1 ? (
				<StudentBottomSheet
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					Graphcontent={Graphcontent}
				/>
			) : userinfos?.userData?.role === 2 ? (
				<BottomSheetSection
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					Graphcontent={Graphcontent}
				/>
			) : userinfos?.userData?.role === 3 ? (
				<BottomSheetSection
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					Graphcontent={Graphcontent}
				/>
			) : (
				''
			)}
		</div>
	);
}
export default ProbFeedbackPage;

const FeedbackDiv = styled.div`
	width: auto;
	margin: 0 auto;
	position: relative;
	min-height: 1000px;
`;

const Interpretation = styled.div`
	font-size: 12px;
	margin: 0 auto;
	max-width: 800px;
	padding: 15px;
`;

const InterpretationBox = styled.div`
	width: auto;
	height: auto;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Estimation = styled.div`
	font-size: 12px;
	margin: 0 auto;
	max-width: 800px;
	padding: 15px;
`;

const EstimationBox = styled.div`
	padding: 10px;
	display :flex;
	width: auto;
	height: 250px;
	overflow-x: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const LectureCreateButton = styled.button`
	height: 3rem;
	font-size: 0.975rem;
	font-weight: 800;
	line-height: 1.375rem;
	width: 100%;
	border-radius: 0.5rem;
	margin: 6px;
	color: #fff;
	background-color: #2e462f;
	border-color: transparent;
	z-index: 1;
`;

const LectureCreateDiv = styled.div`
	position: fixed;
	bottom: 0px;
	z-index: 2;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	width: 100%;
	height: 4rem;
	background: rgb(255, 255, 255);
	box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
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