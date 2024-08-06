import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IMAGES } from "../../../../constants/image";


function LectureFilterSelect({
  defaultTxt,
  value,
  selectedList,
  addTag,
  removeTag,
}) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = (item) => {
    return selectedList.some((selectedItem) => selectedItem.txt === item.txt);
  };

  const updateSelectedList = (item, isSelected) => {
    console.log(item, isSelected);

    // 선택 -> 미선택
    if (isSelected) {
      removeTag(item.txt);
    }
    // 미선택 -> 선택
    else {
      addTag(item);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="lectureFilterSelect" ref={containerRef}>
      <div
        className={`lectureFilterSelect__button ${isOpen && "active"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{defaultTxt}</span>
        <img src={IMAGES.arrow} alt="a" />
      </div>

      {/* selectbox */}
      <ul className={`lectureFilterSelect-box ${isOpen ? "active" : ""}`}>
        {value &&
          value.map((item) => {
            // 해당 태그가 선택되었는지 확인
            const selected = isSelected(item);
            return (
              <li
                className="lectureFilterSelect-box__item flex_row_center"
                key={item.id}
              >
                <span
                  className={`lectureFilterSelect-box__item__button ${
                    selected && "active"
                  }`}
                  onClick={() => updateSelectedList(item, selected)}
                ><FaCheck style={{color: 'white' }}/></span>
                <span className="lectureFilterSelect-box__item__txt">
                  {item.txt}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default LectureFilterSelect;
