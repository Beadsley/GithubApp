import { combineReducers } from 'redux';

const initialState = {
  error: false,
  username: undefined,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USERNAME':
      return {
        ...state,
        error: false,
        username: action.username,
      };
    case 'ERROR':
      return {
        ...state,
        error: true,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}

export default combineReducers({
  data: userReducer,
});
