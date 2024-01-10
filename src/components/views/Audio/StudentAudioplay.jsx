import { Select, Slider, message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import styled from "styled-components";
import { WaveForm, WaveSurfer } from "wavesurfer-react";
import { API_URL } from "../../Config";
import LoadingPage from "../LoadingPage/LoadingPage";

function StudentAudioplay(props) {
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
    // 선택된 value와 일치하는 인덱스를 찾습니다.
    const selectedIndex = props.StudentAudio.findIndex(
      (option) => option.value === value
    );

    // 선택된 인덱스를 출력합니다.
    // 만약 일치하는 항목이 없으면 selectedIndex는 -1이 됩니다.
    console.log("Selected index:", props.OriginAudio[selectedIndex].value);
    props.setOriginSelectAudio(
      `${API_URL}${props.OriginAudio[selectedIndex].value}`
    );
    props.setSelectAudio(`${API_URL}${value}`);
    //props.setSynchronization(false);
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
        //이벤트 핸들러 추가
        wavesurferRef.current.on("seek", () => {
          props.setSynchronizationMove(wavesurferRef.current.getCurrentTime());
        });
      }
    },
    [props.SelectAudio]
  );

  const play = useCallback(() => {
    if (wavesurferRef.current.getDuration() === 0) {
      message.error("음원을 선택해주세요.");
    } else {
      if (props.Synchronization) {
        props.setSynchronizationPlay(true);
      }
      wavesurferRef.current.playPause();

      // 약간의 지연 후에 재생 상태를 체크합니다.
      setTimeout(() => {
        const isPlaying = wavesurferRef.current.isPlaying();
        setPlayStopStatus(isPlaying);
      }, 100);
      console.log("// 약간의 지연 후에 재생 상태를 체크합니다.");
    }
  }, [props.SelectAudio, props.Synchronization]);

  // 10초 뒤로 건너뛰기
  const skipBackward = useCallback(() => {
    if (wavesurferRef.current) {
      if (props.Synchronization) {
        props.setSynchronizationskipBackward(true);
      }
      wavesurferRef.current.skipBackward(10);
    }
  }, [props.Synchronization]);

  // 10초 앞으로 건너뛰기
  const skipForward = useCallback(() => {
    if (wavesurferRef.current) {
      if (props.Synchronization) {
        props.setSynchronizationskipForward(true);
      }
      wavesurferRef.current.skipForward(10);
    }
  }, [props.Synchronization]);

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
          <WaveForm id="waveform2" {...options}></WaveForm>
        </WaveSurfer>
      </WavesurferDiv>
      <MusicDiv>
        <MusicSelectDiv>
          <Select
            style={{ width: 120 }}
            placement="topLeft"
            options={props.StudentAudio}
            onChange={AudioChange}
            placeholder="녹음 선택"
            value={props.SelectAudio.label}
          />
        </MusicSelectDiv>

        <PlayBarDiv>
          <StartBtn onClick={skipBackward}>
            <TbRewindBackward10 size="23" />
          </StartBtn>
          <StartBtn onClick={play}>
            {PlayStopStatus ? <FaPause size="20" /> : <FaPlay size="20" />}
          </StartBtn>
          <StartBtn onClick={skipForward}>
            <TbRewindForward10 size="23" />
          </StartBtn>
        </PlayBarDiv>

        <VolumnDiv>
          <Slider defaultValue={volume * 100} onChange={handleVolumeChange} />
        </VolumnDiv>
      </MusicDiv>
    </div>
  );
}

export default StudentAudioplay;

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
