import React from 'react';
import EmbedBadgeView from '../components/EmbedBadgeBox.js';
import {getBadgeProgress} from '../badge_logic/badge_cruncher.js';

export default React.createClass({
  getInitialState: function () {
    var progress = {};
    if (Object.keys(this.props.user).length) {
      progress = getBadgeProgress(this.props.user);
    }
    return {
      earnedBadges: this.props.user.badges || [],
      progress: progress
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
    return <EmbedBadgeView userName={this.props.user.name} badges={this.state.earnedBadges} progress={this.state.progress}/>;
  }
});
