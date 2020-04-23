import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  iconContainer: {
    flex: 1,
  },
  icon: {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [userInput, setUserInput] = useState('');

  function keyPress(e) {
    if (e.keyCode == 13) {
      console.log('value', e.target.value);
      //fetch data
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={'handleClick'} color='inherit'>
            <GitHubIcon />
          </IconButton>
          {/* <Typography variant='h6' className={classes.title}>
            Title
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={keyPress}
            />
          </div>
          <div
            className={classes.iconContainer}
            className={classes.icon}
          >
            <IconButton onClick={'handleClick'} color='inherit'>
              <InfoIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
