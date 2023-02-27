import Axios from 'axios';
import { LOGIN_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit){
	const request = Axios.post('https://translation-platform.site:8443/api/user/login',dataToSubmit)
	.then(response => response.data)
	
	return{
		type: LOGIN_USER,
		payload:request
	}
}

export function auth(){
	const request = Axios.get('https://translation-platform.site:8443/api/user/auth')
	.then(response => response.data)
	
	return{
		type: AUTH_USER,
		payload:request
	}
}