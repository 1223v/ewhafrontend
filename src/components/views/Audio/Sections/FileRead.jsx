import React, { useState } from 'react';
import styled from 'styled-components';

const FileRead = (props) => {
	const [Txtread, setTxtread] = useState('');
	const handleChange = (e) => {
		let file = e.target.files[0];
		let fileReader = new FileReader();
		fileReader.onload = () => {
			console.log(fileReader.result);
			props.setTxtreads(fileReader.result);
		};
		fileReader.readAsText(file);
	};

	return (
		<div style={{ margin : '10px' }}>
			<input
				class="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-green-800 file:text-white
      hover:file:bg-green-800"
				onChange={handleChange}
				id="formFile"
				type="file"
			/>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
				SVG, PNG, JPG or GIF (MAX. 800x400px).
			</p>
			<Txtarea
				placeholder="여기에 입력하세요"
				value={props.Txtreads}
				cols="30"
				rows="8"
				readonly
			></Txtarea>
		</div>
	);
};

export default FileRead;

const Txtarea = styled.textarea`
	width: 90%;

	margin: 10px;
	border: none;
	resize: none;
`;