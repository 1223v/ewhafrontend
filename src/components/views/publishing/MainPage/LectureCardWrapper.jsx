import React from "react";
import LectureCard from "./LectureCard";

// 메인페이지 - 강의 카드 wrapper
function LectureCardWrapper({ lectures }) {
  const dummyLectureCard = {
    lecturelist: [
      {
        lecture_no: 188,
        lecture_name: "한일추가샘플(20240521)",
        year: "2024",
        semester: "1학기",
        major: "한일통역",
        separated: "1분반",
        professor: "교수",
        attendee_count: 1,
        assignment_count: 12,
      },
      {
        lecture_no: 186,
        lecture_name: "test123",
        year: "2023",
        semester: "1학기",
        major: "한일통역",
        separated: "1분반",
        professor: "교수",
        attendee_count: 1,
        assignment_count: 5,
      },
      {
        lecture_no: 185,
        lecture_name: "동시통역BA",
        year: "2024",
        semester: "1학기",
        major: "한일통역",
        separated: "1분반",
        professor: "교수",
        attendee_count: 1,
        assignment_count: 3,
      },
      {
        lecture_no: 181,
        lecture_name: "0328",
        year: "2023",
        semester: "1학기",
        major: "한일통역",
        separated: "1분반",
        professor: "교수",
        attendee_count: 1,
        assignment_count: 2,
      },
    ],
  };
  return (
    <section className="lectureCardWrapper">
      {lectures?.map((item) => (
        <React.Fragment key={item.lecture_no}>
          <LectureCard
            name={item.lecture_name}
            count={item.assignment_count}
            year={item.year}
            semester={item.semester}
            major={item.major}
            seperated={item.separated}
          />
        </React.Fragment>
      ))}
    </section>
  );
}

export default LectureCardWrapper;
