import { useEffect, useState } from "react";

const useTransformLectureData = (lectures) => {
  const [semesters, setSemesters] = useState([]);
  const [separateds, setSeparateds] = useState([]);

  useEffect(() => {
    const transformData = () => {
      const semesterSet = new Set();
      const separatedSet = new Set();

      lectures.forEach((lecture) => {
        const semesterTag = `${lecture.year} ${lecture.semester}`;
        const separatedTag = `${lecture.major} ${lecture.separated}`;

        semesterSet.add(semesterTag);
        separatedSet.add(separatedTag);
      });

      const semesterArray = Array.from(semesterSet).map((tag, index) => ({
        id: index,
        txt: tag,
        tagColor: "gr",
      }));

      const separatedArray = Array.from(separatedSet).map((tag, index) => ({
        id: index,
        txt: tag,
        tagColor: "bl",
      }));

      setSemesters(semesterArray);
      setSeparateds(separatedArray);
    };

    if (lectures.length > 0) {
      transformData();
    }
  }, [lectures]);

  return { semesters, separateds };
};

export default useTransformLectureData;
