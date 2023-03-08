import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import background from './background.mp4';
import { Link,useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // useCookies import
import './LoginPage.css';

function LoginPage() {
	
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [Email, setEmail] = useState("");
	const [Password,setPassword] = useState("");
	const [cookies, setCookie] = useCookies([]);
	
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
	}
	
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
		
	}
	
	const onSubmitHandler = (event) => {
		event.preventDefault();
		
		
		let body = {
			email:Email,
			pw: Password
		}
		
		dispatch(loginUser(body))
		.then(response => {
			console.log(response.payload.loginSuccess);
			if(response.payload.loginSuccess){
				
				navigate("/");
			}
		})

		
	}
	
	
	
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
                            style={{margin: 'auto', display: 'block', marginBottom: '15%'}}
                        />
                    </h2>

                    <form onSubmit={onSubmitHandler} id="login-form" style={{marginTop: '10%'}}>
                        <div className="id-text">이메일</div>
                        <input type="email" name="userName" placeholder="Email" value={Email} onChange = {onEmailHandler}/>

                        <div className="id-text">비밀번호</div>
                        <input type="password" name="userPassword" placeholder="Password" value={Password} onChange = {onPasswordHandler}/>
                        <label htmlFor="remember-check">
                            <input type="checkbox" id="remember-check" /> 자동로그인
                        </label>
						<input type="submit" value="login"/>
                        
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
  )
}

export default LoginPage
