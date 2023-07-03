/* global kakao */
import React, { useEffect, useState, useRef } from 'react';
import useScript from '../../../../hooks/useScript';
import styled, { keyframes } from 'styled-components';
import Axios from 'axios';

const TextAEEditor = (props) => {
	const [Textae, setTextae] = useState('');
	const [Url, setUrl] = useState('');

	const elementRef = useRef(null);
	
	const handleMouseUp = () => {
    	props.setGraphcontent(elementRef.current.textContent);
  };


	useEffect(() => {
		props.setContent(elementRef.current.textContent);
	}, [props.Load]);

	

	useEffect(() => {
		setTimeout(() => {
			var initializeTextAEEditor = window.initializeTextAEEditor;
			initializeTextAEEditor('#textae-editor');
		}, 2000);
	}, [Url]);

	useEffect(() => {
		Axios.get('https://edu-trans.ewha.ac.kr:8443/r_feedback?as_no=137&lecture_no=6&user_no=2', {
			withCredentials: true,
		})
			.then((response) => {
				// 요청이 성공한 경우의 처리
				console.log(response.data.url);
				setUrl(response.data.url);
				Axios.get(response.data.url,{withCredentials: true})
				.then((response2) => {
					console.log(response2.data);
					props.setGraphcontent(response2.data);
				})
			})

			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
			});
		//setUrl("https://edu-trans.ewha.ac.kr:8443/upload/95cb2cec-8c0e-4782-b84f-9335d81ea3d6.json");
	}, []);

	return (
		<div>
			<div
				id="textae"
				className="textae-editor"
				mode="edit"
				target={Url}
				inspect="annotation"
				onMouseUp={handleMouseUp}
			></div>
			<div id="annotation" ref={elementRef}></div>
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