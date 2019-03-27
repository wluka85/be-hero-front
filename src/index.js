import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import {url} from './actions/apiQueries'
let socket = io(url);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createSocketIoMiddleware(socket, "server/"))));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
