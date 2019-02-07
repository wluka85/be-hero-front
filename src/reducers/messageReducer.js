const initialState = {
    alertMessage: '',
    isVisible: false
};

const messageReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'DISPLAY_MESSAGE':
            return { ...state, alertMessage: action.alertMessage, isVisible: true };

        case 'CLOSE_MESSAGE':
            return { ...state, alertMessage: '', isVisible: false};

        default:
            return state;
    }
};

export default messageReducer;