const initialState = ({
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

        default:
            return state;
    }
};

export default casesReducer;