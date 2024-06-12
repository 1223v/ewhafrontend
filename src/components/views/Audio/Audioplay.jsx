import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { WaveForm, WaveSurfer } from "wavesurfer-react";

function Audioplay(props) {
  const wavesurferRef = useRef();
  const [playtime, setplaytime] = useState(false);
  const [waveformKey, setWaveformKey] = useState(0);

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      if (wavesurferRef.current && props.Regionmusic) {
        wavesurferRef.current.load(props.Regionmusic);
        wavesurferRef.current.on("finish", () => {});
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
    waveColor: "rgb(5, 66, 43,0.5)",
    progressColor: "#05422b",
    cursorColor: "transparent",
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
