import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "./contexts/MainContext.js";
import AudioAnalyser from "react-audio-analyser";
import RecordButton from "./RecordButton.js";

export default function AudioRecorderFunc(props) {
  const { audioURL, setAudioURL, setAudioExtension } = useContext(MainContext);
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");

  const controlAudio = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    setAudioExtension(audioType.replace("audio/", ""));
  }, []);

  useEffect(() => {
    setAudioExtension(audioType.replace("audio/", ""));
  }, [setAudioExtension, audioType]);

  const toggleRecording = () => {
    status === "recording"
      ? controlAudio("inactive")
      : controlAudio("recording");
  };
  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      console.log("succ stop", e);
      setAudioURL(window.URL.createObjectURL(e));
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    }
  };
  return (
    <div style={{ margin: '10px'}}>
      <AudioAnalyser {...audioProps} width='290'>
        <div className="btn-box">
          <RecordButton id="recordButton" onClick={() => toggleRecording()}/>
        </div>
      </AudioAnalyser>
    </div>
  );
}
