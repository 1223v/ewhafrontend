import React from 'react';
import { usePagenation } from '../../../../hooks/usePagenation';
import { Paging } from '../../Paging/Paging';
import { RequestLecTd } from './RequestLecTd';
import RequestLecTh from './RequestLecTh';

function RequestLecTable({ lectures }) {
  const { pageNumbers, currentPage, setCurrentPage } =
    usePagenation(lectures?.length, 5);

    console.log(lectures);
  return (
    <>
      <table className="currentLecTable">
        <thead>
          <RequestLecTh />
        </thead>
        <tbody>
          {
            lectures
            ?.filter((_, id) => Math.floor(id / 5) === currentPage - 1)
            ?.map((lec, idx) => (
              <React.Fragment key={lec.lecture_no}>
                <RequestLecTd 
                  idx={(currentPage - 1) * 5 + (idx + 1)}
                  lec_no={lec.lecture_no}
                  lecture_name={lec.lecture_name}
                  professor={lec.professor}
                  lecClass={lec.class}
                  status={lec.status}
                />
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
      {lectures?.length > 6 &&
        <Paging
          numbers={pageNumbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </>
  )
}

export default RequestLecTable