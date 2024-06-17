import dayjs from "dayjs";
import React from "react";
import { IMAGES } from "../../../../constants/image";

function ScheduleDateBoxInfo({ name, type, startDate, endDate }) {
  return (
    <>
      <span className="scheduleDateBox-info__date">
        <img src={IMAGES.calendar} alt="calendar" />
        <span>
          {dayjs(startDate).format("MM.DD")} ~ {dayjs(endDate).format("MM.DD")}
        </span>
      </span>
      <span className="scheduleDateBox-info__name">{name}</span>
      <span className="scheduleDateBox-info__class">{type}</span>
    </>
  );
}

export default ScheduleDateBoxInfo;
