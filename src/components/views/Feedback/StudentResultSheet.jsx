import { message } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import { API_URL } from "../../Config";

function StudentResultSheet(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const asNo = params.get("as_no");
  const userNo = params.get("user_no");
  const [FeedbackComment, setFeedbackComment] = useState(""); // 피드백 코멘트
  const onClose = () => {
    props.setResult(false);
  };

  useEffect(() => {
    Axios.get(
      `${API_URL}api/feedback/review?as_no=${asNo}&student_no=${userNo}`,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data) {
          // 요청이 성공한 경우의 처리
          setFeedbackComment(response.data.review);
        } else {
          message.error("피드백이 없습니다.");
        }
      })

      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        message.error("알 수 없는 에러가 발생했습니다.");
        navigate("/");
      });
  }, []);

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
              <Txtarea cols="130" rows="20" value={FeedbackComment}></Txtarea>
            </StyledButtonWrapper>
          </StyledNewWishList>
        </div>
      </BottomSheet>
    </div>
  );
}

export default StudentResultSheet;

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
