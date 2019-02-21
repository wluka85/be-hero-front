const initialState = ({
    activeCases: [],
    freeCases: [],
    users: [],
    chosenCase: null,
    openDialog: false
});

const casesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_CASES':
            return { ...state, activeCases: action.activeCases };

        case 'USER_CONNECTED':
            return { ...state, users: action.users, freeCases: action.freeCases }

        case 'CASE_CREATED': 
          return {...state, freeCases: action.freeCases}

        case 'OPEN_NEW_CASE_DIALOG':
          return {...state, openDialog: true}

        case 'CLOSE_NEW_CASE_DIALOG':
          return {...state, openDialog: false}

        default:
            return state;
    }
};

export default casesReducer;