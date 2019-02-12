import {combineReducers} from 'redux';
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";
import sidebarReducer from "./sidebarReducer";
import heroCasesReducer from "./heroCasesReducer";

const rootReducer = combineReducers({
    accountReducer,
    messageReducer,
    sidebarReducer,
    heroCasesReducer

});

export default rootReducer;