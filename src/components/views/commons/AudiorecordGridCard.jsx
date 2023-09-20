import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';

function AudiorecordGridCard(props) {
	return (
		<Col lg={8} md={12} xs={24}>
			<MainaudioGridcard>
				<AudioGridcard>
					<div>
						<h5 style={{ margin: '13px', color: '#2B2D36' }}>KeyWord</h5>
					</div>
					<div style={{ textAlign: 'center', position: 'relative', margin: '10px' }}>
						{props.Keyword}
					</div>
				</AudioGridcard>
			</MainaudioGridcard>
		</Col>
	);
}

export default AudiorecordGridCard;

const AudioGridcard = styled.div`
	border: 1px solid rgb(211, 211, 211);
	border-radius: 5px;
	width: 100%;
	max-width: 450px;
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