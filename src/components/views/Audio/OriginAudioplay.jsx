import { Checkbox, Slider, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaFastBackward, FaFastForward, FaPause, FaPlay } from 'react-icons/fa';
import styled from 'styled-components';
import { WaveForm, WaveSurfer } from 'wavesurfer-react';
import { API_URL } from '../../Config';
import LoadingPage from '../LoadingPage/LoadingPage';

function OriginAudioplay(props) {
    const options = {
        waveColor: 'rgb(5, 66, 43,0.5)',
        progressColor: '#05422b',
        cursorColor: 'transparent',
        barWidth: 1,
        barGap: 1,
        barRadius: 3,
        responsive: true,
        height: 35,
        normalize: true,
        partialRender: true,
    };
    const wavesurferRef = useRef();
    const [waveformKey, setWaveformKey] = useState(0);
    const [Loading, setLoading] = useState(false); // 로딩 페이지
    const [PlayStopStatus, setPlayStopStatus] = useState(false); // 시작, 정지버튼 상태
    const [volume, setVolume] = useState(0.5); // 음원의 볼륨

    // 선택된 오디오로 변경
    const AudioChange = (value) => {
        props.setSelectAudio(`${API_URL}${value}`);
    };

    const handleWSMount = useCallback(
        (waveSurfer) => {
            wavesurferRef.current = waveSurfer;
            if (wavesurferRef.current && props.SelectAudio) {
                setLoading(true);
                wavesurferRef.current.load(props.SelectAudio);
                wavesurferRef.current.on('ready', () => {
                    console.log('WaveSurfer is ready');
                    setLoading(false);
                });
                wavesurferRef.current.on('finish', () => {
                    console.log('음원이 끝났습니다.'); // 원하는 메시지 출력 또는 작업 수행
                    wavesurferRef.current.seekTo(0);
                });
                wavesurferRef.current.on('loading', (data) => {
                    console.log('loading --> ', data);
                });
            }
        },
        [props.SelectAudio]
    );

    const play = useCallback(() => {
        if (wavesurferRef.current.getDuration() === 0) {
            message.error('음원을 선택해주세요.');
        } else {
            wavesurferRef.current.playPause();

            // 약간의 지연 후에 재생 상태를 체크합니다.
            setTimeout(() => {
                const isPlaying = wavesurferRef.current.isPlaying();
                setPlayStopStatus(isPlaying);
            }, 100);
            console.log('// 약간의 지연 후에 재생 상태를 체크합니다.');
        }
    }, [props.SelectAudio]);

    // 10초 뒤로 건너뛰기
    const skipBackward = useCallback(() => {
        if (wavesurferRef.current) {
            wavesurferRef.current.skipBackward(10);
        }
    }, []);

    // 10초 앞으로 건너뛰기
    const skipForward = useCallback(() => {
        if (wavesurferRef.current) {
            wavesurferRef.current.skipForward(10);
        }
    }, []);

    // 볼륨 변경 핸들러를 추가
    const handleVolumeChange = (value) => {
        setVolume(value / 100); // Slider의 값은 0에서 100 사이입니다. 볼륨은 0과 1 사이의 값이어야 합니다.
        if (wavesurferRef.current) {
            wavesurferRef.current.setVolume(value / 100);
        }
    };

    const onSynchronizationChange = (e) => {
        if (e.target.checked) {
            message.info('원본과 녹음본이 동기화됩니다.');
            props.setSynchronization(true);
        } else {
            message.info('원본과 녹음본이 비동기화됩니다.');
            props.setSynchronization(false);
        }
    };

    // 선택된 음원이 변경될 때 WaveSurfer를 업데이트합니다.
    useEffect(() => {
        if (wavesurferRef.current && props.SelectAudio) {
            wavesurferRef.current.load(props.SelectAudio);
        }
        setWaveformKey((prevKey) => prevKey + 1);
        console.log('WaveSurfer를 업데이트합니다');
    }, [props.SelectAudio]);

    // 동기화
    useEffect(() => {
        if (props.SynchronizationPlay) {
            wavesurferRef.current.playPause();
            setTimeout(() => {
                const isPlaying = wavesurferRef.current.isPlaying();
                setPlayStopStatus(isPlaying);
            }, 100);
            props.setSynchronizationPlay(false);
        }
    }, [props.SynchronizationPlay]);

    useEffect(() => {
        if (props.SynchronizationskipForward && wavesurferRef.current) {
            wavesurferRef.current.skipForward(10);
            props.setSynchronizationskipForward(false);
        }
    }, [props.SynchronizationskipForward]);

    useEffect(() => {
        if (props.SynchronizationskipBackward) {
            wavesurferRef.current.skipBackward(10);
            props.setSynchronizationskipBackward(false);
        }
    }, [props.SynchronizationskipBackward]);

    useEffect(() => {
        if (props.SynchronizationMove && props.Synchronization) {
            const newPosition =
                props.SynchronizationMove / wavesurferRef.current.getDuration();

            if (newPosition > 1) {
                // 1보다 큰 경우는 전체 음원의 길이를 넘어서는 경우입니다.
                wavesurferRef.current.seekTo(0); // 위치를 0으로 변경합니다.
                message.info('음원이 끝났습니다. 동기화를 해제합니다.');
                props.setSynchronization(false);
            } else {
                wavesurferRef.current.seekTo(newPosition); // 그렇지 않은 경우 계산된 위치로 변경합니다.
            }
        }
    }, [props.SynchronizationMove]);
    return (
        <div>
            {Loading ? <LoadingPage /> : null}
            <WavesurferDiv Synchronization={props.Synchronization}>
                <WaveSurfer key={waveformKey} onMount={handleWSMount}>
                    <WaveForm id="waveform1" {...options}></WaveForm>
                </WaveSurfer>
            </WavesurferDiv>
            <MusicDiv>
                <MusicSelectDiv>
                    {/* <Select
            style={{ width: 120 }}
            dropdownMatchSelectWidth={false}
            placement="topLeft"
            options={props.OriginAudio}
            onChange={AudioChange}
            placeholder="원본 선택"
            value={props.SelectAudio.label}
          /> */}
                    <Checkbox
                        onChange={onSynchronizationChange}
                        checked={props.Synchronization}
                    >
                        음원
                        <br />
                        동기화
                    </Checkbox>
                </MusicSelectDiv>

                {!props.Synchronization && (
                    <PlayBarDiv>
                        <StartBtn onClick={skipBackward}>
                            <FaFastBackward size="20" />
                        </StartBtn>
                        <StartBtn onClick={play}>
                            {PlayStopStatus ? (
                                <FaPause size="20" />
                            ) : (
                                <FaPlay size="20" />
                            )}
                        </StartBtn>
                        <StartBtn onClick={skipForward}>
                            <FaFastForward size="20" />
                        </StartBtn>
                    </PlayBarDiv>
                )}
                <VolumnDiv>
                    <Slider
                        defaultValue={volume * 100}
                        onChange={handleVolumeChange}
                    />
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
    height: 35px;
    wave {
        overflow: hidden !important;
    }
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
