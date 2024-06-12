import { Select, Tag } from "antd";
import React from "react";

const { Option } = Select;

const TagSelect = ({ lectures, selectedTags, onTagChange, onTagClose }) => {
  return (
    <div style={{ margin: "20px" }}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Select year and semester"
        onChange={onTagChange}
        value={selectedTags}
      >
        {lectures.map((lecture) => (
          <Option
            key={lecture.year + lecture.semester}
            value={lecture.year + lecture.semester}
          >
            {lecture.year + " " + lecture.semester}
          </Option>
        ))}
      </Select>
      <div style={{ marginTop: "10px" }}>
        {selectedTags.map((tag, index) => (
          <Tag key={index} closable onClose={() => onTagClose(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
