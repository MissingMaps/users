import React from 'react';
import UserSubHead from '../components/UserSubHead';
import {Link} from 'react-router';
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
    var fetch_thisid = this.props.params.name;
    fetch(`https://osm-stats-api.azurewebsites.net/users`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response Users Fetch');
        }
        return response.json();
      })
      .then(function (data) {
        var usercheck = data.filter(function (element) {
          return element.name.replace(/\s+/g, '-').toLowerCase() === fetch_thisid;
        });

        if (usercheck.length > 0) {
          fetch(`https://osm-stats-api.azurewebsites.net/users/${usercheck[0].id}`)
          .then(function (response) {
            if (response.status >= 400) {
              throw new Error('Bad response User Fetch');
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
        } else {
          component.setState({
            user: -1
          });
        }
      });
  },
  render: function () {
    var UserExists = (
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
    if (this.state.user === -1) {
      return (
        <div>
          <Header />
          <div id = "User-Container">
            <div id = "No-User">
              <div className = "Search-Container">
                <div className = "Search-Box">
                  <img src="assets/graphics/test.svg" width = "150px"></img>
                  <div className = "Intro-Content">
                    <p>
                      This database began on February 2016, so we haven't picked up any edits by this user yet. If you've just made a contribution, it may take a few minutes to show up. Go do some mapping, then come back and try again!
                    </p>
                    <p>
                      <Link to='/'>&larr; Search for another user</Link>
                    </p>
                    <p>
                      We also provide instructions if you would like to learn how to contribute to OpenStreetMap & MissingMaps!
                    </p>
                    <a href="http://www.missingmaps.org/contribute/">
                    <div className = "button btn-grn">
                      Contribute
                    </div></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (UserExists);
    }
  }
});
