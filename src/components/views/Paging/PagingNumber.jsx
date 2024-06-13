import classNames from "classnames";
import styles from "./Paging.module.css";

// 페이지네이션 - 페이지 숫자
export const PagingNumber = ({ 
  txt, 
  selected, 
  onClick,
}) => {
  return (
    <span 
      className={classNames(styles.pagingNum, { [styles.selected]: selected })}
      onClick={onClick}
    >{txt}</span>
  )
}