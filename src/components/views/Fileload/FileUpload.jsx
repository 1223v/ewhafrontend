import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { API_URL } from "../../Config";
import { useNavigate } from "react-router-dom";

function FileUpload() {
    let navigate = useNavigate();
    const fileList = [];

    const handleChange = (info) => {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
        let body = {
            file: info.fileList,
        };

        Axios.post(`${API_URL}api/prob/create`, body, {
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.probcreateSuccess) {
                    alert("과제를 생성했습니다.");
                    navigate("/");
                } else {
                    alert("과제 생성에 실패했습니다. 다시 시도해주세요.");
                    navigate("/");
                }
            })
            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
                navigate(-1);
            });
    };

    const customRequest = async (options) => {
        // 파일 업로드를 서버로 보내는 커스텀 로직을 여기에 작성합니다.
        // 예를 들어, Axios 또는 Fetch API를 사용할 수 있습니다.
        // 서버에서 응답을 처리하고 결과를 처리할 수 있습니다.
    };
    const fileAccept = ".txt,.doc,.docx,.pdf";

    return (
        <Upload onChange={handleChange} defaultFileList={fileList} accept={fileAccept}>
            <Button icon={<UploadOutlined />}>파일 업로드</Button>
        </Upload>
    );
}

export default FileUpload;
