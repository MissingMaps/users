import React from 'react';
var PieChart = require('react-chartjs').Pie;

export default React.createClass({
  getInitialState: function () {
    var stats = this.props.user || [];

    var chartDataCount = [
      {
        value: Math.floor(stats.total_road_count_add),
        color: '#F9E698',
        highlight: '#F7EEC1',
        label: 'Roads'
      },      
      {
        value: Math.floor(stats.total_waterway_count_add),
        color: '#91B7FF',
        highlight: '#BDD4FF',
        label: 'Waterways'
      },
      {
        value: Math.floor(stats.total_building_count_add),
        color: '#FFA3A2',
        highlight: '#FFC6C5',
        label: 'Buildings'
      },
      {
        value: Math.floor(stats.total_poi_count_add),
        color: '#C6EAA7',
        highlight: '#DDEDCE',
        label: 'Points of Interest'
      }
    ];
    var chartDataDist = [
      {
        value: Math.floor(stats.total_road_km_add),
        color: '#E1E300',
        highlight: '#E8EA6B',
        label: 'Roads'
      },
      {
        value: 0,
        color: '#BEBFBF',
        highlight: '#D2D3D3',
        label: 'Buildings'
      },
      {
        value: 0,
        color: '#FFA3A2',
        highlight: '#FFC6C5',
        label: 'Points of Interest'
      },
      {
        value: Math.floor(stats.total_waterway_count_add),
        color: '#91B7FF',
        highlight: '#BDD4FF',
        label: 'Waterways'
      }
    ];
    return {
      chartOptions: {
        animationSteps: 50,
        animationEasing: 'easeOutQuart'
      },
      chartData: chartDataCount,
      chartDataCount: chartDataCount,
      chartDataDist: chartDataDist
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
    console.log(this.state.chartData)
    return <div>
      <div className = "Pie-Tin">
        <PieChart data={this.state.chartData} options={this.state.chartOptions} width='250' height='155' />
      </div>
      <div className = "ChartControls">
        <input type="button" onClick={this.loadCounts} value="By Quantity" />
        <input type="button" onClick={this.loadDist} value="By Distance" />
      </div>
    </div>;
  }
});
