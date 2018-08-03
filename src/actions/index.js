import axios from 'axios';
import { loggedIn } from '../utils';

export const createEvent = (event) => {
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }

    if (loggedIn()) {
        headers['Authorization'] = "Bearer " + localStorage.token;
    }
    return dispatch => {
        axios.post(`http://10.2.168.57:8000/api/events`, event, { headers })
            .then(res => {

            })
            .catch(err => {

            })
    }
}