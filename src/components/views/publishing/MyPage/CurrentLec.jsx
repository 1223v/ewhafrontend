import { MYPAGE } from "../../../../constants/text";
import { CurrentLecTable } from "./CurrentLecTable";

import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchLectureRequest from "../../../../hooks/useFetchLectureRequest";
import useLectures from "../../../../hooks/useLectures";
import LoadingPage from "../../Loading/LoadingPage";
import "./CurrentLec.css";
import FilterBox from "./FilterBox";
import RequestLecTable from "./RequestLecTable";

// 마이페이지 - 진행 중인 강의
export const CurrentLec = () => {
  const  { lectures, loading, error } = useLectures();
  const { lectures: requestList, loading: requestLoading } = useFetchLectureRequest();
  const userinfos = useSelector((state) => state.user);

  const [selectedStatus, setSelectedStatus] = useState(0);
  const filteredRequests = (requests) => {
    console.log(requests, selectedStatus);
    if (selectedStatus) return requests.filter(el => +(el.status) + 1 === MYPAGE.FILTER[selectedStatus].id);
    else return requests;
  };

  return (
    <>
    {loading || requestLoading ? (
      <LoadingPage />
    ) : (
      <section id="currentLec">
          <div className="currentLec-header">
            {
              userinfos?.userData?.role === 3 ?
              <span>{MYPAGE.TITLE.lec}</span> :
              (
                <div className="currentLec-header__student">
                  <span>{MYPAGE.TITLE.regist}</span>
                  <FilterBox 
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                  />
                </div>
              )
            }
          </div>
        {
          userinfos?.userData?.role === 3 ?
          <CurrentLecTable 
            lectures={lectures}
          /> :
          <RequestLecTable 
            lectures={filteredRequests(requestList)}
          />
        }
      </section>
    )}
    </>
  )
}