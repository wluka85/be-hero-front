const initialState = {
    sidebarOpen: false
}

const sidebarReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SIDEBAR_OPENED':
            return { ...state, sidebarOpen: !state.sidebarOpen };

        default:
            return state;
    }
};

export default sidebarReducer;