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
      PIE_CHART_TITLE: 'Search a github user',
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
        name: 'Python',
        sum: 54530,
        fraction: 0.3684832922255634,
        label: 'Python(37%)',
      },
      {
        name: 'CSS',
        sum: 3342,
        fraction: 0.022583369936142177,
        label: 'CSS(2%)',
      },
      {
        name: 'JavaScript',
        sum: 17000,
        fraction: 0.011487650775416428,
        label: 'HTML(1%)',
      },
      {
        name: 'Java',
        sum: 88413,
        fraction: 0.597445687062878,
        label: 'Java(60%)',
      },
    ],
  },
};
