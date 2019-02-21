import React, { Component } from 'react';
import Account from './components/account';
import './App.css'
import MainContainer from './components/mainContainer';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider , createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontSize: 20
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={ theme }>
      <Router>
        <div className="container">
          <Route exact path="/" component={Account} />
          <Route exact path="/hero" component={MainContainer} />
          <Route exact path="/needer" component={MainContainer} />
        </div>
      </Router>
      </MuiThemeProvider>
      );
  }
}

export default App;
