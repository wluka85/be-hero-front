import {loginQuery, registerQuery} from "./apiQueries";
import {handleDisplayAlertMessage} from "./messageAlertActions";
import { sendUserConnectedMessage } from "./socketActions";

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

export const handleLogoutUser = () => ({
    type: 'USER_LOGGED_OUT',
    isLoggedIn: false,
    sessionId: '',
    user: null,
    role: '',
    redirect: '',
    waitingForLoggedIn: false
});

const handleUserSignedIn = (user, role) => ({
    type: 'USER_SIGNED_IN',
    isLoggedIn: true,
    user: user,
    role: role,
    loginMessage: '',
    waitingForLoggedIn: false
});

const handleRedirect = (redirect) => ({
    type: 'USER_LOGGED_OUT',
    // redirect: redirect,
    isLoggedIn: false,
    waitingForLoggedIn: false
});

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
                localStorage.setItem('accessToken', data.token);
                handleSignedIn(data, dispatch);

            })
            .catch(error => console.log(error));
    }
};

export const handleRegister = (role, login, email, password, name, surname, description) => {
        return dispatch => {
            fetch(registerQuery, {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userType: role,
                    login: login,
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
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
    return dispatch => {
        fetch(loginQuery,  {
            method: 'GET',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message !== "Auth failed 4"){
                    handleSignedIn(data, dispatch);
                } else {
                    dispatch(handleRedirect(''));
                }
            });
    }
}

const handleSignedIn = (data, dispatch) => {
    let user;
    user = {
        name: data.user.name,
        surname: data.user.surname,
        login: data.user.login,
        email: data.user.email,
        description: data.user.description,
        level: data.user.level,
        id: data.user._id,
        role: data.user.role,
    }
    localStorage.setItem('sessionId', data.sessionId);
    dispatch(handleUserSignedIn(user, data.user.role));
    dispatch(sendUserConnectedMessage(user));
}