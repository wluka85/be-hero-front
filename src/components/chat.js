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
import { sendChatMessage } from '../actions/socketActions';
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
  }
});

class Chat extends React.Component {

  state = {
    messageInput: ''
  }

  componentDidUpdate() {
    this.refs.chatContent.scrollIntoView({block: "end"});
  }

  render() {
    const { classes, currentActiveCase, chatDialog, sendMessage, user } = this.props;
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

const mapStateToProps = (state) => {
    return {
        currentActiveCase: state.casesReducer.currentChatCase,
        chatDialog: state.casesReducer.chatDialog,
        user: state.accountReducer.user
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
