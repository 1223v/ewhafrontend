import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

function BottomSheetSection(props) {
	const NameOptions = [
		{ value: '학생 1', label: '학생 1' },
		{ value: '학생 2', label: '학생 2' },
		{ value: '학생 3', label: '학생 3' },
		{ value: '학생 4', label: '학생 4' },
		{ value: '학생 5', label: '학생 5' },
	];
	const [Namelist, setNamelist] = useState('');

	const onNameChange = (e) => {
		setNamelist(e.currentTarget.value);
	};
	const [series] = useState([
		{
			name: '학생 1',
			data: [70, 50, 30, 40],
		},
		{
			name: '학생 2',
			data: [20, 30, 40, 100],
		},
		{
			name: '학생 3',
			data: [44, 70, 70, 13],
		},
	]);

	const options = {
		chart: {
			height: 350,
			type: 'radar',
			dropShadow: {
				enabled: true,
				blur: 1,
				left: 1,
				top: 1,
			},
		},
		title: {
			text: '전달력 결과',
		},
		stroke: {
			width: 2,
		},
		fill: {
			opacity: 0.1,
		},
		markers: {
			size: 0,
		},
		xaxis: {
			categories: ['침묵', '필러', '백트레킹', '기타'],
		},
	};

	const [series2] = useState([
		{
			name: '학생 1',
			data: [80, 50, 30, 40, 100],
		},
		{
			name: '학생 2',
			data: [20, 30, 40, 80, 20],
		},
		{
			name: '학생 3',
			data: [44, 76, 78, 13, 43],
		},
	]);

	const options2 = {
		chart: {
			height: 350,
			type: 'radar',
			dropShadow: {
				enabled: true,
				blur: 1,
				left: 1,
				top: 1,
			},
		},
		title: {
			text: '내용 정확도 결과',
		},
		stroke: {
			width: 2,
		},
		fill: {
			opacity: 0.1,
		},
		markers: {
			size: 0,
		},
		xaxis: {
			categories: ['오역', '누락', '문법 오류', '발음', '억양'],
		},
	};

	const options3 = {
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

	const options4 = {
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

	
	return (
		<div style={{zIndex:'10'}}>
			<BottomSheet
				open={props.open}
				onDismiss={onClose}
				header={
					<StyledBottomSheetHeader>
						<div className="sheetHeader">교수자 평가결과</div>
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
									type="radar"
									width="500"
								/>
							</ChartInDiv>
							<ChartInDiv>
								<ReactApexChart
									options={options2}
									series={series2}
									type="radar"
									width="500"
								/>
							</ChartInDiv>
						</StyledButtonWrapper>
						<StyledButtonWrapper>
							<Name>학생</Name>
							<NameinputDiv style={{ marginTop: '10px' }}>
								<select
									id="countries"
									class="bg-white-50 border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500"
									onChange={onNameChange}
								>
									{NameOptions.map((item, index) => (
										<option key={index} value={item.value}>
											{item.label}
										</option>
									))}
								</select>
							</NameinputDiv>
						</StyledButtonWrapper>
						<StyledButtonWrapper>
							<ChartInDiv>
								<ReactApexChart
									options={options3}
									series={series3}
									type="bar"
									width="500"
								/>
							</ChartInDiv>
							<ChartInDiv>
								<ReactApexChart
									options={options4}
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
		margin-bottom: 1rem;
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

const NameinputDiv = styled.div`
	flex-grow: 2;
`;

const Name = styled.div`
	margin: 20px;
	flexgrow: 1;
	fontweight: 500;
`;