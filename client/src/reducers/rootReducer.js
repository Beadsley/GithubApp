import { combineReducers } from 'redux';
import popover from './popoverReducer';

const rootReducer = combineReducers({
  popover,
});

export default rootReducer;
