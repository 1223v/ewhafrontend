import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config";

const ReadOnlyTextAEEditor = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  let editor = {};
  const [FirstTextAERender, setFirstTextAERender] = useState(true); // TextAEEditor의 첫 렌더링을 감지하는 변수
  let teae = {}; // TextAEEditor의 데이터를 저장하는 변수
  const elementRef = useRef(null);

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
          teae = response.data.textae;
          console.log(teae);

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

  return (
    <div>
      <div
        id="my_text-ae_editor"
        className="textae-editor"
        mode="view"
        inspect="annotation"
      ></div>
      <div id="annotation" ref={elementRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default ReadOnlyTextAEEditor;
