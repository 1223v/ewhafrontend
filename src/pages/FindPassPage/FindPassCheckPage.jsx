import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import background from "../LoginPage/background.mp4";

const FindPassCheck = () => {
    const routeLocation = useLocation();  // Renamed to routeLocation to avoid conflict
    const navigate = useNavigate();
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Passactive, setPassActive] = useState(false);
    const [Isactive, setIsActive] = useState(false);


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
        setIsActive(Password !== event.currentTarget.value);  // This line checks if the password and confirmation match
    };

    const onSubmitHandler = (event) => {
            event.preventDefault();
            if (Password !== ConfirmPassword) {
                alert('Passwords do not match!');
                setPassActive(true);
                setIsActive(true);
                return;
            }
        
            const searchParams = new URLSearchParams(routeLocation.search);
            const email = searchParams.get('email');
            const code = searchParams.get('code');
        
            if (!email || !code) {
                console.error('Email or code is missing from the URL parameters.');
                return;
            }
        
            axios.post(`/api/user/findpass_check`, {
                email: email,
                code: code,
                password: Password
            })
            .then(response => {
                const { location, msg, emailcheckSuccess } = response.data;
                alert(msg);
        
                if (emailcheckSuccess) {
                    console.log('Email verification successful.');
                    navigate('/login'); // 여기를 변경하여 emailcheckSuccess가 true일 때 로그인 페이지로 이동하도록 합니다.
                } else {
                    console.log('Email verification failed.');
                    navigate(location);  // 서버에서 제공하는 다른 경로로 네비게이션할 수 있습니다.
                }
            })
            .catch(error => {
                console.error('Error during email verification:', error);
            });
            console.log('Form Submitted');
        };
        

    const handleBackClick = () => {
        navigate('/login');  // Navigate back in history
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
                        <h2>변경할 비밀번호를 입력해주세요</h2>

                        <form onSubmit={onSubmitHandler} id="register-form" style={{ marginTop: "10%" }}>
                            <div className="pass_chk">
                                <div className="id-text">비밀번호</div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input-style"
                                    value={Password}
                                    onChange={onPasswordHandler}
                                />
                                <div className={"pwerror-tag" + (Passactive ? " active" : "")}>
                                    비밀번호를 확인해주세요.
                                </div>
                            </div>

                            <div className="cpass_chk">
                                <div className="id-text">비밀번호 확인</div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Confirm Password"
                                    className="input-style"
                                    value={ConfirmPassword}
                                    onChange={onConfirmPasswordHandler}
                                />
                                <div className={"cpwerror-tag" + (Isactive ? " active" : "")}>
                                    비밀번호가 일치하지 않아요.
                                </div>
                            </div>
                            <div className="form-buttons">
                                <input type="submit" value="비밀번호 변경하기" className="input-style Find_id_button-style" />
                                <button type="button" onClick={handleBackClick} className="input-style Find_id_button-style">로그인 페이지로</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindPassCheck;
