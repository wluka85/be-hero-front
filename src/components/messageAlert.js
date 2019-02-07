import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import $ from "jquery";
import {handleLogin, showRegistrationWindow} from "../actions/accountActions";
import {connect} from "react-redux";
import {handleCloseActionAlertMessage} from "../actions/messageAlertActions";

class MessageAlert extends Component {
    render() {
        const { show, message, handleClose } = this.props;

        return (
            <React.Fragment>

                <Modal show={ show }>
                    <ModalBody>
                        <h2> { message } </h2>
                    </ModalBody>


                <ModalFooter>
                    <Button outline onClick={ handleClose }>Close</Button>
                </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.messageReducer.alertMessage,
        show: state.messageReducer.isVisible
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => { dispatch(handleCloseActionAlertMessage()) }
    }
};

export default MessageAlert = connect(mapStateToProps, mapDispatchToProps)(MessageAlert);