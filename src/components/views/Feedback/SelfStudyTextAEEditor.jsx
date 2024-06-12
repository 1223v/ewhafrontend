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
let DuplicateCheck = false;

const SelfStudyTextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const [FirstTextAERender, setFirstTextAERender] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수
  const [inspectCallbackSave, setInspectCallbackSave] = useState(false); // TextAEEditor의 inspectCallback 함수를 감지하는 변수
  const elementRef = useRef(null);
  const timeoutRef = useRef(null);

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

  const onInspectCallbackSave = () => {
    DuplicateCheck = true;

    // 핸들러 실행을 대기하는 시간(ms)
    const debounceTime = 500;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 이전에 등록된 타이머를 취소
    }

    // debounceTime 이후에 실행되도록 타이머 등록
    timeoutRef.current = setTimeout(() => {
      editor.inspectCallback = (annotation) => {
        setInspectCallbackSave(!inspectCallbackSave);
      };
      DuplicateCheck = false;
    }, debounceTime);
  };

  useEffect(() => {
    if (elementRef.current.textContent) {
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

        Axios.put(`${API_URL}api/prob/self/textae?as_no=${asNo}`, body, {
          withCredentials: true,
        })

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
  }, [inspectCallbackSave]);

  useEffect(() => {
    if (elementRef.current.textContent) {
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
        if (encodedAttributes.length === 0) {
          encodedAttributes.push("Flag");
        }
        let body = {
          ae_denotations: textContent.denotations,
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
  }, [props.SaveFeedback]);

  /**
   * TextAEEditor의 데이터를 불러오는 함수
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${API_URL}api/prob/self/textae?as_no=${asNo}`,
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

          props.setSaveTime(response.headers["date"]);

          if (FirstTextAERender) {
            [editor] = window.initializeTextAEEditor(); // TextAEEditor 초기화
            let DuplicateCheckAnchoring = true;

            editor.lastSelectedDenotationIDCallback = (denotationID) => {
              if (DuplicateCheckAnchoring) {
                props.setAnchoring(denotationID);

                props.setTextAeToFeedbackDetection(
                  !props.TextAeToFeedbackDetection
                );
                DuplicateCheckAnchoring = false;
              }
            };
            editor.inspectCallback = (annotation) => {
              console.log("TextAE inspectCallback 초기 선언", annotation);
            };

            setFirstTextAERender(false);
          }

          editor.annotation = response.data.textae; // TextAEEditor에 데이터 삽입이 실시간으로 이루어지지 않음
        } else {
          message.error(response.data.message);
          navigate(`/prob/selfstudys/detail?as_no=${asNo}`);
        }
      } catch (error) {
        //message.error("알 수 없는 에러가 발생했습니다.");
        console.log(error);
        //navigate("/");
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
    <div
      onMouseOut={onInspectCallbackSave}
      //onKeyDown={handleKeyDown}
    >
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

export default SelfStudyTextAEEditor;
