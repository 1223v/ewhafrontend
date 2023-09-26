import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from 'react-icons/fa';
import { Select , Slider  } from 'antd';

function OriginAudioplay(props) {
	const Options = [
							{
								value: 'HangZhou',
								label: '구간 1',
							},
							{
								value: 'NingBo',
								label: '구간 2',
							},
							{
								value: 'WenZhou',
								label: '구간 3',
							},
						];
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
		waveColor: 'rgb(5, 66, 43,0.5)', // 물결 색상
		progressColor: '#05422b', // 재생된 부분의 색상
		cursorColor: 'transparent',
		barWidth: 2, // 웨이브 폼의 바 너비
		barGap: 2,
		barRadius: 3,
		responsive: true,
		height: 35,
		normalize: true,

		//partialRender: true,
	};

	return (
		<div>
			<WavesurferDiv>
				<WaveSurfer key={waveformKey} onMount={handleWSMount}>
					<WaveForm id="waveform2" {...options}></WaveForm>
				</WaveSurfer>
				
			</WavesurferDiv>
			<MusicDiv>
				<MusicSelectDiv>
					<Select
						defaultValue="HangZhou"
						style={{ width: 120 }}
						dropdownMatchSelectWidth={false}
						placement="topLeft"
						options={Options}
					/>
				</MusicSelectDiv>

				<PlayBarDiv>
					<StartBtn>
						<FaFastBackward size="20" />
					</StartBtn>
					<StartBtn>
						<FaPlay size="20" />
					</StartBtn>
					<StartBtn>
						<FaFastForward size="20" />
					</StartBtn>
				</PlayBarDiv>

				<VolumnDiv>
					<Slider defaultValue={30} />
				</VolumnDiv>
			</MusicDiv>
		</div>
	);
}

export default OriginAudioplay;

const WavesurferDiv = styled.div`
	background-color: rgba(5, 66, 43, 0.2);
	width: 100%;
	text-align: center;
	margin: 0 auto;
	display:flex;
`;

const PlayBarDiv = styled.div`
	background-color: none;
	width: 300px;
	text-align: center;
	margin: 0 auto;
	display: flex;
`;

const VolumnDiv = styled.div`
	background-color: none;
	width: 100px;
	text-align: center;
	margin: 0 auto;
	padding-top: 20px;
`;

const MusicSelectDiv = styled.div`
	background-color: none;
	width: 100px;
	text-align: center;
	margin: 0 auto;
	display: flex;
	padding-top: 13px;
`;

const MusicDiv = styled.div`
	background-color: none;
	width: 100%
	text-align: center;
	margin: 0 auto;
	display: flex;
`;

const StartBtn = styled.button`
	border: 0;
	outline: 0;
	background: none;
	margin: 0 auto;
	padding-top: 20px;
`;