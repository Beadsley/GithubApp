import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import config from '../config';
import InfoDialog from './InfoDialog';
import Iconpopover from './Iconpopover';
import { useDispatch } from 'react-redux';
import { addUsername } from '../actions/userActions';
import { languageStatsLoading, hasErrored } from '../actions/languageStatsActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(9),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
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

export default function SearchAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInput, setUserInput] = React.useState('');
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
  const handleUserInput = (e) => setUserInput(e.target.value);

  function keyPress(e) {
    if (e.keyCode === 13) {
      dispatch(languageStatsLoading(true));
      dispatch(hasErrored(false));
      dispatch(addUsername(e.target.value));
      setUserInput('');
    }
  }

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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={userInput}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={keyPress}
              onChange={handleUserInput}
            />
          </div>
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
