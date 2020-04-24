import { combineReducers } from 'redux';

export function addUsername(state = null, action) {
  switch (action.type) {
    case 'ADD_USERNAME':
      return action.username;
    default:
      return state;
  }
}

export default combineReducers({
  username: addUsername,
});
