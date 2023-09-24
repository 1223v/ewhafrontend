import React, { Fragment, useState } from "react";
import { Button, Tooltip } from "antd";
import styled from "styled-components";
import { FaStop } from "react-icons/fa";

const PlayBtn = styled.button`
	background-color: #ff3466;;
	height: 56px;
	width: 56px;
	border: none;
	border-radius: 50%;
	color: white;
	cursor: pointer;
	margin: auto;
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
		0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const StyledFragment = styled(Fragment)`
	margin : 0 auto;
`;

export default function RecordButton(props) {
    
    return (
        <StyledFragment>
            <Tooltip title="Stop Recording" placement="right">
                <PlayBtn
					onClick={() => {
						
						props?.onClick();
					}}
				>
					<FaStop size="20" />
				</PlayBtn>
            </Tooltip>
        </StyledFragment>
    );
}
