import Axios from 'axios';
import { LOGIN_USER, AUTH_USER,REGISTER_USER } from './types';

export function loginUser(dataToSubmit){
	const request = Axios.post('https://edu-trans.ewha.ac.kr:8443/api/user/login',dataToSubmit,{ withCredentials: true })
	.then(response => response.data)
	
	return{
		type: LOGIN_USER,
		payload:request
	}
}

export function registerUser(dataToSubmit){
	const request = Axios.post('https://edu-trans.ewha.ac.kr:8443/api/user/join',dataToSubmit,{ withCredentials: true })
	.then(response => response.data)
	
	return{
		type: REGISTER_USER,
		payload:request
	}
}

export function auth(){
	
	const request = Axios.get('https://edu-trans.ewha.ac.kr:8443/api/user/auth', { withCredentials: true })
	.then(response => response.data)
	
	return{
		type: AUTH_USER,
		payload:request
	}
}