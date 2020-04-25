import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import config from '../config';
import InfoDialog from './InfoDialog';
import Iconpopover from './Iconpopover';
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  infoIconContainer: {
    flex: 1,
  },
  infoIcon: {
    display: 'flex',
    marginLeft: 'auto',
  },
  icon: {
    fontSize: '1.1em',
  },
  ancor: {
    color: 'white',
  },
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverMessage, setPopoverMessage] = React.useState(undefined);
  const [showInfo, setShowInfo] = React.useState(false);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event, icon) => {
    setAnchorEl(event.currentTarget);

    if (icon === 'info') {
      setPopoverMessage(config.ENUMS.UI.INFO_POPOVER);
    } else if (icon === 'github') {
      setPopoverMessage(config.ENUMS.UI.GITHUB_POPOVER);
    }
  };

  const handlePopoverClose = () => setAnchorEl(null);
  const handleInfoOpen = () => setShowInfo(true);
  const handleInfoClose = () => setShowInfo(false);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <a className={classes.ancor} href={config.URL.github}>
            <IconButton
              onClick={'handleClick'}
              color='inherit'
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup='true'
              onMouseEnter={(e) => handlePopoverOpen(e, 'github')}
              onMouseLeave={handlePopoverClose}
            >
              <GitHubIcon className={classes.icon} />
            </IconButton>
          </a>
          <SearchBar />
          <div className={classes.infoIconContainer} className={classes.infoIcon}>
            <IconButton
              onClick={handleInfoOpen}
              color='inherit'
              fontSize='large'
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup='true'
              onMouseEnter={(e) => handlePopoverOpen(e, 'info')}
              onMouseLeave={handlePopoverClose}
            >
              <InfoIcon className={classes.icon} />
            </IconButton>
          </div>
        </Toolbar>
        <Iconpopover
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
          popoverMessage={popoverMessage}
        />
        <InfoDialog show={showInfo} handleClose={handleInfoClose} />
      </AppBar>
    </div>
  );
}