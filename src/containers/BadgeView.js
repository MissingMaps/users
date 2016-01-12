import React from 'react';
import BadgeView from '../components/BadgeView.js';

export default React.createClass({
  getInitialState: function () {
    return {
      badges: this.props.user.badges || []
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      badges: nextProps.user.badges
    });
  },
  render: function () {
    return <BadgeView badges={this.state.badges} />;
  }
});
