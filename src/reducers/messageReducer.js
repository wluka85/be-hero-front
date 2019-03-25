const initialState = {
    alertMessage: '',
    isVisible: false,
    userIsTyping: false,
    sender: ''
};

const messageReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'DISPLAY_MESSAGE':
            return { ...state, alertMessage: action.alertMessage, isVisible: true };

        case 'CLOSE_MESSAGE':
            return { ...state, alertMessage: '', isVisible: false};

        case 'IS_TYPING': 
          return {...state, userIsTyping: action.isTyping, sender: action.sender};

        default:
            return state;
    }
};

export default messageReducer;