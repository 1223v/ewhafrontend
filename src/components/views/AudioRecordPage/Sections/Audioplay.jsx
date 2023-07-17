import React, { useCallback, useRef } from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";


function Audioplay() {
  const wavesurferRef = useRef();
  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current) {
      wavesurferRef.current.load("https://edu-trans.ewha.ac.kr:8443/upload/48bcf449-9e2d-4bb3-a76c-87bba136bd8c.wav");
    }
  }, []);
  const play = useCallback(() => {
    wavesurferRef.current.playPause();
  }, []);
  const options = {
    waveColor: "#fff",
    progressColor: "#05422b",
    cursorColor: "transparent",
    barWidth: 3,
    barGap: 3,
    barRadius: 3,
    responsive: true,
    height: 27,
    normalize: true,
    partialRender: true
  };

  return (
    <div>
      <WaveSurfer onMount={handleWSMount}>
        <WaveForm id="waveform" {...options}></WaveForm>
      </WaveSurfer>

      <button onClick={play}>Play / Pause</button>
    </div>
  );
}


export default Audioplay;