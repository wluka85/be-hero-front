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
            return { ...state, currentChatCase: action.currentChatCase, chatDialog: action.currentChatCase.dialog, chosenCase: action.currentChatCase }

        case 'MESSAGE_ADDED_TO_CHAT':
            return { ...state, chatDialog: state.chatDialog.concat(action.message) }

        case 'CASE_CREATED': 
          return {...state, freeCases: action.freeCases}

        case 'OPEN_NEW_CASE_DIALOG':
          return {...state, openDialog: true}

        case 'CLOSE_NEW_CASE_DIALOG':
          return {...state, openDialog: false}

        case 'MESSAGE_RECIEVED':
          let tempActiveCases = JSON.parse(JSON.stringify(state.activeCases));
          let indexCase = tempActiveCases.findIndex(element => element._id === action.message.caseId);
          tempActiveCases[indexCase].dialog.concat(action.message);
          if (action.role === 'hero') {
            tempActiveCases[indexCase].heroNewMessages++;
          } else {
            tempActiveCases[indexCase].neederNewMessages++;
          }
          if (state.currentChatCase._id === action.message.caseId) {
            return { ...state, currentChatCase: tempActiveCases[indexCase], chatDialog: state.chatDialog.concat(action.message), activeCases: tempActiveCases }
          } else {
            return { ...state, activeCases: tempActiveCases };
          }
        case 'USER_DISCONNECTED': 
          return {...state, users: action.users}

        case 'CURRENT_CASE_DESCRIPTION':
          return {...state, chosenCase: action.chosenCase}

        case 'ACTIVE_CASE_DISPLAYED':
          return { ...state, activeCases: action.activeCases }

        case 'ACTIVE_CASE_DIALOG_READ':
          return { ...state, activeCases: action.activeCases, currentChatCase: action.currentActiveCase }
          
        default:
            return state;
    }
};

export default casesReducer;