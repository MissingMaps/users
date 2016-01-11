import React from 'react';
import UserSubHead from '../components/UserSubHead';

export default React.createClass({
  render: function () {
    return (
      <div>
        <div id = "User-Container">
          <div id = "Main-User-Container">
            <UserSubHead username={this.props.params.id}/>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
