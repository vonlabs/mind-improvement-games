import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    width: '140px',
    border: '1px solid rgba(144,202,249,0.5)',
    color: 'rgba(144,202,249)',
    margin: '8px',
    "&:hover": {
      border: '1px solid rgba(144,202,249,0.5)',
    }

  }
}

function ButtonGamePlay (props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={[classes.root, className].join(' ')} {...other}>
      {children}
    </Button>
  );
}

ButtonGamePlay.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ButtonGamePlay);