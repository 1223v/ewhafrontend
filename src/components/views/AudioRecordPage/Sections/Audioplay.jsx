import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import styled from 'styled-components';

function Audioplay(props) {
	const wavesurferRef = useRef();
	const [waveformKey, setWaveformKey] = useState(0);

	const handleWSMount = useCallback(
		(waveSurfer) => {
			wavesurferRef.current = waveSurfer;
			if (wavesurferRef.current && props.Regionmusic) {
				wavesurferRef.current.load(props.Regionmusic);
				wavesurferRef.current.on('ready', () => {
					console.log('WaveSurfer is ready');
					props.setWaveSuferLoading(true);
				});
				wavesurferRef.current.on('finish', () => {
					console.log('음원이 끝났습니다.'); // 원하는 메시지 출력 또는 작업 수행
					props.setEndmusic(true);
					props.setMusicLoading(false);
				});
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
		if (!props.MusicLoading && props.Regionmusic) {
			play();
			props.setMusicLoading(true);
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
		<WavesurferDiv>
			<WaveSurfer key={waveformKey} onMount={handleWSMount}>
				<WaveForm id="waveform" {...options}></WaveForm>
			</WaveSurfer>
		</WavesurferDiv>
	);
}

export default Audioplay;

const WavesurferDiv = styled.div`
	background-color: rgba(5, 66, 43, 0.2);
	pointer-events: none;
	width: 100%;
	text-align: center;
	margin: 0 auto;
`;