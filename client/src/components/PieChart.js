import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useSelector, useDispatch } from 'react-redux';
import { languageStatistics } from '../actions/apiActions';

const mockData = [
  {
    name: 'Python',
    sum: 5453,
    fraction: 0.3684832922255634,
    label: 'JavaScript(37%)',
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
];

const styles = {
  legendRoot: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
  },
  legendLabel: {
    whiteSpace: 'nowrap',
  },
};

export default function PieChart() {
  const [chartData, setChartData] = useState(mockData);
  const { username } = useSelector((state) => state.user);
  const { areLoading, data, errored } = useSelector((state) => state.languageStatistics);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username !== null) {
      dispatch(languageStatistics());
    }
  }, [username]);

  const LegendRoot = (props) => <Legend.Root {...props} style={styles.legendRoot} />;
  const LegendItem = (props) => <Legend.Item {...props} style={styles.legendItem} />;
  const LegendLabel = (props) => <Legend.Label {...props} style={styles.legendLabel} />;

  if (areLoading === false && errored === false) {
    const title = `${username} most used languages from ${data.projects} projects.`;
    return (
      <Paper>
        <Chart data={data.languages.mostused}>
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
  } else {
    return (
      <Paper>
        <Chart data={chartData}>
          <PieSeries valueField='sum' argumentField='label' />
          <Legend
            position='bottom'
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
          <Title text='Github Languages' />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
