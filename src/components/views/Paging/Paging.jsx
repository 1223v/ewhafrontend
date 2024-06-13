import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import styles from "./Paging.module.css";
import { PagingNumber } from "./PagingNumber";

// 페이지네이션
export const Paging = ({
  numbers,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <section id={styles.paging}>
      {numbers?.length > 0 && (
        <>
          <IoChevronBackOutline 
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {numbers?.map((n) => (
            <PagingNumber 
              key={n} 
              txt={n} 
              selected={n === +currentPage}
              onClick={() => setCurrentPage(n)}
            />
          ))}
          <IoChevronForwardOutline 
            onClick={() => setCurrentPage(currentPage < numbers.length ? currentPage + 1 : currentPage)}
          />
        </>
      )}
    </section>
  )
}