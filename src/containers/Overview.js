import React from 'react';
import Recent from '../components/Recent.js';
import Next from '../components/Next.js';
import Stats from '../components/Stats.js';

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
            <Recent data = {this.state.user}/>
            <Next data = {this.state.user}/>
            <Stats data = {this.state.user}/>
          </div>
        </div>
      );
    }
  }
});
