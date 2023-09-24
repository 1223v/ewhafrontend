import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

function StudentResultSheet(props) {
	const onClose = () => {
		props.setResult(false);
	};

	return (
		<div style={{ zIndex: '10' }}>
			<BottomSheet
				zIndex={8}
				open={props.Result}
				onDismiss={onClose}
				header={
					<StyledBottomSheetHeader>
						<div className="sheetHeader">학생 총평</div>
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
								value
								cols="130"
								rows="20"
								
							></Txtarea>
						</StyledButtonWrapper>
					</StyledNewWishList>
				</div>
			</BottomSheet>
		</div>
	);
}

export default StudentResultSheet;

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
	gap: 1.6rem;
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
	display: flex;
	flex-direction: column;
	align-items: center;

	& > div {
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 1.4rem;
		color: gray;
		margin-bottom: 6.8rem;
	}
`;

const LectureCreateButton = styled.button`
	height: 3rem;
	font-size: 0.975rem;
	font-weight: 800;
	line-height: 1.375rem;
	width: 100%;
	border-radius: 0.5rem;
	margin: 6px;
	color: #fff;
	background-color: #2e462f;
	border-color: transparent;
`;