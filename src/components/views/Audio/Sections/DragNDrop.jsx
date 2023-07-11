import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styled from 'styled-components';
import Audio from '../Audio';
import Axios from 'axios';

const fileTypes = ['wav', 'mp3'];

function DragNDrop(props) {
	const [Music, setMusic] = useState('');
	
	const handleChange = (fileURL) => {
		// 파일 경로 출력
		console.log('업로드된 파일 경로:', fileURL);
		const formData = new FormData();
    	formData.append('prob_sound', fileURL);
		Axios.post('https://edu-trans.ewha.ac.kr:8443/prob_upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
		})
			.then((response) => {
				const URL = 'https://edu-trans.ewha.ac.kr:8443/' + response.data.file_path;
				setMusic(URL);
				props.setUrlfile(response.data.file_path);
				console.log(URL);
			})
			.catch((error) => {
				console.error('파일 업로드 실패:', error);
			});

		
	};
	return (
		<div>
			<DragDrop>
				<p>
					{Music ? (
						<Audio style={{ margin: '10px 10px auto' }} soundtrack={Music} regions={props.regions} setRegions={props.setRegions}/>
					) : (
						<FileUploader
							multiple={false}
							handleChange={handleChange}
							name="file"
							types={fileTypes}
						/>
					)}
				</p>
			</DragDrop>
		</div>
	);
}

export default DragNDrop;

const DragDrop = styled.div`
	font-family: sans-serif;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& > label {
		min-width: 450px;
		box-sizing: border-box;
		height: 180px;
	}

	@media screen and (max-width: 768px) {
		& > label {
			min-width: auto;
			box-sizing: border-box;
		}
	}
`;