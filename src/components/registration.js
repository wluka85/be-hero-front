import React, {Component} from "react";
import {
    Button, Col,
    ControlLabel, Form,
    FormControl,
    FormGroup, Modal,
    ModalBody,
    ModalDialog,
    ModalFooter,
    ModalHeader,
    ModalTitle, Radio, Row
} from "react-bootstrap";
import {connect} from "react-redux";
import {showRegistrationWindow} from "../actions/accountActions";

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
                                    <FormGroup>

                                        <Radio name="radioGroup" inline>
                                            Helper
                                        </Radio>
                                        <Radio name="radioGroup" inline>
                                            Disabled
                                        </Radio>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Login: </ControlLabel>
                                        <FormControl id="form-login" type="text" placeholder="Enter login" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password: </ControlLabel>
                                        <FormControl id="form-password" type="password" placeholder="Enter password" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Confirm password: </ControlLabel>
                                        <FormControl id="form-password" type="password" placeholder="Enter password" required/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <ControlLabel>Name: </ControlLabel>
                                        <FormControl id="form-name" type="text" placeholder="Enter name" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Surname: </ControlLabel>
                                        <FormControl id="form-surname" type="text" placeholder="Enter surname"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Address: </ControlLabel>
                                        <FormControl id="form-address" type="text" placeholder="Enter address"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Description: </ControlLabel>
                                        <FormControl id="form-description" type="text" placeholder="Enter description"/>
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
        message: state.accountReducer.message
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => { dispatch(showRegistrationWindow(false)) }
    }
}



export default Registration = connect(mapStateToProps, mapDispatchToProps)(Registration);