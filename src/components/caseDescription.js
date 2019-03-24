import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import moment from 'moment'

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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

class CaseDescription extends React.Component {
  
  render() {
    const { classes, chosenCase, user, history, getCase } = this.props;
    console.log('cc', chosenCase)
    const buttonGetCase = (
      <Button size="large" color="primary" onClick={ getCase }>
        Get case
      </Button>
    );

    return (
      <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              { chosenCase.description }
            </Typography>
            <Typography component="p">
              author: { chosenCase.neederLogin }
            </Typography>
            <Typography component="p">
              date: { moment(chosenCase.timeStamp).format('lll') }
            </Typography>
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
    getCase: () => {
      
    }
  }
}

export default CaseDescription = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CaseDescription));