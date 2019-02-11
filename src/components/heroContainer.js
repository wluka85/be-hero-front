import React, { Component } from 'react'
import { AppHeader } from './appHeader';
import SidebarContainer from './sidebarContainer';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class HeroContainer extends Component {
  render() {
    const { isLoggedIn } = this.props;
    
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
  }
    return (
      <React.Fragment>
          <AppHeader/>
          <SidebarContainer/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.accountReducer.isLoggedIn
  }
}

export default HeroContainer = connect(mapStateToProps)(HeroContainer);
