import { combineReducers } from 'redux';
import languageStatistics from './languageStatsReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  languageStatistics,
  user
});

export default rootReducer;
