import React from 'react';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import config from '../config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function InfoDialog(info) {
  return (
    <div>
      <Dialog
        open={info.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={info.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {config.ENUMS.UI.INFO_DIALOG_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {config.ENUMS.UI.INFO_DIALOG_TEXT}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={info.handleClose} color='primary'>
            <DoneIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
