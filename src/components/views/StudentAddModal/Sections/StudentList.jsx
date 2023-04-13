import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function StudentList(props) {
  const [studentslist, setstudentslist] = useState([]);
  // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기

  const handleClose = () => {
    props.onClose?.();
    props.onData(props.Checklist);
    console.log(props.Checklist);
  };

  const onCheckedElement = (checked, item) => {
    if (checked) {
      props.setCheckedList([...props.Checklist, item]);
    } else if (!checked) {
      props.setCheckedList(props.Checklist.filter((el) => el !== item));
    }
  };

  useEffect(() => {
    setstudentslist(props.studentslist);
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div
          className="overflow-y-auto overflow-x-hidden"
          style={{ height: "400px" }}
        >
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      No
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">
                        이름 / Email
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                    >
                      전공
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentslist.map((student, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                              value={student.email}
                              id={student.major}
                              checked={
                                props.Checklist.includes(student.email)
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                onCheckedElement(
                                  e.target.checked,
                                  e.target.value
                                );
                              }}
                            />
                            <label htmlFor="checkbox" className="sr-only">
                              Checkbox
                            </label>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {student.name}
                          <br />
                          {student.email}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                          {student.major}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleClose}>+ 추가하기</Button>
    </div>
  );
}

export default StudentList;
const Button = styled.button`
  margin: 15px auto auto;
  display: block;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #2e462f;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;
