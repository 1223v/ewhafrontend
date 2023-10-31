import { Col, Dropdown, Space } from 'antd';
import Axios from 'axios';
import React from 'react';
import { BiSolidPencil, BiSolidTrash } from 'react-icons/bi';
import { PiDotsThreeBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../../Config';

function GridCards(props) {
    const userinfos = useSelector((state) => state.user);
    const onDeleteButton = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            Axios.get(`${API_URL}api/lecture/delete?lecture_no=${props.num}`, {
                withCredentials: true,
            }).then((response) => {
                // 요청이 성공한 경우의 처리
                alert(response.data.msg);
                Axios.get(`${API_URL}api/lecture/list`, {
                    withCredentials: true,
                }).then((response) => {
                    // 요청이 성공한 경우의 처리
                    props.setLectures(response.data.lecturelist);
                    //props.setLectureStatus(!props.LectureStatus);
                });
            });
        }
    };
    const items = [
        {
            label: (
                <StyleLink
                    to={`/lecture_mod?lecture_no=${props.num}`}
                    style={{ display: 'flex' }}
                >
                    <BiSolidPencil
                        size="15"
                        style={{ margin: '3px 10px 0px 0px' }}
                    />
                    수정하기
                </StyleLink>
            ),
            key: '0',
        },
        {
            label: (
                <DeleteBtn onClick={onDeleteButton}>
                    <BiSolidTrash
                        size="15"
                        style={{ margin: '3px 10px 0px 0px' }}
                    />
                    삭제하기
                </DeleteBtn>
            ),
            key: '1',
        },
    ];

    return (
        <Col lg={12} md={12} xs={24}>
            <div className="lecture_list">
                <div className="lecture_list_class">
                    <div>
                        <h5 style={{ margin: '10px', color: 'skyblue' }}>
                            {props.year} {props.semester}
                            {userinfos?.userData?.role === 3 && (
                                <div
                                    style={{
                                        color: 'black',
                                        display: 'flex',
                                        float: 'right',
                                    }}
                                >
                                    <Dropdown
                                        menu={{ items }}
                                        trigger={['click']}
                                    >
                                        <StyleLink
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <BackgroundSpace>
                                                <PiDotsThreeBold size="20" />
                                            </BackgroundSpace>
                                        </StyleLink>
                                    </Dropdown>
                                </div>
                            )}
                        </h5>
                    </div>
                    {userinfos?.userData?.role === 3 ? (
                        <Link
                            to={`/prob/list/professor?lecture_no=${props.num}`}
                        >
                            <h3 style={{ margin: '10px', color: 'black' }}>
                                {props.lectureName}
                            </h3>
                            <div style={{ margin: '8px', color: 'gray' }}>
                                {props.major} {props.separated}
                            </div>
                            <div className="class_tag">
                                <Tagh5>{props.professor}교수님</Tagh5>
                            </div>
                        </Link>
                    ) : (
                        <Link to={`/prob/list/student?lecture_no=${props.num}`}>
                            <h3 style={{ margin: '10px', color: 'black' }}>
                                {props.lectureName}
                            </h3>
                            <div style={{ margin: '8px', color: 'gray' }}>
                                {props.major} {props.separated}
                            </div>
                            <div className="class_tag">
                                <Tagh5>{props.professor}교수님</Tagh5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </Col>
    );
}

export default GridCards;

const Tagh5 = styled.h5`
    margin: 0px;
    color: black;
`;

const StyleLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    cursor: pointer;
`;

const BackgroundSpace = styled(Space)`
    text-decoration: none;
    background: #85889914;
    padding: 2px 2px 0px 2px;
    border-radius: 6px;
`;

const DeleteBtn = styled.button`
    color: #772b31;
    border: 0;
    outline: 0;
    background: none;
    padding: 0px;
`;
