import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormGroup, Nav, Navbar, NavItem, PageHeader, Row} from 'react-bootstrap';
import {FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import $ from "jquery";
import {handleLogin, showRegistrationWindow, handleAutoSignIn} from "../actions/accountActions";
import Registration from "./registration";
import { Redirect } from 'react-router-dom';

class Account extends Component {
    componentDidMount() {
        const { handleAutoSignIn } = this.props;
        window.addEventListener('load', handleAutoSignIn);
    }

    render() {
        const { onSubmit, message, handleRegister, isLoggedIn, role } = this.props;

        if (isLoggedIn) {
            return (<Redirect to={ role + '/main' } />)
        }
        
        return (
            <React.Fragment>
            <Navbar fixedTop={true} fluid={true}>
                <Nav navbar pullRight={true}>
                    <NavItem>
                        <Button bsStyle="primary" onClick={handleRegister}>Register</Button>
                    </NavItem>
                </Nav>
            </Navbar>
            <Row className="account-container">
                <Col xsOffset={2} xs={8} mdOffset={4} md={4}>
                    <PageHeader>BeHero</PageHeader>
                    <Form className="account-form"
                          onSubmit={ e => {
                              e.preventDefault();
                              onSubmit();
                          }}>
                        <FormGroup>
                            <ControlLabel>Login: </ControlLabel>
                            <FormControl id="form-login" type="text" placeholder="Enter login"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password: </ControlLabel>
                            <FormControl id="form-password" type="password" placeholder="Enter password"/>
                        </FormGroup>
                        <Button bsStyle="primary" type="submit">Sign In</Button>
                        <div>
                            <h2>{ message }</h2>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Registration/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.accountReducer.loginMessage,
        isLoggedIn: state.accountReducer.isLoggedIn,
        role: state.accountReducer.role
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: () => {
            const login = $('#form-login').val();
            const password = $('#form-password').val();

            dispatch(handleLogin(login, password));
        },

        handleRegister: () => {
            dispatch(showRegistrationWindow(true))
        },
        handleAutoSignIn: () => dispatch(handleAutoSignIn())
    }
};

export default Account = connect(mapStateToProps, mapDispatchToProps)(Account);