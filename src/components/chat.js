import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { addMessageToChat } from '../actions/chatActions';
import { sendChatMessage } from '../actions/socketActions';

const styles = theme => ({
  chat: {
    width: '100%'
  },
  card: {
    width: '100%',
    marginTop: 70,
    height: '18vh',
    minHeight: 110
  },
  chatPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 5,
    width: '100%',
    height: '55vh',
    overflow: 'auto'
  },
  title: {
    fontSize: 14,
  },
  description: {
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
  posDate: {
    textAlign: 'right',    
  },
  messageTyper: {
    marginTop: 5,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class Chat extends React.Component {

  state = {
    messageInput: ''
  }

  render() {
    const { classes, currentActiveCase, chatDialog, sendMessage } = this.props;
    
    const chatContent = (
      <React.Fragment>
        { chatDialog.map((element, key) => {
          return (
            <Card className={classes.card} key={key}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  { element.author }
                </Typography>
                <Typography component="p">
                  { element.contents }
                </Typography>
                <Typography className={classes.posDate} color="textSecondary">
                  { element.timeStamp }
                </Typography>
              </CardContent>
            </Card>
            )
          })
        }
      </React.Fragment>
    );

    return (
      <div className={classes.chat}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              name: { currentActiveCase.neederLogin }
            </Typography>
            <Typography variant="h6" className={classes.description} component="h2">
              { currentActiveCase.description }
            </Typography>
            <Typography className={classes.posDate} color="textSecondary">
              date: {currentActiveCase.timeStamp}
            </Typography>
          </CardContent>
        </Card>
        <Paper className={classes.chatPaper} elevation={1}>
          { chatContent }
        </Paper>
        <Paper className={classes.messageTyper} elevation={1}>
        <InputBase onChange={
          (e) => {
            this.setState({ messageInput: e.target.value })
            }
          } 
          
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              sendMessage(this.state.messageInput);
            }
          }}
            
          className={classes.input} 
          placeholder="Type message" />
        <IconButton 
        className={classes.iconButton} 
        aria-label="Send"
        onClick={
            () => sendMessage(this.state.messageInput)
          }
          >
          <SendIcon />
        </IconButton>
      </Paper>
      </div>
    );
  }
  
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentActiveCase: state.casesReducer.currentChatCase,
        chatDialog: state.casesReducer.chatDialog
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendChatMessage(message));
      dispatch(addMessageToChat(message));
    }
  }
}



export default Chat = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
