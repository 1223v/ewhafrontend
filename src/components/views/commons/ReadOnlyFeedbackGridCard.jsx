import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ReadOnlyFeedbackGridCard(props) {
  const textSnippet = props.TextContent.substring(
    props.begin,
    props.end
  ).trim();
  const displayText = textSnippet.length > 0 ? textSnippet : "공백";
  const [FeedbackAttributes, setFeedbackAttributes] = useState(""); // 피드백 note 내용

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
            {props.id} | {props.begin}~{props.end} 구간 : {displayText}
          </MainTitle>
        </div>

        <Feedbacktext>
          <TagDiv>{props.obj}</TagDiv>
        </Feedbacktext>
        <FeedbackTextField
          type="text"
          placeholder="피드백을 작성해주세요."
          rows="4"
          cols="30"
          value={FeedbackAttributes}
          readOnly={true}
        />
      </SubFeedbackGridcard>
    </FeedbackGridcard>
  );
}

export default ReadOnlyFeedbackGridCard;

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

const TagDiv = styled.div`
  background: #e8e8e8;
  border-radius: 16px;
  padding: 8px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
`;
