import React from 'react';
import { Redirect } from 'react-router-dom';
import {CssBaseline, Drawer, Hidden } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SidebarContent from './sidebarContent';
import { AppHeader } from './appHeader';
import {handleChangeSidebarOpen, handleSidebarClose} from "../actions/sidebarActions";
import CasesTable from './casesTable';
import Chat from './chat';
import CaseCreate from './caseCreate';


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

class MainContainer extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {    
    window.addEventListener("resize", this.resize);
    this.resize();
  }
  
  resize = () => {
    const { sidebarOpen, handleSidebarClose } = this.props;
    let currentHideSideBar = (window.innerWidth <= 600);
    if (currentHideSideBar !== sidebarOpen) { handleSidebarClose() }
  }

  render() {
    const { isLoggedIn, classes, theme, sidebarOpen, handleSidebarOpenClose, chosenCase, openDialog, handleDialogOpen } = this.props;
    let mainContent;
    
    if (!isLoggedIn) {
      return (<Redirect to='/' />)
    }

    if (chosenCase) {
      mainContent = <Chat/>;
    } else {
      mainContent = <CasesTable/>;
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
              onClose={handleSidebarOpenClose}
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
          {mainContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.accountReducer.isLoggedIn,
      sidebarOpen: state.sidebarReducer.sidebarOpen,
      chosenCase: state.casesReducer.chosenCase,
      openDialog: state.casesReducer.openDialog,
      mobileOpen: state.sidebarReducer.mobileOpen
    }
  }

const mapDispatchToProps = (dispatch) => {
  return {
      handleSidebarOpenClose: () => { dispatch(handleChangeSidebarOpen()) },
      handleSidebarClose: () => { dispatch(handleSidebarClose())},
      handleDialogOpen: () => { dispatch({type: 'OPEN_NEW_CASE_DIALOG'}) }
   }
};
  
export default MainContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MainContainer));

