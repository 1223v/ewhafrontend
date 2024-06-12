import React, { useEffect } from "react";
import { MAIN } from "../../../../constants/text";
import useTagManager from "../../../../hooks/useTagManager";
import LectureFilterList from "./LectureFilterList";
import LectureFilterSearch from "./LectureFilterSearch";
import LectureFilterSelect from "./LectureFilterSelect";

// 메인페이지 - 강의 필터링
function LectureFilter({
  semesters,
  separateds,
  setSearchTerm,
  setSelectedTags,
}) {
  const {
    tags: selectedTags,
    addTag,
    removeTag,
    clearTags,
  } = useTagManager([]);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  useEffect(() => {
    setSelectedTags(selectedTags);
  }, [selectedTags, setSelectedTags]);

  return (
    <section className="lectureFilter">
      <div className="lectureFilter__wrapper">
        <div className="lectureFilter__wrapper-select">
          <LectureFilterSelect
            defaultTxt={MAIN.SELECT.semester}
            value={semesters}
            selectedList={selectedTags}
            addTag={addTag}
            removeTag={removeTag}
          />
          <LectureFilterSelect
            defaultTxt={MAIN.SELECT.seperated}
            value={separateds}
            selectedList={selectedTags}
            addTag={addTag}
            removeTag={removeTag}
          />
        </div>
        <LectureFilterSearch onChange={handleSearch} />
      </div>
      {selectedTags?.length > 0 && (
        <LectureFilterList
          tags={selectedTags}
          onRemove={removeTag}
          onClear={clearTags}
        />
      )}
    </section>
  );
}

export default LectureFilter;
