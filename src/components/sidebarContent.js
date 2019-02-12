import React, { Component } from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { handleLogoutUser } from '../actions/accountActions'
import { handleSidebarClose } from '../actions/sidebarActions';
import { fetchHeroSelfCases } from '../actions/heroActions';

class SidebarContent extends Component {

    componentDidMount() {
        const { role, handleFetchHeroCases, handleFetchNeederCases } = this.props;
        role === 'hero' ? handleFetchHeroCases() : handleFetchNeederCases()
    }

    getUserProfileItem() {
        const { role, userName, userLevel } = this.props;
        let level;
        role === 'hero' ? level = (<b>Level: { userLevel }</b> ): level = '';
        return (
            <React.Fragment>
                Signed in as <b>{ userName }</b>
                <br></br>
                {level}
                <hr style={{ margin: '0px', marginTop: '5px' }}></hr>
            </React.Fragment>
        )
    }

    getHeroCases() {
        const { heroActiveCases } = this.props;

        return (
            <React.Fragment>
                <NavItem disabled>Your active cases:</NavItem>
                {
                    heroActiveCases.map((element, i) => {
                        return (<NavItem key={i}><i>{element.description}</i></NavItem>)
                })
            }
            </React.Fragment>
        )
    }

    render() {
        const { handleLogout } = this.props;

        return (
            <React.Fragment>
                <Nav className="flex-column">
                    <NavItem disabled> { this.getUserProfileItem() } </NavItem>
                    <NavItem onClick={ handleLogout }>Logout</NavItem>
                    {this.getHeroCases()}
                </Nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, surname } = state.accountReducer.user;
    let userLevel = 1;
    let heroActiveCases = [];
    let role = state.accountReducer.role;
    if (role === 'hero') {
        userLevel = state.accountReducer.user.level;
        heroActiveCases = state.heroCasesReducer.heroSelfActiveCases;
    }
    return {
        role: role,
        userName: name + ' ' + surname,
        userLevel: userLevel,
        heroActiveCases: heroActiveCases
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => { 
            dispatch(handleLogoutUser());
            dispatch(handleSidebarClose());
        },
        handleFetchHeroCases: () => {
            dispatch(fetchHeroSelfCases());
        },
        handleFetchNeederCases: () => {

        }
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);