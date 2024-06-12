import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../../../constants/text";
import useFilteredLectures from "../../../../hooks/useFilteredLectures";
import useLectures from "../../../../hooks/useLectures";
import useTransformLectureData from "../../../../hooks/useTransformLectureData";
import LoadingPage from "../../Loading/LoadingPage";
import { LectureBtn } from "./LectureBtn";
import LectureCardWrapper from "./LectureCardWrapper";
import LectureFilter from "./LectureFilter";
import "./LectureList.css";

// 메인페이지 - 강의 목록
export function LectureList() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { lectures, loading, error } = useLectures();
  const filteredLectures = useFilteredLectures(
    lectures,
    selectedTags,
    searchTerm
  );
  const { semesters, separateds } = useTransformLectureData(lectures);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <section id="lectureList">
      <div className="lectureList__header">
        <h2>{MAIN.TITLE}</h2>
        <LectureBtn />
      </div>
      <LectureFilter
        semesters={semesters}
        separateds={separateds}
        setSearchTerm={setSearchTerm}
        setSelectedTags={setSelectedTags}
      />
      {loading ? (
        <LoadingPage />
      ) : (
        <LectureCardWrapper lectures={filteredLectures} />
      )}
    </section>
  );
}
