const { request } = require('./network.js');
require('dotenv').config();

const evalLanguages = async (username) => {
  const repos = await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `token ${process.env.TOKEN}`,
    },
  });

  let languagesData = repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      headers: {
        Authorization: `token ${process.env.TOKEN}`,
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

  let total = Object.values(languages).reduce((acc, curr) => acc + curr);

  let languageInfo = [];
  for (const language in languages) {
    languageInfo.push({
      name: language,
      sum: languages[language],
      percentage: languages[language] / total,
      label: `${language}(${Math.round(languages[language] * 100 / total)}%)`,
    });
  }

  return {
    projects: languagesData.length,
    languages: languageInfo,
    total,
  };
};

module.exports = {
  evalLanguages,
};
