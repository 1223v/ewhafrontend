import Axios from 'axios';
import { LOGIN_USER, AUTH_USER,REGISTER_USER } from './types';

export function loginUser(dataToSubmit){
	const request = Axios.post('https://translation-platform.site:8443/api/user/login',dataToSubmit,{ withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'true'
  } })
	.then(response => response.data)
	
	return{
		type: LOGIN_USER,
		payload:request
	}
}

export function registerUser(dataToSubmit){
	const request = Axios.post('https://translation-platform.site:8443/api/user/register',dataToSubmit,{ withCredentials: true })
	.then(response => response.data)
	
	return{
		type: REGISTER_USER,
		payload:request
	}
}

export function auth(){
	const request = Axios.get('https://translation-platform.site:8443/api/user/auth', { withCredentials: true })
	.then(response => response.data)
	
	return{
		type: AUTH_USER,
		payload:request
	}
}