import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { API_URL } from "../../Config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function FileUpload(props) {
  let navigate = useNavigate();

  const handleChange = (info) => {
    if (info.file.status === "done") {
      message.success("파일이 업로드되었습니다.");
    } else if (info.file.status === "error") {
      message.error("File upload failed.");
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // 여기에서 파일을 서버로 업로드합니다.
      // axios를 사용하여 업로드 요청을 보냅니다.
      const formData = new FormData();
      formData.append("prob_file", file);
      console.log(file);
      const response = await Axios.post(
        `${API_URL}api/prob_upload_file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // 성공적으로 업로드되면 onSuccess를 호출합니다.
      onSuccess(response.data, file);
      props.setFileList(file);
      props.setReferenceFileURL(response.data.file_path);
      props.setReferenceName(response.data.file_name);
    } catch (error) {
      // 업로드에 실패하면 onError를 호출합니다.
      onError(error);
      navigate("/");
    }
  };

  const handleRemove = (file) => {
    props.setFileList(null);
    props.setReferenceFileURL("");
    props.setReferenceName("");
    // 파일 삭제 API 호출 등을 추가할 수 있습니다.
    // 예: Axios.delete(`${API_URL}delete_file/${file.name}`);
  };

  const fileAccept = ".txt,.doc,.docx,.pdf";

  return (
    <Upload
      customRequest={customRequest}
      onChange={handleChange}
      fileList={props.fileList ? [props.fileList] : []}
      showUploadList={true}
      accept={fileAccept}
      onRemove={handleRemove}
    >
      <Button icon={<UploadOutlined />}>파일 업로드</Button>
    </Upload>
  );
}

export default FileUpload;
