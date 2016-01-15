import React from 'react';
import BadgeView from '../components/FullBadgeBox.js';

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
    console.log(this.props);
    return <BadgeView badges={this.state.badges} />;
  }
});
