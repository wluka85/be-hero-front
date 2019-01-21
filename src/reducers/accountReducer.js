const initialState = {
    sessionId: '',
    message: '',
    isLoggedIn: false,
    redirect: '/',
    role: ''
};

const accountReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return { ...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: action.role};

        case 'USER_NOT_LOGGED_IN':
            return { ...state, message: action.message, role: '' };

        case 'USER_LOGGED_OUT':
            return {...state, isLoggedIn: action.isLoggedIn, sessionId: action.sessionId, redirect: action.redirect, role: '' };

        default:
            return state;
    }
};

export default accountReducer;