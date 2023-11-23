import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";

let editor = {};

const TextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");

  const [FirstTextAERender, setFirstTextAERender] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수

  const elementRef = useRef(null);

  /**
   * TextAEEditor의 변경을 감지하여 저장하는 함수
   */
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); // 기본 동작(브라우저에서의 저장 다이얼로그 등) 방지
      const textContent = JSON.parse(elementRef.current.textContent);

      console.log(textContent.denotations); //API를 위한 콘솔 로그

      if (textContent.denotations !== "") {
        let body = {
          ae_denotations: textContent.denotations,
          ae_attributes: textContent.attributes,
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

          if (FirstTextAERender) {
            [editor] = window.initializeTextAEEditor(); // TextAEEditor 초기화
            setFirstTextAERender(false);
          }
          console.log(response.data.textae);
          console.log(editor);
          editor.annotation = response.data.textae; // TextAEEditor에 데이터 삽입이 실시간으로 이루어지지 않음
        } else {
          message.error(response.data.message);
          navigate(
            `/prob/feedback/manage?lecture_no=${lectureNo}&as_no=${asNo}`
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

  useEffect(() => {
    if (props.Anchoring !== "") {
      editor.focusDenotation(props.Anchoring);
    }
  }, [props.Anchoring]);

  return (
    <div onKeyDown={handleKeyDown}>
      <div
        id="my_text-ae_editor"
        className="textae-editor"
        mode="edit"
        inspect="annotation"
      ></div>

      <div id="annotation" ref={elementRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default TextAEEditor;
