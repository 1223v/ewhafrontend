import { CurrentLecTd } from "./CurrentLecTd";
import { CurrentLecTh } from "./CurrentLecTh";

// 마이페이지 - 진행 중의 강의 테이블
export const CurrentLecTable = ({ lectures }) => {
  console.log(lectures);
  return (
    <table className="currentLecTable">
      <thead>
        <CurrentLecTh />
      </thead>
      <tbody>
        <CurrentLecTd />
        <CurrentLecTd />
        <CurrentLecTd />
      </tbody>
    </table>
  )
}