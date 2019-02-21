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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 80,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
});

class CasesTable extends React.Component {

render() {
    const { classes, freeCases } = this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Login</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freeCases.map((freeCase, key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">{freeCase.description}</TableCell>
                  <TableCell align="right">{freeCase.login}</TableCell>
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
    return {
        freeCases: state.casesReducer.freeCases
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
  };
  
export default CasesTable = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CasesTable));
