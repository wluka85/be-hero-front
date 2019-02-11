const initialState = {
    sidebarOpen: false
}

const sidebarReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SIDEBAR_CHANGED_OPEN':
            return { ...state, sidebarOpen: !state.sidebarOpen };
            
            case 'SIDEBAR_CLOSED':
            return { ...state, sidebarOpen: false };

        default:
            return state;
    }
};

export default sidebarReducer;