import { combineReducers } from 'redux';

export function languageStatsLoading(state = true, action) {
  switch (action.type) {
    case 'LANGUAGE_STATS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function updateLanguageStats(state = [], action) {
  switch (action.type) {
    case 'UPDATE_PATIENT_STATISTICS':
      return action.stats;
    default:
      return state;
  }
}
export function hasErrored(state = false, action) {
  switch (action.type) {
    case 'HAS_ERRORED':
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  areLoading: languageStatsLoading,
  data: updateLanguageStats,
  errored: hasErrored,
});
