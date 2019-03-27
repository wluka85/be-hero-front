const initialState = {
    sessionId: '',
    loginMessage: '',
    registrationMessage: '',
    isLoggedIn: false,
    waitingForLoggedIn: true,
    redirect: '/',
    role: '',
    showRegistrationWindow: false,
    user: null
};

const accountReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: action.role, waitingForLoggedIn: action.waitingForLoggedIn};

        case 'ERROR_MESSAGE_SHOWN':
            return { ...state, loginMessage: action.loginMessage, role: '' };

        case 'USER_LOGGED_OUT':
            return { ...state, isLoggedIn: action.isLoggedIn, role: '', waitingForLoggedIn: action.waitingForLoggedIn };

        case 'SHOW_REGISTRATION_WINDOW':
            return { ...state, showRegistrationWindow: action.showRegistrationWindow };

        case 'SHOW_REGISTRATION_MESSAGE':
            return { ...state, registrationMessage: action.registrationMessage };

        case 'USER_SIGNED_IN':
            return {...state, user: action.user, role: action.role, isLoggedIn: action.isLoggedIn, loginMessage: action.loginMessage, waitingForLoggedIn: action.waitingForLoggedIn };

        case 'REDIRECTION':
            return { ...state, redirect: action.redirect, waitingForLoggedIn: action.waitingForLoggedIn }

        case 'INCREMENT_HERO_LEVEL':
            let tempUser = state.user;
            tempUser.level = action.newLevel
            return { ...state, user: tempUser };

        default:
            return state;
    }
};

export default accountReducer;