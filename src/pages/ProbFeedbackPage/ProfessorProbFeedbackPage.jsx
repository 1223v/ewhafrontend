import React, { useState, useEffect } from 'react';
import NavBar from '../../components/views/NavBar/NavBar';
import styled from 'styled-components';
import TextAEEditor from '../../components/views/Feedback/TextAEEditor';
import { useSelector } from 'react-redux';
import FeedbackGridCard from '../../components/views/commons/FeedbackGridCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../components/Config';
import { message, FloatButton } from 'antd';
import { BarChartOutlined, EditOutlined, LineChartOutlined } from '@ant-design/icons';
import Audioplay from '../../components/views/Audio/Audioplay';

function ProfessorProbFeedbackPage() {
	const location = useLocation();
	let navigate = useNavigate();
	const params = new URLSearchParams(location.search);
	const lectureNo = params.get('lecture_no');
	const asNo = params.get('as_no');
	const userNo = params.get('user_no');
	const userinfos = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);
	const [Result, setResult] = useState(false);
	const [Load, setLoad] = useState(false);
	const [Datacontent, setDatacontent] = useState('');
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
	const [Originaltext, setOriginaltext] = useState('');
	const [Regionmusic, setRegionmusic] = useState('');
	const [Originmusic, setOriginmusic] = useState('');
	const [Playmusic, setPlaymusic] = useState(false);
	const [Playopen, setPlayopen] = useState(false);

	const onClickButton = () => {
		// 여기가 그래프 API 호출 위치
		// if (userinfos?.userData?.role === 3) {
		// 	Axios.get(
		// 		`${API_URL}api/feedback/professorgraphlist?as_no=${data.asnum}&lecture_no=${data.num}&user_no=${data.userNo}`,
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

		Axios.get(
			`${API_URL}api/feedback/studentgraphlist?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${userNo}`,
			{
				withCredentials: true,
			}
		)
			.then((response) => {
				// 요청이 성공한 경우의 처리
				console.log(response.data);
				// setDeliverIndividualList(response.data.DeliverIndividualList);
				// setDeliverAverage(response.data.DeliverAverage);
				// setContentIndividualList(response.data.ContentIndividualList);
				// setContentAverage(response.data.ContentAverage);
			})

			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
			});
		// }
		setOpen(!open);
	};

	const onSaveButton = () => {
		setLoad(!Load);
	};

	const onResultButton = () => {
		setResult(!Result);
	};

	const onPlayMusicOpenBtn = () => {
		setPlayopen(!Playopen);
	};

	useEffect(() => {
		Axios.get(`${API_URL}api/feedback/info?as_no=${asNo}&student_no=${userNo}`, {
			withCredentials: true,
		})
			.then((response) => {
				// 요청이 성공한 경우의 처리
				console.log(response.data);
			})

			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
				message.error('알 수 없는 에러가 발생했습니다.');
				navigate('/');
			});
	}, []);

	useEffect(() => {
		setRegionmusic(`${API_URL}upload/c51e0eac-5183-4818-8d36-df995b52f520.wav`);
		if (Datacontent !== '') {
			let body = {
				lecture_no: lectureNo,
				as_no: asNo,
				user_no: userNo,
				result: '',
				ae_attributes: Datacontent.attributes,
				ae_denotations: Datacontent.denotations,
				DeliverIndividualList: [PauseCount, FillerCount, BacktrackingCount, EtcCount],
				ContentIndividualList: [
					MistranslationCount,
					OmissionCount,
					PronunciationCount,
					IntonationCount,
					GrammaticalErrorCount,
				],
			};
			console.log(body); //API를 위한 콘솔 로그
			Axios.post(`${API_URL}api/feedback`, body, {
				withCredentials: true,
			})
				.then((response) => {
					if (response.data.isSuccess) {
						alert('저장 완료했습니다.');
					} else {
						alert('저장 실패했습니다. 다시 시도해주세요.');
						navigate('/');
					}
				})
				.catch((error) => {
					// 요청이 실패한 경우의 처리
					console.error(error);
					navigate('/');
				});
		}
	}, [Datacontent]);

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
							setDatacontent={setDatacontent}
							Sectioncontent={Sectioncontent}
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
							setOriginaltext={setOriginaltext}
						/>
					</InterpretationBox>
				</Interpretation>

				<Estimation>
					<h4>피드백</h4>
					<EstimationBox>
						{Sectioncontent?.map((lesson, index) => (
							<React.Fragment key={index}>
								<FeedbackGridCard
									id={lesson.id}
									begin={lesson.span.begin}
									end={lesson.span.end}
									obj={lesson.obj}
								/>
							</React.Fragment>
						))}
					</EstimationBox>
				</Estimation>
			</FeedbackDiv>

			
				<LectureCreateDiv>
					<Audioplay
						Regionmusic={Regionmusic}
						Originmusic={Originmusic}
						Playmusic={Playmusic}
						setPlaymusic={setPlaymusic}
					/>
				</LectureCreateDiv>
				
			
			<FloatButton.Group
				trigger="click"
				style={{ right: 30, bottom: 120 }}
				icon={<BarChartOutlined />}
			>
				<FloatButton icon={<LineChartOutlined />} />
				<FloatButton icon={<EditOutlined />} />
			</FloatButton.Group>
		</div>
	);
}
export default ProfessorProbFeedbackPage;

const FeedbackDiv = styled.div`
	margin: 0 auto;
	position: relative;
	min-height: 1500px;
	@media screen and (min-width: 1000px) {
		width: 1400px;
		margin: none;
		min-height: 800px;
	}
`;

const Original = styled.div`
	font-size: 12px;
	margin: 0 auto;
	max-width: 800px;
	padding: 15px;
	@media screen and (min-width: 1000px) {
		margin-top: 20px;
		position: absolute;
		left: 0px;

		width: 450px;
		height: 580px;

		border: 1px solid #d3d3d3;
		border-radius: 4px;

		background-color: #f9f9f9;
		text-align: center;
		box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
			0px 1px 18px 0px rgba(0, 0, 0, 0.12);
	}
`;

const OriginalBox = styled.div`
	width: auto;
	height: auto;

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
	@media screen and (min-width: 1000px) {
		margin-top: 20px;
		position: absolute;
		left: 495px;

		width: 450px;
		height: 580px;

		border: 1px solid #d3d3d3;
		border-radius: 4px;

		background-color: #f9f9f9;
		text-align: center;
		box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
			0px 1px 18px 0px rgba(0, 0, 0, 0.12);
	}
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
	@media screen and (min-width: 1000px) {
		margin-top: 20px;
		position: absolute;
		left: 1010px;
		width: 300px;
		height: 580px;
		border: 1px solid #d3d3d3;
		border-radius: 4px;
		background-color: #f9f9f9;

		text-align: center;
		box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
			0px 1px 18px 0px rgba(0, 0, 0, 0.12);
	}
`;

const EstimationBox = styled.div`
	padding: 10px;
	display: flex;
	width: auto;
	height: 272px;
	overflow-x: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
	@media screen and (min-width: 1000px) {
		height: 500px;
		display: block;
	}
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
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
		0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const LectureCreateDiv = styled.div`
	position: fixed;
	bottom: 0px;
	z-index: 4;
	-webkit-box-align: center;
	align-items: center;
	width: 100%;
	height: 6rem;
	background: rgb(255, 255, 255);
	box-shadow: rgb(232, 232, 238) 0px 1px 0px inset;
`;



const MusicPlayer = styled.div`
	display: flex;
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