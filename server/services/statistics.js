const nodemon = require('nodemon');

const total = (languages) => Object.values(languages).reduce((acc, curr) => acc + curr, 0);

const percentage = (sum, total) => Math.round((sum * 100) / total);

const formatData = (data) => {
  return data.map((repo) => {
    return {
      languages: repo.languages.edges.map((language) => {
        return {
          size: language.size,
          name: language.node.name,
        };
      }),
    };
  });
};

const mergeLanguageData = (data) => {
  let languages = {};
  data.forEach((repo) => {
    repo.languages.forEach((language) => {
      if (languages[language.name] === undefined) {
        languages[language.name] = language.size;
      } else {
        languages[language.name] = language.size + languages[language.name];
      }
    });
  });
  return languages;
};

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

const evalLanguages = (data) => {
  const forMattedData = formatData(data);
  const languages = mergeLanguageData(forMattedData);
  const { additionalLanguages, mostused } = filterLanguages(languages);
  const mostusedLanguageInfo = calcLanguageInfo(mostused, total(mostused));
  const additionalLanguageInfo = calcLanguageInfo(additionalLanguages, total(languages));

  return { mostusedLanguageInfo, additionalLanguageInfo, total: total(languages) };
};

module.exports = {
  evalLanguages,
};
