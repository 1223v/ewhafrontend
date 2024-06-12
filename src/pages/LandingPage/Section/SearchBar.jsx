import React, { useEffect, useState } from "react";
import styled from "styled-components";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchBar({ onChange }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500ms 지연

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  return (
    <div>
      <div className="search_bar">
        <Button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="강의를 검색하세요."
        />
      </div>
    </div>
  );
}

export default SearchBar;

const Button = styled.button`
  margin-top: 8px;
  margin-left: 20px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
