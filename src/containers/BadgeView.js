import React from 'react';
import BadgeView from '../components/FullBadgeBox.js';
import {getBadgeProgress} from '../badge_logic/badge_cruncher'

export default React.createClass({
  getInitialState: function () {
    return {
      earnedBadges: this.props.user.badges || [],
      progress: {}
    };
  },
  componentWillReceiveProps: function (nextProps) {
    var user = nextProps.user;
    var progress = getBadgeProgress(user);

    this.setState({
      earnedBadges: nextProps.user.badges,
      progress: progress
    });
  },
  render: function () {
    console.log(this.props);
    return <BadgeView badges={this.state.earnedBadges} progress={this.state.progress}/>;
  }
});
