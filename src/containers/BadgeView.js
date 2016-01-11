import React from 'react';
import BadgeBox from '../components/BadgeBox.js';

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
    return <BadgeBox badges={this.state.badges} />;
  }
});
