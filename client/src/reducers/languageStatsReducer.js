import { combineReducers } from 'redux';

export function hasErrored(state = false, action) {
  switch (action.type) {
    case 'HAS_ERRORED':
      return action.errored;
    default:
      return state;
  }
}

export default combineReducers({
  errored: hasErrored,
});
