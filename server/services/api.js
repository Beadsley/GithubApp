const { request } = require('./httpClient.js');
process.env.NODE_ENV === 'development' && require('dotenv').config();

const getGithubRepoData = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `Basic ${process.env.TOKEN}`,
    },
  });
};

const getLanguageData = (repos) => {
  return repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      headers: {
        Authorization: `Basic ${process.env.TOKEN}`,
      },
    });
  });
};

const getUserInfo = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}`,
    headers: {
      Authorization: `Basic ${process.env.TOKEN}`,
    },
  });
};
module.exports = {
  getGithubRepoData,
  getLanguageData,
  getUserInfo,
};
