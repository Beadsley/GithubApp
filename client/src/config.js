export default {
  ENUMS: {
    UI: {
      INFO_POPOVER: 'Additional information',
      GITHUB_POPOVER: 'GitHub repository',
      INFO_DIALOG_TITLE: 'Information about the app',
      INFO_DIALOG_TEXT: `Ever wondered which one of your developer colleagues would be best suited to the
                          task. Now you can search for your colleague by their github username and find out
                          what programming language they've used the most based on their github projects.`,
      ERROR_ALERT_TEXT: 'Invalid github username!',
      PIE_CHART_TITLE: 'Programming Language Distribution',
      SEARCH_BAR_HINT: 'GitHub username…',
    },
    COLOUR: {
      GREY: '#494949',
      WHITE: 'white',
    },
  },
  URL: {
    github: 'https://github.com/Beadsley/GithubApp',
  },
  data: {
    pieChart: [
      {
        name: 'JavaScript',
        sum: 100,
        fraction: 1,
        label: 'JavaScript(100%)',
      },
    ],
  },
};
