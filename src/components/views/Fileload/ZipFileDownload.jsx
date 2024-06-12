import { DownloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DOWNLOAD_URL } from "../../Config";

function ZipFileDownload(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const [size, setSize] = useState("large");

  const fetchDownloadUrlAndDownload = () => {
    axios
      .get(`/api/feedback/json?lecture_no=${lectureNo}&user_no=${props.UserNo}`)
      .then((response) => {
        if (response.data.isSuccess) {
          handleDownload(response.data.url, response.data.file_name);
        }
      })
      .catch((error) => {
        message.error("DownloadUrl을 가져오는 데 실패했습니다.");
        navigate("/");
      });
  };

  const handleDownload = (DownloadUrl, FileName) => {
    axios({
      url: `${DOWNLOAD_URL}${DownloadUrl}`, // 서버의 파일 다운로드 엔드포인트
      method: "GET",
      responseType: "blob", // 파일 다운로드를 위해 responseType을 'blob'으로 설정
    })
      .then((response) => {
        // 파일 데이터를 Blob 형식으로 받아옵니다.
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // 브라우저에 파일 다운로드 대화상자를 표시합니다.
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = FileName; // 파일명 지정
        link.click();
      })
      .catch((error) => {
        message.error("알 수 없는 에러가 발생했습니다. 관리자에게 문의하세요.");
        console.error("파일 다운로드 오류:", error);
        navigate("/");
      });
  };

  // 학생용 파일 다운로드
  const onResultDownload = () => {
    axios({
      url: `${DOWNLOAD_URL}${props.fileUrl}`, // 서버의 파일 다운로드 엔드포인트
      method: "GET",
      responseType: "blob", // 파일 다운로드를 위해 responseType을 'blob'으로 설정
    })
      .then((response) => {
        // 파일 데이터를 Blob 형식으로 받아옵니다.
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // 브라우저에 파일 다운로드 대화상자를 표시합니다.
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = props.fileUrl; // 파일명 지정
        link.click();
      })
      .catch((error) => {
        message.error("알 수 없는 에러가 발생했습니다. 관리자에게 문의하세요.");
        console.error("파일 다운로드 오류:", error);
        navigate("/");
      });
  };

  return (
    <div>
      <ZipBtn
        type="primary"
        shape="circle"
        icon={<DownloadOutlined />}
        size={size}
        onClick={fetchDownloadUrlAndDownload}
      />
    </div>
  );
}

export default ZipFileDownload;

const ZipBtn = styled(Button)`
  background: ${(props) => props.theme.colors.MainColor};
  &:hover {
    background: ${(props) => props.theme.colors.HoverColor} !important;
  }
`;
