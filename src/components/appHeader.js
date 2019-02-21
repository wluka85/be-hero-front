import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleChangeSidebarOpen } from "../actions/sidebarActions";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
  });

export class AppHeader extends Component {
    render () {
        const { handleOpenClose } = this.props;
        const { classes } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
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
            </Toolbar>
          </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sidebarOpen: state.sidebarReducer.sidebarOpen,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        handleOpenClose: () => { dispatch(handleChangeSidebarOpen()) },
    }
  };
  
  export default AppHeader = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppHeader));