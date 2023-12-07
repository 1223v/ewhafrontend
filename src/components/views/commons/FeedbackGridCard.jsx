import { Select, message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../Config";
import { encodeIfNotAlready } from "../../views/commons/fullyEncodeURI";

function FeedbackGridCard(props) {
  const myRef = useRef(null);
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  const [CheckList, setCheckList] = useState(props.obj); // 체크리스트\
  const [FeedbackAttributes, setFeedbackAttributes] = useState(""); // 피드백 속성
  const [FeedbackOptions] = useState([
    { label: "Filler", value: "Filler" },
    { label: "Cancellation", value: "Cancellation" },
    { label: "Pause", value: "Pause" },
    { label: "Etc", value: "Etc" },
  ]); // 피드백 옵션

  const onAnchoringClick = () => {
    props.setAnchoring(props.id);
  };

  const onSelectChange = (value) => {
    // 선택한 값이 CheckList에 이미 있으면 아무 것도 하지 않고 리턴
    if (CheckList.includes(value)) return;

    // 그렇지 않으면, 현재의 CheckList 배열에 선택한 값을 추가
    setCheckList(value);

    const filteredItems = props.Sectioncontent.find(
      (item) => item.id === props.id
    );
    if (filteredItems) {
      filteredItems.obj = value;
    }
    let updatefilteredItems = props.Sectioncontent.filter(
      (item) => item.id !== props.id
    );
    updatefilteredItems.push(filteredItems);

    let body = {
      ae_denotations: updatefilteredItems,
    };
    Axios.put(
      `${API_URL}api/feedback/textae?as_no=${asNo}&user_no=${userNo}`,
      body,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.isSuccess) {
          message.success("저장 완료했습니다.");
          props.setDatacontent(!props.Datacontent);
        } else {
          message.error("저장 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  };

  // 피드백 텍스트 변경 이벤트
  const onTextChange = (e) => {
    const filteredValue = e.target.value.replace(/"/g, ""); // " 문자를 제거
    setFeedbackAttributes(filteredValue);
  };

  // 피드백 텍스트 포커스 아웃 이벤트
  const handleFocusOut = () => {
    let updatefilteredItems = [];
    let encodedFeedbackAttributes = encodeIfNotAlready(FeedbackAttributes);

    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );
    if (filteredItems.length > 0) {
      filteredItems[0].obj = encodedFeedbackAttributes;
      updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push(filteredItems[0]);
    } else {
      updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push({
        id: props.NewAttributeCount, // 이곳 수정
        subj: props.id,
        pred: "Note",
        obj: encodedFeedbackAttributes,
      });
    }
    let body = {
      ae_attributes: updatefilteredItems,
    };
    Axios.put(
      `${API_URL}api/feedback/textae?as_no=${asNo}&user_no=${userNo}`,
      body,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.isSuccess) {
          message.success("저장 완료했습니다.");
          props.setDatacontent(!props.Datacontent);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  };

  // props.ChoiceAnchor 값이 변경될 때 실행
  useEffect(() => {
    if (props.ChoiceAnchor === props.id) {
      // 해당 요소로 스크롤
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.ChoiceAnchor, props.id]);

  useEffect(() => {
    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );

    if (filteredItems.length > 0) {
      setFeedbackAttributes(filteredItems[0].obj); // [{ id: 2, value: 5 }, { id: 4, value: 5 }]
    }
  }, [props.AttributesContent]);

  return (
    <FeedbackGridcard ref={myRef}>
      <SubFeedbackGridcard
        onClick={onAnchoringClick}
        style={{
          border:
            props.ChoiceAnchor === props.id
              ? "2px solid black"
              : "1px solid rgb(211, 211, 211)",
        }}
      >
        <div>
          <MainTitle>
            {props.id} | {props.begin}~{props.end} 구간
          </MainTitle>
          <MainTitle>
            <Select
              style={{ width: 80 }}
              placement="topLeft"
              options={FeedbackOptions}
              placeholder="변경"
              onChange={onSelectChange}
            />
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

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const TagDiv = styled.div`
  background: #e8e8e8;
  border-radius: 16px;
  padding: 8px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
`;
