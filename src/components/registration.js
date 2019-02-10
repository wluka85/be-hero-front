import React, {Component} from "react";
import {
    Button, Col,
    ControlLabel, Form,
    FormControl,
    FormGroup, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle, Radio, Row
} from "react-bootstrap";
import {connect} from "react-redux";
import {handleRegister, showRegistrationMessage, showRegistrationWindow} from "../actions/accountActions";

class Registration extends Component {

    render() {
        const { showRegistrationWindow, onSubmit, message, handleClose } = this.props;
        return (
            <div className="modal-registration">
                <Modal show={ showRegistrationWindow } animation={false}>
                    <ModalHeader>
                        <ModalTitle>Registration</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Form className="registration-form"
                                  onSubmit={ e => {
                                      e.preventDefault();
                                      onSubmit();
                                  }}>
                                <Col md={6}>
                                    <ControlLabel>User type:</ControlLabel>
                                    <FormGroup id='role-radio-button'>
                                        <Radio id="role-helper-radio" name="radioGroupRole" value="hero" inline>
                                            Helper
                                        </Radio>
                                        <Radio id="role-needer-radio" name="radioGroupRole" value="needer" inline>
                                            Needer
                                        </Radio>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Login: </ControlLabel>
                                        <FormControl id="form-registration-login" type="text" placeholder="Enter login" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password: </ControlLabel>
                                        <FormControl id="form-registration-password" type="password" placeholder="Enter password" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Confirm password: </ControlLabel>
                                        <FormControl id="form-confirm-password" type="password" placeholder="Enter password" required/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Name: </ControlLabel>
                                        <FormControl id="form-registration-name" type="text" placeholder="Enter name" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Surname: </ControlLabel>
                                        <FormControl id="form-registration-surname" type="text" placeholder="Enter surname"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Address: </ControlLabel>
                                        <FormControl id="form-registration-address" type="text" placeholder="Enter address"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Description: </ControlLabel>
                                        <FormControl id="form-registration-description" type="text" placeholder="Enter description"/>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <Button bsStyle="primary" type="submit">Submit</Button>
                                    <div>
                                        <h2>{ message }</h2>
                                    </div>
                                </Col>
                            </Form>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline onClick={ handleClose }>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showRegistrationWindow: state.accountReducer.showRegistrationWindow,
        message: state.accountReducer.registrationMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => { dispatch(showRegistrationWindow(false)) },
        onSubmit: () => {
                let choosenRole = document.querySelector('input[name="radioGroupRole"]:checked');
                if (!choosenRole) {
                    dispatch(showRegistrationMessage('You should choose role'));
                } else {
                    let password = document.getElementById('form-registration-password').value;
                    let confirmPassword = document.getElementById('form-confirm-password').value;

                    if (password === confirmPassword) {
                        let role = choosenRole.value;
                        let login = document.getElementById('form-registration-login').value;
                        let name = document.getElementById('form-registration-name').value;
                        let surname = document.getElementById('form-registration-surname').value;
                        let address = document.getElementById('form-registration-address').value;
                        let description = document.getElementById('form-registration-description').value;
                        dispatch(handleRegister(role, login, password, name, surname, address, description));

                    } else {
                        dispatch(showRegistrationMessage('Wrong password'));
                    }
                }
        }
    }
}



export default Registration = connect(mapStateToProps, mapDispatchToProps)(Registration);