import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../LoginPage/LoginPage.css";  // Ensure this path correctly points to your CSS file
import background from "../LoginPage/background.mp4";  // Ensure this path is correct for the video file

function FindIdPage() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [major, setMajor] = useState("한일번역");
    const [role, setRole] = useState("교수");
    const [users, setUsers] = useState([]);  // State to hold the list of users

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onMajorHandler = (event) => {
        setMajor(event.currentTarget.value);
    };

    const onRoleHandler = (event) => {
        setRole(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (name === "") {
            alert("이름을 입력해주세요.");
            return;
        }

        let body = {
            name: name,
            major: major,
            perm: role,
        };

        Axios.post("/api/user/find_id", body, {
            withCredentials: true,
        }).then((response) => {
            if (response.data.Success) {
                setUsers(response.data.user_id);  // Set the array of users
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        }).catch((error) => {
            alert("오류가 발생했습니다: " + error.message);
        });
    };

    const handleBackClick = () => {
        navigate('/login');
    };

    return (
        <div className="register-wrapper">
            <div className="bg-video">
                <video className="bg-video__content" autoPlay muted loop>
                    <source src={background} type="video/mp4" />
                </video>
            </div>
            <div className="register-wrapper2">
                <div className="register-wrapper-padding">
                    <h2>아이디 찾기</h2>
                    <form onSubmit={onSubmitHandler} style={{ marginTop: "10%" }}>
                        <div className="id-text">이름</div>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Name"
                            className="input-style"
                            value={name}
                            onChange={onNameHandler}
                        />
                        <div className="id-text">
                            <label htmlFor="join-dp">전공</label>
                            <div className="input-area">
                                <select
                                    className="major_chk"
                                    id="join-dp"
                                    name="major"
                                    value={major}
                                    onChange={onMajorHandler}
                                >
                                    <option>한일번역</option>
                                    <option>한일통역</option>
                                    <option>한중번역</option>
                                    <option>한중통역</option>
                                    <option>한영번역</option>
                                    <option>한영통역</option>
                                    <option>한불번역</option>
                                    <option>한불통역</option>
                                </select>
                            </div>
                        </div>
                        <div className="id-text">
                            <label htmlFor="join-type">분류</label>
                            <div className="input-area">
                                <select
                                    className="job_chk"
                                    id="join-type"
                                    name="perm"
                                    value={role}
                                    onChange={onRoleHandler}
                                >
                                    <option>교수</option>
                                    <option>학생</option>
                                    <option>조교</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <input type="submit" value="아이디 찾기" className="input-style Find_id_button-style" />
                            <button type="button" onClick={handleBackClick} className="input-style Find_id_button-style">뒤로가기</button>
                        </div>
                    </form>
                    {users.length > 0 && (
                        <div>
                            <h3>아이디 목록:</h3>
                            <ul>
                                {users.map((user, index) => (
                                    <li key={index}>Email: {user.email}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FindIdPage;
