import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { LANGUAGES } from '../graphQL/queries';
import { Typography } from '@material-ui/core';
import { hasErrored } from '../store/actions/userActions';
import config from '../config';

const styles = {
  root: {
    paddingTop: 12,
    textAlign: 'center',
  },
  legendRootDesktop: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
  legendRootMobile: {
    display: 'flex',
    margin: 'auto',
    flexWrap: 'wrap',
  },
  legendItemDesktop: {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
  },
  legendItemMobile: {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
    flex: '0 0 33.333333%',
    width: '33%',
  },
  legendLabel: {
    whiteSpace: 'nowrap',
  },
};

export default function PieChart() {
  const [chartData, setChartData] = useState(config.data.pieChart);
  const [title, setTitle] = useState(config.ENUMS.UI.PIE_CHART_TITLE);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [rootStyles, setRootStyles] = useState(styles.root);
  const { username } = useSelector((state) => state.user.data);
  const [getLanguages, result] = useLazyQuery(LANGUAGES);
  const dispatch = useDispatch();

  const capitalise = (name) =>
    name
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  useEffect(() => {
    const paddingBottom = window.innerHeight - window.document.body.offsetHeight;
    paddingBottom > 0 && setRootStyles({ paddingBottom, ...rootStyles });
  }, []);

  useEffect(() => {
    if (username) {
      getLanguages({ variables: { username: username } });
    }
  }, [username]);

  useEffect(() => {
    if (result.data) {
      setChartData(result.data.languageStatistics.languages.mostused);
      setTitle(
        `${capitalise(result.data.languageStatistics.name)}'s most used languages from ${
          result.data.languageStatistics.projects
        } ${result.data.languageStatistics.projects === 1 ? 'project' : 'projects'}`
      );
    } else if (result.error) {
      dispatch(hasErrored(result.error.message));
    }
  }, [result]);

  const LegendRoot = (props) => (
    <Legend.Root {...props} style={pageWidth > 500 ? styles.legendRootDesktop : styles.legendRootMobile} />
  );
  const LegendItem = (props) => (
    <Legend.Item {...props} style={pageWidth > 500 ? styles.legendItemDesktop : styles.legendItemMobile} />
  );
  const LegendLabel = (props) => <Legend.Label {...props} style={styles.legendLabel} />;

  return (
    <Paper style={rootStyles}>
      <Typography variant='h4' gutterBottom>
        {config.ENUMS.UI.PIE_CHART_HEADING}
      </Typography>
      <Chart data={chartData}>
        <PieSeries valueField='sum' argumentField='label' />
        <Legend position='bottom' rootComponent={LegendRoot} itemComponent={LegendItem} labelComponent={LegendLabel} />
        <Title text={title} />
        <Animation />
      </Chart>
    </Paper>
  );
}
