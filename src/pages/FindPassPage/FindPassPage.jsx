import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import "../LoginPage/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import background from "../LoginPage/background.mp4";

function FindIdPage(){
    let navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Emailactive, setEmailactive] = useState(true);


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Email === "") {
            setEmailactive(!Emailactive);
            return alert("이메일을 입력해주세요.");
        }

        let body = {
            email: Email,

        };

        Axios.post("/api/user/findpass", body, {
            withCredentials: true,
        }).then((response) => {
            if (response.data.Success) {
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
        <div>
            <div className="bg-video">
                <video className="bg-video__content" autoPlay muted loop>
                    <source src={background} type="video/mp4" />
                </video>
            </div>
            <div className="register-wrapper">
                <div className="register-wrapper2">
                    <div className="register-wrapper-padding">
                        <h2>
                            <Link to="/login">
                                <img
                                    alt="logo"
                                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCAVka%2FbtrY2o9XY6e%2Fld0UENc2vedDW60ngkDyI1%2Fimg.jpg"
                                    width="50%"
                                    height="50%"
                                    style={{
                                        margin: "auto",
                                        display: "block",
                                        marginBottom: "10%",
                                    }}
                                />
                            </Link>
                        </h2>
                        <h2>비밀번호 찾기</h2>

                        <form onSubmit={onSubmitHandler} id="register-form" style={{ marginTop: "10%" }}>
                            <div className="email_chk">
                                <div className="id-text">이메일</div>
                                <input
                                    type="email"
                                    name="userEmail"
                                    placeholder="Email"
                                    className="input-style"
                                    value={Email}
                                    onChange={onEmailHandler}
                                />
                                <div className={"error-tag" + (Emailactive ? "" : " active")}>
                                    이메일을 입력해주세요.
                                </div>
                            </div>
                            <div className="form-buttons">
                            <input type="submit" value="비밀번호 찾기" className="input-style Find_id_button-style" />
                            <button type="button" onClick={handleBackClick} className="input-style Find_id_button-style">뒤로가기</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindIdPage;
