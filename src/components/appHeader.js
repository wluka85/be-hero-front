import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleChangeSidebarOpen } from "../actions/sidebarActions";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Stars';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    toolBar: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export class AppHeader extends Component {
    render () {
        const { handleOpenClose, history, classes, userName, role, level } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleOpenClose}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                BeHero
              </Typography>
              <div>
                <Button color="inherit" onClick={() => {history.push('/', role)}}>{ userName }</Button>
                {role === 'hero' ? 
                (<IconButton color="inherit">
                  <StarIcon />
                   { level }
                </IconButton>) :
                null}
              </div>
            </Toolbar>
          </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
  const { name, surname, role, level } = state.accountReducer.user;
  return {
    sidebarOpen: state.sidebarReducer.sidebarOpen,
    userName: name + ' ' + surname,
    role,
    level
  }
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenClose: () => { dispatch(handleChangeSidebarOpen()) },
  }
};

export default AppHeader = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppHeader));