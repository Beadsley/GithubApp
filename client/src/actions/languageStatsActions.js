export const languageStatsLoading = (boolean) => {
  return {
    type: 'LANGUAGE_STATS_LOADING',
    isLoading: boolean,
  };
};

export const updateLanguageStats = (stats) => {
  return {
    type: 'UPDATE_LANGUAGE_STATS',
    stats,
  };
};

export const hasErrored = (boolean) => {
  return {
    type: 'HAS_ERRORED',
    errored: boolean,
  };
};
