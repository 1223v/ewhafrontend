import { Select, message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FEEDBACK_OPTION } from "../../../constants/text";
import { API_URL } from "../../Config";
import { fullyDecodeURI, fullyEncodeURI } from "./fullyEncodeURI";

function SelfStudyFeedbackGridCard(props) {
  const timerId = useRef(null); // useRef를 사용하여 timerId 관리
  const myRef = useRef(null);
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const textSnippet = props.TextContent.substring(
    props.begin,
    props.end
  ).trim();
  const displayText = textSnippet.length > 0 ? textSnippet : "공백";
  const [CheckList, setCheckList] = useState(props.obj); // 체크리스트\
  const [FeedbackAttributes, setFeedbackAttributes] = useState(""); // 피드백 속성
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // const [FeedbackOptions] = useState(props.type === "번역" ? FEEDBACK_OPTION.translation : FEEDBACK_OPTION.interpriting); // 피드백 옵션

   // 해당 값의 라벨을 찾는 함수
   const getLabelForValue = (value) => {
    const FeedbackOptions = props.type === "번역" ? FEEDBACK_OPTION.translation : FEEDBACK_OPTION.interpriting;
    const option = FeedbackOptions.find((option) => option.value === value);
    return option ? option.label : value;
  };

  /**
   * 앵커링 관련 함수
   * memoryLeak 원인
   * FeedbackGridCard -> TextAE
   */
  const onAnchoringClick = () => {
    if (props.Anchoring !== props.id) {
      props.setAnchoring(props.id);
      props.setChangeDetection(!props.ChangeDetection);
    }
  };

  // const handleBlur = (e) => {
  //   if (props.Anchoring === props.id) {
  //     e.preventDefault();
  //     e.target.focus(); // 포커스를 잃었을 때 다시 포커스를 설정
  //   }
  // };

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
      ae_attributes: ["Flag"],
    };
    Axios.put(`${API_URL}api/prob/self/textae?as_no=${asNo}`, body, {
      withCredentials: true,
    })
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
    const filteredValue = e.target.value.replace(/\n/g, "");
    setFeedbackAttributes(filteredValue);
  };

  // 피드백 텍스트 저장 이벤트
  const onFeedbackSave = (e) => {
    e.preventDefault();
    let updatefilteredItems = [];
    let encodedAttributes = [];
    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );
    if (filteredItems.length > 0) {
      filteredItems[0].obj = FeedbackAttributes;
      updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push(filteredItems[0]);
      encodedAttributes = updatefilteredItems.map((attr) => {
        try {
          // 디코딩 시도
          const decoded = fullyDecodeURI(attr.obj);

          // 디코딩 성공 시, 디코딩된 문자열이 원본 문자열과 같으면 인코딩하지 않고 리턴
          if (decoded === attr.obj) {
            return {
              ...attr,
              obj: fullyEncodeURI(attr.obj),
            };
          }
          return attr;
        } catch (e) {
          // 디코딩 오류 발생 시 (예: 잘못된 인코딩) 원본 문자열 인코딩
          return {
            ...attr,
            obj: fullyEncodeURI(attr.obj),
          };
        }
      });
    } else {
      updatefilteredItems = props.SubmitAttributesContent.filter(
        (item) => item.subj !== props.id
      );
      updatefilteredItems.push({
        id: props.NewAttributeCount, // 이곳 수정
        subj: props.id,
        pred: "Note",
        obj: FeedbackAttributes,
      });
      encodedAttributes = updatefilteredItems.map((attr) => {
        try {
          // 디코딩 시도
          const decoded = fullyDecodeURI(attr.obj);

          // 디코딩 성공 시, 디코딩된 문자열이 원본 문자열과 같으면 인코딩하지 않고 리턴
          if (decoded === attr.obj) {
            return {
              ...attr,
              obj: fullyEncodeURI(attr.obj),
            };
          }
          return attr;
        } catch (e) {
          // 디코딩 오류 발생 시 (예: 잘못된 인코딩) 원본 문자열 인코딩
          return {
            ...attr,
            obj: fullyEncodeURI(attr.obj),
          };
        }
      });
    }

    let body = {
      ae_denotations: ["Flag"],
      ae_attributes: encodedAttributes,
    };
    Axios.put(`${API_URL}api/prob/self/textae?as_no=${asNo}`, body, {
      withCredentials: true,
    })
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

  /**
   * 앵커링 관련 함수
   * props.TextAeToFeedbackDetection 값이 변경될 때 실행
   */
  useEffect(() => {
    if (props.Anchoring === props.id) {
      // 해당 요소로 스크롤
      myRef.current.scrollIntoView();
    }
  }, [props.TextAeToFeedbackDetection]);

  useEffect(() => {
    const filteredItems = props.AttributesContent.filter(
      (item) => item.subj === props.id
    );

    if (filteredItems.length > 0) {
      setFeedbackAttributes(filteredItems[0].obj); // [{ id: 2, value: 5 }, { id: 4, value: 5 }]
    } else {
      setFeedbackAttributes("");
    }
  }, [props.AttributesContent]);

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return (
    <FeedbackGridcard ref={myRef}>
      <SubFeedbackGridcard
        onClick={onAnchoringClick}
        style={{
          border:
            props.Anchoring === props.id
              ? "2px solid black"
              : "1px solid rgb(211, 211, 211)",
        }}
      >
        <div>
          <MainTitle>
            {props.id} | {props.begin}~{props.end} 구간 : {displayText}
          </MainTitle>
          <MainTitle>
            <Select
              style={{ width: 150 }}
              placement="topLeft"
              options={props.type === "번역" ? FEEDBACK_OPTION.translation : FEEDBACK_OPTION.interpriting}
              placeholder="변경"
              onChange={onSelectChange}
              open={isSelectOpen}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            />
          </MainTitle>
        </div>

        <Feedbacktext>
          <TagDiv>{getLabelForValue(props.obj)}</TagDiv>
        </Feedbacktext>
        <div>
          <FeedbackTextField
            type="text"
            placeholder="피드백을 작성해주세요."
            rows="4"
            cols="30"
            value={FeedbackAttributes}
            onChange={onTextChange}
          />

          <VscSend size={20} onClick={onFeedbackSave} />
        </div>
      </SubFeedbackGridcard>
    </FeedbackGridcard>
  );
}

export default SelfStudyFeedbackGridCard;

const FeedbackTextDiv = styled.div`
  margin-right: 10px;
`;

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
