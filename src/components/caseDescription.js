import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = {
  card: {
    width: '100%',
    marginTop: 70,
    height: '80vh',
  },
};

class CaseDescription extends React.Component {
  
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.accountReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {}
  }
}

export default CaseDescription = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CaseDescription));