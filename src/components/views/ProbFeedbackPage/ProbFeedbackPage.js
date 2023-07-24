import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import TextAEEditor from './Sections/TextAEEditor';
import BottomSheetSection from './Sections/BottomSheetSection';
import StudentBottomSheet from './Sections/StudentBottomSheet';
import StudentResultSheet from './Sections/StudentResultSheet';
import ProfessorResultSheet from './Sections/ProfessorResultSheet';
import { useSelector } from 'react-redux';
import FeedbackGridCard from '../commons/FeedbackGridCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ProbFeedbackPage() {
	const location = useLocation();
	const data = location.state;
	const userinfos = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);
	const [Result, setResult] = useState(false);
	const [Load, setLoad] = useState(false);
	const [Content, setContent] = useState('');
	const [Sectioncontent, setSectioncontent] = useState([]);
	const [FillerCount, setFillerCount] = useState(0);
	const [PauseCount, setPauseCount] = useState(0);
	const [BacktrackingCount, setBacktrackingCount] = useState(0);
	const [EtcCount, setEtcCount] = useState(0);
	const [MistranslationCount, setMistranslationCount] = useState(0);
	const [IntonationCount, setIntonationCount] = useState(0);
	const [OmissionCount, setOmissionCount] = useState(0);
	const [PronunciationCount, setPronunciationCount] = useState(0);
	const [GrammaticalErrorCount, setGrammaticalErrorCount] = useState(0);
	const [DeliverIndividualList, setDeliverIndividualList] = useState([]);
	const [DeliverAverage, setDeliverAverage] = useState([]);
	const [ContentIndividualList, setContentIndividualList] = useState([]);
	const [ContentAverage, setContentAverage] = useState([]);
	const [DeliverstudentList, setDeliverstudentList] = useState([]);
	const [ContentstudentList, setContentstudentList] = useState([]);
	const [Originaltext, setOriginaltext] = useState("");

	const onClickButton = () => {
		// 여기가 그래프 API 호출 위치
		// if (userinfos?.userData?.role === 3) {
		// 	Axios.get(
		// 		`https://edu-trans.ewha.ac.kr:8443/api/feedback/professorgraphlist?as_no=${data.asnum}&lecture_no=${data.num}&user_no=${data.userNo}`,
		// 		{
		// 			withCredentials: true,
		// 		}
		// 	)
		// 		.then((response) => {
		// 			// 요청이 성공한 경우의 처리
		// 			console.log(response.data);
		// 			setDeliverIndividualList(response.data.DeliverIndividualList);
		// 			setDeliverstudentList(response.data.DeliverstudentList);
		// 			setContentIndividualList(response.data.ContentIndividualList);
		// 			setContentstudentList(response.data.ContentstudentList);
		// 		})

		// 		.catch((error) => {
		// 			// 요청이 실패한 경우의 처리
		// 			console.error(error);
		// 		});
		// } else if (userinfos?.userData?.role === 1) {
		// 	Axios.get(
		// 		`https://edu-trans.ewha.ac.kr:8443/api/feedback/studentgraphlist?as_no=${data.asnum}&lecture_no=${data.num}&user_no=${data.userNo}`,
		// 		{
		// 			withCredentials: true,
		// 		}
		// 	)
		// 		.then((response) => {
		// 			// 요청이 성공한 경우의 처리
		// 			console.log(response.data);
		// 			setDeliverIndividualList(response.data.DeliverIndividualList);
		// 			setDeliverAverage(response.data.DeliverAverage);
		// 			setContentIndividualList(response.data.ContentIndividualList);
		// 			setContentAverage(response.data.ContentAverage);
		// 		})

		// 		.catch((error) => {
		// 			// 요청이 실패한 경우의 처리
		// 			console.error(error);
		// 		});
		// }
		setOpen(!open);
	};

	const onSaveButton = () => {
		setLoad(!Load);
	};
	
	const onResultButton = () => {
		setResult(!Result);
	};

	useEffect(() => {
		// let body = {
		// 	user_no: data.userNo,
		// 	content: Content,
		// 	DeliverIndividualList: [PauseCount, FillerCount, BacktrackingCount, EtcCount],
		// 	ContentIndividualList: [
		// 		MistranslationCount,
		// 		OmissionCount,
		// 		PronunciationCount,
		// 		IntonationCount,
		// 		GrammaticalErrorCount,
		// 	],
		// };
		// console.log(body); //API를 위한 콘솔 로그
		// Axios.post('https://edu-trans.ewha.ac.kr:8443/api/feedback/graphFigure', body, {
		// 	withCredentials: true,
		// })
		// 	.then((response) => {
		// 		if (response.data.probcreateSuccess) {
		// 			alert('저장 완료했습니다.');
		//
		// 		} else {
		// 			alert('저장 실패했습니다. 다시 시도해주세요.');
		// 			navigate('/');
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		// 요청이 실패한 경우의 처리
		// 		console.error(error);
		// 		navigate(-1);
		// 	});
	}, [Content]);
	
	useEffect(()=>{
		Axios.get('https://edu-trans.ewha.ac.kr:8443/upload/95cb2cec-8c0e-4782-b84f-9335d81ea3d6.json', { withCredentials: true }).then((response2) => {
					
					setSectioncontent(response2.data.denotations);
		
				});
	},[]);
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
				<Original>
					<h4>원문</h4>
					<OriginalBox></OriginalBox>
				</Original>

				<Interpretation>
					<h4>통역 전사문</h4>
					<InterpretationBox>
						<TextAEEditor
							Load={Load}
							setContent={setContent}
							setSectioncontent={setSectioncontent}
							setFillerCount={setFillerCount}
							setPauseCount={setPauseCount}
							setBacktrackingCount={setBacktrackingCount}
							setMistranslationCount={setMistranslationCount}
							setIntonationCount={setIntonationCount}
							setOmissionCount={setOmissionCount}
							setPronunciationCount={setPronunciationCount}
							setGrammaticalErrorCount={setGrammaticalErrorCount}
							setEtcCount={setEtcCount}
							num={data?.num}
							asnum={data?.asnum}
							userNo={data?.userNo}
							setOriginaltext={setOriginaltext}
						/>
					</InterpretationBox>
				</Interpretation>

				<Estimation>
					
					<h4>피드백</h4>
					<EstimationBox>
						{Sectioncontent?.map((lesson, index) => (
							<React.Fragment key={index}>
								<FeedbackGridCard id={lesson.id} begin={lesson.span.begin} end={lesson.span.end} obj={lesson.obj}/>
							</React.Fragment>
						))}
					</EstimationBox>
				</Estimation>
			</FeedbackDiv>

			<LectureCreateDiv>
				<LectureCreateButton onClick={onClickButton}>그래프 보기</LectureCreateButton>
				<LectureCreateButton onClick={onResultButton}>총평</LectureCreateButton>
				{userinfos?.userData?.role === 3 ? (
					<LectureCreateButton onClick={onSaveButton}>저장하기</LectureCreateButton>
				) : (
					''
				)}
			</LectureCreateDiv>

			{userinfos?.userData?.role === 1 ? (
				<StudentBottomSheet
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					DeliverIndividualList={DeliverIndividualList}
					DeliverAverage={DeliverAverage}
					ContentIndividualList={ContentIndividualList}
					ContentAverage={ContentAverage}
				/>
			) : userinfos?.userData?.role === 2 ? (
				<BottomSheetSection
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					DeliverIndividualList={DeliverIndividualList}
					DeliverstudentList={DeliverstudentList}
					ContentIndividualList={ContentIndividualList}
					ContentstudentList={ContentstudentList}
				/>
			) : userinfos?.userData?.role === 3 ? (
				<BottomSheetSection
					style={{ zIndex: '10' }}
					open={open}
					setOpen={setOpen}
					DeliverIndividualList={DeliverIndividualList}
					DeliverstudentList={DeliverstudentList}
					ContentIndividualList={ContentIndividualList}
					ContentstudentList={ContentstudentList}
				/>
			) : (
				''
			)}
			
			{userinfos?.userData?.role === 1 ? (
				<StudentResultSheet
					style={{ zIndex: '10' }}
					Result={Result}
					setResult={setResult}
					
				/>
			) : userinfos?.userData?.role === 2 ? (
				<ProfessorResultSheet
					style={{ zIndex: '10' }}
					Result={Result}
					setResult={setResult}
					
				/>
			) : userinfos?.userData?.role === 3 ? (
				<ProfessorResultSheet
					style={{ zIndex: '10' }}
					Result={Result}
					setResult={setResult}
					
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
	min-height: 1500px;
`;

const Original = styled.div`
	font-size: 12px;
	margin: 0 auto;
	max-width: 800px;
	padding: 15px;
`;

const OriginalBox = styled.div`
	width: auto;
	height: 250px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
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
	max-height: 500px;
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
	display: flex;
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