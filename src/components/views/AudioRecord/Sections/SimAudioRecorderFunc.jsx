import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "./MainContext";
import AudioAnalyser from "react-audio-analyser";
import RecordButton from "./RecordButton";
import Axios from "axios";
import { API_URL } from "../../../Config";

export default function AudioRecorderFunc(props) {
    const { audioURL, setAudioURL, setAudioExtension } = useContext(MainContext);
    const [status, setStatus] = useState("");
    const [audioSrc, setAudioSrc] = useState("");
    const [audioType, setAudioType] = useState("audio/mp3");
    const [shouldHide, setshouldHide] = useState(false);

    const controlAudio = (status) => {
        setStatus(status);
    };

    const toggleRecording = () => {
        status === "recording" ? controlAudio("inactive") : controlAudio("recording");
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
            formData.append("assignment", props.Assignmentnum);
            formData.append("mp3", e);
            Axios.put(`${API_URL}stt`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
                .then((response) => {
                    alert("임시저장되었습니다.");
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
    };

    const onRecordCheck = () => {
        toggleRecording();
        setshouldHide(false);
    };

    useEffect(() => {
        setAudioExtension(audioType.replace("audio/", ""));
    }, []);

    useEffect(() => {
        setAudioExtension(audioType.replace("audio/", ""));
    }, [setAudioExtension, audioType]);

    useEffect(() => {
        if (props.Startmusic && props.Disable === props.region_index) {
            toggleRecording();
            props.setStartmusic(false);
            setshouldHide(true);
            console.log("녹음 시작");
        }
    }, [props.Startmusic]);

    return (
        <div style={{ margin: "10px" }}>
            <AudioAnalyser {...audioProps} width="290">
                {shouldHide && (
                    <div className="btn-box">
                        <RecordButton id="recordButton" onClick={onRecordCheck} />
                    </div>
                )}
            </AudioAnalyser>
        </div>
    );
}
