const { evalLanguages } = require('../services/statistics.js');
const { ENUMS } = require('../config/config.js');
const { getLanguageData } = require('../services/api');

const getLanguageStatistics = async (_root, args) => {
  try {
    const username = args.username;
    const { data } = await getLanguageData(username);
    const repos = data.user.repositories.nodes;
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

const getClientBuild = (_req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html'));

module.exports = {
  getLanguageStatistics,
  getClientBuild,
};
