import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import background from "./background.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // useCookies import
import Axios from "axios";
import "./LoginPage.css";
import { API_URL } from "../../Config";

function LoginPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      pw: Password,
    };

    let dataToSubmit = {
      email: "",
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        //로그인 성공시 메인페이지 이동
        navigate("/");
      } else {
        if (!response.payload.registerSuccess) {
          // 로그인은 실패했지만, 이메일 인증 혹은 관리자 승인이 필요
          alert(response.payload.msg);
          if (response.payload?.email) {
            //이메일 인증이 안된 경우
            dataToSubmit.email = response.payload.email;
            Axios.post(`${API_URL}email`, dataToSubmit, {
              //이메일 인증코드 전송
              withCredentials: true,
            }).then((secondresponse) => {
              console.log(secondresponse);
              if (secondresponse.data.emailcheckSuccess) {
                alert(secondresponse.data.msg);
                navigate("/login");
              } else {
                alert(secondresponse.data.msg);
              }
            });
          }
        } else {
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        }
      }
    });
  };

  return (
    <div>
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src={background} type="video/mp4" />
        </video>
      </div>

      <div className="login-wrapper">
        <div className="login-wrapper2">
          <div className="login-wrapper-padding">
            <h2>
              <img
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCAVka%2FbtrY2o9XY6e%2Fld0UENc2vedDW60ngkDyI1%2Fimg.jpg"
                width="60%"
                height="60%"
                style={{
                  margin: "auto",
                  display: "block",
                  marginBottom: "15%",
                }}
                alt=""
              />
            </h2>

            <form
              onSubmit={onSubmitHandler}
              id="login-form"
              style={{ marginTop: "10%" }}
            >
              <div className="id-text">이메일</div>
              <input
                type="email"
                name="userName"
                placeholder="Email"
                value={Email}
                onChange={onEmailHandler}
              />

              <div className="id-text">비밀번호</div>
              <input
                type="password"
                name="userPassword"
                placeholder="Password"
                value={Password}
                onChange={onPasswordHandler}
              />
              <label htmlFor="remember-check">
                <input type="checkbox" id="remember-check" /> 자동로그인
              </label>
              <input type="submit" value="login" />
            </form>

            <div className="findview">
              <Link to="/">아이디 찾기 |</Link>
              <Link to="/">비밀번호 찾기 |</Link>
              <Link to="/register"> 회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
