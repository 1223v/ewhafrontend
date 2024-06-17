import { MYPAGE } from "../../../../constants/text";
import { CurrentLecTable } from "./CurrentLecTable";

import useLectures from "../../../../hooks/useLectures";
import LoadingPage from "../../Loading/LoadingPage";
import "./CurrentLec.css";

// 마이페이지 - 진행 중인 강의
export const CurrentLec = () => {
  const  { lectures, loading, error } = useLectures();
  return (
    <>
    {loading ? (
      <LoadingPage />
    ) : (
      <section id="currentLec">
        <div className="currentLec-header">
          <span>{MYPAGE.TITLE.lec}</span>
        </div>
        <CurrentLecTable 
          lectures={lectures}
        />
      </section>
    )}
    </>
  )
}