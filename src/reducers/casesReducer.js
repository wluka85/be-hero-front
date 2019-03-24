const initialState = ({
    currentChatCase: {},
    chatDialog: [],
    activeCases: [],
    freeCases: [],
    users: [],
    chosenCase: {},
    openDialog: false
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

        case 'CASE_CREATED': 
          return {...state, freeCases: action.freeCases}

        case 'OPEN_NEW_CASE_DIALOG':
          return {...state, openDialog: true}

        case 'CLOSE_NEW_CASE_DIALOG':
          return {...state, openDialog: false}

        case 'MESSAGE_RECIEVED':
            return { ...state, chatDialog: state.chatDialog.concat(action.message) }

        case 'USER_DISCONNECTED': 
          return {...state, users: action.users}

        case 'CURRENT_CASE_DESCRIPTION':
        console.log('chosen case: ', action.chosenCase)
          return {...state, chosenCase: action.chosenCase}

        default:
            return state;
    }
};

export default casesReducer;