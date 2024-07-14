import "./LectureList.css";
import LectureListHeader from "./LectureListHeader";
import LectureListWrapper from "./LectureListWrapper";

// 메인페이지 - 강의 목록
export function LectureList() {
  return (
    <>
      <section id="lectureList">
        <LectureListHeader />
        <LectureListWrapper />
      </section>
    </>
  );
}
