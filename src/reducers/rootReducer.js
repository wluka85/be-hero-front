import {combineReducers} from 'redux';
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
    accountReducer,
    messageReducer,
    sidebarReducer

});

export default rootReducer;