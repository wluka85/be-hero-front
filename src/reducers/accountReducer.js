const initialState = {
    sessionId: '',
    loginMessage: '',
    registrationMessage: '',
    isLoggedIn: false,
    redirect: '/',
    role: '',
    showRegistrationWindow: false,
    user: null
};

const accountReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: action.role};

        case 'ERROR_MESSAGE_SHOWN':
            return { ...state, loginMessage: action.loginMessage, role: '' };

        case 'USER_LOGGED_OUT':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: '' };

        case 'SHOW_REGISTRATION_WINDOW':
            return { ...state, showRegistrationWindow: action.showRegistrationWindow };

        case 'SHOW_REGISTRATION_MESSAGE':
            return { ...state, registrationMessage: action.registrationMessage };

        case 'USER_SIGNED_IN':
            return {...state, user: action.user, role: action.role, isLoggedIn: action.isLoggedIn, loginMessage: action.loginMessage };

        case 'REDIRECTION':
        return { ...state, redirect: action.redirect }

        default:
            return state;
    }
};

export default accountReducer;