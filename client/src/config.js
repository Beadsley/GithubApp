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
      PIE_CHART_HEADING: 'Programming language distribution',
      PIE_CHART_TITLE: 'Find out your fellow colleagues most used languages',
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
        sum: 82494,
        fraction: 0.4664024469534638,
        label: 'JavaScript(47%)',
      },
      {
        name: 'CSS',
        sum: 3738,
        fraction: 0.021133807873445917,
        label: 'CSS(2%)',
      },
      {
        name: 'HTML',
        sum: 2228,
        fraction: 0.012596608866248664,
        label: 'HTML(1%)',
      },
      {
        name: 'Java',
        sum: 88413,
        fraction: 0.49986713630684165,
        label: 'Java(50%)',
      },
    ],
  },
};
