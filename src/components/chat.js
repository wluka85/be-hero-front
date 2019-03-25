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
import moment from 'moment';

const styles = theme => ({
  chat: {
    width: '100%',
  },
  card: {
    width: '100%',
    marginTop: 70,
    height: '18vh',
    minHeight: 110
  },
  firstPersonCard: {
    backgroundColor: '#008cd9',
    marginTop: 10,
  },
  firstPersonDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  secondPersonCard: {
    backgroundColor: '#f1efef',
    marginTop: 10,
  },
  secondPersonDiv: {
    display: 'flex',
    flexDirection: 'row-reverse'
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
    color: 'white'
  },
  firstPersonContent: {
    color: 'white'
  },
  firstPersonPosDate: {
    color: 'white',
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
  userTyping: {
    visibility: 'hidden',
    color: 'red'
  }
});

class Chat extends React.Component {

  state = {
    messageInput: '',
    isTyping: false
  }

  componentDidUpdate() {
    this.refs.isTypingContent.scrollIntoView({block: "end"});
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
    const { classes, currentActiveCase, chatDialog, sendMessage, user, sendIsTyping, userIsTyping } = this.props;
    console.log('user typing... ',userIsTyping)
    const chatContent = (
      <div ref='chatContent' >
        { chatDialog.map((element, key) => {
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
            <Typography variant="h6" className={classes.description} component="h2">
              { currentActiveCase.description }
            </Typography>
            <Typography className={classes.posDate} color="textSecondary">
              {moment(currentActiveCase.timeStamp).format('lll')}
            </Typography>
          </CardContent>
        </Card>
        <Paper className={classes.chatPaper} elevation={1}>
          { chatContent }
          <div ref='isTypingContent' className={!userIsTyping ? classes.userTyping : ''}>Is typing...</div>
        </Paper>
        <Paper className={classes.messageTyper} elevation={1}>
        <InputBase onChange={
          (e) => {
            this.setState({ messageInput: e.target.value })
            }
          } 
          
          onKeyDown = {(e) => {
            if (e.keyCode === 13) {
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
              sendMessage(this.state.messageInput);
              this.clearInput();
              sendIsTyping(false);
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
    }
  }
}



export default Chat = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
