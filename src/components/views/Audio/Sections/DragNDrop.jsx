import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styled from 'styled-components';
import Audio from '../Audio';

const fileTypes = ['wav', 'mp3'];

function DragNDrop() {
	const [file, setFile] = useState(null);
	const handleChange = (file) => {
		setFile(file);
	};
	return (
		<div>
			<DragDrop>
				<FileUploader
					multiple={true}
					handleChange={handleChange}
					name="file"
					types={fileTypes}
				/>
				<p>{file ? `File name: ${file[0].name}` : 'no files uploaded yet'}</p>
			</DragDrop>
			<Audio style={{margin: '10px 10px auto'}} />
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
	margin-top: 80px;

	& > label {
		min-width: 450px;
		box-sizing: border-box;
		height: 180px;
	}

	@media screen and (max-width: 768px) {
		& > label {
			min-width: 300px;
			box-sizing: border-box;
		}
	}
`;