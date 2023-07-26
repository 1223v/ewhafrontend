import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import styled from 'styled-components';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';

function Audioplay(props) {
	const wavesurferRef = useRef();
	const [playtime, setplaytime] = useState(false);
	const [waveformKey, setWaveformKey] = useState(0);

	const handleWSMount = useCallback(
		(waveSurfer) => {
			wavesurferRef.current = waveSurfer;
			if (wavesurferRef.current && props.Regionmusic) {
				wavesurferRef.current.load(props.Regionmusic);
			}
		},
		[props.Regionmusic]
	);

	const play = useCallback(() => {
		wavesurferRef.current.playPause();
	}, [props.Regionmusic]);

	useEffect(() => {
		if (wavesurferRef.current && props.Regionmusic) {
			wavesurferRef.current.load(props.Regionmusic);
		}
		setWaveformKey((prevKey) => prevKey + 1);
	}, [props.Regionmusic]);

	useEffect(() => {
		if (props.Playmusic) {
			setplaytime(!playtime);
			play();
			props.setPlaymusic(false);
		}
	}, [props.Playmusic]);

	const options = {
		waveColor: 'rgb(5, 66, 43,0.5)',
		progressColor: '#05422b',
		cursorColor: 'transparent',
		barWidth: 3,
		barGap: 3,
		barRadius: 3,
		responsive: true,
		height: 50,
		normalize: true,
		partialRender: true,
	};

	return (
		<div>
			<WaveSurfer key={waveformKey} onMount={handleWSMount}>
				<WaveForm id="waveform" {...options}></WaveForm>
			</WaveSurfer>
			<PlayButton
				onClick={() => {
					setplaytime(!playtime);
					play();
				}}
			>
				{playtime ? <FaRegPauseCircle size="40" /> : <FaRegPlayCircle size="40" />}
			</PlayButton>
		</div>
	);
}

export default Audioplay;

const PlayButton = styled.button`
	border: 0px;
	background-color: transparent;
	color: rgb(20, 83, 45);
	margin: 6px;
`;