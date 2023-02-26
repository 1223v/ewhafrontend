import React from 'react';
import Axios from 'axios';
import { useDispatch} from 'react-redux';
import { auth } from '../_action/user_action';

export default function (SpecificComponent, option, adminRoute = null){
	function AuthenticationCheck(props){
		useEffect(()=>{
			dispatch(auth()).then(response=>{
				
			})
		},[])
	}
	return AuthenticationCheck
}