import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";

function FeedbackGridCard(props) {
  const [CheckList, setCheckList] = useState([props.obj]); // 체크리스트\
  const [FeedbackAttributes, setFeedbackAttributes] = useState(""); // 피드백 속성
  const [FeedbackOptions, setFeedbackOptions] = useState([
    { label: "Filler", value: "Filler" },
    { label: "BackTracking", value: "BackTracking" },
    { label: "Pause", value: "Pause" },
  ]); // 피드백 옵션

  const onSelectChange = (value) => {
    // 선택한 값이 CheckList에 이미 있으면 아무 것도 하지 않고 리턴
    if (CheckList.includes(value)) return;

    // 그렇지 않으면, 현재의 CheckList 배열에 선택한 값을 추가
    const updatedCheckList = [...CheckList, value];

    // 상태 업데이트
    setCheckList(updatedCheckList);

    console.log(value);
  };

  const onSelectRemove = (itemToRemove) => {
    const updatedCheckList = CheckList.filter((item) => item !== itemToRemove);
    setCheckList(updatedCheckList);
  };

  // 피드백 텍스트 변경 이벤트
  const onTextChange = (e) => {
    setFeedbackAttributes(e.target.value);
  };

  // 피드백 텍스트 포커스 아웃 이벤트
  const handleFocusOut = () => {
    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );
    if (filteredItems.length > 0) {
      filteredItems[0].obj = FeedbackAttributes;
      const updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push(filteredItems[0]);
      props.setSubmitAttributesContent(updatefilteredItems);
      console.log("포커스 아웃", updatefilteredItems);
    } else {
      const updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push({
        id: props.id,
        subj: props.id,
        pred: "Note",
        obj: FeedbackAttributes,
      });
      props.setSubmitAttributesContent(updatefilteredItems);
      console.log("포커스 아웃", updatefilteredItems);
    }
  };

  useEffect(() => {
    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );

    if (filteredItems.length > 0) {
      setFeedbackAttributes(filteredItems[0].obj); // [{ id: 2, value: 5 }, { id: 4, value: 5 }]
    }
  }, [props.AttributesContent]);

  return (
    <FeedbackGridcard>
      <SubFeedbackGridcard>
        <div>
          <MainTitle>
            {props.id} | {props.begin}~{props.end} 구간
          </MainTitle>
          <MainTitle>
            <Select
              style={{ width: 80 }}
              placement="topLeft"
              options={FeedbackOptions}
              placeholder="추가"
              onChange={onSelectChange}
            />
          </MainTitle>
        </div>

        <Feedbacktext>
          {CheckList.map((item, index) => (
            <div
              key={index}
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              {item}
              <button
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => onSelectRemove(item)}
              >
                x
              </button>
            </div>
          ))}
        </Feedbacktext>
        <FeedbackTextField
          type="text"
          placeholder="피드백을 작성해주세요."
          rows="4"
          cols="30"
          value={FeedbackAttributes}
          onChange={onTextChange}
          onBlur={handleFocusOut}
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
