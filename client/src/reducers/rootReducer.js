import { combineReducers } from 'redux';
import languageStatistics from './languageStatsReducer';

const rootReducer = combineReducers({
  languageStatistics
});

export default rootReducer;
