import React from "react";
import axios from "axios";
import { DOWNLOAD_URL } from "../../Config";
import styled from "styled-components";
import { HiDownload } from "react-icons/hi";

function FileDownload(props) {
    const handleDownload = () => {
        axios({
            url: `${DOWNLOAD_URL}${props.DownloadUrl}`, // 서버의 파일 다운로드 엔드포인트
            method: "GET",
            responseType: "blob", // 파일 다운로드를 위해 responseType을 'blob'으로 설정
        })
            .then((response) => {
                // 파일 데이터를 Blob 형식으로 받아옵니다.
                const blob = new Blob([response.data], { type: response.headers["content-type"] });

                // 브라우저에 파일 다운로드 대화상자를 표시합니다.
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = props.FileName; // 파일명 지정
                link.click();
            })
            .catch((error) => {
                console.error("파일 다운로드 오류:", error);
            });
    };

    return (
        <div>
            <Button onClick={handleDownload}>- {props.FileName}</Button>
        </div>
    );
}

export default FileDownload;

const Button = styled.button`
    border: none;
    background: none;
    outline: none;
    &:hover {
        color: blue;
    }
`;
