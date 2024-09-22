import { message } from "antd";
import Axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioAnalyser from "react-audio-analyser";
import { useLocation } from "react-router-dom";
import MP from "../../../../assets/sound/MP.mp3";
import EffectSound from "../../../../util/EffectSound";
import { API_URL } from "../../../Config";
import { MainContext } from "./MainContext";
import RecordButton from "./RecordButton";

export default function SimAudioRecorderFunc(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const { audioURL, setAudioURL, setAudioExtension } = useContext(MainContext);
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/mp3");
  const [shouldHide, setShouldHide] = useState(false);
  const audioContextRef = useRef(null);
  const recorderDestinationRef = useRef(null);

  // Web Audio API 설정
  useEffect(() => {
    const initializeAudioContext = async () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      recorderDestinationRef.current = audioContextRef.current.createMediaStreamDestination();

      // 마이크 스트림을 미리 활성화
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,      // 에코 제거
            noiseSuppression: true,      // 노이즈 억제
            autoGainControl: false       // 자동 이득 제어(AGC) 비활성화
          }
        });

        const microphone = audioContextRef.current.createMediaStreamSource(stream);

        // 마이크 볼륨 조절용 GainNode
        const micGain = audioContextRef.current.createGain();
        micGain.gain.value = 1.5; // 마이크 입력 볼륨 증폭

        // Notch 필터 적용 (특정 주파수 대역 제거)
        const notchFilter = audioContextRef.current.createBiquadFilter();
        notchFilter.type = 'notch';
        notchFilter.frequency.value = 440; // 필요에 따라 음원 주파수에 맞춰 설정
        notchFilter.Q.value = 10; // 필터 대역폭 설정

        // Lowpass 필터 추가 (고주파수 제거)
        const lowpassFilter = audioContextRef.current.createBiquadFilter();
        lowpassFilter.type = 'lowpass';
        lowpassFilter.frequency.value = 1000; // 필요에 따라 조정

        // Compressor 추가 (다이내믹 레인지 압축)
        const compressor = audioContextRef.current.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-50, audioContextRef.current.currentTime); // 클리핑 방지
        compressor.knee.setValueAtTime(40, audioContextRef.current.currentTime); // 부드러운 압축
        compressor.ratio.setValueAtTime(12, audioContextRef.current.currentTime); // 압축 비율
        compressor.attack.setValueAtTime(0, audioContextRef.current.currentTime); // 빠른 반응 시간
        compressor.release.setValueAtTime(0.25, audioContextRef.current.currentTime); // 빠른 해제 시간

        // 마이크 -> Notch 필터 -> Lowpass 필터 -> Compressor -> Gain -> 녹음 스트림
        microphone.connect(notchFilter);
        notchFilter.connect(lowpassFilter);
        lowpassFilter.connect(compressor);
        compressor.connect(micGain);
        micGain.connect(recorderDestinationRef.current); // 녹음 스트림으로 연결
      } catch (error) {
        console.error('마이크 입력을 가져오는 데 실패했습니다:', error);
      }
    };

    initializeAudioContext();
  }, []);

  const Mp = EffectSound(MP, 1);

  const controlAudio = (status) => {
    setStatus(status);
  };

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

      const formData = new FormData();
      formData.append("assignment", asNo);
      formData.append("mp3", e);
      Axios.put(`${API_URL}api/stt`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((response) => {
          message.success("임시저장 완료");
          props.setSubmitlist(response.data.file);
          props.setTemporarySubmitCheck(true);
        })
        .catch((error) => {
          console.error("파일 업로드 실패:", error);
        });
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
    // recorderDestinationRef.current가 null이 아닌지 확인
    mediaStream: recorderDestinationRef.current ? recorderDestinationRef.current.stream : null 
  };

  const onRecordCheck = () => {
    if (recorderDestinationRef.current) {
      toggleRecording();
      setShouldHide(false);
      props.setLoading(true);
    } else {
      console.error("Recorder is not ready yet.");
    }
  };

  useEffect(() => {
    setAudioExtension(audioType.replace("audio/", ""));
  }, [setAudioExtension, audioType]);

  useEffect(() => {
    if (props.Startmusic && props.Disable === props.region_index) {
      if (recorderDestinationRef.current) {
        toggleRecording();
        props.setStartmusic(false);
        setShouldHide(true);
        console.log("녹음 시작");
        Mp.play();
      } else {
        console.error("Recorder is not ready yet.");
      }
    }
  }, [props.Startmusic]);

  return (
    <div style={{ margin: "10px" }}>
      <AudioAnalyser {...audioProps} width={290}>
        {shouldHide && (
          <div className="btn-box">
            <RecordButton id="recordButton" onClick={onRecordCheck} />
          </div>
        )}
      </AudioAnalyser>
    </div>
  );
}
