import { useState } from "react";

const useTagManager = (initialTags = []) => {
  const [tags, setTags] = useState(initialTags);

  const addTag = (newTag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const removeTag = (txtToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.txt !== txtToRemove));
  };

  const clearTags = () => {
    setTags([]);
  };

  return {
    tags,
    addTag,
    removeTag,
    clearTags,
  };
};

export default useTagManager;
