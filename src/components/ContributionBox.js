import React from 'react';
import CalHeatMap from 'cal-heatmap';

export default React.createClass({
  getInitialState: function () {
    return {
      timestamps: this.props.timestamps || {}
    };
  },
  componentDidMount: function () {
    var data = this.props.timestamps;
    var cal = new CalHeatMap();
    var parser = function (data) {
      var timestamps = {};
      data.forEach(function (ts, i) {
        timestamps[new Date(ts) / 1000] = i;
      });
      return timestamps;
    };
    cal.init({
      domain: 'month',
      subDomain: 'day',
      cellSize: 15.25,
      range: 12,
      rowLimit: 7,
      start: new Date(data[0]),
      // maxDate: var end_date = new Date(start_date.setDate(start_date.getDate() + (7 * 1)));,
      data: data,
      dataType: 'json',
      afterLoadData: parser
    });
  },
  render: function () {
    return (
      <div>
        <div className = "Contribute-Timeline-Container">
          <div className = "badgeheader">Contribution Timeline</div>
          <div className = "Contribute-Timeline-Content">
          <div id="cal-heatmap"></div>
          </div>
        </div>
      </div>
    );
  }
});
