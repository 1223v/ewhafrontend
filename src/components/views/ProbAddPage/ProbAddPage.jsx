import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import DragNDrop from '../Audio/Sections/DragNDrop';
import FileRead from '../Audio/Sections/FileRead';
import Axios from 'axios';


const Week = [
	{value: 1, label: "1주차"},
	{value: 2, label: "2주차"},
	{value: 3, label: "3주차"},
	{value: 4, label: "4주차"},
	{value: 5, label: "5주차"},
	{value: 6, label: "6주차"},
	{value: 7, label: "7주차"},
	{value: 8, label: "8주차"},
	{value: 9, label: "9주차"},
	{value: 10, label: "10주차"},
	{value: 11, label: "11주차"},
	{value: 12, label: "12주차"},
	{value: 13, label: "13주차"},
	{value: 14, label: "14주차"},
	{value: 15, label: "15주차"},
	{value: 16, label: "16주차"},
	
];

const ClassOption = [
	{value: 1, label: "1분반"},
	{value: 2, label: "2분반"},
	{value: 3, label: "3분반"},
	{value: 4, label: "4분반"},
	{value: 5, label: "5분반"},
	{value: 6, label: "6분반"},
	{value: 7, label: "7분반"},
	{value: 8, label: "8분반"},
	{value: 9, label: "9분반"},
	{value: 10, label: "10분반"},

	
];

const Startlanguage = [
	{value: "한국어", label: "한국어"},
	{value: "일본어", label: "일본어"},
	{value: "중국어", label: "중국어"},
	{value: "영어", label: "영어"},
	{value: "불어", label: "불어"},
];

const Endlanguage = [
	{value: "일본어", label: "일본어"},
	{value: "한국어", label: "한국어"},
	{value: "중국어", label: "중국어"},
	{value: "영어", label: "영어"},
	{value: "불어", label: "불어"},
];

const AssignmentOption = [
	{value: "순차 통역", label: "순차 통역"},
	{value: "동시 통역", label: "동시 통역"},
	{value: "번역", label: "번역"},

];

const SpeedOption = [
	{value: 1, label: "1배속"},
	{value: 0.5, label: "0.5배속"},
	{value: 1.25, label: "1.25배속"},
	{value: 1.5, label: "1.5배속"},
	{value: 1.75, label: "1.75배속"},
	{value: 2, label: "2배속"},
	

];



function ProbAddPage() {
	const [Title, setTitle] = useState('');
	const [Description, setDescription] = useState('');
	const [Weeklist, setWeeklist] = useState('');
	const [Limitlist, setLimitlist] = useState('');
	const [Startlanguagelist, setStartlanguagelist] = useState('');
	const [Endlanguagelist, setEndlanguagelist] = useState('');
	const [Assignmentlist, setAssignmentlist] = useState('');
	const [Speedlist, setSpeedlist] = useState('');
	const [Txtread, setTxtread] = useState('');
	const [Urlfile, setUrlfile] = useState('');
	
	const onTitleChange = (e) => {
		setTitle(e.currentTarget.value);
	}
	
	const onDescriptionChange = (e) => {
		setDescription(e.currentTarget.value);
	}
	
	const onWeekChange = (e) => {
		setWeeklist(e.currentTarget.value);
	}
	
	const onLimitChange = (e) => {
		setLimitlist(e.currentTarget.value);
	}
	
	const onStartlanguageChange = (e) => {
		setStartlanguagelist(e.currentTarget.value);
	}
	
	const onEndlanguageChange = (e) => {
		setEndlanguagelist(e.currentTarget.value);
	}
	
	const onAssignmentChange = (e) => {
		setAssignmentlist(e.currentTarget.value);
	}
	
	const onSpeedChange = (e) => {
		setSpeedlist(e.currentTarget.value);
	}

	const onSaveButton = () => {
		
		let body = {
			lecture_no : Title,
			prob_week: Weeklist,
			prob_timeEnd:Limitlist,
			prob_name:Title,
			prob_type:Assignmentlist,
			prob_keyword:"",
			prob_translang_source:Startlanguagelist,
			prob_translang_destination:Endlanguagelist,
			prob_exp:Txtread,
			prob_play_speed: Speedlist,
			prob_open: Txtread,
			prob_region: Txtread,
			prob_replay: Txtread,
			original_text:Txtread,
			prob_sound_path:Txtread,
			file: Urlfile
		};
		
		const config = {
			header: {'content-type' : 'multipart/form-data'}
		}
		
		Axios.post('/api',body,config)
		.then(response => {
			console.log(response.data);
		})
	};
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
							value={Title}
							onChange={onTitleChange}
						
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
							onChange={onWeekChange}
						>
							{Week.map((item,index)=>(
								<option key={index} value={item.value}>{item.label}</option>
							))}
					
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
							onChange={onAssignmentChange}
						>
							{AssignmentOption.map((item,index)=>(
								<option key={index} value={item.value}>{item.label}</option>
							))}
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
						onChange={onStartlanguageChange}
						>
							{Startlanguage.map((item,index)=>(
								<option key={index} value={item.value}>{item.label}</option>
							))}
						</select>
					</LectureNameinputDiv>
					<LectureName>도착 언어</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						onChange={onEndlanguageChange}
						>
							{Endlanguage.map((item,index)=>(
								<option key={index} value={item.value}>{item.label}</option>
							))}
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 기한</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<input type="datetime-local" name="bday" onChange={onLimitChange}/>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>재생 속도</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<select
							id="countries"
							class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
						onChange={onSpeedChange}
						>
							{SpeedOption.map((item,index)=>(
								<option key={index} value={item.value}>{item.label}</option>
							))}
						</select>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 용도</LectureName>
					<LectureNameinputDiv style={{ marginTop: '10px' }}>
						<input type="checkbox" id="remember-check" /> 자습용 과제
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<LectureNameDiv>
					<LectureName>과제 설명</LectureName>
					<LectureNameinputDiv>
						<LectureNameinput
							type="text"
							placeholder="과제 설명해주세요."
							size="10"
							maxlength="8"
							value={Description}
							onChange={onDescriptionChange}
						/>
					</LectureNameinputDiv>
				</LectureNameDiv>
				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />

				<div>
					<DragNDrop Urlfile={Urlfile} setUrlfile={setUrlfile} />
				</div>

				<hr style={{ background: '#d3d3d3', height: '1px', border: '0' }} />
				<div>
					<FileRead setTxtreads={setTxtread} Txtreads={Txtread} />
				</div>
			</LectureAddFormDiv>
			<LectureCreateDiv>
				<LectureCreateButton onClick={onSaveButton}>생성하기</LectureCreateButton>
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
		width: auto;
		margin: 10px;
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
	z-index: 8;
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