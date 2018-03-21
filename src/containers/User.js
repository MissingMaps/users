import fetch from 'isomorphic-fetch';
import React from 'react';
import { Link } from 'react-router';

import UserSubHead from '../components/UserSubHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default React.createClass({
  getInitialState: function () {
    return {
      user: {}
    };
  },
  componentDidMount: function () {
    const { params: { name } } = this.props;

    fetch(`https://osm-stats-production-api.azurewebsites.net/users/${name}`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response User Fetch');
        }

        return response.json();
      })
      .then(user => {
        if (this.isMounted()) {
          this.setState({
            user
          });
        }
      })
      .catch(err =>
        this.setState({
          user: -1
        })
      );
  },
  render: function () {
    const { children } = this.props;
    const { user } = this.state;

    var UserExists = (
      <div>
        <Header />
        <div className="white" />
        <div id="User-Container">
          <div id="Main-User-Container">
            <UserSubHead user={user} />
            {user != null ? (
              children &&
              React.cloneElement(children, {
                user
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );

    if (this.state.user === -1) {
      return (
        <div>
          <Header />
          <div id="User-Container">
            <div id="No-User">
              <div className="Search-Container">
                <div className="Search-Box">
                  <img src="assets/graphics/test.svg" width="150px" />
                  <div className="Intro-Content">
                    <p>
                      We couldn't find any edits by this user yet. If you've
                      just made a contribution, it may take a few minutes to
                      show up. Go do some mapping, then come back and try again!
                    </p>
                    <p>
                      <Link to="/">&larr; Search for another user</Link>
                    </p>
                    <p>
                      We also provide instructions if you would like to learn
                      how to contribute to OpenStreetMap & Missing Maps!
                    </p>
                    <a href="http://www.missingmaps.org/contribute/">
                      <div className="button btn-grn">Contribute</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return UserExists;
  }
});
