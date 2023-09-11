import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { API_URL } from "../../Config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FileUpload(props) {
    let navigate = useNavigate();
    const [fileList, setFileList] = useState(null);
    const handleChange = (info) => {
        if (info.file.status === "done") {
            message.success("파일이 업로드되었습니다.", 3000);
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
            const response = await Axios.post(`${API_URL}prob_upload_file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            // 성공적으로 업로드되면 onSuccess를 호출합니다.
            onSuccess(response.data, file);
            setFileList(file);
            props.setReferenceFileURL(response.data.file_path);
            props.setReferenceName(response.data.file_name);
        } catch (error) {
            // 업로드에 실패하면 onError를 호출합니다.
            onError(error);
            navigate(-1);
        }
    };
    const fileAccept = ".txt,.doc,.docx,.pdf";

    return (
        <Upload
            customRequest={customRequest}
            onChange={handleChange}
            fileList={fileList ? [fileList] : []}
            showUploadList={true}
            accept={fileAccept}
        >
            <Button icon={<UploadOutlined />}>파일 업로드</Button>
        </Upload>
    );
}

export default FileUpload;
