import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import {connect} from 'react-redux';
import $ from "jquery";
import { sendCreatedCase } from '../actions/socketActions'

class CaseCreate extends Component {

  render() {
    const {openDialog, handleClose, handleCreateCase } = this.props;

    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Help Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              How can we help you?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="case-description"
              label="Description"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              handleCreateCase();
              handleClose();
            }} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openDialog: state.casesReducer.openDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => { dispatch({type: 'CLOSE_NEW_CASE_DIALOG'})},
    handleCreateCase: () => {
      const description = $('#case-description').val();
      console.log(description);
      dispatch(sendCreatedCase(description))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseCreate);