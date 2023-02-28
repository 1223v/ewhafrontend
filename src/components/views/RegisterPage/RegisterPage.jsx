import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import '../LoginPage/LoginPage.css';
import { Link,useNavigate } from 'react-router-dom';

function RegisterPage() {
	
	
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [Email,setEmail] = useState("")
	const [Name, setName] = useState("")
	const [Password,setPassword] = useState("")
	const [ConfirmPassword, setConfirmPassword] = useState("")
	const [Major,setMajor] = useState("")
	const [Role,setRole] = useState("")
	const [Isactive, setIsactive] = useState("false");
	
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
	}
	
	const onNameHandler = (event) => {
		setName(event.currentTarget.value)
	}
	
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
		
	}
	
	const onConfirmPasswordHandler = (event) => {
		setConfirmPassword(event.currentTarget.value);
		
	}
	
	const onMajorHandler = (event) => {
		setMajor(event.currentTarget.value)
	}
	
	const onRoleHandler = (event) => {
		setRole(event.currentTarget.value)
	}
	
	const onSubmitHandler = (event) => {
		event.preventDefault();
		
		if(Password !== ConfirmPassword){
			setIsactive(!Isactive);
			return alert('비밀번호가 일치하지 않습니다.')
			
		}
		
		let body = {
			email:Email,
			pw: Password,
			name: Name,
			major: Major,
			role: Role
		}
		
		dispatch(registerUser(body))
		.then(response => {
			if(response.payload.registerSuccess){
				
				
				navigate("/login");
			}else{
				alert('다시 시도해주세요.');
			}
		})

		
	}
	
  return (
     <div className="register-wrapper">
            <div className="register-wrapper2">
                <div className="register-wrapper-padding">
                    <h2>
                        <img
                            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCAVka%2FbtrY2o9XY6e%2Fld0UENc2vedDW60ngkDyI1%2Fimg.jpg"
                            width="50%"
                            height="50%"
                            style={{margin: 'auto', display: 'block', marginBottom: '10%'}}
                        />
                    </h2>
                    <h2>회원 정보</h2>

                    <form
                        
                        onSubmit={onSubmitHandler}
                        id="register-form"
                        style={{marginTop: '10%'}}
                    >
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
                            <div className="error-tag">
                                이미 사용 중인 이메일입니다.
                            </div>
                        </div>

                        <div className="pass_chk">
                            <div className="id-text">비밀번호</div>
                            <input
                                type="password"
                                name="userPassword"
                                placeholder="Password"
                                className="input-style"
								value={Password}
								onChange={onPasswordHandler}
                            />
                            <div className="pwerror-tag">
                                영문, 숫자, 특수문자, 포함 8자 이상으로 설정해 주세요.
                            </div>
                        </div>

                        <div className="cpass_chk">
                            <div className="id-text">비밀번호 확인</div>
                            <input
                                type="password"
                                name="userPassword"
                                placeholder="Password"
                                className="input-style"
								value={ConfirmPassword}
								onChange={onConfirmPasswordHandler}
                            />
                            <div className={"cpwerror-tag" +(Isactive ? "" : " active")}>
                                비밀번호가 일치하지 않아요.
                            </div>
                        </div>

                        <div className="id-text">이름</div>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Name"
                            style={{marginBottom: '8%'}}
                            className="input-style"
							value={Name}
							onChange={onNameHandler}
                        />

                        <div className="id-text">
                            <label htmlFor="join-dp">전공</label>
                            <div className="input-area">
                                <select className="major_chk" id="join-dp" name="major" value={Major} onChange={onMajorHandler}>
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
                            <span className="comment"></span>
                        </div>
                        <div className="id-text">
                            <label htmlFor="join-type">분류</label>
                            <div className="input-area">
                                <select className="job_chk" id="join-type" name="perm" value={Role} onChange={onRoleHandler}>
                                    <option>교수</option>
                                    <option>학생</option>
                                    <option>조교</option>
                                </select>
                            </div>
                            <span className="comment"></span>
                        </div>

                        <input type="submit" value="다음" className="input-style" />
                    </form>
                </div>
            </div>
        </div>
  )
}

export default RegisterPage
