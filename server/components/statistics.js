const { request } = require('./network.js');
require('dotenv').config();

const languages = async (username) => {
  const repos = await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: process.env.TOKEN,
    },
  });
  
  let languagesData = repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      headers: {
        Authorization: process.env.TOKEN,
      },
    });
  });
  
  languagesData = await Promise.all(languagesData);
  
  let languages = {};
  languagesData.forEach((repo) => {
    for (const language in repo) {
      if (languages[language] === undefined) {
        languages[language] = repo[language];
      } else {
        languages[language] = repo[language] + languages[language];
      }
    }
  });

  return {
    projects: languagesData.length,
    languages,
  };
};

module.exports = {
  languages,
};