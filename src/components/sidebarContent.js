import React, { Component } from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { handleLogoutUser } from '../actions/accountActions'
import { handleSidebarClose } from '../actions/sidebarActions';

class SidebarContent extends Component {

    getUserProfileItem() {
        const { role, userName, userLevel } = this.props;
        let level;
        role === 'hero' ? level = (<b>Level: { userLevel }</b> ): level = '';
        return (
            <React.Fragment>
                Signed in as <b>{ userName }</b>
                <br></br>
                {level}
            </React.Fragment>
        )
    }

    render() {
        const { handleLogout } = this.props;

        return (
            <React.Fragment>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <NavItem disabled> { this.getUserProfileItem() } </NavItem>
                    <hr style={{ margin: '4px' }}></hr>
                    <NavItem onClick={ handleLogout }>Logout</NavItem>
                    <NavItem>item</NavItem>
                    <NavItem>item</NavItem>
                </Nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, surname } =state.accountReducer.user;
    return {
        role: state.accountReducer.role,
        userName: name + ' ' + surname,
        userLevel: state.accountReducer.user.level
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => { 
            dispatch(handleLogoutUser());
            dispatch(handleSidebarClose());
        },
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);