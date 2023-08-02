import React, { useContext, useEffect, useState, useRef } from 'react';
import { MainContext } from './Sections/contexts/MainContext.js';
import AudioRecorderFunc from './Sections/AudioRecorderFunc.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Col } from 'antd';
import Axios from 'axios';

function AudiorecordGridcard(props) {
	let navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const { audioURL } = useContext(MainContext) || {};
	const [check, setcheck] = useState(false);
	const fileInput = useRef(null);

	const onPlayButton = () => {
		const URL = 'https://edu-trans.ewha.ac.kr:8443/' + props.Wavaudio.upload_url;
		props.setRegionmusic(URL);
		setcheck(!check);
		setTimeout(() => {
			props.setPlaymusic(true);
			console.log(props.Wavaudio);
		}, 3000);
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('assignment', props.Assignmentnum);
		formData.append('wav', file);
		Axios.put('https://edu-trans.ewha.ac.kr:8443/stt', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
		})
			.then((response) => {
				alert('임시저장되었습니다.');
				props.setSubmitlist(response.data.file);
			})
			.catch((error) => {
				console.error('파일 업로드 실패:', error);
			});
	};

	const onFileButton = (e) => {
		fileInput.current.click();
	};

	const onSaveButton = () => {
		if (window.confirm('저장 시 해당 구간은 수정이 불가합니다. 저장하시겠습니까?')) {
			if (props.Submitlist.length !== 0) {
				props.setRealsubmit([...props.Realsubmit, props.Submitlist]);
				props.setDisable(props.Disable + 1);
				props.setSubmitlist('');
				alert('저장을 완료했습니다. 다음 구간을 진행해주세요.');
			} else {
				alert('녹음 혹은 업로드부터 진행해주세요.');
			}
		}
	};

	return (
		<Col lg={8} md={12} xs={24}>
			<MainaudioGridcard>
				<AudioGridcard
					style={{ opacity: props.Disable !== props.region_index ? '0.5' : '1' }}
				>
					<div>
						<h5 style={{ margin: '13px', color: '#2B2D36' }}>
							구간 {props.Wavaudio.region_index}
						</h5>
					</div>
					<div style={{ textAlign: 'center', position: 'relative', margin: '10px' }}>
						<AudioRecorderFunc
							region_index={props.region_index}
							Assignmentnum={props.Assignmentnum}
							setSubmitlist={props.setSubmitlist}
							Submitlist={props.Submitlist}
							Disable={props.Disable}
						/>
					</div>
					<div style={{ textAlign: 'center', margin: '10px' }}>
						{check === false ? (
							<button
								className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-2"
								onClick={onPlayButton}
								disabled={props.Disable !== props.region_index}
							>
								▶ 실행
							</button>
						) : (
							<button
								className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-red-700 font-semibold py-2 px-4 border border-red-500 rounded m-2"
								onClick={onPlayButton}
								disabled={props.Disable !== props.region_index}
							>
								■ 정지
							</button>
						)}

						<button
							className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2"
							onClick={onFileButton}
							disabled={props.Disable !== props.region_index}
						>
							파일첨부
						</button>
						<input
							type="file"
							ref={fileInput}
							onChange={handleChange}
							style={{ display: 'none' }}
						/>
						<button
							className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-red-700 font-semibold py-2 px-4 border border-red-500 rounded m-2"
							onClick={onSaveButton}
							disabled={props.Disable !== props.region_index}
						>
							저장하기
						</button>
					</div>
				</AudioGridcard>
			</MainaudioGridcard>
		</Col>
	);
}

export default AudiorecordGridcard;

const AudioGridcard = styled.div`
	border: 1px solid rgb(211, 211, 211);
	border-radius: 5px;
	width: 100%;
	max-width : 450px;
	margin: 10px 10px 10px 10px;
	background-color: rgb(255, 255, 255);
	position: relative;
	overflow: auto;
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
		0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const MainaudioGridcard = styled.div`
	position: relative;
	display: flex;
`;