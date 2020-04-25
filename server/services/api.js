const { request } = require('./httpClient.js');
require('dotenv').config();

const getGithubRepoData = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    params: {
      client_id: `${process.env.CLIENT_ID}`,
      client_secret: `${process.env.CLIENT_SECRET}`,
    },
  });
};

const getLanguageData = (repos) => {
  return repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      params: {
        client_id: `${process.env.CLIENT_ID}`,
        client_secret: `${process.env.CLIENT_SECRET}`,
      },
    });
  });
};

module.exports = {
  getGithubRepoData,
  getLanguageData,
};
