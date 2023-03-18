import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "antd";

function GridCards(props) {
  useEffect(() => {
    console.log("test", props.lecture);
  }, []);
  return (
    <Col lg={12} md={8} xs={24}>
      <div className="lecture_list">
        <Link to={`/leture/${props.num}`}>
          <div className="lecture_list_class">
            <div className="class_tag">
              <h5 style={{ color: "black" }}>{props.lecture}</h5>
            </div>
            <h4 style={{ margin: "10px", color: "black" }}>{props.title}</h4>
            <h5 style={{ margin: "10px", color: "skyblue" }}>D-{props.dday}</h5>
          </div>
        </Link>
      </div>
    </Col>
  );
}

export default GridCards;
