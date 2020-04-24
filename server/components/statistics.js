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

const total = (languages) => Object.values(languages).reduce((acc, curr) => acc + curr);

const percentage = (sum, total) => Math.round((sum * 100) / total);

const filterLanguages = (languages) => {
  let additionalLanguages = {};
  for (const language in languages) {
    const languagePercentage = percentage(languages[language], total(languages));
    if (languagePercentage === 0) {
      additionalLanguages[language] = languages[language];
      delete languages[language];
    }
  }
  return { additionalLanguages, mostused: languages };
};

const calcLanguageInfo = (languages, total) => {
  let languageInfo = [];
  for (const language in languages) {
    const languagePercentage = percentage(languages[language], total);
    languageInfo.push({
      name: language,
      sum: languages[language],
      fraction: languages[language] / total,
      label: `${language}(${languagePercentage}%)`,
    });
  }
  return languageInfo;
};

const evalLanguages = async (username) => {
  const repos = await getGithubRepoData(username);
  let languageData = getLanguageData(repos);
  languageData = await Promise.all(languageData);
  const languages = mergeLanguageData(languageData);
  const { additionalLanguages, mostused } = filterLanguages(languages);
  const mostusedLanguageInfo = calcLanguageInfo(mostused, total(mostused));
  const additionalLanguageInfo = calcLanguageInfo(additionalLanguages, total(languages));
  return {
    projects: languageData.length,
    languages: {
      mostused: mostusedLanguageInfo,
      additional: additionalLanguageInfo,
      total: total(languages),
    },
  };
};

module.exports = {
  evalLanguages,
};
