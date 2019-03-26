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
import CaseCreate from './caseCreate';
import { fetchChoosenFreeCase } from '../actions/casesActions';

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
      top: 103,
      overflow: 'auto',
      height: 'calc(100% + 45px)'
    },
    signoutContainer: {
      position: 'fixed',
      bottom: 0,
      width: '300px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0'
    },
    userinfoContainer: {
      position: 'fixed',
      top: 0,
      width: '300px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0'
    },
    active: {
      backgroundColor: '#9e9e9e'
    }
  });

class SidebarContent extends Component {

    getUserProfileItem() {
        const { role, history, handleShowCreateCaseDialog } = this.props;
        const buttonCreateCase = (
            <ListItem button onClick={handleShowCreateCaseDialog}>
                <ListItemIcon><AddBoxIcon/></ListItemIcon>
                <ListItemText primary='Create new case' />
            </ListItem>
        )
        return (
            <React.Fragment>
                <ListItem button onClick={() => {history.push('/', role)}}>
                    <ListItemIcon><FormatAlignLeftIcon/></ListItemIcon>
                    <ListItemText primary='Free cases' />
                </ListItem>
                { role === 'needer' ? buttonCreateCase : (<React.Fragment></React.Fragment>) }
            </React.Fragment>
        )
    }

    getActiveCasesList() {
        const { activeCases, history, role, handleSetCurrentActiveCase, currentCase, classes } = this.props;
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
                                  history.push('/' + role + '/chat/' + element._id);
                                }}
                                className={(element._id === currentCase._id) ? classes.active : ''}>
                              <ListItemIcon><TouchIcon /></ListItemIcon>
                              <ListItemText primary={ element.description } />
                              </ListItem>
                            )
                          }
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
                                        history.push('/' +  role + '/case-description/' + element._id);
                                      }}
                                      className={(element._id === currentCase._id) ? classes.active : ''}>
                                        <ListItemIcon><TouchIcon /></ListItemIcon>
                                        <ListItemText primary={ element.description } />
                                    </ListItem>
                                )
                            }
                        })
                    }
            </React.Fragment>
        )
    }

    getSelfCases() {
      const {classes} = this.props;
        return (
            <React.Fragment>
                <Divider/>
                <List className={classes.casesContainer}>
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
                <List className={classes.signoutContainer}>
                    <Divider/>
                    <ListItem button key='logout' onClick={handleLogout}>
                        <ListItemIcon><ExitIcon /></ListItemIcon>
                        <ListItemText primary='Sign Out' />
                    </ListItem>
                </List>
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
        handleFetchChoosenFreeCase: (caseId) => {dispatch(fetchChoosenFreeCase(caseId))}
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarContent));