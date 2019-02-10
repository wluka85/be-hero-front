import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from "react-redux";

class SidebarContent extends Component {

    render() {
        const { role, userName, userLevel } = this.props;

        if (role === 'hero') {
            return (
                <React.Fragment>
                    <div style={{ padding: '10px', fontSize: 20 }} >Signed in as { userName }
                            <div style={{ fontWeight: 'bold' }}>Level: { userLevel }</div></div>
                    <ListGroup>
                        <ListGroupItem>Logout</ListGroupItem>
                        <ListGroupItem>item</ListGroupItem>
                        <ListGroupItem>item</ListGroupItem>
                    </ListGroup>
                </React.Fragment>
            );
        } else {
            return (<div></div>)
        }
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
        handleClose: () => {  },
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);