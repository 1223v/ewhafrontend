import React, { useContext, useEffect } from 'react';
import { MainContext } from './Sections/contexts/MainContext.js';
import AudioRecorderFunc from './Sections/AudioRecorderFunc.js';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Col } from 'antd';

function AudiorecordGridcard(props) {
	let navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const { audioURL } = useContext(MainContext) || {};

	const onPlayButton = () => {
		props.setRegionmusic(props.Wavaudio);
		
	};

	return (
		<Col lg={8} md={12} xs={24}>
			<MainaudioGridcard>
				<AudioGridcard>
					<div>
						<h5 style={{ margin: '13px', color: '#2B2D36' }}>구간 1</h5>
					</div>
					<div style={{ textAlign: 'center', position: 'relative', margin: '10px' }}>
						<AudioRecorderFunc />
					</div>
					<div style={{ textAlign: 'center', margin: '10px' }}>
						<button
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
							onClick={onPlayButton}
						>
							▶ 실행
						</button>
						<button
							className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-green hover:border-transparent rounded m-2"
							
						>
							파일첨부
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
	margin: 10px 10px 10px 10px;
	background-color: rgb(255, 255, 255);
	position: relative;
	opacity:  1;//${(props) => (props.primary ? '0.5' : '1')};
`;

const MainaudioGridcard = styled.div`
	position: relative;
	display: flex;
`;