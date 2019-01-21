import {loginQuery} from "./apiQueries";
import {applyMiddleware as dispatch} from "redux";

const loginUser = (isLoggedIn, sessionId, redirect) => ({
    type: 'USER_LOGGED_IN',
    isLoggedIn: isLoggedIn,
    sessionId: sessionId,
    redirect: redirect
});

const userLoginWarning = () => ({
    type: 'USER_NOT_LOGGED_IN',
    message: 'Wrong login or password!'
});

const logoutUser = (sessionId) => ({
    type: 'USER_LOGGED_OUT',
    isLoggedIn: false,
    sessionId: '',
    redirect: ''
});

export const handleLogin = (login, password) => {
    // fetch(loginQuery, {
    //     method: 'POST',
    //     headers: new Headers({
    //         'login': login,
    //         'password': password
    //     })
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         // dispatch();
    //     })
    return dispatch => dispatch(userLoginWarning());
};