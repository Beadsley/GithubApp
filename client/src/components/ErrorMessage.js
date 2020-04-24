import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { IconButton, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import config from '../config';
import { hasErrored } from '../actions/languageStatsActions';

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
  const dispatch = useDispatch();
  const { errored } = useSelector((state) => state.languageStatistics);
  const [open, setOpen] = React.useState(errored);

  useEffect(() => {
    errored ? setOpen(true) : setOpen(false);
  }, [errored]);

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
                dispatch(hasErrored(false));
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {config.ENUMS.UI.ERROR_ALERT_TEXT}
        </Alert>
      </Collapse>
    </div>
  );
}
