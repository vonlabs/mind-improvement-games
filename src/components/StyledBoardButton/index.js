import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    height: 68,
    width: 68,
    borderBottom: '1px solid rgba(144, 202, 249, 0.5)',
    borderLeft: '1px solid rgba(144, 202, 249, 0.5)',
    margin: 0,
    borderRadius: 0,
  },
  marked: {
    backgroundColor: 'rgba(10, 216, 74, 0.67);',
    '&:hover':{
      backgroundColor: 'rgba(10, 216, 74, 0.67);',
    }
  },
  lastButton: {
    borderRight: '1px solid rgba(144, 202, 249, 0.5)',
  },
  firstRow: {
    borderTop: '1px solid rgba(144, 202, 249, 0.5)',
  },
});

export default function StyledBoardButton(props) {
  const classes = useStyles();
  return <Button {...props} 
                className={[
                  props.className,
                  classes.root, 
                  props.marked && classes.marked, 
                  props.lastButton && classes.lastButton,
                  props.firstRow && classes.firstRow
                ].join(' ')}></Button>;
}