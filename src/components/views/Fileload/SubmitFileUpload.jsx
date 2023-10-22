import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import Axios from "axios";
import { API_URL } from "../../Config";
import { useLocation, useNavigate } from "react-router-dom";

const { Dragger } = Upload;

const SubmitFileUpload = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");

  const uploadFileToServer = (file, onSuccess, onError) => {
    const formData = new FormData();
    formData.append("assignment", asNo);
    formData.append("mp3", file);

    Axios.put(`${API_URL}api/stt`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((response) => {
        props.setMusicFile([...props.MusicFile, response.data.file]);
        onSuccess(response);
      })
      .catch((error) => {
        message.error(`${file.name} file upload failed.`);
        onError(error);
      });
  };

  const handleRemove = (file) => {
    // props.MusicFile에서 해당 파일 제거
    const updatedFiles = props.MusicFile.filter(
      (item) => item !== file.response.data.file
    );
    props.setMusicFile(updatedFiles);
  };

  const propsMusic = {
    name: "file",
    customRequest: ({ file, onSuccess, onError }) => {
      uploadFileToServer(file, onSuccess, onError);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        navigate("/");
      }
    },
    onRemove: handleRemove,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...propsMusic} accept=".mp3">
      <p className="ant-upload-drag-icon">
        <InboxOutlined style={{ color: "#05422b" }} />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">과제를 순차적으로 업로드 해주세요.</p>
    </Dragger>
  );
};

export default SubmitFileUpload;
