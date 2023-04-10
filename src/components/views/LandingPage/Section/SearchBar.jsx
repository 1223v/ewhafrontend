import React, { useState } from "react";
import styled from "styled-components";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const data = [
    { id: 1, title: "React" },
    { id: 2, title: "Vue.js" },
    { id: 3, title: "Angular" },
    { id: 4, title: "Ember.js" },
    { id: 5, title: "Backbone.js" },
  ];
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    props.handleSearchClick(results);
  };

  return (
    <div>
      <div className="search_bar">
        <Button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="아이디를 검색하세요."
        />
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;

const Button = styled.button`
  margin-top: 12px;
  margin-left: 30px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
