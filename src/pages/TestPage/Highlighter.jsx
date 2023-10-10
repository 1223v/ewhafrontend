import React, { useState, useEffect } from "react";
import { Badge, Calendar } from "antd";
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const Highlighter = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const [highlightedTexts, setHighlightedTexts] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [tagAssignments, setTagAssignments] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    document.addEventListener("mouseup", autoHighlight);
    return () => {
      document.removeEventListener("mouseup", autoHighlight);
    };
  }, [highlightedTexts, currentId]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const autoHighlight = () => {
    const userSelection = window.getSelection();
    if (!userSelection.isCollapsed) {
      highlightSelection(userSelection);
      // 선택된 텍스트 영역 해제
      window.getSelection().removeAllRanges();
    }
  };

  const highlightSelection = (userSelection) => {
    const newHighlightedTexts = [...highlightedTexts];

    for (let i = 0; i < userSelection.rangeCount; i++) {
      const node = highlightRange(userSelection.getRangeAt(i));
      newHighlightedTexts.push({ text: node.innerText, id: node.id });
      const range = userSelection.getRangeAt(i);
      range.deleteContents();
      range.insertNode(node);
    }

    setHighlightedTexts(newHighlightedTexts);
  };

  const highlightRange = (range) => {
    const newNode = document.createElement("span");
    newNode.setAttribute("style", `background-color: ${getRandomColor()};`);
    newNode.setAttribute("id", `highlight-${currentId}`);
    setCurrentId(currentId + 1);

    newNode.appendChild(range.cloneContents());
    return newNode;
  };

  const removeHighlight = (id) => {
    const node = document.getElementById(id);
    if (!node) return; // 노드가 이미 없는 경우 함수 종료

    const childNodes = Array.from(node.getElementsByTagName("span")); // 중첩된 span 요소 찾기
    const childIds = childNodes.map((child) => child.id); // 중첩된 span 요소의 ID 추출

    // 원본 텍스트로 교체
    const contents = document.createTextNode(node.innerText);
    node.parentNode.replaceChild(contents, node);

    // 상태 업데이트
    const updatedHighlightedTexts = highlightedTexts.filter(
      (highlight) => highlight.id !== id && !childIds.includes(highlight.id) // 선택된 ID 및 중첩된 ID 제외
    );
    setHighlightedTexts(updatedHighlightedTexts);
  };

  const assignTag = (id, tag) => {
    if (tag !== "") {
      setTagAssignments((prevAssignments) => {
        let tagsForId = prevAssignments[id] || [];
        if (!tagsForId.includes(tag)) {
          tagsForId = [...tagsForId, tag];
        }
        return { ...prevAssignments, [id]: tagsForId };
      });

      // 태그를 selectedTags에 추가
      if (!selectedTags.includes(tag)) {
        setSelectedTags((prevTags) => [...prevTags, tag]);
      }
    }
  };

  const removeTag = (tagToRemove) => {
    // 해당 태그를 모든 ID에서 제거
    const updatedTagAssignments = { ...tagAssignments };
    for (const id in updatedTagAssignments) {
      updatedTagAssignments[id] = updatedTagAssignments[id].filter(
        (tag) => tag !== tagToRemove
      );
    }

    // tagAssignments 업데이트
    setTagAssignments(updatedTagAssignments);

    // selectedTags 업데이트
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToRemove));
  };

  const showHighlights = () => {
    return highlightedTexts.map((highlight, index) => {
      return (
        <div key={index}>
          <p onClick={() => highlightOrigin(highlight.id)}>{highlight.text}</p>
          <select
            value=""
            onChange={(e) => assignTag(highlight.id, e.target.value)}
          >
            <option value="">태그 선택...</option>
            <option value="filler">filler</option>
            <option value="backtracking">backtracking</option>
            {/* 원하는 만큼 추가 가능 */}
          </select>
          {/* 선택된 태그를 표시하는 요소 */}
          {tagAssignments[highlight.id] && (
            <p style={{ display: "inline-block", marginLeft: "10px" }}>
              선택된 태그:
              {tagAssignments[highlight.id].map((tag, tagIndex) => (
                <span key={tagIndex}>
                  {tag}
                  <button
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => removeTag(tag)}
                  >
                    x
                  </button>
                </span>
              ))}
            </p>
          )}
          <textarea placeholder="여기에 메모를 작성하세요..."></textarea>
          <button onClick={() => removeHighlight(highlight.id)}>x</button>
        </div>
      );
    });
  };

  const highlightOrigin = (id) => {
    const originHighlight = document.getElementById(id);
    if (originHighlight.style.border === "2px solid") {
      originHighlight.style.border = "none";
    } else {
      originHighlight.style.border = "2px solid";
    }
  };

  return (
    <div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <p>Lorem ipsum dolor sit...</p>
      </div>
      <div style={{ userSelect: "none" }}>
        <h4>하이라이트된 텍스트</h4>
        <div id="highlightArea">{showHighlights()}</div>
      </div>
      <Calendar cellRender={cellRender} style={{ height: "500px" }} />
    </div>
  );
};

export default Highlighter;

/*
const JsonType = {
    "highlights": [
      {
        "id": "highlight-1",
        "text": "Lorem ipsum",
        "color": "#FF5733",
        "tags": ["filler"],
        "memo": "Sample memo for this highlight"
      },
      {
        "id": "highlight-2",
        "text": "dolor sit",
        "color": "#33FF57",
        "tags": ["backtracking"],
        "memo": "Another sample memo"
      }
      // ... (다른 하이라이트 정보들)
    ]
  }
  */
