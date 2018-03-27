import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default React.createClass({
  onSubmit: function (evt) {
    evt.preventDefault();
    const input = evt.target.query.value;

    this.props.history.push('/' + input);

    return false;
  },

  render: function () {
    return (
      <div>
        <Header />
        <div className="Search-Container">
          <div className="Search-Box">
            <img src="assets/graphics/test.svg" width="150px" />
            <div className="Intro-Content">
              <p>
                Type in your OSM username to see how you've contributed to
                MissingMaps projects & see the badge rewards you've earned!
              </p>
            </div>
            <div className="Search-Content">
              <div className="search-bar-wrapper">
                <form className="search-bar-field" onSubmit={this.onSubmit}>
                  <input
                    className="search-bar-input"
                    name="query"
                    type="text"
                    maxLength="100"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Search for OSM user"
                  />
                  <span className="icon search-bar-cancel" />
                  <input
                    className="icon search-bar-submit"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});
