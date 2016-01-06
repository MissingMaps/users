import React from 'react';

export default React.createClass({
  componentWillMount: function () {
    // get user json from api
  },
  render: function () {
    return (
      <div>Hello, {this.props.params.id}!</div>
    );
  }
});
