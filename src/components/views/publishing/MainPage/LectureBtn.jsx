import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

// 메인페이지 - 강의 생성 버튼
export function LectureBtn ({ onClick, children }) {
  const navigate = useNavigate();
  return(
    <div className="lectureBtn" onClick={onClick}>
      <GrAdd size="15" className="lectureBtn__img"/>
      <span>{children}</span>
    </div>
  )
}