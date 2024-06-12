import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../../../constants/text";

// 메인페이지 - 강의 생성 버튼
export function LectureBtn () {
  const navigate = useNavigate();
  return(
    <div className="lectureBtn">
      <GrAdd size="15" className="lectureBtn__img"/>
      <span onClick={() => navigate('/lecture_add')}>{MAIN.BTN.create}</span>
    </div>
  )
}