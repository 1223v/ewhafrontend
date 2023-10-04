import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";

function FeedbackGridCard(props) {
  const [checkedList, setCheckedList] = useState([]); // 체크된 항목들을 저장하는 배열
  const [FeedbackOptions, setFeedbackOptions] = useState([
    { label: "Filler", value: "Filler" },
    { label: "BackTracking", value: "BackTracking" },
    { label: "Pause", value: "Pause" },
  ]); // 전체 학생 목록을 저장하는 배열

  const onRemove = (item) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  const onSelectChange = (value) => {
    setCheckedList([...checkedList, value]);
    console.log(value);
  };

  useEffect(() => {
    const CheckedFeedbackOption = [];
    const CheckedFeedbackOptionList = [];
    for (let i = 0; i < checkedList.length; i++) {
      CheckedFeedbackOption[0] = FeedbackOptions.filter(
        (obj) => obj.email === checkedList[i]
      );
      CheckedFeedbackOptionList.push(CheckedFeedbackOption[0][0]);
    }
  }, [checkedList]);

  return (
    <FeedbackGridcard>
      <SubFeedbackGridcard>
        <div>
          <MainTitle>
            {props.id} | {props.begin}~{props.end} 구간
          </MainTitle>
          <MainTitle>
            <Select
              style={{ width: 120 }}
              placement="topLeft"
              options={FeedbackOptions}
              placeholder="추가"
              onChange={onSelectChange}
            />
          </MainTitle>
        </div>
        <Feedbacktext>{props.obj}</Feedbacktext>
        <FeedbackTextField
          type="text"
          placeholder="피드백을 작성해주세요."
          rows="4"
          cols="30"
        />
      </SubFeedbackGridcard>
    </FeedbackGridcard>
  );
}

export default FeedbackGridCard;

const MainTitle = styled.h5`
  margin: 13px;
  color: #2b2d36;
`;

const FeedbackTextField = styled.textarea`
  box-sizing: border-box;
  border: solid 1px #d3d3d3;
  resize: vertical;
  background-color: #ffffff;
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.375rem;
  border-radius: 0.5rem;
`;

const Feedbacktext = styled.div`
  text-align: center;
  position: relative;
  margin: 10px;
`;

const SubFeedbackGridcard = styled.div`
  border: 1px solid rgb(211, 211, 211);
  border-radius: 5px;
  width: 100%;
  min-width: 250px;
  margin: 10px 10px 10px 10px;
  background-color: rgb(255, 255, 255);
  position: relative;
  overflow: auto;
  text-align: center;
`;

const FeedbackGridcard = styled.div`
  position: relative;
  display: flex;
`;
