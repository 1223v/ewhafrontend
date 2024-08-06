import React, { useState } from 'react';
import { IMAGES } from '../../../../constants/image';
import { MYPAGE } from '../../../../constants/text';

// 마이페이지 - 학생 강의신청목록 필터링 박스
function FilterBox({
  selectedStatus,
  setSelectedStatus
}) {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <div className="filterBox__select">
      <div
        className={`infoTableData__select__button ${selectOpen && "active"}`}
        onClick={() => setSelectOpen((prev) => !prev)}
      >
        <span>{MYPAGE.FILTER[selectedStatus].txt}</span>
        <img src={IMAGES.arrow} alt="a" />
      </div>

      {/* selectbox */}
      <ul className={`infoTableData__select__button-box ${selectOpen ? "active" : ""}`}>
        <li
          className="infoTableData__select__button-box__item"
        >
          {
            MYPAGE.FILTER.map((item) => 
              <span 
                key={item.id} 
                className="infoTableData__select__button-box__item__txt sm"
                onClick={() => {
                  setSelectedStatus(item.id);
                  setSelectOpen(false);
                }}
              >
                {item.txt}
              </span>
            )
          }
        </li>
      </ul>
    </div>
  )
}

export default FilterBox