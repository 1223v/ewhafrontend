import React, { Fragment, useState } from "react";
import { Button, Tooltip } from "antd";
import styled from "styled-components";
import { FaStop } from "react-icons/fa";

const StyledButton = styled(Button)`
    position: relative;
    background-color: ${(props) => (props.recording ? "#272727" : "#ff3466")};
    color: white;
    opacity: 1;
    margin: 12px;
    transition: all 0.2s;
    .pulse-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ff3466;
        border-radius: 100%;
        opacity: 0.5;
        z-index: -10;
        animation: pulse 1s ease-out infinite;
    }
    :hover {
        background-color: ${(props) => (props.recording ? "#272727" : "#ff3466")};
        opacity: 0.9;
    }
    @keyframes pulse {
        0% {
            transform: scale(1, 1);
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;

export default function RecordButton(props) {
    const [isRecording, setIsRecording] = useState(false);

    return (
        <Fragment>
            <Tooltip title="Stop Recording" placement="right">
                <StyledButton
                    type="primary"
                    shape="circle"
                    icon={<FaStop size="20" />}
                    onClick={() => {
                        setIsRecording(!isRecording);
                        props?.onClick();
                    }}
                    recording={isRecording ? 1 : 0}
                >
                    <div className="pulse-bg" />
                </StyledButton>
            </Tooltip>
        </Fragment>
    );
}
