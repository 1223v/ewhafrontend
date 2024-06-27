import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../../../constants/text";
import useDeleteLecture from "../../../../hooks/useDeleteLecture";
import useFilteredLectures from "../../../../hooks/useFilteredLectures";
import useLectures from "../../../../hooks/useLectures";
import { usePagenation } from "../../../../hooks/usePagenation";
import useTransformLectureData from "../../../../hooks/useTransformLectureData";
import LoadingPage from "../../Loading/LoadingPage";
import NavBar from "../../NavBar/NavBar";
import { Paging } from "../../Paging";
import { LectureBtn } from "./LectureBtn";
import LectureCardWrapper from "./LectureCardWrapper";
import LectureFilter from "./LectureFilter";
import "./LectureList.css";

// 메인페이지 - 강의 목록
export function LectureList() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { lectures, loading, error, fetchLectures } = useLectures();
  const deleteLecture = useDeleteLecture(fetchLectures);
  const filteredLectures = useFilteredLectures(
    lectures,
    selectedTags,
    searchTerm
  );
  const { semesters, separateds } = useTransformLectureData(lectures);
  const userinfos = useSelector((state) => state.user);

  const { pageNumbers, currentPage, setCurrentPage, calculatePageNumbers } =
    usePagenation(lectures.length);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    calculatePageNumbers(filteredLectures.length);
    setCurrentPage(1);
  }, [filteredLectures]);

  useEffect(() => {
    console.log(lectures);
  }, [lectures]);

  return (
    <>
      <NavBar />
      <section id="lectureList">
        <div className="lectureList__header">
          <h2>{MAIN.TITLE}</h2>
          {userinfos?.userData?.role === 3 && <LectureBtn />}
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
          <>
            <LectureCardWrapper
              lectures={filteredLectures}
              currentPage={currentPage}
              deleteLecture={deleteLecture}
            />
            <Paging
              numbers={pageNumbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </section>
    </>
  );
}
