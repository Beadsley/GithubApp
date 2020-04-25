const { evalLanguages } = require('../services/statistics.js');
const { getGithubRepoData, getLanguageData } = require('../services/api.js');
const { ENUMS } = require('../config/config.js');

const getLanguageStatistics = async (req, res) => {
  try {
    const username = req.params.user;
    const repos = await getGithubRepoData(username);
    if (repos.length === 0) throw new Error(ENUMS.ERRORMESSAGE.NO_REPOS);
    const languageData = await Promise.all(getLanguageData(repos));
    const { mostusedLanguageInfo, additionalLanguageInfo, total } = evalLanguages(languageData);

    res.json({
      projects: languageData.length,
      languages: {
        mostused: mostusedLanguageInfo,
        additional: additionalLanguageInfo,
        total,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

module.exports = {
  getLanguageStatistics,
};
