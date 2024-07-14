// 페이지네이션 custom hook
import { useCallback, useEffect, useState } from 'react';

export const usePagenation = (initialLength, pageSize = 6) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageNumbers, setPageNumbers] = useState([]);

  const calculatePageNumbers = useCallback((len) => {
    const pages = Array.from(
      { length: Math.floor(len / pageSize) 
        + (len % pageSize === 0 ? 0 : 1) 
      },
      (_, i) => i + 1
    );
    setPageNumbers(pages);
  }, []);

  useEffect(() => {
    calculatePageNumbers(initialLength);
  }, [initialLength, calculatePageNumbers]);

  const nextPage = () => setCurrentPage((prev) => prev + 1); // 다음 페이지
  const prevPage = () => setCurrentPage((prev) => prev - 1); // 이전 페이지

  return { nextPage, prevPage, currentPage, setCurrentPage, pageNumbers, calculatePageNumbers };
}