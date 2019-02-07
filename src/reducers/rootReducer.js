import {combineReducers} from 'redux';
import accountReducer from "./accountReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
    accountReducer,
    messageReducer

});

export default rootReducer;