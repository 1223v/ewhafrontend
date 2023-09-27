import React, { useCallback, useEffect, useRef, useState } from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import styled from "styled-components";
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from "react-icons/fa";
import { Select, Slider, message } from "antd";
import LoadingPage from "../LoadingPage/LoadingPage";
import { API_URL } from "../../Config";


function OriginAudioplay(props) {
    const options = {
        waveColor: "rgb(5, 66, 43,0.5)",
        progressColor: "#05422b",
        cursorColor: "transparent",
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
                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                    setLoading(false);
                });
                wavesurferRef.current.on("finish", () => {
                    console.log("음원이 끝났습니다."); // 원하는 메시지 출력 또는 작업 수행
                    wavesurferRef.current.seekTo(0);
                });
                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data);
                });
            }
        },
        [props.SelectAudio]
    );

    const play = useCallback(() => {
        if (wavesurferRef.current.getDuration() === 0) {
            message.error("음원을 선택해주세요.");
        } else {
            wavesurferRef.current.playPause();

            // 약간의 지연 후에 재생 상태를 체크합니다.
            setTimeout(() => {
                const isPlaying = wavesurferRef.current.isPlaying();
                setPlayStopStatus(isPlaying);
            }, 100);
            console.log("// 약간의 지연 후에 재생 상태를 체크합니다.");
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

    // 선택된 음원이 변경될 때 WaveSurfer를 업데이트합니다.
    useEffect(() => {
        if (wavesurferRef.current && props.SelectAudio) {
            wavesurferRef.current.load(props.SelectAudio);
        }
        setWaveformKey((prevKey) => prevKey + 1);
        console.log("WaveSurfer를 업데이트합니다");
    }, [props.SelectAudio]);

    return (
        <div>
            {Loading ? <LoadingPage /> : null}
            <WavesurferDiv>
                <WaveSurfer key={waveformKey} onMount={handleWSMount}>
                    <WaveForm id="waveform1" {...options}></WaveForm>
                    <div id="timeline" />
                </WaveSurfer>
            </WavesurferDiv>
            <MusicDiv>
                <MusicSelectDiv>
                    <Select
                        style={{ width: 120 }}
                        dropdownMatchSelectWidth={false}
                        placement="topLeft"
                        options={props.OriginAudio}
                        onChange={AudioChange}
                    />
                </MusicSelectDiv>

                <PlayBarDiv>
                    <StartBtn onClick={skipBackward}>
                        <FaFastBackward size="20" />
                    </StartBtn>
                    <StartBtn onClick={play}>{PlayStopStatus ? <FaPause size="20" /> : <FaPlay size="20" />}</StartBtn>
                    <StartBtn onClick={skipForward}>
                        <FaFastForward size="20" />
                    </StartBtn>
                </PlayBarDiv>

                <VolumnDiv>
                    <Slider defaultValue={volume * 100} onChange={handleVolumeChange} />
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
