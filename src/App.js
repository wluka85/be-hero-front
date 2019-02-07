import React, { Component } from 'react';
import Account from './components/account';
import MessageAlert from './components/messageAlert';
import Registration from "./components/registration";
import './App.css'

class App extends Component {
  render() {
    return (
        <div className="container">
          <Account/>
          <Registration/>
          <MessageAlert/>
        </div>

      );
  }
}

export default App;
