import {
  languageStatsLoading,
  updateLanguageStats,
  hasErrored,
} from './languageStatsActions';

import { getLanguageStatistics } from '../network/api';

export const languageStatistics = () => {
  return async (dispatch, getState) => {
    try {
      const { username } = getState().user;
      const statistics = await getLanguageStatistics(username);      
      await dispatch(updateLanguageStats(statistics));
      dispatch(languageStatsLoading(false));
    } catch {
      dispatch(hasErrored());
    }
  };
};
