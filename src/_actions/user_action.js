import Axios from "axios";
import { API_URL } from "../components/Config";
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = Axios.post(`${API_URL}api/user/login`, dataToSubmit, {
    withCredentials: true,
  }).then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = Axios.post(`${API_URL}api/user/join`, dataToSubmit, {
    withCredentials: true,
  }).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  console.log(API_URL);
  const request = Axios.get(`${API_URL}api/user/auth`, {
    withCredentials: true,
  }).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
