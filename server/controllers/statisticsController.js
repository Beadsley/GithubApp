const { evalLanguages } = require('../services/statistics.js');
const { getGithubRepoData, getLanguageData, getUserInfo, testy } = require('../services/api.js');
const { ENUMS } = require('../config/config.js');

const getLanguageStatistics = async (_root, args) => {
  try {
    const username = args.username;
    const { data } = await testy(username);
    // console.log(data);
    const repos = data.user.repositories.nodes;
    // const repos = await getGithubRepoData(username);
    // if (repos.length === 0) throw new Error(ENUMS.ERRORMESSAGE.NO_REPOS);
    // const languageData = await Promise.all(getLanguageData(data.user.repositories.nodes));
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
    return {
      error: err.message,
    };
  }
};

const getClientBuild = (_req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html'));

module.exports = {
  getLanguageStatistics,
  getClientBuild,
};
