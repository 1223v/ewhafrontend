import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../../../constants/text";

// 메인페이지 - 강의 생성 버튼
export function LectureBtn () {
  const navigate = useNavigate();
  return(
    <div className="lectureBtn" onClick={() => navigate('/lecture_add')}>
      <GrAdd size="15" className="lectureBtn__img"/>
      <span>{MAIN.BTN.create}</span>
    </div>
  )
}