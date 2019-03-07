import React, { Component } from 'react';
import { connect } from "react-redux";
import { handleLogoutUser } from '../actions/accountActions'
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
        const { role, userName, userLevel } = this.props;
        let level;
        role === 'hero' ? level = (<b>Level: { userLevel }</b> ): level = '';
        let signedInAs = (<p>Signed in as <b>{ userName }</b></p>);

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
            </React.Fragment>
        )
    }

    getSelfCases() {
        const { activeCases, handleSetCurrentActiveCase } = this.props;

        return (
            <React.Fragment>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemText primary={(<p><b>Your active cases:</b></p>)} />
                    </ListItem>
                    {
                        activeCases.map((element, i) => {
                            return (
                            <ListItem button key={i} onClick={ () => { handleSetCurrentActiveCase(element._id)} }>
                                <ListItemIcon><TouchIcon /></ListItemIcon>
                                <ListItemText primary={ element.description } />
                            </ListItem>
                            )
                    })
                }
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
        activeCases: state.casesReducer.activeCases
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            localStorage.setItem('accessToken', '');
            dispatch(handleLogoutUser());
        },
        handleFetchHeroCases: () => {
            dispatch(fetchHeroSelfCases());
        },
        handleFetchNeederCases: () => {

        },
        handleSetCurrentActiveCase: (id) => {
            dispatch(setActiveCaseCurrentChat(id))
        }
    }
};

export default SidebarContent = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarContent));