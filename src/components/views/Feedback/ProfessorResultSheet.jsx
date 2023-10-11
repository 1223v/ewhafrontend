import React, { useState, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { API_URL } from "../../Config";

function ProfessorResultSheet(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  const [FeedbackComment, setFeedbackComment] = useState(""); // 피드백 코멘트
  const [FeedbackCommentSuccess, setFeedbackCommentSuccess] = useState(false); // 피드백 코멘트 성공 여부

  const onClose = () => {
    props.setResult(false);
  };

  const onResultChange = (e) => {
    setFeedbackComment(e.target.value);
  };

  const onResultSubmit = () => {
    console.log("api 호출");
    let body = {
      as_no: asNo,
      student_no: userNo,
      review: FeedbackComment,
    };
    Axios.post(`${API_URL}api/feedback/review`, body, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.isSuccess) {
          message.success("저장 완료했습니다.");

          props.setResult(false);
          setFeedbackCommentSuccess(!FeedbackCommentSuccess);
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

  useEffect(() => {
    Axios.get(
      `${API_URL}api/feedback/review?as_no=${asNo}&student_no=${userNo}`,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        // 요청이 성공한 경우의 처리
        setFeedbackComment(response.data.review);
      })

      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, [FeedbackCommentSuccess]);
  return (
    <div>
      <BottomSheet
        open={props.Result}
        onDismiss={onClose}
        zIndex={8}
        header={
          <StyledBottomSheetHeader>
            <div className="sheetHeader">학생 평가결과</div>
            <GrClose size="23" onClick={onClose} />
          </StyledBottomSheetHeader>
        }
        snapPoints={({ maxHeight }) => 0.6 * maxHeight}
      >
        <div
          style={{
            height: "100vh",
          }}
        >
          <StyledNewWishList>
            <StyledButtonWrapper>
              <Txtarea
                cols="130"
                rows="20"
                onChange={onResultChange}
                value={FeedbackComment}
              ></Txtarea>
            </StyledButtonWrapper>
            <StyledButtonWrapper>
              <ResultBtn onClick={onResultSubmit}>총평 저장하기</ResultBtn>
            </StyledButtonWrapper>
          </StyledNewWishList>
        </div>
      </BottomSheet>
    </div>
  );
}

export default ProfessorResultSheet;

const Txtarea = styled.textarea`
  width: 100%;
  margin: 0 auto;
  border: none;
  resize: none;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
`;

const StyledBottomSheetHeader = styled.div`
  height: 1.4rem;
  padding: 1.1rem 2.2rem 0.9rem 2.2rem;
  display: flex;
  align-items: center;
  text-align: initial;
  position: sticky;
  top: 0;
  background: white;

  & > img {
    cursor: pointer;
  }

  & > div {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.7rem;
    width: 100%;
  }
`;

const StyledNewWishList = styled.div`
  padding: 3.3rem 2.2rem 3.6rem 2.2rem;
  flex-direction: column;
  align-items: center;

  & > div {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: gray;
  }
`;

const ResultBtn = styled.button`
  display: flex;
  justify-content: center;

  width: calc(100% - 32px);
  height: 54px;
  line-height: 54px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background: #2e462f;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 400;

  margin: 10px;
`;
