import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorAlert() {
  const classes = useStyles();
  const { error, errorMessage } = useSelector((state) => state.user.data);
  const [open, setOpen] = useState(error);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setOpen(true);
      setMessage(errorMessage);
    } else {
      setOpen(errorMessage);
      setMessage(null);
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
