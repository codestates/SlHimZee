import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';

export function loginUser(dataToSubmit) {

    console.log("POST: http://localhost:4000/api/users/login")
    const request = axios.post('http://localhost:4000/api/users/login', dataToSubmit, { withCredentials: true })
        .then((response) => {
            return response.data
        });
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('http://localhost:4000/api/users/register', dataToSubmit, {withCredentials: true})
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {

    const request = axios.get('http://localhost:4000/api/users/auth', {withCredentials: true})
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(dataToSubmit) {
    const request = axios.get('http://localhost:4000/api/users/logout', dataToSubmit, { withCredentials: true })
        .then(response => response.data)

    return {
        type: LOGOUT_USER,
        payload: request
    } 
}
