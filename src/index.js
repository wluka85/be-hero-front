import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://localhost:4000');

const store = createStore(rootReducer, applyMiddleware(thunk, createSocketIoMiddleware(socket, "server/")));

ReactDOM.render(
    <Provider store={store}>
        {/*<BrowserRouter>*/}
            {/*<Switch>*/}
                {/*<Route exact path='/' component={App} />*/}
                {/*<Route exact path='/log' component={AppLoggedIn} />*/}
            {/*</Switch>*/}
        {/*</BrowserRouter>*/}
        <App/>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
