const { request } = require('./network.js');
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

const mergeLanguageData = (data) => {
  let languages = {};
  data.forEach((repo) => {
    for (const language in repo) {
      if (languages[language] === undefined) {
        languages[language] = repo[language];
      } else {
        languages[language] = repo[language] + languages[language];
      }
    }
  });
  return languages;
};

const calcLanguageInfo = (languages, total) => {
  // prettier-ignore
  const percentage = (sum) => Math.round(sum * 100 / total);
  let languageInfo = [];
  for (const language in languages) {
    languageInfo.push({
      name: language,
      sum: languages[language],
      fraction: languages[language] / total,
      label: `${language}(${percentage(languages[language])}%)`,
    });
  }
  return languageInfo;
};

const evalLanguages = async (username) => {
  const repos = await getGithubRepoData(username);
  let languageData = getLanguageData(repos);
  languageData = await Promise.all(languageData);
  const languages = mergeLanguageData(languageData);
  // prettier-ignore
  const total = Object.values(languages).reduce((acc, curr) => acc + curr);
  const languageInfo = calcLanguageInfo(languages, total);
  return {
    projects: languageData.length,
    languages: languageInfo,
    total,
  };
};

module.exports = {
  evalLanguages,
};
