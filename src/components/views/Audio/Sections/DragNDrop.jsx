import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styled from 'styled-components';
import Audio from '../Audio';

const fileTypes = ['wav', 'mp3'];

function DragNDrop(props) {
	
	const handleChange = (fileURL) => {
		

		// 파일 경로 출력
		console.log('업로드된 파일 경로:', fileURL);
		props.setUrlfile(URL.createObjectURL(fileURL));
	};
	return (
		<div>
			<DragDrop>
				<p>
					{props.Urlfile ? (
						<Audio style={{ margin: '10px 10px auto' }} soundtrack={props.Urlfile} />
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