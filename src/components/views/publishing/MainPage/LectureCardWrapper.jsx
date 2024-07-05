import React from "react";
import LectureCard from "./LectureCard";

// 메인페이지 - 강의 카드 wrapper
function LectureCardWrapper({ lectures, currentPage, deleteLecture }) {
  return (
    <section className="lectureCardWrapper">
      {lectures
        ?.filter((_, index) => Math.floor(index / 6) + 1 === currentPage)
        .map((item) => (
          <React.Fragment key={item.lecture_no}>
            <LectureCard
              id={item.lecture_no}
              name={item.lecture_name}
              count={item.assignment_count}
              year={item.year}
              semester={item.semester}
              major={item.major}
              seperated={item.separated}
              professor={item.professor}
              deleteLecture={deleteLecture}
            />
          </React.Fragment>
        ))}
    </section>
  );
}

export default LectureCardWrapper;
