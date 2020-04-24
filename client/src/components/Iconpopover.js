import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Popover } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: '#494949',
  },
  popText: {
    fontSize: 12,
    color: 'white',
  },
}));

export default function Iconpopover({ anchorEl, handlePopoverClose, popoverMessage }) {
  const open = Boolean(anchorEl);
  const classes = useStyles();

  return (
    <Popover
      id='mouse-over-popover'
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography className={classes.popText}>{popoverMessage}</Typography>
    </Popover>
  );
}
