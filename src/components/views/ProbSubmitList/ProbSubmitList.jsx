import React, { useEffect, useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";

function ProbSubmitList() {
  const people = [
    {
      name: "김남형",
      title: "한 일 번역",
      department: "2023-02-10 13:09:38",
      major: "한일번역",
      email: "jane.cooper@example.com",
      image: "https://cdn-icons-png.flaticon.com/512/17/17797.png",
      submit: "Submitted",
    },
    {
      name: "조현식",
      title: "한 러 통역",
      department: "2023-02-10 13:09:38",
      major: "한일번역",
      email: "john.doe@example.com",
      image: "https://cdn-icons-png.flaticon.com/512/17/17797.png",
      submit: "Not Submitted",
    },
    {
      name: "test",
      title: "한 미 통역",
      department: "2023-02-10 13:09:38",
      major: " 한미번역",
      email: "veronica.lodge@example.com",
      image: "https://cdn-icons-png.flaticon.com/512/17/17797.png",
      submit: "Not Submitted",
    },
  ];
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
                        제목 | 제출시간
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
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={person.image}
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
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {person.submit === "Submitted" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Submitted
                            </span>
                          )}
                          {person.submit !== "Submitted" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              No Submitted
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.major}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            FeedBack
                          </a>
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
