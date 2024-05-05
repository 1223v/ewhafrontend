import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import styled from "styled-components";
import { Region, WaveForm, WaveSurfer } from "wavesurfer-react";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import LoadingPage from "../LoadingPage/LoadingPage";

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
  const [MusicLoading, setMusicLoading] = useState(false);

  const plugins = useMemo(() => {
    return [
      {
        plugin: RegionsPlugin,
        options: { dragSelection: false }, //드래그로 구간 추가하기
      },
      timelineVis && {
        plugin: TimelinePlugin,
        options: {
          container: "#timeline",
          mediaType: "audio/mpeg", // Specify the audio file type
        },
      },
    ].filter(Boolean);
  }, [timelineVis]);

  // use regions ref to pass it inside useCallback
  // so it will use always the most fresh version of regions list
  const regionsRef = useRef(props.regions);

  useEffect(() => {
    regionsRef.current = props.regions;

    const newRegionsCopy = props.regions.map(({ start, end, id }) => ({
      start: start.toString(),
      end: end.toString(),
      id: id,
    }));
    props.setRegionsCopy(newRegionsCopy);
  }, [props.regions]);

  const regionCreatedHandler = useCallback(
    // 이 함수 문제
    (region) => {
      console.log("region-created --> region:", region);

      if (region.data.systemRegionId) return;
      if (props?.Modregions?.length !== 0) {
        props?.setModregions([]);

        return;
      }
      console.log(props?.Modregions);
      props.setRegions([
        ...regionsRef.current,
        { ...region, data: { ...region.data, systemRegionId: -1 } },
      ]);
    },
    [props?.Modregions, regionsRef]
  );

  const wavesurferRef = useRef();
  const [currentRegion, setCurrentRegion] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간 상태
  const [duration, setDuration] = useState(0); // 전체 오디오 길이 상태
  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;

      if (wavesurferRef.current) {
        console.log(props.soundtrack);
        setMusicLoading(true);
        wavesurferRef.current.load(props.soundtrack);

        wavesurferRef.current.on("region-created", regionCreatedHandler);

        wavesurferRef.current.on("ready", () => {
          console.log("WaveSurfer is ready");
          setMusicLoading(false);
          setDuration(wavesurferRef.current.getDuration()); // 오디오 전체 길이 설정
        });
        wavesurferRef.current.on("region-click", (region) => {
          setCurrentRegion({
            start: region.start,
            end: region.end,
          });
          wavesurferRef.current.play(region.start, region.end);
        });
        wavesurferRef.current.on("audioprocess", () => {
          setCurrentTime(wavesurferRef.current.getCurrentTime()); // 현재 재생 시간 업데이트
        });
        wavesurferRef.current.on("region-removed", (region) => {
          console.log("region-removed --> ", region);
        });

        wavesurferRef.current.on("loading", (data) => {
          console.log("loading --> ", data);
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }
    },
    [regionCreatedHandler, setCurrentRegion, currentRegion, props.soundtrack]
  );

  // 재생 위치 컨트롤러 UI
  const handleSliderChange = (e) => {
    // 문자열 값을 숫자로 변환
    const value = Number(e.target.value);
    // 값이 0과 1 사이인지 확인하고, 그렇지 않다면 에러를 피하기 위해 기본값으로 처리
    const seekTo = value >= 0 && value <= 1 ? value : 0;
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(seekTo);
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    }
  };

  // PlaybackControls 컴포넌트 내에서 슬라이더 입력 요소를 수정
  const PlaybackControls = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
        gap: "10px",
      }}
    >
      <div style={{ minWidth: "60px" }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        value={currentTime / duration || 0}
        onChange={handleSliderChange} // 값 변경을 커밋할 때(예: 마우스를 놓을 때) 호출됩니다.
        style={{ flex: 1, cursor: "pointer" }}
      />
    </div>
  );

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const generateRegion = useCallback(() => {
    //여기 문제. 백에서 값을 받고 다시 값을 넣
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
        id: props.regions.length,
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

  const handleRegionUpdate = useCallback(
    (region, smth) => {
      console.log("regiogion:", region.id);
      const updatedRegions = props.regions.map((regionProps) => {
        console.log("region-update--> region:", regionProps?.id, region.id);
        if (regionProps?.id === region.id) {
          return {
            ...regionProps,
            start: region.start,
            end: region.end,
          };
        }
        return regionProps;
      });

      props.setRegions(updatedRegions);
    },
    [props.regions]
  );
  const playRegion = useCallback((start, end) => {
    //구간재생
    wavesurferRef.current.play(start, end);
    setplaytime(true);
  }, []);
  useEffect(() => {
    if (currentRegion) {
      wavesurferRef.current.on("seek", () => {
        const currentTime = wavesurferRef.current.getCurrentTime();
        if (
          currentRegion &&
          currentTime > currentRegion.start &&
          currentTime < currentRegion.end
        ) {
          wavesurferRef.current.play(currentTime, currentRegion.end);
        }
      });
    }
  }, [currentRegion]);
  const options = {
    waveColor: "#bcc4bd",
    progressColor: "#05422b",
    cursorColor: "transparent",
    barWidth: 3,
    barGap: 3,
    barRadius: 3,
    responsive: true,
    normalize: true,
    partialRender: true,
  };

  return (
    <div>
      {MusicLoading ? <LoadingPage /> : null}
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
      <PlaybackControls />
      <Buttons>
        <Regionbutton onClick={generateRegion}>+ 구간 추가하기</Regionbutton>
        <Button
          onClick={() => {
            setplaytime(!playtime);
            play();
          }}
        >
          {playtime ? (
            <FaRegPauseCircle size="40" />
          ) : (
            <FaRegPlayCircle size="40" />
          )}
        </Button>
        <Regionbutton onClick={removeLastRegion}>- 구간 지우기</Regionbutton>
        <br />
        {props.regions.map((region, index) => (
          <Regionbutton2
            key={region.id}
            onClick={() => playRegion(region.start, region.end)}
            style={{
              backgroundColor: region.color,
              color: "black",
            }}
          >
            구간 {index + 1} 들어보기
          </Regionbutton2>
        ))}
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
  color: #14532d;
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

const Regionbutton2 = styled.button`
  height: 2.3rem;
  width: 120px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin: 20px 60px 0px 60px;
  border-color: transparent;
`;
