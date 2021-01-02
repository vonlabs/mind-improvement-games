import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    width: '70px',
    height: '70px',
    border: '1px solid rgba(144,202,249,0.5)',
    margin: 0,
    borderRadius: 0,
    padding: 0,
  },
  marked: {
    color: 'rgb(48, 109, 23)',
    backgroundColor: 'rgb(48, 109, 23, 0.5)',
  },
  wrong: {
    color: 'rgb(220, 0, 78);',
  }
};

function ButtonNumber (props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={[classes.root, className, props.marked && classes.marked, props.wrong && classes.wrong].join(' ')} {...other}>
      {children}
    </Button>
  );
}

ButtonNumber.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(ButtonNumber);