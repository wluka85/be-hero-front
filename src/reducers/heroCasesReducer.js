const initialState = ({
    heroSelfActiveCases: []
});

const heroCasesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'HERO_CASES_LOADED':
            return { ...state, heroSelfActiveCases: action.heroSelfActiveCases };

        default:
            return state;
    }
};

export default heroCasesReducer;