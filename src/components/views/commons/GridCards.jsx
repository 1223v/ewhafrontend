import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Axios from 'axios';

function GridCards(props) {
	const userinfos = useSelector((state) => state.user);
	useEffect(() => {
		console.log('test', props.lecture);
	}, []);

	const onDeleteButton = () => {
		if (window.confirm('삭제하시겠습니까?')) {
			Axios.get(
				`https://edu-trans.ewha.ac.kr:8443/api/lecture/delete?lecture_no=${props.num}`,
				{
					withCredentials: true,
				}
			).then((response) => {
				// 요청이 성공한 경우의 처리
				alert(response.data.msg);
			});
		}
	};

	return (
		<Col lg={12} md={8} xs={24}>
			<div className="lecture_list">
				<div className="lecture_list_class">
					<div>
						<h5 style={{ margin: '10px', color: 'skyblue' }}>
							{props.year} {props.semester}
							{userinfos?.userData?.role === 3 ? (
								<div style={{ color: 'black', display: 'flex', float: 'right' }}>
									<Link
										to={`/lecture_mod?lecture_no=${props.num}`}
										state={{num:props.num}}
										style={{ color: '#05422b' }}
									>
										<BiSolidPencil size="20" />
									</Link>{' '}
									<button
										onClick={onDeleteButton}
										style={{
											color: '#772B31',
											border: '0',
											outline: '0',
											background: 'none',
										}}
									>
										<BiSolidTrash size="20" />
									</button>
								</div>
							) : (
								''
							)}
						</h5>
					</div>
					<Link to={`/prob?lecture_no=${props.num}`} state={{num:props.num}}>
						<h3 style={{ margin: '10px', color: 'black' }}>{props.lectureName}</h3>
						<div style={{ margin: '8px', color: 'gray' }}>
							{props.major} {props.separated}
						</div>
						<div className="class_tag">
							<h5 style={{ color: 'black' }}>{props.professor}교수님</h5>
						</div>
					</Link>
				</div>
			</div>
		</Col>
	);
}

export default GridCards;