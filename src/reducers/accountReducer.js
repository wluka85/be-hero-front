const initialState = {
    sessionId: '',
    loginMessage: '',
    registrationMessage: '',
    isLoggedIn: false,
    redirect: '/',
    role: '',
    showRegistrationWindow: false
};

const accountReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: action.role};

        case 'USER_NOT_LOGGED_IN':
            return { ...state, loginMessage: action.loginMessage, role: '' };

        case 'USER_LOGGED_OUT':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: '' };

        case 'SHOW_REGISTRATION_WINDOW':
            return { ...state, showRegistrationWindow: action.showRegistrationWindow };

        default:
            return state;
    }
};

export default accountReducer;