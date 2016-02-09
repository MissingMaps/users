import React from 'react';
import Recent from '../components/Recent.js';
import Next from '../components/Next.js';
import Stats from '../components/Stats.js';
import RecentBadge from '../components/RecentBadge.js';

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
            <div className = "User-Page-Top">
              <Recent data = {this.state.user}/>
              <RecentBadge />
              <Next data = {this.state.user}/>
            </div>
              <Stats data = {this.state.user}/>
          </div>
        </div>
      );
    }
  }
});
