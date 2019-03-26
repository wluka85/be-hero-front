import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleSignedOut } from '../actions/accountActions'
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
    }
  });

class SidebarContent extends Component {

    getUserProfileItem() {
        const { role, userName, userLevel, history, handleShowCreateCaseDialog } = this.props;
        const levelContent = (
            <ListItem>
                <ListItemIcon><StarRateIcon/></ListItemIcon>
                <ListItemText primary={<b>Level: { userLevel }</b>}/>
            </ListItem>
        )
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
                { role === 'hero' ? levelContent : (<React.Fragment></React.Fragment>) }
                <Divider />
                <ListItem button onClick={() => {history.push('/' + role + '/main')}}>
                    <ListItemIcon><FormatAlignLeftIcon/></ListItemIcon>
                    <ListItemText primary='Free cases' />
                </ListItem>
                { role === 'needer' ? buttonCreateCase : (<React.Fragment></React.Fragment>) }
            </React.Fragment>
        )
    }

    getActiveCasesList() {
        const { activeCases, history, role, handleSetCurrentActiveCase } = this.props;
        return (
            <React.Fragment>
                <ListItem>
                        <ListItemText primary={(<p><b>Your active cases:</b></p>)} />
                    </ListItem>
                    {
                        activeCases.map((element, i) => {
                            if (element.heroId) {
                                return (
                                    <ListItem button key={i} onClick={ () => {
                                            history.push('/' + role + '/chat/' + element._id);
                                            handleSetCurrentActiveCase(element._id);
                                        }}>
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
        const { activeCases, history, role, handleFetchChoosenFreeCase } = this.props;
        return (
            <React.Fragment>
                <ListItem>
                        <ListItemText primary={(<p><b>Your free active cases:</b></p>)} />
                    </ListItem>
                    {
                        activeCases.map((element, i) => {
                            if (!element.heroId) {
                                return (
                                    <ListItem button key={i} onClick={ () => {
                                        history.push('/' +  role + '/case-description/' + element._id);
                                            handleFetchChoosenFreeCase(element._id);
                                        }}>
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
        return (
            <React.Fragment>
                <Divider/>
                <List>
                    { this.getActiveCasesList() }
                    { this.getFreeActiveCasesList() }
                </List>
            </React.Fragment>
        )
    }

    render() {
        const { handleLogout } = this.props;

        return (
            <React.Fragment>
                <List>
                    { this.getUserProfileItem() }
                </List>
                   { this.getSelfCases() } 
                <Divider />
                <List>
                    <ListItem button key='logout' onClick={handleLogout}>
                        <ListItemIcon><ExitIcon /></ListItemIcon>
                        <ListItemText primary='Sign Out' />
                    </ListItem>
                </List>
                <CaseCreate/>
            </React.Fragment>
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
        handleFetchNeederCases: () => { },
        handleSetCurrentActiveCase: (id) => dispatch(setActiveCaseCurrentChat(id)),
        handleShowCreateCaseDialog: () => dispatch({type: 'OPEN_NEW_CASE_DIALOG'}),
        handleFetchChoosenFreeCase: (caseId) => {dispatch(fetchChoosenFreeCase(caseId))}
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarContent));