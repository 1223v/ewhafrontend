import React, { useCallback, useRef, useState } from 'react';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import styled from 'styled-components';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';

function Audioplay(props) {
	const wavesurferRef = useRef();
	const [playtime, setplaytime] = useState(false);
	const handleWSMount = useCallback((waveSurfer) => {
		wavesurferRef.current = waveSurfer;
		if (wavesurferRef.current) {
			wavesurferRef.current.load(
				'https://edu-trans.ewha.ac.kr:8443/upload/48bcf449-9e2d-4bb3-a76c-87bba136bd8c.wav'
			);
		}
	}, []);
	const play = useCallback(() => {
		wavesurferRef.current.playPause();
	}, []);
	const options = {
		waveColor: 'gray',
		progressColor: '#05422b',
		cursorColor: 'transparent',
		barWidth: 3,
		barGap: 3,
		barRadius: 3,
		responsive: true,
		height: 80,
		normalize: true,
		partialRender: true,
	};

	return (
		<div>
			<WaveSurfer onMount={handleWSMount}>
				<WaveForm id="waveform" {...options}></WaveForm>
			</WaveSurfer>

			<Button
				onClick={() => {
					setplaytime(!playtime);
					play();
				}}
				style={{}}
			>
				{playtime ? <FaRegPauseCircle size="40" /> : <FaRegPlayCircle size="40" />}
			</Button>
		</div>
	);
}

export default Audioplay;

const Button = styled.button`
	border: 0;
	background-color: transparent;
	margin-top: 20px;
	color: #14532d;
`;