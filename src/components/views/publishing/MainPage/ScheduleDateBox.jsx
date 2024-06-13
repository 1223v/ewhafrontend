import React from "react";
import ReactApexChart from "react-apexcharts";
import theme from "../../../../style/theme/theme";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../../constants/image";
import "./Schedule.css";

// 메인페이지 - 일자별 일정 박스
function ScheduleDateBox({
  asId,
  lectureId,
  name,
  type,
  startDate,
  endDate,
  studentCount,
  doneCount
}) {
  const navigate = useNavigate()
  const options = {
    chart: {
      height: 10,
      type: "radialBar",
    },

    colors: ["#AFEDC8"],

    plotOptions: {
      radialBar: {
        track: {
          strokeWidth: "100%", // 그래프의 두께를 넓게 설정합니다.
        },
        hollow: {
          margin: 5,
          size: "25%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false, // 이름 레이블을 숨깁니다.
          },
          value: {
            color: "#70CD95",
            fontSize: "12px",
            fontWeight: 800,
            show: true,
            offsetY: 5, // Y축 위치를 중앙으로 설정합니다.
            offsetX: 0, // X축 위치를 중앙으로 설정합니다.
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: [""],
  };

  const series = [Math.floor((doneCount / studentCount) * 100)];

  const colors = [theme.colors.MainColor];

  return (
    <div className="scheduleDateBox" onClick={() => navigate(`/prob/detail/professor?as_no=${asId}&lecture_no=${lectureId}`)}>
      <div className="scheduleDateBox-box">
        {/* <div className="scheduleDateBox-box__line">
          <span className="scheduleDateBox__line__circle"></span>
          <p className="scheduleDateBox__line"></p>
        </div> */}
        <div className="scheduleDateBox-info">
          <span className="scheduleDateBox-info__date">
            <img src={IMAGES.calendar} alt="calendar"/>
            <span>{dayjs(startDate).format("MM.DD")} ~ {dayjs(endDate).format("MM.DD")}</span>
          </span>
          <span className="scheduleDateBox-info__name">{name}</span>
          <span className="scheduleDateBox-info__class">{type}</span>
          <span className="scheduleDateBox-info__complete">
            <span>{studentCount}</span>명 중 <span>{doneCount}</span>명 제출 완료
          </span>
        </div>
      </div>
      <div className="scheduleDateBox-chart">
        <ReactApexChart
          options={options}
          series={series}
          colors={colors}
          type="radialBar"
          height={180}
          width={160}
        />
      </div>
    </div>
  );
}

export default ScheduleDateBox;
