import React from 'react';
var PieChart = require('react-chartjs').Pie;

export default React.createClass({
  getInitialState: function () {
    var stats = this.props.user || [];

    var roadCount = Math.floor(stats.total_road_count_add);
    var buildCount = Math.floor(stats.total_building_count_add);
    var waterCount = Math.floor(stats.total_waterway_count_add);
    var poiCount = Math.floor(stats.total_poi_count_add);
    var roadKm = Number(stats.total_road_km_add).toFixed(2);
    var waterKm = Number(stats.total_waterway_km_add).toFixed(2);

    var noDist = false;
    var noCount = false;
    if (roadCount === 0 && buildCount === 0 &&
      waterCount === 0 && poiCount === 0) {
      noCount = true;
      noDist = true;
    }
    if (roadKm === 0 && waterKm === 0) noDist = true;

    var chartDataCount = [];
    var tooltipTemplate = '<%if (label){%><%=label%>: <%}%><%= value %>';
    if (noCount === true) {
      chartDataCount = [{
        value: 1,
        color: '#d6d6d6',
        highlight: '#d6d6d6',
        label: 'No Edits'
      }];
      tooltipTemplate = 'No Edits';
    } else {
      chartDataCount = [
        {
          value: roadCount,
          color: '#faf3b6',
          highlight: '#dcd599',
          label: 'Roads'
        },
        {
          value: waterCount,
          color: '#a8dde1',
          highlight: '#8abcc0',
          label: 'Waterways'
        },
        {
          value: buildCount,
          color: '#fbd1b3',
          highlight: '#dcb296',
          label: 'Buildings'
        },
        {
          value: poiCount,
          color: '#d3e7b9',
          highlight: '#b5c89b',
          label: 'Points of Interest'
        }
      ];
    }
    var chartDataDist = [
      {
        value: roadKm,
        color: '#faf3b6',
        highlight: '#dcd599',
        label: 'Roads'
      },
      {
        value: waterKm,
        color: '#a8dde1',
        highlight: '8abcc0',
        label: 'Waterways'
      },
      {
        value: 0,
        color: '#fbd1b3',
        highlight: '#dcb296',
        label: 'Buildings'
      },
      {
        value: 0,
        color: '#d3e7b9',
        highlight: '#b5c89b',
        label: 'Points of Interest'
      }
    ];
    return {
      chartOptions: {
        animationSteps: 50,
        animationEasing: 'easeOutQuart',
        tooltipTemplate: tooltipTemplate
      },
      chartData: chartDataCount,
      chartDataCount: chartDataCount,
      chartDataDist: chartDataDist,
      noCount: noCount,
      noDist: noDist
    };
  },
  loadDist: function () {
    this.setState({
      chartData: this.state.chartDataDist
    });
  },
  loadCounts: function () {
    this.setState({
      chartData: this.state.chartDataCount
    });
  },

  render: function () {
    return <div>
      <div className = "Pie-Tin">
        <PieChart data={this.state.chartData} options={this.state.chartOptions} width='200px' height='200px' />
      </div>
    {/*<div className = "ChartControls">
        <input type="button" onClick={this.loadCounts} value="By Quantity"
         className = {this.state.noCount ? 'disabled' : ''}/>
        <input type="button" onClick={this.loadDist} value="By Distance"
         className = {this.state.noDist ? 'disabled' : ''} />
      </div>*/}
    </div>;
  }
});
