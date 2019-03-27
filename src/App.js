import React, { Component } from 'react';
import Account from './components/account';
import './App.css'
import MainContainer from './components/mainContainer';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { MuiThemeProvider , createMuiTheme } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  typography: {
    fontSize: 20
  },
  palette: {
    primary: teal,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        <Router>
          <div className="container">
            <Route exact path="/" component={Account} />
            <Route path="/hero" component={MainContainer}/>
            <Route path="/needer" component={MainContainer} />
            {/* <Route exact path="/hero/chat/:id" component={MainContainer} />
            <Route exact path="/needer/chat/:id" component={MainContainer} />
            <Route exact path="/hero/case-description/:id" component={MainContainer} />
            <Route exact path="/needer/case-description/:id" component={MainContainer} /> */}
          </div>
        </Router>
      </MuiThemeProvider>
      );
  }
}

export default App;
