import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const loggedIn = () => {
    let token = localStorage.token;
    return !!token && !isTokenExpired(token);
}

const isTokenExpired = (token) => {
    try {
        let decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}