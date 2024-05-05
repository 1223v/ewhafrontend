import styled from "styled-components";

const FileRead = (props) => {
  const handleChange = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      props.setTxtreads(fileReader.result);
    };
    fileReader.readAsText(file);
  };

  const onTextRead = (e) => {
    props.setTxtreads(e.target.value);
  };

  return (
    <FileReadDiv>
      <input
        className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-green-900 file:text-white
      hover:file:bg-green-900"
        onChange={handleChange}
        id="formFile"
        type="file"
        accept=".txt"
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        TXT (MAX. 800x400px).
      </p>
      <Txtarea
        placeholder="여기에 입력하세요"
        value={props.Txtreads}
        onChange={onTextRead}
        cols="30"
        rows="15"
      ></Txtarea>
    </FileReadDiv>
  );
};

export default FileRead;

const Txtarea = styled.textarea`
  width: 100%;
  margin: 0px 0px 100px 0px;
  border: none;
  resize: none;
`;

const FileReadDiv = styled.div`
  margin: 10px;
`;
