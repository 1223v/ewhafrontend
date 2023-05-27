import React from "react";
import NavBar from "../NavBar/NavBar";
import styled from "styled-components";
import TextAEEditor from "./Sections/TextAEEditor";

function ProbFeedbackPage() {
  return (
    <div>
      <NavBar />
      <FeedbackDiv>
        <Translation>
          <h4>원문</h4>
          <TranslationBox>
            <TextAEEditor />
          </TranslationBox>
        </Translation>
        <Interpretation>
          <h4>통역 전사문</h4>
          <InterpretationBox>test</InterpretationBox>
        </Interpretation>

        <Feedback>
          <h4>피드백</h4>
          <FeedbackBox>test</FeedbackBox>
        </Feedback>

        <Estimation>
          <h4>총평</h4>
          <EstimationBox>test</EstimationBox>
        </Estimation>
      </FeedbackDiv>
    </div>
  );
}
export default ProbFeedbackPage;

const FeedbackDiv = styled.div`
  width: 800px;
  margin: 0 auto;
  position: relative;
`;

const Translation = styled.div`
  font-size: 12px;
  margin-top: 10px;
  position: absolute;
  left: 0px;
`;
const TranslationBox = styled.div`
  padding: 10px;

  width: 300px;
  height: 500px;

  overflow-y: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;

const Interpretation = styled.div`
  font-size: 12px;
  margin-top: 10px;
  position: absolute;
  left: 350px;
`;

const InterpretationBox = styled.div`
  padding: 10px;

  width: 300px;
  height: 500px;

  overflow-y: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;

const Feedback = styled.div`
  font-size: 12px;
  margin-top: 10px;
  position: absolute;
  left: 700px;
`;

const FeedbackBox = styled.div`
  padding: 10px;

  width: 300px;
  height: 840px;

  overflow-y: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;

const Estimation = styled.div`
  font-size: 12px;
  margin-top: 600px;
  position: absolute;
  left: 0px;
`;

const EstimationBox = styled.div`
  padding: 10px;

  width: 650px;
  height: 250px;

  overflow-y: auto;

  word-wrap: break-word;
  border: 1px solid #d3d3d3;
  border-radius: 4px;

  background-color: #f9f9f9;
`;
