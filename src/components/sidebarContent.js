import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleSignedOut } from '../actions/accountActions'
import { setActiveCaseCurrentChat } from '../actions/casesActions';
import Divider from '@material-ui/core/Divider';
import ExitIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TouchIcon from '@material-ui/icons/TouchApp';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddCircle';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Button from '@material-ui/core/Button';
import CaseCreate from './caseCreate';
import { fetchChoosenFreeCase } from '../actions/casesActions';
import { handleSidebarClose } from '../actions/sidebarActions';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    sidebarContainer: {
      position: 'relative',
      height: '65vh'
    },
    casesContainer: {
      position: 'relative',

      overflow: 'auto',
      height: 'calc(100% + 45px)'
    },
    signoutContainer: {
      position: 'fixed',
      bottom: 0,
      width: '300px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0',
    },
    userinfoContainer: {
      position: 'fixed',
      top: 0,
      width: '300px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0'
    },
    active: {
      backgroundColor: '#e0e0e0'
    },
    signoutButton: {
      backgroundColor: '#009688',
      '&:hover': {
        background: '#00796b'
      }
    },
    menuButtonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    menuElement: {
      height: '45px'
    },
    buttBox: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 5
    },
    menuButton: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '240px'
    }
  });

class SidebarContent extends Component {

    getUserProfileItem() {
        const { role, history, handleShowCreateCaseDialog, classes } = this.props;
        const buttonCreateCase = (
            <div button onClick={() => {
                handleSidebarClose();
                handleShowCreateCaseDialog();
                }}
                className={classes.menuElement}>
              <ListItemText
                className={classes.buttBox}
                primary={
                  <Button color="primary"
                    variant="contained"
                    className={classes.menuButton}>
                    <AddBoxIcon style={{color: 'white'}}/>Create new case
                  </Button>} />
            </div>
        )
        return (
              <div className={classes.menuButtonsContainer}>
                <div
                  button
                  onClick={() => {
                    handleSidebarClose();
                    history.push('/', role);
                    }
                  }
                  className={classes.menuElement}>
                  <ListItemText className={classes.buttBox}
                    primary={
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.menuButton}>
                        <FormatAlignLeftIcon style={{color: 'white'}}/>Free cases
                      </Button>} />
                </div>
                { role === 'needer' ? buttonCreateCase : (<React.Fragment></React.Fragment>) }
              </div>
        )
    }

    getActiveCasesList() {
        const { activeCases, history, role, handleSetCurrentActiveCase, currentCase, classes, handleSidebarClose } = this.props;
        return (
            <React.Fragment>
                <ListItem>
                  <ListItemText primary={(<p><b>Your active cases:</b></p>)} />
                  </ListItem>
                  {
                      activeCases.map((element, i) => {
                        if (element.heroId) {
                            return (
                              <ListItem 
                                button 
                                key={i}
                                onClick={ () => {
                                  handleSetCurrentActiveCase(element._id);
                                  handleSidebarClose();
                                  history.push('/' + role + '/chat/' + element._id);
                                }}
                                className={(element._id === currentCase._id) ? classes.active : ''}>
                              <ListItemIcon><TouchIcon /></ListItemIcon>
                              <ListItemText primary={ element.description } />
                              </ListItem>
                            )
                          }
                          return '';
                    })
                    }
            </React.Fragment>
        )
    }

    getFreeActiveCasesList() {
        const { activeCases, history, role, handleFetchChoosenFreeCase, currentCase, classes } = this.props;
        return (
            <React.Fragment>
                <ListItem>
                        <ListItemText primary={(<p><b>Your free active cases:</b></p>)} />
                    </ListItem>
                    {
                        activeCases.map((element, i) => {
                            if (!element.heroId) {
                                return (
                                    <ListItem 
                                      button 
                                      key={i}
                                      onClick={ () => {
                                        handleFetchChoosenFreeCase(element._id);
                                        handleSidebarClose();
                                        history.push('/' +  role + '/case-description/' + element._id);
                                      }}
                                      className={(element._id === currentCase._id) ? classes.active : ''}>
                                        <ListItemIcon><TouchIcon /></ListItemIcon>
                                        <ListItemText primary={ element.description } />
                                    </ListItem>
                                )
                            }
                          return '';
                        })
                    }
            </React.Fragment>
        )
    }

    getSelfCases() {
      const {classes, role} = this.props;
        return (
            <React.Fragment>
                <Divider/>
                <List 
                  className={classes.casesContainer} 
                  style={{
                    top: ((role === 'needer') ? 103 : 55), 
                    height: (role === 'needer') ? 'calc(100% + 67px)' : 'calc(100% + 113px)'
                    }}>
                  { this.getActiveCasesList() }
                  { this.getFreeActiveCasesList() }
                </List>
            </React.Fragment>
        )
    }

    render() {
        const { handleLogout, classes } = this.props;

        return (
            <div className={classes.sidebarContainer}>
                <List className={classes.userinfoContainer}>
                    { this.getUserProfileItem() }
                    <Divider/>
                </List>
                   { this.getSelfCases() } 
                <div className={classes.signoutContainer}>
                    <Divider/>
                    <div
                      button
                      key='logout'
                      onClick={handleLogout}
                      className={classes.menuElement}>
                      <ListItemText
                        className={classes.buttBox}
                        primary={
                          <Button
                            color="primary"
                            variant="contained"
                            className={classes.menuButton}>
                            <ExitIcon style={{color: 'white'}}/>Sign Out
                          </Button>} />
                    </div>
                </div>
                <CaseCreate/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, surname, level, role } = state.accountReducer.user;
    return {
        role: role,
        userName: name + ' ' + surname,
        userLevel: level,
        activeCases: state.casesReducer.activeCases,
        user: state.accountReducer.user,
        currentCase: state.casesReducer.chosenCase
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            dispatch(handleSignedOut());
        },
        handleFetchNeederCases: () => { },
        handleSetCurrentActiveCase: (id) => dispatch(setActiveCaseCurrentChat(id)),
        handleShowCreateCaseDialog: () => dispatch({type: 'OPEN_NEW_CASE_DIALOG'}),
        handleFetchChoosenFreeCase: (caseId) => {dispatch(fetchChoosenFreeCase(caseId))},
        handleSidebarClose: () => { dispatch(handleSidebarClose())},
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarContent));