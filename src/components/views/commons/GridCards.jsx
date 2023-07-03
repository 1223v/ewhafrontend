import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';

function GridCards(props) {
	const userinfos = useSelector((state) => state.user);
	useEffect(() => {
		console.log('test', props.lecture);
	}, []);

	return (
		<Col lg={12} md={8} xs={24}>
			<div className="lecture_list">
				<Link to={`/prob?lecture_no=${props.num}`}>
					<div className="lecture_list_class">
						<div>
							<h5 style={{ margin: '10px', color: 'skyblue' }}>
								{props.year} {props.semester}
								{userinfos?.userData?.role === 3 ? (
									<div
										style={{ color: 'black', display: 'flex', float: 'right' }}
									>
										<Link
											to={`/lecture_mod?lecture_no=${props.num}`}
											style={{ color: '#05422b' }}
										>
											<BiSolidPencil size="20" />
										</Link>{' '}
										<Link
											to={`/lecture_mod?lecture_no=${props.num}`}
											style={{ color: '#772B31' }}
										>
											<BiSolidTrash size="20" />
										</Link>
									</div>
								) : (
									''
								)}
							</h5>
						</div>

						<h3 style={{ margin: '10px', color: 'black' }}>{props.lectureName}</h3>
						<div style={{ margin: '8px', color: 'gray' }}>
							{props.major} {props.separated}
						</div>
						<div className="class_tag">
							<h5 style={{ color: 'black' }}>{props.professor}교수님</h5>
						</div>
					</div>
				</Link>
			</div>
		</Col>
	);
}

export default GridCards;