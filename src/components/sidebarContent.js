import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleSignedOut } from '../actions/accountActions'
import { fetchHeroSelfCases } from '../actions/heroActions';
import { setActiveCaseCurrentChat } from '../actions/casesActions';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import StarRateIcon from '@material-ui/icons/StarRate';
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
      height: '45vh'
    },
    casesContainer: {
      position: 'relative',
      top: 203,
      overflow: 'auto',
      height: 'calc(100% + 75px)'
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
      top: 0
    }
  });

class SidebarContent extends Component {

    getUserProfileItem() {
        const { role, userName, userLevel, history, handleShowCreateCaseDialog } = this.props;
        let level;
        role === 'hero' ? level = (<b>Level: { userLevel }</b> ): level = '';
        let signedInAs = (<p>Signed in as <b>{ userName }</b></p>);
        const buttonCreateCase = (
            <ListItem button onClick={handleShowCreateCaseDialog}>
                <ListItemIcon><AddBoxIcon/></ListItemIcon>
                <ListItemText primary='Create new case' />
            </ListItem>
        )
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary={ signedInAs } />
                </ListItem>
                <ListItem>
                    <ListItemIcon><StarRateIcon/></ListItemIcon>
                    <ListItemText primary={ level } />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {history.push('/', role)}}>
                    <ListItemIcon><FormatAlignLeftIcon/></ListItemIcon>
                    <ListItemText primary='Free cases' />
                </ListItem>
                { role === 'needer' ? buttonCreateCase : (<React.Fragment></React.Fragment>) }
            </React.Fragment>
        )
    }

    getSelfCases() {
        const { activeCases, history, role, handleSetCurrentActiveCase, classes } = this.props;

        return (
          <List className={classes.casesContainer}>
              <ListItem>
                  <ListItemText primary={(<p><b>Your active cases:</b></p>)} />
              </ListItem>
              {
                  activeCases.map((element, i) => {
                      return (
                      <ListItem button key={i} onClick={ () => {
                              history.push('/' + role + '/chat/' + element._id);
                              handleSetCurrentActiveCase(element._id);
                          }}>
                          <ListItemIcon><TouchIcon /></ListItemIcon>
                          <ListItemText primary={ element.description } />
                      </ListItem>
                      )
              })
          }
          </List>
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
        user: state.accountReducer.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            dispatch(handleSignedOut());
        },
        handleFetchHeroCases: () => dispatch(fetchHeroSelfCases()),
        handleFetchNeederCases: () => { },
        handleSetCurrentActiveCase: (id) => dispatch(setActiveCaseCurrentChat(id)),
        handleShowCreateCaseDialog: () => dispatch({type: 'OPEN_NEW_CASE_DIALOG'})
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarContent));