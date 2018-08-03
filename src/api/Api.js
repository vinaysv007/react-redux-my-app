import axios from 'axios';

export default {
    user: {
        login: data => axios.post('http://10.2.168.57:8000/api/auth', data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }),
        userSubmit: data => axios.post('http://10.2.168.57:8000/api/users', data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }),
        userExists: identifier => axios.get(`http://10.2.168.57:8000/api/user/${identifier}`),
        recoverPasswordRequest: data => axios.post('http://10.2.168.57:8000/api/auth/forgotpassword', data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }),
        validateTokenRequest: token => axios.post('http://10.2.168.57:8000/api/auth/validatetoken', { token }),
        resetPasswordRequest: data => axios.post('http://10.2.168.57:8000/api/auth/resetpassword', data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }),
        confirmUser: token => axios.post('http://10.2.168.57:8000/api/users/confirmuser', { token }, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
    }
}