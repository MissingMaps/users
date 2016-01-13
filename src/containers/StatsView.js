import FullStatsBox from '../components/FullStatsBox.js';
import React from 'react';

export default React.createClass({
  getInitialState: function () {
    return {
      stats: this.props.user.stats || [],
      edit_times: this.props.user.edit_times || []
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      stats: nextProps.user.stats,
      edit_times: nextProps.user.edit_times
    });
  },
  render: function () {
    return <FullStatsBox stats={this.state.stats} times={this.state.edit_times} />;
  }
});
