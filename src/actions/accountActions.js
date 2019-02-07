import {loginQuery, registerQuery} from "./apiQueries";
import {applyMiddleware as dispatch} from "redux";
import {handleDisplayAlertMessage} from "./messageAlertActions";
import {Hero} from "../model/hero";
import {Needer} from "../model/needer";

const loginUser = (isLoggedIn, sessionId, redirect) => ({
    type: 'USER_LOGGED_IN',
    isLoggedIn: isLoggedIn,
    sessionId: sessionId,
    redirect: redirect
});

const sendErrorMessage = (message) => ({
    type: 'ERROR_MESSAGE_SHOWN',
    loginMessage: message
});

const logoutUser = (sessionId) => ({
    type: 'USER_LOGGED_OUT',
    isLoggedIn: false,
    sessionId: '',
    redirect: ''
});

const handleUserSignedIn = (user, role) => ({
    type: 'USER_SIGNED_IN',
    isLoggedIn: true,
    user: user,
    role: role,
    loginMessage: ''
});

const handleRedirect = (redirect) => ({
    type: 'USER_LOGGED_OUT',
    redirect: redirect
});

export const showRegistrationMessage = (registrationMessage) => ({
    type: 'SHOW_REGISTRATION_MESSAGE',
    registrationMessage: registrationMessage
})

export const showRegistrationWindow = (isVisible) => ({
    type: 'SHOW_REGISTRATION_WINDOW',
    showRegistrationWindow: isVisible
});

export const handleLogin = (login, password) => {
    return dispatch => {
        fetch(loginQuery, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(res => {
                let statusCode = res.status;
                if (statusCode !== 200) {
                    dispatch(sendErrorMessage('Wrong login or password!'));

                } else {
                    return res.json();
                }

            })
            .then(data => {
                let user;
                if (data.role === 'hero') {
                    user = new Hero(data.name, data.surname, data.description, data.level, data._id);

                } else {
                    user = new Needer(data.name, data.surname, data.description, data._id);
                }
                localStorage.setItem('sessionId', data.sessionId);
                dispatch(handleUserSignedIn(user, data.role));
                dispatch(handleRedirect('logged-in'));

            })
            .catch(error => console.log(error));
    }
};

export const handleRegister = (role, login, password, name, surname, address, description) => {
        return dispatch => {
            fetch(registerQuery, {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userType: role,
                    login: login,
                    password: password,
                    name: name,
                    surname: surname,
                    address: address,
                    description: description
                })
            })
                .then(res => {
                    console.log(res)
                    dispatch(handleDisplayAlertMessage('You have successfully created your account.'));
                    dispatch(showRegistrationWindow(false));
                })
            // .catch(error => dispatch(fetchBodiesFailure('Error: Mistake in query', error)));
        }
}