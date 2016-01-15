import React from 'react';
import UserSubHead from '../components/UserSubHead';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import fetch from 'isomorphic-fetch';

export default React.createClass({
  getInitialState: function () {
    return {
      user: {}
    };
  },
  componentDidMount: function () {
    let component = this;
    if (process.env.NODE_ENV === 'development') {
      fetch(`http://104.236.25.175:3000/users/${this.props.params.id}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (db) {
        if (component.isMounted()) {
          component.setState({
            user: db
          });
        }
      });
    }
  },
  render: function () {
    console.log(this.state);
    return (
      <div>
      <Header />
        <div className = "white"></div>
        <div id = "User-Container">
          <div id = "Main-User-Container">
            <UserSubHead user={this.state.user}/>
            {(
              (typeof this.state.user !== 'undefined')
              ? this.props.children && React.cloneElement(this.props.children, {
                user: this.state.user
              })
                : <div>Loading...</div>)
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});
