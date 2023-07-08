import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';

function Prob() {
	const location = useLocation();
	const data = location.state;
	let navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [Weeklist, setWeeklist] = useState('');
	const [Problist, setProblist] = useState([]);

	useEffect(() => {
		Axios.get(`https://edu-trans.ewha.ac.kr:8443/api/prob/list?lecture_no=${data?.num}`, {
			withCredentials: true,
		})
			.then((response) => {
				// 요청이 성공한 경우의 처리
				setProblist(response.data);
				
			})
			.catch((error) => {
				// 요청이 실패한 경우의 처리
				console.error(error);
				navigate(-1);
			});
	}, []);
	
	useEffect(()=>{
		
		console.log(Problist);
		
	},[Problist]);

	const onClickButton = (event) => {
		const week_number = event.target.getAttribute('data');
		console.log(Problist[week_number - 1].list.length);
		if(Problist[week_number - 1].list.length !== 0){
			setIsOpen(true);
			setWeeklist(Problist[week_number - 1].list);
		}else{
			alert("과제가 존재하지 않습니다. 새로 만들어주세요.");
		}
		
	};

	return (
		<div>
			<NavBar />

			<div className="flex flex-col">
				<div className="overflow-x-hidden">
					<div className="p-1.5 w-full inline-block align-middle">
						<div className="overflow-hidden border rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											No
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-4 h-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={1}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17 13l-5 5m0 0l-5-5m5 5V6"
												/>
											</svg>
										</th>

										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											<span className="inline-flex items-center">
												주차
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-4 h-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M17 13l-5 5m0 0l-5-5m5 5V6"
													/>
												</svg>
											</span>
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
										>
											추가
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
										>
											과제
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{Problist?.map((week, index) => (
										<React.Fragment key={index}>
											<tr>
												<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
													{week.number}
												</td>

												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{week.number}주차 과제
												</td>
												<td className="px-6 py-4 text-sm font-medium float-right text-right whitespace-nowrap">
													<Link
														to="/prob_add"
														className="text-green-500 hover:text-green-700"
													>
														<svg
															fill="none"
															className="object-center"
															stroke="currentColor"
															strokeWidth="1.5"
															width="20"
															height="20"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
															aria-hidden="true"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
															></path>
														</svg>
													</Link>
												</td>
												<td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto">
													<Button
														onClick={onClickButton}
														data={week.number}
													>
														확인
													</Button>
												</td>
											</tr>
										</React.Fragment>
									))}
								</tbody>
								{isOpen && (
									<Modal
										open={isOpen}
										weeklist={Weeklist}
										lecture_no={data?.num}
										onClose={() => {
											setIsOpen(false);
										}}
									/>   
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Prob;

const Button = styled.button`
	font-size: 14px;
	border: none;
	color: #3b82f6;
	cursor: pointer;
	background-color: transparent;
`;