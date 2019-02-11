import {loginQuery, registerQuery} from "./apiQueries";
import {handleDisplayAlertMessage} from "./messageAlertActions";
import {Hero} from "../model/hero";
import {Needer} from "../model/needer";

// const loginUser = (isLoggedIn, sessionId, redirect) => ({
//     type: 'USER_LOGGED_IN',
//     isLoggedIn: isLoggedIn,
//     sessionId: sessionId,
//     redirect: redirect
// });

const sendErrorMessage = (message) => ({
    type: 'ERROR_MESSAGE_SHOWN',
    loginMessage: message
});

export const handleLogoutUser = (sessionId) => ({
    type: 'USER_LOGGED_OUT',
    isLoggedIn: false,
    sessionId: '',
    user: null,
    role: '',
    redirect: ''
});

const handleUserSignedIn = (user, role) => ({
    type: 'USER_SIGNED_IN',
    isLoggedIn: true,
    user: user,
    role: role,
    loginMessage: ''
});

// const handleRedirect = (redirect) => ({
//     type: 'USER_LOGGED_OUT',
//     redirect: redirect
// });

export const showRegistrationMessage = (registrationMessage) => ({
    type: 'SHOW_REGISTRATION_MESSAGE',
    registrationMessage: registrationMessage
})

export const showRegistrationWindow = (isVisible) => ({
    type: 'SHOW_REGISTRATION_WINDOW',
    showRegistrationWindow: isVisible
});

export const handleLogin = (email, password) => {
    return dispatch => {
        fetch(loginQuery, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
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
                if (data.user.role === 'hero') {
                    user = new Hero(data.user.name, data.user.surname, data.user.description, data.user.sessionId, data.user.level, data.user._id);
                } else {
                    user = new Needer(data.user.name, data.user.surname, data.user.description, data.user.sessionId, data.user._id);
                }
                localStorage.setItem('sessionId', data.sessionId);
                localStorage.setItem('accessToken', data.token);
                dispatch(handleUserSignedIn(user, data.user.role));

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
                    dispatch(handleDisplayAlertMessage('You have successfully created your account.'));
                    dispatch(showRegistrationWindow(false));
                })
            // .catch(error => dispatch(fetchBodiesFailure('Error: Mistake in query', error)));
        }
};

export const handleAutoSignIn = () => {
    let accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    return dispatch => {
        fetch(loginQuery,  {
            method: 'GET',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
        })
            .then((res) => res.json())
            .then((data) => {
                let user;
                if (data.user.role === 'hero') {
                    user = new Hero(data.user.name, data.user.surname, data.user.description, data.user.sessionId, data.user.level, data.user._id);
                } else {
                    user = new Needer(data.user.name, data.user.surname, data.user.description, data.user.sessionId, data.user._id);
                }
                localStorage.setItem('sessionId', data.sessionId);
                dispatch(handleUserSignedIn(user, data.user.role));
            });
    }
}