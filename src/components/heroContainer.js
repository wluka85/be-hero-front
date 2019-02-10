import React, { Component } from 'react'
import { AppHeader } from './appHeader';
import SidebarContainer from './sidebarContainer';

export class HeroContainer extends Component {
  render() {
    return (
      <React.Fragment>
          <AppHeader/>
          <SidebarContainer/>
      </React.Fragment>
    )
  }
}

// export default Hero
