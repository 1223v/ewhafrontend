import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { WaveSurfer, WaveForm, Region, Marker } from 'wavesurfer-react';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';

//https://velog.io/@seorim0801/react%EB%A1%9C-%EC%9D%8C%EC%84%B1-%EB%85%B9%EC%9D%8C-%EA%B8%B0%EB%8A%A5%EC%9D%84-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90

function generateNum(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function generateTwoNumsWithDistance(distance, min, max) {
	const num1 = generateNum(min, max);
	const num2 = generateNum(min, max);
	// if num2 - num1 < 10
	if (num2 - num1 >= 10) {
		return [num1, num2];
	}
	return generateTwoNumsWithDistance(distance, min, max);
}

function Audio(props) {
	const [timelineVis, setTimelineVis] = useState(true);
	const [playtime, setplaytime] = useState(false);

	const plugins = useMemo(() => {
		return [
			{
				plugin: RegionsPlugin,
				options: { dragSelection: false },//드래그로 구간 추가하기
			},
			timelineVis && {
				plugin: TimelinePlugin,
				options: {
					container: '#timeline',
				},
			},
		].filter(Boolean);
	}, [timelineVis]);

	

	// use regions ref to pass it inside useCallback
	// so it will use always the most fresh version of regions list
	const regionsRef = useRef(props.regions);

	useEffect(() => {
		regionsRef.current = props.regions;
		const newRegionsCopy = props.regions.map(({ start, end }, index) => ({ start, end, index }));
		props.setRegionsCopy(newRegionsCopy);
		
	}, [props.regions]);

	const regionCreatedHandler = useCallback(
		(region) => {
			console.log('region-created --> region:', region);

			if (region.data.systemRegionId) return;

			props.setRegions([
				...regionsRef.current,
				{ ...region, data: { ...region.data, systemRegionId: -1 } },
			]);
		},
		[regionsRef]
	);

	const wavesurferRef = useRef();
	const handleWSMount = useCallback(
		(waveSurfer) => {
			wavesurferRef.current = waveSurfer;

			if (wavesurferRef.current) {
				console.log(props.soundtrack);
				wavesurferRef.current.load(props.soundtrack);

				wavesurferRef.current.on('region-created', regionCreatedHandler);

				wavesurferRef.current.on('ready', () => {
					console.log('WaveSurfer is ready');
				});

				wavesurferRef.current.on('region-removed', (region) => {
					console.log('region-removed --> ', region);
				});

				wavesurferRef.current.on('loading', (data) => {
					console.log('loading --> ', data);
				});

				if (window) {
					window.surferidze = wavesurferRef.current;
				}
			}
		},
		[regionCreatedHandler]
	);

	const generateRegion = useCallback(() => {
		if (!wavesurferRef.current) return;
		const minTimestampInSeconds = 0;
		const maxTimestampInSeconds = wavesurferRef.current.getDuration();
		const distance = generateNum(0, 10);
		const [min, max] = generateTwoNumsWithDistance(
			distance,
			minTimestampInSeconds,
			maxTimestampInSeconds
		);

		const r = generateNum(0, 255);
		const g = generateNum(0, 255);
		const b = generateNum(0, 255);

		props.setRegions([
			...props.regions,
			{
				id: `custom-${generateNum(0, 9999)}`,
				start: min,
				end: max,
				color: `rgba(${r}, ${g}, ${b}, 0.5)`,
			},
		]);
	}, [props.regions, wavesurferRef]);

	const removeLastRegion = useCallback(() => {
		let nextRegions = [...props.regions];

		nextRegions.pop();

		props.setRegions(nextRegions);
	}, [props.regions]);

	const play = useCallback(() => {
		wavesurferRef.current.playPause();
	}, []);

	const handleRegionUpdate = useCallback((region, smth) => {
		console.log('region-update-end --> region:', region.element.title);
		console.log(smth);
	}, []);

	const options = {
		waveColor: '#bcc4bd',
		progressColor: '#05422b',
		cursorColor: 'transparent',
		barWidth: 3,
		barGap: 3,
		barRadius: 3,
		responsive: true,
		normalize: true,
		partialRender: true,
	};

	return (
		<div className="App">
			<WaveSurfer plugins={plugins} onMount={handleWSMount}>
				<WaveForm id="waveform" cursorColor="transparent" {...options}>
					{props.regions.map((regionProps) => (
						<Region
							onUpdateEnd={handleRegionUpdate}
							key={regionProps.id}
							{...regionProps}
						></Region>
					))}
				</WaveForm>
				<div id="timeline" />
			</WaveSurfer>
			<Buttons>
				<Regionbutton onClick={generateRegion}>+ 구간 추가하기</Regionbutton>
				<Button
					onClick={() => {
						setplaytime(!playtime);
						play();
					}}
					style={{}}
				>
					{playtime ? <FaRegPauseCircle size="40" /> : <FaRegPlayCircle size="40" />}
				</Button>
				<Regionbutton onClick={removeLastRegion}>- 구간 지우기</Regionbutton>
			</Buttons>
		</div>
	);
}

export default Audio;

const Buttons = styled.div`
	display: inline-block;
`;

const Button = styled.button`
	border: 0;
	background-color: transparent;
	margin-top: 20px;
	color: #14532D;
`;

const Regionbutton = styled.button`
	height: 2.3rem;
	width: 120px;
	font-size: 0.875rem;
	font-weight: 500;
	border-radius: 0.5rem;
	margin: 20px 60px 0px 60px;
	color: rgb(255, 255, 255);
	background-color: rgb(46, 70, 47);
	border-color: transparent;
`;