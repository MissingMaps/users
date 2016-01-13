import React from 'react';
import CalHeatMap from 'cal-heatmap';

export default React.createClass({
  getInitialState: function () {
    return {
      timestamps: this.props.timestamps || {},
      windowWidth: window.innerWidth,
      domain: 'month',
      range: 12,
      subDomain: 'day',
      rowLimit: 7,
      domainLabelFormat: '%b',
      cellSize: 12,
      cal: new CalHeatMap()
    };
  },
  handleResize: function (e) {
    // Set the number of calendar months to display at the
    // smaller of (horizontal resolution + 30) / 100 and 12.
    this.setState({windowWidth: window.innerWidth});
    var months = ~~((this.state.windowWidth + 30) / 100);
    if (months > 12) months = 12;
    this.setState({range: months});

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
      start: new Date(data[0]),
      data: data,
      dataType: 'json',
      afterLoadData: parser
    });
  },
  render: function () {
    return (
      <div>
        <div className = "Contribute-Timeline-Container">
          <div className = "badgeheader">Contribution Timeline Current window width: {this.state.windowWidth}</div>
          <div className = "Contribute-Timeline-Content">
          <div id="cal-heatmap"></div>
          </div>
        </div>
      </div>
    );
  }
});
