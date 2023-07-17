import React, { useContext, useEffect } from 'react';
import SimpleRecorder from './Sections/SimpleRecorder.js';
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

	return (
		<Col lg={12} md={8} xs={24}>
			<div className="lecture_list">
				<div className="lecture_list_class">
					<div>
						<h6 style={{ margin: '10px', color: '#2B2D36' }}>구간 1</h6>
					</div>
					<div style={{ textAlign: 'center', position: 'relative'}}>
						
						<AudioRecorderFunc />
					</div>
					<div>
						<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
							▶ 실행
						</button>
						<button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-green hover:border-transparent rounded">
							파일첨부
						</button>
					</div>
				</div>
			</div>
		</Col>
	);
}

export default AudiorecordGridcard;