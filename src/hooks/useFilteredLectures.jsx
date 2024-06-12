import { useEffect, useState } from "react";

const useFilteredLectures = (lectures, selectedTags, searchTerm) => {
  const [filteredLectures, setFilteredLectures] = useState([]);

  useEffect(() => {
    const filterLectures = () => {
      let filtered = lectures;

      if (selectedTags.length > 0) {
        filtered = filtered.filter((lecture) => {
          const lectureTags = [
            `${lecture.year} ${lecture.semester}`,
            `${lecture.major} ${lecture.separated}`,
          ];
          return selectedTags.some((tag) => lectureTags.includes(tag.txt));
        });
      }

      if (searchTerm) {
        filtered = filtered.filter((lecture) =>
          lecture.lecture_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredLectures(filtered);
    };

    filterLectures();
  }, [lectures, selectedTags, searchTerm]);

  return filteredLectures;
};

export default useFilteredLectures;
