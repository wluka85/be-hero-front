const initialState = {
    alertMessage: '',
    isVisible: false,
    userIsTyping: false,
    sender: '',
    shouldSnackbarDisplayed: false,
    snackbarVariant: 'info',
    snackbarMessage: ''
};
const messageReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'DISPLAY_MESSAGE':
            return { ...state, alertMessage: action.alertMessage, isVisible: true };

        case 'CLOSE_MESSAGE':
            return { ...state, alertMessage: '', isVisible: false};

        case 'IS_TYPING': 
          return {...state, userIsTyping: action.isTyping, sender: action.sender};

        case 'SNACKBAR_MESSAGE_DISPLAYED':
            return { ...state, shouldSnackbarDisplayed: action.shouldSnackbarDisplayed };

        case 'DISPLAY_SNACKBAR_MESSAGE':
            return { ...state, shouldSnackbarDisplayed: true, snackbarVariant: action.snackbarVariant, snackbarMessage: action.snackbarMessage }

        default:
            return state;
    }
};

export default messageReducer;