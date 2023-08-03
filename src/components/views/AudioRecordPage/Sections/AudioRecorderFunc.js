import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from './contexts/MainContext.js';
import AudioAnalyser from 'react-audio-analyser';
import RecordButton from './RecordButton.js';
import Axios from 'axios';

export default function AudioRecorderFunc(props) {
	const { audioURL, setAudioURL, setAudioExtension } = useContext(MainContext);
	const [status, setStatus] = useState('');
	const [audioSrc, setAudioSrc] = useState('');
	const [audioType, setAudioType] = useState('audio/wav');
	const [shouldHide, setshouldHide] = useState(false);

	const controlAudio = (status) => {
		setStatus(status);
	};

	useEffect(() => {
		setAudioExtension(audioType.replace('audio/', ''));
	}, []);

	useEffect(() => {
		setAudioExtension(audioType.replace('audio/', ''));
	}, [setAudioExtension, audioType]);

	const toggleRecording = () => {
		status === 'recording' ? controlAudio('inactive') : controlAudio('recording');
	};
	const audioProps = {
		audioType,
		status,
		audioSrc,
		timeslice: 1000,
		startCallback: (e) => {
			console.log('succ start', e);
		},
		pauseCallback: (e) => {
			console.log('succ pause', e);
		},
		stopCallback: (e) => {
			setAudioSrc(window.URL.createObjectURL(e));
			console.log('succ stop', e);
			setAudioURL(window.URL.createObjectURL(e));
			const formData = new FormData();
			formData.append('assignment', props.Assignmentnum);
			formData.append('wav', e);
			Axios.put('https://edu-trans.ewha.ac.kr:8443/stt', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			})
				.then((response) => {
					alert("임시저장되었습니다.");
					props.setSubmitlist(response.data.file);
				})
				.catch((error) => {
					console.error('파일 업로드 실패:', error);
				});
		},
		onRecordCallback: (e) => {
			console.log('recording', e);
		},
		errorCallback: (err) => {
			console.log('error', err);
		},
	};

	return (
		<div style={{ margin: '10px' }}>
			<AudioAnalyser {...audioProps} width="290">
				<div className="btn-box" style={{ display: shouldHide ? 'none' : 'block' }}>
					<RecordButton id="recordButton" onClick={() => toggleRecording()} setshouldHide={setshouldHide}/>
				</div>
			</AudioAnalyser>
		</div>
	);
}