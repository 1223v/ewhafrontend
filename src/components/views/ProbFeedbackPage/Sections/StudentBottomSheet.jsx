import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

function BottomSheetSection(props) {
	const series = [
		{
			name: '나',
			data: [76, 85, 101, 98],
		},
		{
			name: '평균',
			data: [35, 41, 36, 26],
		},
	];

	const options = {
		chart: {
			type: 'bar',
			height: 350,
		},
		title: {
			text: '전달력 결과',
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: ['침묵', '필러', '백트래킹', '기타'],
		},
		yaxis: {},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
	};

	const series2 = [
		{
			name: '나',
			data: [76, 85, 101, 98, 28],
		},
		{
			name: '평균',
			data: [35, 41, 36, 26, 54],
		},
	];

	const options2 = {
		chart: {
			type: 'bar',
			height: 350,
		},
		title: {
			text: '내용 정확도 결과',
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: ['오역', '누락', '표현', '억양', '기타'],
		},
		yaxis: {},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
	};
	
	const series3 = [
		{
			name: '1회차',
			data: [76, 85, 101, 98],
		},
		{
			name: '2회차',
			data: [35, 41, 36, 26],
		},
		{
			name: '3회차',
			data: [76, 85, 101, 98],
		},
	];
	
	const series4 = [
		{
			name: '1회차',
			data: [76, 85, 101, 98, 28],
		},
		{
			name: '2회차',
			data: [35, 41, 36, 26, 54],
		},
		{
			name: '3회차',
			data: [35, 41, 36, 26, 54],
		},
	];

	const onClose = () => {
		props.setOpen(false);
	};

	useEffect(() => {
		console.log(props.Graphcontent);
	}, [props.Graphcontent]);
	return (
		<div>
			<BottomSheet
				open={props.open}
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
							<ChartInDiv>
								<ReactApexChart
									options={options}
									series={series}
									type="bar"
									width="500"
								/>
							</ChartInDiv>
							<ChartInDiv>
								<ReactApexChart
									options={options2}
									series={series2}
									type="bar"
									width="500"
								/>
							</ChartInDiv>
						</StyledButtonWrapper>
						<StyledButtonWrapper>
							<ChartInDiv>
								<ReactApexChart
									options={options}
									series={series3}
									type="bar"
									width="500"
								/>
							</ChartInDiv>
							<ChartInDiv>
								<ReactApexChart
									options={options2}
									series={series4}
									type="bar"
									width="500"
								/>
							</ChartInDiv>
						</StyledButtonWrapper>
					</StyledNewWishList>
				</div>
			</BottomSheet>
		</div>
	);
}

export default BottomSheetSection;

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
	& > button {
		width: 5.8rem;
		height: 5.8rem;
		border: 0.1rem solid gray;
		border-radius: 0.8rem;
		background-color: white;
	}

	& > button > img {
		width: 2.4rem;
		height: 2.4rem;
	}
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
	& > input {
		width: 85%;
		padding: 0.5rem 1rem;
		border: 0.1rem solid gray;
		border-radius: 0.8rem;
		margin-bottom: 1.8rem;
		font-weight: 500;
		font-size: 1.4rem;
		line-height: 1.7rem;
	}

	& > input:focus {
		outline: none;
		box-shadow: 0 0 0 0.2rem black;
	}

	& > div {
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 1.4rem;
		color: gray;
		margin-bottom: 6.8rem;
	}

	& > button {
		width: 98%;
		font-weight: 600;
		font-size: 1rem;
		line-height: 2.3rem;
		margin-bottom: 30px;
		border-radius: 0.6rem;
		color: white;
		background-color: #452b75;
	}

	& > button:disabled {
		background-color: gray;
	}
`;