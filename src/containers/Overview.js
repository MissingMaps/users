import React from 'react';
import BadgeBox from '../components/BadgeBox.js';
import QuickStatsBox from '../components/QuickStatsBox.js';
import ContributionBox from '../components/ContributionBox.js';

export default React.createClass({
  getInitialState: function () {
    return {
      user: this.props.user || {}
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      user: nextProps.user
    });
  },
  render: function () {
    if (Object.keys(this.state.user).length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="overview">
          <div className = "box">
            <BadgeBox badges={this.state.user.badges} />
            <QuickStatsBox badges={this.state.user.stats} />
            <ContributionBox timestamps={this.state.user.edit_times} />
          </div>
        </div>
      );
    }
  }
});
