/* global kakao */
import React, { useEffect, useState, useRef } from 'react';
import useScript from '../../../../hooks/useScript';
import styled, { keyframes } from 'styled-components';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TextAEEditor = (props) => {
	const [Textae, setTextae] = useState('');
	const [Url, setUrl] = useState('');

	const elementRef = useRef(null);
	let navigate = useNavigate();

	const countOccurrences = (textContent) => {
		let FillerNumber = 0;
		let PauseNumber = 0;
		let BacktrackingNumber = 0;
		let EtcNumber = 0;
		let MistranslationNumber = 0;
		let IntonationNumber = 0;
		let OmissionNumber = 0;
		let PronunciationNumber = 0;
		let GrammaticalErrorNumber = 0;

		textContent.denotations?.forEach((item) => {
			if (item.obj === 'Filler') {
				FillerNumber++;
			} else if (item.obj === 'Pause') {
				PauseNumber++;
			} else if (item.obj === 'Backtracking') {
				BacktrackingNumber++;
			} else if (item.obj === 'Etc') {
				EtcNumber++;
			} else if (item.obj === 'Mistranslation') {
				MistranslationNumber++;
			} else if (item.obj === 'Intonation') {
				IntonationNumber++;
			} else if (item.obj === 'Omission') {
				OmissionNumber++;
			} else if (item.obj === 'Pronunciation') {
				PronunciationNumber++;
			} else if (item.obj === 'GrammaticalError') {
				GrammaticalErrorNumber++;
			}
		});

		props.setFillerCount(FillerNumber);
		props.setPauseCount(PauseNumber);
		props.setBacktrackingCount(BacktrackingNumber);
		props.setEtcCount(EtcNumber);
		props.setMistranslationCount(MistranslationNumber);
		props.setIntonationCount(IntonationNumber);
		props.setOmissionCount(OmissionNumber);
		props.setPronunciationCount(PronunciationNumber);
		props.setGrammaticalErrorCount(GrammaticalErrorNumber);
	};
	const handleMouseUp = () => {
		const textContent = JSON.parse(elementRef.current.textContent);
		countOccurrences(textContent);
		props.setSectioncontent(textContent.denotations);
	};

	useEffect(() => {
		props.setContent(elementRef.current.textContent);
	}, [props.Load]);

	useEffect(() => {
		setTimeout(() => {
			// var initializeTextAEEditor = window.initializeTextAEEditor;
			// initializeTextAEEditor('#textae-editor');
			

			// The initializeTextAEEditor function may initialize multiple TextAE editors.
			// It returns an array of initialized editors.
			// It has the ID of the HTML element in the id property.
			const editor = window.initializeTextAEEditor()
				
			
			//editor.find((editor) => editor.id === 'textae-editor');

			// The TextAE editor displays the annotation set in the annotation property.
			editor.annotation = {
				text: 'This is a TextAE editor dynamically created from a JavaScript program.',
			};

			// When you edit an annotation in the TextAE editor,
			// the changed annotation is notified to the callback function set in the inspectCallback property
			// each time you edit it.
			editor.inspectCallback = (annotation) => {
				console.log(annotation);
			};

			// Clean up the TextAE editor when the component is unmounted.
			return () => {
				const editorElement = document.getElementById('my_text-ae_editor');
				if (editorElement) {
					editorElement.remove();
				}
			};
		}, 2000);
	}, [Url]);

	useEffect(() => {
		console.log(props.num);
		Axios.get(
			`https://edu-trans.ewha.ac.kr:8443/r_feedback?as_no=${props.asnum}&lecture_no=${props.num}&user_no=${props.userNo}`,
			{
				withCredentials: true,
			}
		)
			.then((response) => {
				// 요청이 성공한 경우의 처리
				if (response.data.FeedbackStatus === 1) {
					setUrl(response.data.url);
					Axios.get(response.data.url, { withCredentials: true }).then((response2) => {
						console.log(response2.data);
						//const textContent = JSON.parse(response2.data);
						props.setSectioncontent(response2.data);
					});
				} else if (response.data.FeedbackStatus === 2) {
					alert('과제를 제출해주세요.');
					navigate("/");
				} else if (response.data.FeedbackStatus === 3) {
					alert('STT 작업중입니다...');
					navigate("/");
				} else {
					alert('알 수 없는 에러입니다.');
					navigate("/");
				}
			})

			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
				navigate("/");
			});

		// setUrl(
		// 	'https://edu-trans.ewha.ac.kr:8443/upload/95cb2cec-8c0e-4782-b84f-9335d81ea3d6.json'
		// );
	}, []);

	return (
		<div>
			<div
				id="my_text-ae_editor"
				className="textae-editor"
				mode="edit"
				target={Url}
				inspect="annotation"
				onMouseUp={handleMouseUp}
			></div>
			<div id="annotation" ref={elementRef} style={{ display: 'none' }}></div>
		</div>
	);
};

export default TextAEEditor;

const animation = keyframes`
50% {
  transform: scale(0.92);
}
`;

const StartBtn = styled.button`
	display: flex;
	justify-content: center;

	width: calc(100% - 32px);
	height: 54px;
	line-height: 54px;
	box-sizing: border-box;
	border: none;
	border-radius: 5px;
	background: #5849ff;
	color: #fff;
	text-align: center;
	font-family: 'Noto Sans KR', sans-serif;
	font-size: 17px;
	font-weight: 400;

	margin: 10px;
	&:active {
		animation: ${animation} 0.2s;
	}
`;