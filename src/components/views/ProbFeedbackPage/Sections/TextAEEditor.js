/* global kakao */
import React, { useEffect, useState, useRef } from 'react';
import useScript from '../../../../hooks/useScript';
import styled, { keyframes } from 'styled-components';

const TextAEEditor = (props) => {
	const [Textae, setTextae] = useState('');
	const [Url,setUrl] = useState("");
	const elementRef = useRef(null);
	

	useEffect(() => {
		let id = elementRef.current.textContent;
		console.log(id);
		props.setContent(id);
	}, [props.Load]);

	useEffect(() => {
		setUrl("https://raw.githubusercontent.com/pubannotation/textae/gh-pages/examples/textae-annotation-example-1.json");
		var initializeTextAEEditor = window.initializeTextAEEditor;
		initializeTextAEEditor('#textae-editor');
	}, []);

	return (
		<div>
			<div
				id="textae"
				className="textae-editor"
				mode="edit"
				target="https://raw.githubusercontent.com/pubannotation/textae/gh-pages/examples/textae-annotation-example-1.json"
				inspect="annotation"
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