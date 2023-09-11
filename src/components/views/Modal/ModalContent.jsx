// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Axios from "axios";
// import { useSelector } from "react-redux";
// import { API_URL } from "../../Config";

// function ModalContent({ weeklistcontent, lecture_no, userNum }) {
//   let navigate = useNavigate();
//   const userinfos = useSelector((state) => state.user);

//   useEffect(() => {
//     console.log(userNum);
//   }, []);

//   const onDeleteButton = (event) => {
//     if (window.confirm("삭제하시겠습니까?")) {
//       const assignmentNumber = event.currentTarget.getAttribute("data");

//       Axios.get(
//         `${API_URL}api/prob/delete?lecture_no=${lecture_no}&as_no=${assignmentNumber}`,
//         {
//           withCredentials: true,
//         }
//       )
//         .then((response) => {
//           // 요청이 성공한 경우의 처리
//           if (response.data.probdeleteSuccess) {
//             alert("과제가 삭제되었습니다.");
//             navigate("/");
//           } else {
//             alert("과제 삭제에 실패했습니다. 다시 확인해주세요.");
//             navigate("/");
//           }
//         })
//         .catch((error) => {
//           alert("과제 삭제에 실패했습니다. 다시 확인해주세요.");
//           navigate("/");
//         });
//     }
//   };

//   return (
//     <div className="flex flex-col overflow-scroll" style={{ height: "500px" }}>
//       <div>
//         <div className="p-1.5 w-full inline-block align-middle">
//           <div className="overflow-hidden border rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 {userinfos?.userData?.role === 1 ? (
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center">
//                         과제명
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M17 13l-5 5m0 0l-5-5m5 5V6"
//                           />
//                         </svg>
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
//                     >
//                       제출
//                     </th>

//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
//                     >
//                       제출
//                       <br />
//                       확인
//                     </th>
//                   </tr>
//                 ) : userinfos?.userData?.role === 2 ? (
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center">
//                         과제명
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M17 13l-5 5m0 0l-5-5m5 5V6"
//                           />
//                         </svg>
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
//                     >
//                       수정
//                     </th>

//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
//                     >
//                       제출
//                       <br />
//                       확인
//                     </th>
//                   </tr>
//                 ) : userinfos?.userData?.role === 3 ? (
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
//                     >
//                       <span className="inline-flex items-center">
//                         과제명
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M17 13l-5 5m0 0l-5-5m5 5V6"
//                           />
//                         </svg>
//                       </span>
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
//                     >
//                       수정
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
//                     >
//                       삭제
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
//                     >
//                       제출
//                       <br />
//                       확인
//                     </th>
//                   </tr>
//                 ) : (
//                   ""
//                 )}
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {weeklistcontent?.map((week, index) => (
//                   <React.Fragment key={index}>
//                     {userinfos?.userData?.role === 1 ? (
//                       <tr>
//                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                           {week.as_name}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium float-right text-right whitespace-nowrap">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_submit?lecture_no=${lecture_no}&as_no=${week.assignment_no}&user_no=${userNum}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                               userNo: userNum,
//                             }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="currentColor"
//                               className="w-6 h-6"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                               />
//                             </svg>
//                           </Link>
//                         </td>

//                         <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_feedback?as_no=${week.assignment_no}&lecture_no=${lecture_no}&user_no=${userNum}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                               userNo: userNum,
//                             }}
//                           >
//                             <div className="text-blue-500 hover:text-blue-700">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
//                                 />
//                               </svg>
//                             </div>
//                           </Link>
//                         </td>
//                       </tr>
//                     ) : userinfos?.userData?.role === 2 ? (
//                       <tr>
//                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                           {week.as_name}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium float-right text-right whitespace-nowrap">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_mod?lecture_no=${lecture_no}&as_no=${week.assignment_no}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                             }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="currentColor"
//                               className="w-6 h-6"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                               />
//                             </svg>
//                           </Link>
//                         </td>

//                         <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_submit_list?as_no=${week.assignment_no}&lecture_no=${lecture_no}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                               userNo: userNum,
//                             }}
//                           >
//                             <div className="text-blue-500 hover:text-blue-700">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
//                                 />
//                               </svg>
//                             </div>
//                           </Link>
//                         </td>
//                       </tr>
//                     ) : userinfos?.userData?.role === 3 ? (
//                       <tr>
//                         <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                           {week.as_name}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium float-right text-right whitespace-nowrap">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_mod?lecture_no=${lecture_no}&as_no=${week.assignment_no}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                             }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth="1.5"
//                               stroke="currentColor"
//                               className="w-6 h-6"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                               />
//                             </svg>
//                           </Link>
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto">
//                           <Button
//                             onClick={onDeleteButton}
//                             data={week.assignment_no}
//                           >
//                             <div className="text-red-500 hover:text-red-700">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                                 width="20"
//                                 height="20"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                                 />
//                               </svg>
//                             </div>
//                           </Button>
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto">
//                           <Link
//                             className="text-green-500 hover:text-green-700"
//                             to={`/prob_submit_list?as_no=${week.assignment_no}&lecture_no=${lecture_no}`}
//                             state={{
//                               num: lecture_no,
//                               asnum: week.assignment_no,
//                             }}
//                           >
//                             <div className="text-blue-500 hover:text-blue-700">
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
//                                 />
//                               </svg>
//                             </div>
//                           </Link>
//                         </td>
//                       </tr>
//                     ) : (
//                       ""
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ModalContent;

// const Button = styled.button`
//   font-size: 14px;
//   border: none;
//   color: #3b82f6;
//   cursor: pointer;
//   background-color: transparent;
// `;
