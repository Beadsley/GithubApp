import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
  

import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { country: 'JavaScript', area: 54530 },
  { country: 'CSS', area: 3342 },
  { country: 'HTML', area: 1700 },
  { country: 'Java', area: 88413 },
];

const legendRootStyle = {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  };
  const LegendRoot = props => (
    <Legend.Root {...props} style={legendRootStyle} />
  );
  
  const legendItemStyle = {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
  };
  const LegendItem = props => (
    <Legend.Item {...props} style={legendItemStyle} />
  );
  
  const legendLabelStyle = {
    whiteSpace: 'nowrap',
  };
  const LegendLabel = props => (
    <Legend.Label {...props} style={legendLabelStyle} />
  );
  
export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="area"
            argumentField="country"
          />
                   <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
          <Title
            text="Area of Countries"
          />          
          <Animation />
        </Chart>
        
      </Paper>
    );
  }
}