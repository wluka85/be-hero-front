import React, { Component } from 'react';
import Account from './components/account';
import './App.css'
import { HeroContainer } from './components/heroContainer';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Account} />
          <Route exact path="/hero" component={HeroContainer} />
          <Route exact path="/needer" component={HeroContainer} />
        </div>
      </Router>
      );
  }
}

export default App;
