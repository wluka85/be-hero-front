import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { fetchChoosenFreeCase } from '../actions/casesActions'
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 80,
    overflowX: 'auto',
  },
  table: {

  },
  tableCell: {
    padding: '10px !important',
    width: '100px',
  },
  casesDescription: {
    fontSize: '1em',
    padding: '10px !important',
    '&:hover': {
      cursor: 'pointer',
      color: '#008cd9 !important'
    }
  }
});

class CasesTable extends React.Component {

render() {
    const { classes, freeCases, history, role, handleFetchChoosenFreeCase } = this.props;

    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center" padding='none'>Date</TableCell>
                <TableCell align="center">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freeCases.map((freeCase, key) => (
                <TableRow key={key}>
                  <TableCell className={classes.casesDescription} component="th" scope="row" onClick={() => {
                      history.push('/' +  role + '/case-description/' + freeCase._id);
                      handleFetchChoosenFreeCase(freeCase._id)
                    }}>{freeCase.description}</TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {moment(freeCase.timeStamp).format('ll')}
                      <br/>
                      {moment(freeCase.timeStamp).format('LT')}
                    </TableCell>
                  <TableCell className={classes.tableCell} align="center">{freeCase.neederLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
}


}

CasesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  let role ='';
    state.accountReducer.user ? role = state.accountReducer.user.role : role = '';
    return {
        freeCases: state.casesReducer.freeCases,
        role: role
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleFetchChoosenFreeCase: (caseId) => {dispatch(fetchChoosenFreeCase(caseId))}
    }
  };
  
export default CasesTable = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CasesTable));
