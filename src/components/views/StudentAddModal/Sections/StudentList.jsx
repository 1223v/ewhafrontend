import React, { useState } from "react";
import styled from "styled-components";

function StudentList({ onClose }) {
  const [Studentadd, setStudentadd] = useState("");
  useState = {
    checkedItems: new Map(),
  };
  const handleClose = () => {
    onClose?.();
  };
  const handleChange = (event) => {
    const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  };

  const checkedItems = Array.from(this.state.checkedItems.entries())
    .filter((item) => item[1])
    .map((item) => item[0]);

  const studentslist = [
    {
      num: 1,
      name: "김남형",
      major: "한일번역",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      num: 2,
      name: "조현식",
      major: "한일번역",
      email: "john.doe@example.com",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    },
    {
      num: 3,
      name: "Veronica Lodge",
      major: " Software Engineer",
      email: "veronica.lodge@example.com",
      image:
        "https://media.istockphoto.com/photos/portrait-of-smiling-mixed-race-woman-looking-at-camera-picture-id1319763830?b=1&k=20&m=1319763830&s=170667a&w=0&h=wE44n9yP1nrefeqv5DCl5mE3ouU01FNNHeZPR0yDCWA=",
    },
  ];
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
                              id="checkbox-all"
                              type="checkbox"
                              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                              name={student.name}
                              value
                              onChange={handleChange}
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
