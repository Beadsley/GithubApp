const { request } = require('./httpClient.js');
require('dotenv').config();

const getGithubRepoData = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `token ${process.env.TOKEN}`,
    },
  });
};

const getLanguageData = (repos) => {
  return repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      headers: {
        Authorization: `token ${process.env.TOKEN}`,
      },
    });
  });
};

module.exports = {
  getGithubRepoData,
  getLanguageData,
};
