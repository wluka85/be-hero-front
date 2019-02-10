import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { handleChangeSidebarOpen } from "../actions/sidebarActions";

export class AppHeader extends Component {
    render () {
        const { handleOpenClose } = this.props;
        return (
            <Navbar fixedTop={true} fluid={true}>
                <Nav navbar pullLeft={true}>
                    <NavItem>
                        <i className="fa fa-bars" onClick={ () => { handleOpenClose() } } style={{ fontSize: '24px' }}></i>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sidebarOpen: state.sidebarReducer.sidebarOpen,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        handleOpenClose: () => { dispatch(handleChangeSidebarOpen()) },

    }
  };
  
  export default AppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader);