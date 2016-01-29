import React from 'react';
var PieChart = require('react-chartjs').Pie;

export default React.createClass({
  getInitialState: function () {
    var stats = this.props.user || [];

    var roadCount = Math.floor(stats.total_road_count_add);
    var buildCount = Math.floor(stats.total_building_count_add);
    var waterCount = Math.floor(stats.total_waterway_count_add);
    var poiCount = Math.floor(stats.total_poi_count_add);
    var roadKm = Math.floor(stats.total_road_km_add);
    var waterKm = Math.floor(stats.total_waterway_km_add);

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
        color: '#dedede',
        highlight: '#dedede',
        label: 'No Edits'
      }];
      tooltipTemplate = 'No Edits';
    } else {
      chartDataCount = [
        {
          value: roadCount,
          color: '#eaeaea',
          highlight: '#f2f2f2',
          label: 'Roads'
        },
        {
          value: waterCount,
          color: '#cccccc',
          highlight: '#dddddd',
          label: 'Waterways'
        },
        {
          value: buildCount,
          color: '#969696',
          highlight: '#aaaaaa',
          label: 'Buildings'
        },
        {
          value: poiCount,
          color: '#6b6b6b',
          highlight: '#8e8e8e',
          label: 'Points of Interest'
        }
      ];
    }
    var chartDataDist = [
      {
        value: roadKm,
        color: '##f7f7f7',
        highlight: '#E8EA6B',
        label: 'Roads'
      },
      {
        value: waterKm,
        color: '#cccccc',
        highlight: '#BDD4FF',
        label: 'Waterways'
      },
      {
        value: 0,
        color: '#969696',
        highlight: '#D2D3D3',
        label: 'Buildings'
      },
      {
        value: 0,
        color: '#525252',
        highlight: '#FFC6C5',
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
        <PieChart data={this.state.chartData} options={this.state.chartOptions} width='250' height='155' />
      </div>
      <div className = "ChartControls">
        <input type="button" onClick={this.loadCounts} value="By Quantity"
         className = {this.state.noCount ? 'disabled' : ''}/>
        <input type="button" onClick={this.loadDist} value="By Distance"
         className = {this.state.noDist ? 'disabled' : ''} />
      </div>
    </div>;
  }
});
