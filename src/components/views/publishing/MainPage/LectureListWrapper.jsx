import React, { useEffect, useState } from 'react';
import useDeleteLecture from '../../../../hooks/useDeleteLecture';
import useFilteredLectures from '../../../../hooks/useFilteredLectures';
import useLectures from '../../../../hooks/useLectures';
import { usePagenation } from '../../../../hooks/usePagenation';
import useTransformLectureData from '../../../../hooks/useTransformLectureData';
import LoadingPage from '../../Loading/LoadingPage';
import { Paging } from '../../Paging/Paging';
import LectureCardWrapper from "./LectureCardWrapper";
import LectureFilter from "./LectureFilter";
import "./LectureList.css";


function LectureListWrapper () {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { lectures, loading, error, fetchLectures } = useLectures();
  const deleteLecture = useDeleteLecture(fetchLectures);
  
  const { filteredLectures } = useFilteredLectures(lectures, selectedTags, searchTerm);
  const { semesters, separateds } = useTransformLectureData(lectures);
  // console.log(lectures, semesters, separateds);

  const { pageNumbers, currentPage, setCurrentPage, calculatePageNumbers } =
    usePagenation(lectures.length);

  useEffect(() => {
    // if (filteredLectures.length !== lectures.length) {
      calculatePageNumbers(filteredLectures.length);
      setCurrentPage(1);
    // }
  }, [filteredLectures]);

  

  return (
    <div>
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
    </div>
  )
};

export default LectureListWrapper;