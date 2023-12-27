import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";
import {
  fullyDecodeURI,
  fullyEncodeURI,
} from "../../views/commons/fullyEncodeURI";

let editor = {};

const TextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");

  const [FirstTextAERender, setFirstTextAERender] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수
  const [DuplicateCheck, setDuplicateCheck] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수

  const elementRef = useRef(null);

  /**
   * TextAEEditor의 위치를 불러오는 함수
   */
  const getAnchoring = () => {
    if (props.Sectioncontent?.length !== 0) {
      editor.lastSelectedDenotationIDCallback = (denotationID) => {
        props.setChoiceAnchor(denotationID);
      };
    }
  };

  editor.inspectCallback = (annotation) => {
    if (annotation && DuplicateCheck) {
      setDuplicateCheck(!DuplicateCheck);
      const textContent = JSON.parse(elementRef.current.textContent);

      const encodedAttributes = textContent.attributes.map((attr) => {
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

      if (textContent.denotations !== "") {
        let body = {
          ae_denotations: textContent.denotations,
          ae_attributes: encodedAttributes,
        };
        console.log(body); //API를 위한 콘솔 로그
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
              props.setSectioncontent(textContent.denotations);
              props.setAttributesContent(textContent.attributes);
              props.setDatacontent(!props.Datacontent);
            } else {
              message.error("저장 실패했습니다. 다시 시도해주세요.");
            }
          })
          .catch((error) => {
            // 요청이 실패한 경우의 처리
            console.log(error);
            message.error("알 수 없는 에러가 발생했습니다.");
            navigate("/");
          });
      }
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
          props.setSectioncontent(response.data.textae.denotations);
          props.setAttributesContent(response.data.textae.attributes);
          props.setSubmitAttributesContent(response.data.textae.attributes);
          props.setNewAttributeCount(response.data.new_attribute);
          console.log(response.data.textae);

          if (FirstTextAERender) {
            [editor] = window.initializeTextAEEditor(); // TextAEEditor 초기화
            setFirstTextAERender(false);
          }

          editor.annotation = response.data.textae; // TextAEEditor에 데이터 삽입이 실시간으로 이루어지지 않음
        } else {
          message.error(response.data.message);
          navigate(
            `/prob/detail/professor?lecture_no=${lectureNo}&as_no=${asNo}`
          );
        }
      } catch (error) {
        //message.error("알 수 없는 에러가 발생했습니다.");
        console.log(error);
        //navigate("/");
      }
    };

    fetchData();
  }, [props.Datacontent]);

  useEffect(() => {
    if (props.Anchoring !== "") {
      editor.selectDenotation(props.Anchoring);
    }
  }, [props.Anchoring]);

  return (
    <div>
      <div
        id="my_text-ae_editor"
        className="textae-editor"
        mode="edit"
        inspect="annotation"
        onClick={getAnchoring}
      ></div>

      <div id="annotation" ref={elementRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default TextAEEditor;
