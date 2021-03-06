import React from 'react';
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
import { sendChatMessage, sendUserTyping } from '../actions/socketActions';
import { setActiveCaseCurrentChat } from '../actions/casesActions';
import moment from 'moment';

const styles = theme => ({
  chat: {
    width: '100%',
  },
  card: {
    width: '100%',
    marginTop: 70,
    height: '18vh',
    minHeight: 110,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f5f5f5'
    }
  },
  firstPersonCard: {
    backgroundColor: '#80cbc4',
    marginTop: 10,
    '&:last-child': {
      marginBottom: 10
    }
  },
  firstPersonDiv: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    overflow: 'auto'    
  },
  secondPersonCard: {
    backgroundColor: '#f1efef',
    marginTop: 10,
  },
  secondPersonDiv: {
    display: 'flex',
    flexDirection: 'row-reverse',
    maxWidth: '100%',
    overflow: 'auto'
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
  firstPersonTitle: {
    fontSize: 14,
    color: '#424242'
  },
  firstPersonContent: {
    wordBreak: 'break-all'
  },
  secondPersonContent: {
    wordBreak: 'break-all'
  },
  firstPersonPosDate: {
    textAlign: 'right',
    fontSize: 10,
  },
  secondPersonPosDate: {
    textAlign: 'right',
    fontSize: 10,
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
  cardContent: {
    padding: '10px',
    "&:last-child": {
      paddingBottom: '10px'
    }
  },
  userNotTyping: {
    visibility: 'hidden',
    padding: '5px'
  },
  userTyping: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px',
    paddingRight: '10px',
    fontSize: '0.8em',
    color: '#616161'
  },
  notificationContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  notification: {
    lineHeight: '500%',
    color: '#757575',
    fontSize: '3em',
    fontWeight: 'bold'
  }
});

class Chat extends React.Component {

  componentDidMount() {
    const { handleSetCurrentActiveCase } = this.props;
    const chatId = this.props.match.params.id;
    handleSetCurrentActiveCase(chatId);
  }

  state = {
    messageInput: '',
    isTyping: false
  }

  componentDidUpdate() {
    this.refs.chatContent.scrollIntoView({block: "end"});
  }


  clearInput = () => {
    this.setState({messageInput: ''});
  }

  isUserTyping = () => {
    const { sendIsTyping } = this.props;
    const lastUpdateTime = Date.now();
    console.log('enter is typing')
    this.setState({isTyping: true});
    sendIsTyping(true);
    this.startCheckingTyping(lastUpdateTime);
  }

  startCheckingTyping = (lastUpdateTime) => {
    console.log('in start checking')
    const typingInterval = setInterval(() => {
      if(Date.now() - lastUpdateTime > 3000) {
        this.setState({isTyping: false});
        this.stopCheckingTyping(typingInterval);
      }
    }, 3000);
  }

  stopCheckingTyping = (typingInterval) => {
    const { sendIsTyping } = this.props;
    console.log('in stop checking', typingInterval)
    if(typingInterval) {
      clearInterval(typingInterval);
      console.log('we are stopped typing')
      sendIsTyping(false);
    }
  }

  render() {
    const { classes, currentActiveCase, chatDialog, sendMessage, user, sendIsTyping, userIsTyping, history, role } = this.props;
    const chatContent = (
      <div ref='chatContent'>
        {chatDialog.length ? chatDialog.map((element, key) => {
          return (
            <div className={user.name === element.author ? classes.firstPersonDiv : classes.secondPersonDiv} key={key}>
              <Card
                className={classes.card} 
                className={ user.name === element.author ? classes.firstPersonCard : classes.secondPersonCard } 
                key={key}>
                <CardContent className={classes.cardContent}>
                  <Typography className={user.name === element.author ? classes.firstPersonTitle : classes.secondPersonTitle} color="textSecondary" gutterBottom>
                    { element.author }
                  </Typography>
                  <Typography className={user.name === element.author ? classes.firstPersonContent : classes.secondPersonContent} component="p">
                    { element.contents }
                  </Typography>
                  <Typography className={user.name === element.author ? classes.firstPersonPosDate : classes.secondPersonPosDate} color="textSecondary">
                    { moment(element.timeStamp).format('lll') }
                  </Typography>
                </CardContent>
              </Card>
            </div>
            )
          })
          : <div className={classes.notificationContainer}>
              <Typography className={classes.notification}>
                Create your first message!
              </Typography>
            </div>
        }
      </div>
    );

    return (
      <div className={classes.chat}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              author: { currentActiveCase.neederLogin }
            </Typography>
            <Typography variant="h6" className={classes.description} component="h2" onClick={() => history.push('/'+ role + '/case-description/' + currentActiveCase._id)}>
              { currentActiveCase.description }
            </Typography>
            <Typography className={classes.posDate} color="textSecondary">
              {moment(currentActiveCase.timeStamp).format('lll')}
            </Typography>
          </CardContent>
        </Card>
        <Paper className={classes.chatPaper} elevation={1}>
          { chatContent }
        </Paper>
        <div className={!userIsTyping ? classes.userNotTyping : classes.userTyping}>Is typing...</div>
        <Paper className={classes.messageTyper} elevation={1}>
        <InputBase onChange={
          (e) => {
            this.setState({ messageInput: e.target.value })
            }
          } 
          
          onKeyDown = {(e) => {
            if (e.keyCode === 13 && this.state.messageInput) {
              sendMessage(this.state.messageInput);
              this.clearInput();
              sendIsTyping(false);
            }
          }}

          onKeyUp = { e => { e.keyCode !== 13 && this.isUserTyping() } }
            
          className={classes.input} 
          placeholder="Type message"
          value={this.state.messageInput} />
        <IconButton 
        className={classes.iconButton} 
        aria-label="Send"
        onClick={
            () => {
              if(this.state.messageInput) {
                sendMessage(this.state.messageInput);
                this.clearInput();
                sendIsTyping(false);
              }
            }
          }
          >
          <SendIcon />
        </IconButton>
      </Paper>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
    return {
        role: state.accountReducer.role,
        currentActiveCase: state.casesReducer.currentChatCase,
        chatDialog: state.casesReducer.chatDialog,
        user: state.accountReducer.user,
        userIsTyping: state.messageReducer.userIsTyping,
        sender: state.messageReducer.sender
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendChatMessage(message));
      dispatch(addMessageToChat(message));
    },
    sendIsTyping: (isTyping) => {
      dispatch(sendUserTyping(isTyping));
    },
    handleSetCurrentActiveCase: (id) => { dispatch(setActiveCaseCurrentChat(id)) }
  }
}



export default Chat = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
