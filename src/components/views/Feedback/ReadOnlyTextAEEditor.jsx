import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";

let editor = {}; // TextAEEditor 객체

const ReadOnlyTextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  const [FirstTextAERender, setFirstTextAERender] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수
  const elementRef = useRef(null);

  /**
   * 앵커링 관련 함수
   * TextAEEditor의 위치를 불러오는 함수
   * TextAE -> FeedbackGridCard
   */
  const onAnchoringClick = () => {
    let DuplicateCheckAnchoring = true;
    if (props.Sectioncontent?.length !== 0) {
      editor.lastSelectedDenotationIDCallback = (denotationID) => {
        if (DuplicateCheckAnchoring) {
          props.setAnchoring(denotationID);

          props.setTextAeToFeedbackDetection(!props.TextAeToFeedbackDetection);
          DuplicateCheckAnchoring = false;
        }
      };
    }
  };

  /**
   * TextAEEditor의 데이터를 불러오는 함수
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${API_URL}api/feedback/textae?as_no=${asNo}&user_no=${userNo}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.isSuccess) {
          props.setTextContent(response.data.textae.text);
          props.setSectioncontent(response.data.textae.denotations);
          props.setAttributesContent(response.data.textae.attributes);
          props.setSubmitAttributesContent(response.data.textae.attributes);
          props.setNewAttributeCount(response.data.new_attribute);

          if (FirstTextAERender) {
            [editor] = window.initializeTextAEEditor(); // TextAEEditor 초기화
            setFirstTextAERender(false);
          }
          editor.annotation = response.data.textae; // TextAEEditor에 데이터 삽입이 실시간으로 이루어지지 않음
          //editor.focusDenotations('T1');
        } else {
          message.error(response.data.message);
          navigate(
            `/prob/detail/student?lecture_no=${lectureNo}&as_no=${asNo}`
          );
        }
      } catch (error) {
        message.error("알 수 없는 에러가 발생했습니다.");
        console.log(error);
        navigate("/");
      }
    };

    fetchData();
  }, [props.Datacontent]);

  /**
   * 앵커링 관련 함수
   * memoryLeak 원인
   * FeedbackGridCard -> TextAE
   */
  useEffect(() => {
    if (props.Anchoring !== "") {
      editor.selectDenotation(props.Anchoring);
    }
  }, [props.ChangeDetection]);

  return (
    <div>
      <div
        id="my_text-ae_editor"
        className="textae-editor"
        mode="edit"
        inspect="annotation"
        onClick={onAnchoringClick}
      ></div>
      <div id="annotation" ref={elementRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default ReadOnlyTextAEEditor;
