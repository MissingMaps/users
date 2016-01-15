import React from 'react';
import CalHeatMap from 'cal-heatmap';

export default React.createClass({
  getInitialState: function () {
    // Set the number of calendar months to display at the
    // smaller of (horizontal resolution + 30) / 100 and 12.
    var chartSize = {};
    if (window.innerWidth >= 1100) {
      chartSize = {tallerDiv: true, cellSize: 13.9, range: 12};
    } else {
      var months = ~~((window.innerWidth + 100) / 100);
      if (months > 12) months = 12;
      chartSize = {tallerDiv: false, cellSize: 12, range: months};
    }
    return {
      timestamps: this.props.timestamps || {},
      windowWidth: window.innerWidth,
      tallerDiv: chartSize.tallerDiv,
      domain: 'month',
      range: chartSize.range,
      subDomain: 'day',
      rowLimit: 7,
      domainLabelFormat: '%B',
      cellSize: chartSize.cellSize,
      displayLegend: false,
      cal: new CalHeatMap()
    };
  },
  handleResize: function (e) {
    this.setState({windowWidth: window.innerWidth});
    var containerWidth = document.getElementsByClassName(
      'Contribute-Timeline-Container')[0].offsetWidth;

    // Set the number of calendar months to display at the
    // smaller of (horizontal resolution + 30) / 100 and 12.
    if (containerWidth >= 985) {
      this.setState({tallerDiv: true, cellSize: 13.9, range: 12});
    } else {
      var months = ~~((this.state.windowWidth * 1.2 - 25) / 100);
      if (months > 12) months = 12;
      this.setState({tallerDiv: false, cellSize: 12, range: months});
    }

    var cal = this.state.cal;
    cal.destroy();
    document.getElementById('cal-heatmap').innerHTML = '';
    this.initCal(new CalHeatMap());
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    this.initCal(this.state.cal);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  initCal: function (cal) {
    var data = this.props.timestamps;
    var parser = function (data) {
      var timestamps = {};
      data.forEach(function (ts, i) {
        timestamps[new Date(ts) / 1000] = i;
      });
      return timestamps;
    };
    cal.init({
      domain: this.state.domain,
      range: this.state.range,
      subDomain: this.state.subDomain,
      rowLimit: this.state.rowLimit,
      domainLabelFormat: this.state.domainLabelFormat,
      cellSize: this.state.cellSize,
      displayLegend: this.state.displayLegend,
      start: new Date(data[0]),
      data: data,
      dataType: 'json',
      afterLoadData: parser
    });
  },
  render: function () {
    return (
      <div>
        <div className = "Card-Section-Title Move-over">
          CONTRIBUTION TIMELINE
        </div>
        <div className = "Contribute-Timeline-Container">
          <div className = {this.state.tallerDiv ? 'Contribute-Timeline-Content tall' : 'Contribute-Timeline-Content'}>
          <div id="cal-heatmap"></div>
          </div>
        </div>
      </div>
    );
  }
});
