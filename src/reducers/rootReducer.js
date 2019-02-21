import {combineReducers} from 'redux';
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";
import sidebarReducer from "./sidebarReducer";
import casesReducer from "./casesReducer";

const rootReducer = combineReducers({
    accountReducer,
    messageReducer,
    sidebarReducer,
    casesReducer

});

export default rootReducer;