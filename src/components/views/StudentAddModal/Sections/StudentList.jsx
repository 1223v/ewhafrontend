import React from "react";

function StudentList() {
  return (
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
                <React.Fragment>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <div className="flex items-center h-5">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      조현식
                      <br />
                      1223v@naver.com
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                      한일 번역
                    </td>
                  </tr>
                </React.Fragment>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
