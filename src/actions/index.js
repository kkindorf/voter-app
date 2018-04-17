import axios from 'axios';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_USER_POLLS,
    SUBMIT_POLL,
    FETCH_POLL,
    SELECTION_SUBMITTED,
    FETCH_ALL_POLLS
} from './types';
const ROOT_URL = 'http://localhost:3090';
let socket = io(ROOT_URL);

export function returnId() {
    return window.location.pathname.split('/')[2];
}
export function signinUser({email, password}) {
    //redux thunk is allowing us to return a function from an action creator instead of an action object
    return function(dispatch) {
        //submit email/password to server
        //{ email: email, password: password }
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //if request is good....
                //-update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                //-save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id);
                //-redirect to the route '/feature'
                browserHistory.push('/user/'+ response.data.id);
            })
            .catch(() => {
            //If request is bad...
            //-Show an error to the user
            dispatch(authError('Bad login Info'))
            })
    }  
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            //if request is good....
            //-update state to indicate user is authenticated
            dispatch({type: AUTH_USER});
            //-save the JWT token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            //-redirect to the route '/user/:id'
            browserHistory.push('/user/'+response.data.id);
        })
        .catch(e => dispatch(authError(e.response.data.error)));
            
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {type: UNAUTH_USER};
}


export function fetchUserPolls() {
    return function(dispatch) {
        const userId = localStorage.getItem('userId');
        axios.get(`${ROOT_URL}/user/${userId}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_USER_POLLS,
                    payload: response.data
                })
            })
    }
}

export function submitNewPoll({pollTitle, allOptions}) {
    return function(dispatch) {
        let user = localStorage.getItem('userId');
        axios.post(`${ROOT_URL}/user/${user}`, {pollTitle, allOptions}, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: SUBMIT_POLL,
                payload: response.data
            })
            browserHistory.push('/poll/'+response.data['data']._id);
        })

    }
}

export function fetchPoll() {
    return function(dispatch) {
        const pollId = returnId();
        axios.get(`${ROOT_URL}/poll/${pollId}`)
            .then(response => {
                dispatch({
                    type: FETCH_POLL,
                    payload: response.data
                })
            })
    }
}

export function pollAccessed() {
    return function(dispatch) {
        const pollId = returnId();
        socket.emit('join room', pollId);
    }
}
export function submitNewChoice({newOption, pollTitle, options}) {
    return function(dispatch) {
        const pollId = returnId();
        socket.emit('newChoice', {newOption, pollTitle, options, pollId});
        socket.on('new poll data', (data) => {
           dispatch({
               type: SELECTION_SUBMITTED,
               payload: data
           })
        })
    }
}

export function fetchAllPolls() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/polls`)
            .then(response => {
                dispatch({
                    type: FETCH_ALL_POLLS,
                    payload: response.data['data']
                })
            })
    }
}

