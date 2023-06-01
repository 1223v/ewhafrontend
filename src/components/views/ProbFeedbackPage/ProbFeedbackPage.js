import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import TextAEEditor from './Sections/TextAEEditor';
import BottomSheetSection from './Sections/BottomSheetSection';

function ProbFeedbackPage() {
	const [open, setOpen] = useState(false);
	const onClickButton = () => {
		console.log('hello');
		setOpen(true);
	};
	return (
		<div>
			<NavBar />
			<FeedbackDiv>
				<Translation>
					<h4>원문</h4>
					<TranslationBox>
						test
					</TranslationBox>
				</Translation>
				<Interpretation>
					<h4>통역 전사문</h4>
					<InterpretationBox><TextAEEditor /></InterpretationBox>
				</Interpretation>

				<Feedback>
					<h4>피드백</h4>
					<FeedbackBox>test</FeedbackBox>
				</Feedback>

				<Estimation>
					<h4>총평</h4>
					<EstimationBox>test</EstimationBox>
				</Estimation>
			</FeedbackDiv>

			<LectureCreateDiv>
				<LectureCreateButton onClick={onClickButton}>그래프 보기</LectureCreateButton>
				<LectureCreateButton onClick={onClickButton}>저장하기</LectureCreateButton>
			</LectureCreateDiv>

			<BottomSheetSection open={open} setOpen={setOpen} />
		</div>
	);
}
export default ProbFeedbackPage;

const FeedbackDiv = styled.div`
	width: 800px;
	margin: 0 auto;
	position: relative;
`;

const Translation = styled.div`
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 0px;
`;
const TranslationBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 500px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Interpretation = styled.div`
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 350px;
`;

const InterpretationBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 500px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Feedback = styled.div`
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 700px;
`;

const FeedbackBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 840px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Estimation = styled.div`
	font-size: 12px;
	margin-top: 600px;
	position: absolute;
	left: 0px;
`;

const EstimationBox = styled.div`
	padding: 10px;

	width: 650px;
	height: 250px;

	overflow-y: auto;

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
	margin: 20px;
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