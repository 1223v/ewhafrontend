import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import DragNDrop from '../Audio/Sections/DragNDrop'

function ProbAddPage() {
	return (
		<LectureBackgroudDiv>
			<NavBar />
			<div style={{ display: 'flex' }}>
				<LectureBackDiv>
					<a
						href="#"
						style={{
							textDecoration: 'none',
							margin: '9px',
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 -5 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
							/>
						</svg>
					</a>
				</LectureBackDiv>
				<LectureTitleDiv>과제 생성하기</LectureTitleDiv>
			</div>
			<LectureAddFormDiv>
				<LectureNameDiv>
					<LectureName>과제 명</LectureName>
					<LectureNameinputDiv>
						<LectureNameinput
							type="text"
							placeholder=" 강의명을 적어주세요"
							size="10"
							maxlength="8"
						/>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 주차</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						>
							<option value="1">1주차</option>
							<option value="2">2주차</option>
							<option value="3">3주차</option>
							<option value="4">4주차</option>
							<option value="5">5주차</option>
							<option value="6">6주차</option>
							<option value="7">7주차</option>
							<option value="8">8주차</option>
							<option value="9">9주차</option>
							<option value="11">10주차</option>
							<option value="11">11주차</option>
							<option value="12">12주차</option>
							<option value="13">13주차</option>
							<option value="14">14주차</option>
							<option value="15">15주차</option>
							<option value="16">16주차</option>
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 종류</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						>
							<option value="순차 통역">순차 통역</option>
							<option value="동시 통역">동시 통역</option>
							<option value="번역">번역</option>
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>출발 언어</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						>
							<option value="한일번역">한일번역</option>
							<option value="한중번역">한중번역</option>
							<option value="한러번역">한러번역</option>
							<option value="한불번역">한불번역</option>
							<option value="한일통역">한일통역</option>
							<option value="한중통역">한중통역</option>
							<option value="한러통역">한러통역</option>
							<option value="한불통역">한불통역</option>
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 기한</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						>
							<option value="1분반">1 분반</option>
							<option value="2분반">2 분반</option>
							<option value="3분반">3 분반</option>
							<option value="4분반">4 분반</option>
							<option value="5분반">5 분반</option>
							<option value="6분반">6 분반</option>
							<option value="7분반">7 분반</option>
							<option value="8분반">8 분반</option>
							<option value="9분반">9 분반</option>
							<option value="10분반">10 분반</option>
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 설명</LectureName>
					<LectureNameinputDiv>
						<LectureNameinput type="text" placeholder="교수" size="10" maxlength="8" />
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />

				<div>
					<DragNDrop />
				</div>
			</LectureAddFormDiv>
			<LectureCreateDiv>
				<LectureCreateButton>생성하기</LectureCreateButton>
			</LectureCreateDiv>
		</LectureBackgroudDiv>
	);
}

export default ProbAddPage;

const LectureBackgroudDiv = styled.div`
	background-color: #f7f7fa;
	width: 100%;
	height: 1500px;
`;

const LectureAddFormDiv = styled.div`
	border: 0.0625rem solid #e1e1e8;
	border-radius: 0.5rem;
	margin: auto;
	background-color: #ffffff;
	width: 800px;
	height: 80%;
	@media screen and (max-width: 768px) {
		width: 320px;
	}
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

const LectureBackDiv = styled.div`
	background-color: #85889914;
	border-radius: 7px;
	margin: 20px;
	height: 34px;
	width: 40px;
	color: black;
`;

const LectureNameDiv = styled.div`
	font-size: 14px;

	display: flex;
	line-height: 1.5;
	color: #525364;
	width: 95%;
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap');
	font-family: 'Noto Sans KR', sans-serif;
	margin: 17px;
	@media screen and (max-width: 768px) {
		margin: 11px;
	}
`;

const LectureName2 = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-grow: 2;
`;

const LectureNameinput = styled.input`
	width: 100%;
	height: 48px;

	margin-top: 10px;
	margin-right: 10px;
	box-sizing: border-box;
	margin-bottom: 8px;
	border: solid 1px #d3d3d3;
	border-radius: 9px;
	background-color: #ffffff;
	&:hover {
		outline: 2px solid #04653d;
	}
`;

const LectureNameinputDiv = styled.div`
	flex-grow: 2;
`;

const LectureName = styled.div`
	margin: 20px;
	flexgrow: 1;
	fontweight: 500;
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
`;

const StudentAddButton = styled.button`
	height: 2.5rem;
	font-size: 0.975rem;
	font-weight: 800;
	line-height: 1.375rem;

	border-radius: 0.5rem;
	margin: 12px 15px;
	color: #fff;
	background-color: #2e462f;
	border-color: transparent;
`;