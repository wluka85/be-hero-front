import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import moment from 'moment';
import { sendCaseTakenMessage } from '../actions/socketActions'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 70,
    height: '80vh',
    padding: 30
  },
  cardContent: {
    // padding: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  labelsContainer: {
    padding: 10,
    textAlign: 'right'
  },
  infoContainer: {
    padding: 10,
    textAlign: 'left'
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  itemDescription: {
    width: '100%',
  },
  itemContent: {
    width: '80%',
    textAlign: 'right',
    marginRight: '10px'
  }
};

class CaseDescription extends React.Component {
  
  render() {
    const { classes, chosenCase, user, history, handleGetCase } = this.props;
    const buttonGetCase = (
      <Button size="large" color="primary" onClick={ ()=> { handleGetCase(chosenCase) }}>
        Get case
      </Button>
    );

    return (
      <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.item}>
              <Typography className={classes.itemContent} gutterBottom variant="h5" component="h2">
                description:
              </Typography>
              <Typography className={classes.itemDescription} gutterBottom variant="h5" component="h2">
                { chosenCase.description }
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography className={classes.itemContent} variant="h6" component="p">
                author:
              </Typography>
              <Typography className={classes.itemDescription} variant="h6" component="p">
                { chosenCase.neederLogin }
              </Typography>
              </div>
            <div className={classes.item}>
              <Typography className={classes.itemContent} variant="h6" component="p">
                personal data:
              </Typography>
              <Typography className={classes.itemDescription} variant="h6" component="p">
                { chosenCase.personalData ? chosenCase.personalData : '-' }
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography className={classes.itemContent} variant="h6" component="p">
                date:
              </Typography>
              <Typography className={classes.itemDescription} variant="h6" component="p">
                { moment(chosenCase.timeStamp).format('lll') }
              </Typography>
            </div>
          </CardContent>
        <CardActions className={classes.buttonArea}>
          <Button size="large" color="primary" onClick={() => { history.goBack() }}>
            Back
          </Button>
          { user.role === 'hero' ? buttonGetCase : (<React.Fragment></React.Fragment>) }
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('object ', state.casesReducer.chosenCase)
    return {
        user: state.accountReducer.user,
        chosenCase: state.casesReducer.chosenCase
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCase: (chosenCase) => dispatch(sendCaseTakenMessage(chosenCase))
  }
}

export default CaseDescription = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CaseDescription));