import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../../constants/image";
import { MAIN } from "../../../../constants/text";
import useDebounce from "../../../../hooks/useDebounce";

// 메인페이지 - 강의 검색 input
function LectureFilterSearch({ onChange }) {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500ms 지연

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  return (
    <div className="lectureFilterSearch">
      <img src={IMAGES.search} alt="search" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={MAIN.PLACEHOLDER}
      />
    </div>
  );
}

export default LectureFilterSearch;
