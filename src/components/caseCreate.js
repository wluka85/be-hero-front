import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import {connect} from 'react-redux';
import $ from "jquery";
import { sendCreatedCase } from '../actions/socketActions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dialogContainer: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    [theme.breakpoints.down('xs')]: {
      width: '200px'
    },
  }
});

class CaseCreate extends Component {

  render() {
    const {openDialog, handleClose, handleCreateCase, classes } = this.props;

    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Help Request</DialogTitle>
          <DialogContent className={classes.dialogContainer}>
            <DialogContentText>
              How can we help you?
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="case-description"
              multiline
              rowsMax="4"
              label="Description"
              type="text"
            />
          </DialogContent>
          <DialogActions style={{padding: '15px'}}>
            <Button onClick={handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={() => {
              handleCreateCase();
              handleClose();
            }} variant="contained" color="primary">
              SUBMIT
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CaseCreate));