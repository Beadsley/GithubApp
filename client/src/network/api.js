import request from './httpClient';

export const getLanguageStatistics = (username) => {
  return request({
    method: 'get',
    url: `/api/languages/${username}`,
  });
};
