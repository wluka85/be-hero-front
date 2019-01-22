import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormGroup, Nav, Navbar, NavItem, PageHeader, Row} from 'react-bootstrap';
import {FormControl} from "react-bootstrap";
// import {handleLogin} from "../actions/accountActions";
import {connect} from "react-redux";
import $ from "jquery";
import {handleLogin, showRegistrationWindow} from "../actions/accountActions";

class Account extends Component {

    render() {
        const { onSubmit, message, handleRegister } = this.props;

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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.accountReducer.loginMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: () => {
            const login = $('#form-login').val();
            const password = $('#form-password').val();

            dispatch(handleLogin(login, password));
        },

        handleRegister: () => {dispatch(showRegistrationWindow(true))}
    }
};

export default Account = connect(mapStateToProps, mapDispatchToProps)(Account);