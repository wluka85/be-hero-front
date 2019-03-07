const initialState = ({
    currentChatCase: {},
    chatDialog: [],
    activeCases: [],
    freeCases: [],
    users: []
});

const casesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_CASES':
            return { ...state, activeCases: action.activeCases };

        case 'USER_CONNECTED':
            return { ...state, users: action.users, freeCases: action.freeCases }

        case 'CURRENT_CHAT_CASE':
            return { ...state, currentChatCase: action.currentChatCase, chatDialog: action.currentChatCase.dialog }

        case 'MESSAGE_ADDED_TO_CHAT':
            return { ...state, chatDialog: state.chatDialog.concat(action.message) }
        default:
            return state;
    }
};

export default casesReducer;