const { evalLanguages } = require('../services/statistics.js');
const { getLanguageData } = require('../services/api');

const getLanguageStatistics = async (_root, args) => {
  try {
    const username = args.username;
    const { data } = await getLanguageData(username);
    const repos = data.user.repositories.nodes;
    console.log(repos.length);
    if (repos.length === 0) {
      throw new Error(`${args.username} has no repositories`);
    }
    const { mostusedLanguageInfo, additionalLanguageInfo, total } = evalLanguages(repos);

    return {
      name: data.user.name,
      projects: data.user.repositories.totalCount,
      languages: {
        mostused: mostusedLanguageInfo,
        additional: additionalLanguageInfo,
        total,
      },
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getLanguageStatistics,
};
