import React, { useEffect, useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../Config";

function ProbSubmitList() {
  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [People, setPeople] = useState([]);

  useEffect(() => {
    Axios.get(
      `${API_URL}api/probsubmit/list?lecture_no=${data.num}&as_no=${data.asnum}`,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        // 요청이 성공한 경우의 처리
        console.log(response.data.userList);
        setPeople(response.data.userList);
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        navigate(-1);
      });
  }, []);

  return (
    <div>
      <NavBar />

      <div style={{ marginTop: "50px" }}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto grid place-items-center lg:px-8">
            <div className="py-2 align-middle inline-block min-w-3/5 sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        이름 | Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        전공 | 제출시간
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        제출여부
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        전공
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {People.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/17/17797.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {person.major}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {person.check !== "No" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Submitted
                            </span>
                          )}
                          {person.check === "No" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              No Submitted
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.major}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {person.check !== "No" && (
                            <Link
                              to={`/prob_feedback?as_no=${data.asnum}&lecture_no=${data.num}&user_no=${person.user_no}`}
                              state={{
                                num: data.num,
                                asnum: data.asnum,
                                userNo: person.user_no,
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              FeedBack
                            </Link>
                          )}
                          {person.check === "No" && <div>없음</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProbSubmitList;
