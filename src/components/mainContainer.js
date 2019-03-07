import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SidebarContent from './sidebarContent';
import { AppHeader } from './appHeader';
import {handleChangeSidebarOpen} from "../actions/sidebarActions";
// import CasesTable from './casesTable'
import Chat from './chat';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    // marginLeft: 300
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

class MainContainer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { isLoggedIn, classes, theme, sidebarOpen, handleOpenClose } = this.props;
    
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
    }

    const drawer = (<SidebarContent/>);
    const appBar = (<AppHeader/>);

    return (
      <div className={classes.root}>
        <CssBaseline />
        { appBar }
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={sidebarOpen}
              onClose={handleOpenClose}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Chat/>
        {/* <CasesTable/> */}
      </div>
    );
  }
}

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.accountReducer.isLoggedIn,
      sidebarOpen: state.sidebarReducer.sidebarOpen
    }
  }

const mapDispatchToProps = (dispatch) => {
  return {
      handleOpenClose: () => { dispatch(handleChangeSidebarOpen()) },
   }
};
  
export default MainContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MainContainer));

