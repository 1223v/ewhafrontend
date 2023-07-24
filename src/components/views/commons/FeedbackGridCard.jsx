import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';

function FeedbackGridCard(props) {
	let navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	
	
	

	return (
		
			<FeedbackGridcard>
				<SubFeedbackGridcard>
					<div>
						<h5 style={{ margin: '13px', color: '#2B2D36' }}>
						 	{props.id} | {props.begin}~{props.end} 구간
						</h5>
					</div>
					<Feedbacktext>
						{props.obj}
					</Feedbacktext>
					
				</SubFeedbackGridcard>
			</FeedbackGridcard>
		
	);
}

export default FeedbackGridCard;

const Feedbacktext = styled.div`
	text-align: center;
	position: relative;
	margin: 10px;
`;

const SubFeedbackGridcard = styled.div`
	border: 1px solid rgb(211, 211, 211);
	border-radius: 5px;
	width: 100%;
	min-width : 250px;
	margin: 10px 10px 10px 10px;
	background-color: rgb(255, 255, 255);
	position: relative;
	overflow: auto;
`;

const FeedbackGridcard = styled.div`
	position: relative;
	display: flex;
`;