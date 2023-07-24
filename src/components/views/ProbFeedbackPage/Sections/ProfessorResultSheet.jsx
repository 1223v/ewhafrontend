import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

function ProfessorResultSheet(props) {
	


	const onClose = () => {
		props.setResult(false);
	};
	
	
	const onResultSubmit = () => {
		console.log("api 호출");
	};

	

	return (
		<div style={{ zIndex: '10' }}>
			<BottomSheet
				open={props.Result}
				onDismiss={onClose}
				header={
					<StyledBottomSheetHeader>
						<div className="sheetHeader">학생 평가결과</div>
						<GrClose size="23" onClick={onClose} />
					</StyledBottomSheetHeader>
				}
				snapPoints={({ maxHeight }) => 0.6 * maxHeight}
			>
				<div
					style={{
						height: '100vh',
					}}
				>
					<StyledNewWishList>
						<StyledButtonWrapper>
							<Txtarea
								
								cols="130"
								rows="20"
								
							></Txtarea>
							
						</StyledButtonWrapper>
						<StyledButtonWrapper>
							<ResultBtn onClick={onResultSubmit}>총평 저장하기</ResultBtn>
						</StyledButtonWrapper>
					</StyledNewWishList>
				</div>
			</BottomSheet>
		</div>
	);
}

export default ProfessorResultSheet;

const Txtarea = styled.textarea`
	width: 100%;
	margin: 0 auto;
	border: none;
	resize: none;
`;

const ChartInDiv = styled.div`
	border-bottom: 3px solid #00aaff;
	border-top: 3px solid #00aaff;
	color: black;
	text-align: center;
	margin-left: 10px;
`;

const ParkingInChildDiv = styled.div`
	margin: 10px;
`;

const StyledButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	
	justify-content: center;

`;

const StyledBottomSheetHeader = styled.div`
	height: 1.4rem;
	padding: 1.1rem 2.2rem 0.9rem 2.2rem;
	display: flex;
	align-items: center;
	text-align: initial;
	position: sticky;
	top: 0;
	background: white;

	& > img {
		cursor: pointer;
	}

	& > div {
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 1.7rem;
		width: 100%;
	}
`;

const StyledNewWishList = styled.div`
	padding: 3.3rem 2.2rem 3.6rem 2.2rem;
	flex-direction: column;
	align-items: center;




	& > div {
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 1.4rem;
		color: gray;
		
	}

`;


const ResultBtn = styled.button`
  display: flex;
  justify-content: center;

  width: calc(100% - 32px);
  height: 54px;
  line-height: 54px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background: #2e462f;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 400;

  margin: 10px;
 
`;