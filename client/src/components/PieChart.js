import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useSelector, useDispatch } from 'react-redux';
import { languageStatistics } from '../actions/apiActions';
import config from '../config';

const styles = {
  root: {
    paddingTop: 22,
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
  chart: {
    height: 400
  }
};

export default function PieChart() {
  const [chartData, setChartData] = useState(config.data.pieChart);
  const [title, setTitle] = useState(config.ENUMS.UI.PIE_CHART_TITLE);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const { username } = useSelector((state) => state.user);
  const { areLoading, data } = useSelector((state) => state.languageStatistics);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username !== null) {
      dispatch(languageStatistics());
    }
  }, [username]);

  useEffect(() => {
    if (areLoading === false) {
      setChartData(data.languages.mostused);
      setTitle(`${username} most used languages from ${data.projects} projects.`);
    }
  }, [areLoading]);

  const LegendRoot = (props) => <Legend.Root {...props} style={pageWidth > 500 ? styles.legendRootDesktop : styles.legendRootMobile} />;
  const LegendItem = (props) => <Legend.Item {...props} style={pageWidth > 500 ? styles.legendItemDesktop : styles.legendItemMobile} />;
  const LegendLabel = (props) => <Legend.Label {...props} style={styles.legendLabel} />;

  return (
    <Paper style={styles.root}>
      <Chart data={chartData}>
        <PieSeries valueField='sum' argumentField='label' />
        <Legend
          position='bottom'
          rootComponent={LegendRoot}
          itemComponent={LegendItem}
          labelComponent={LegendLabel}
        />
        <Title text={title} />
        <Animation />
      </Chart>
    </Paper>
  );
}
