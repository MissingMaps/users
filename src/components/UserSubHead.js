import React from 'react';
import toArray from 'stream-to-array';
import fetch from 'isomorphic-fetch';
import {Link, IndexLink} from 'react-router';

export default React.createClass({
  getInitialState: function () {
    return {
      userName: '',
      userId: 0,
      userPic: ''
    };
  },
  getUserPic: function (userId) {
    return fetch('http://api.openstreetmap.org/api/0.6/user/' + userId)
    .then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        return res.text();
      } else {
        throw new Error("Couldn't retrieve data", res.statusText);
      }
    })
    .then(function (xmlString) {
      /* This code is more correct because it uses the browser's
         XML parser, but it chokes on malformed URLs which are
         sometimes an issue at the OSM endpoint. */
      /* var doc = new DOMParser().parseFromString(xmlString, 'text/xml');
         var result = doc.evaluate('/osm/user/img/@href', doc, null, XPathResult.STRING_TYPE, null); */
      var urlBegin = xmlString.split('<img href=')[1];
      var url = urlBegin.substring(0, urlBegin.indexOf('/>'));
      return url;
    });
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps) {
      var userName = nextProps.user.name;
      var userId = nextProps.user.id;
      var userPic = this.getUserPic(userId);
      this.setState({
        userName: userName,
        userId: userId,
        userPic: userPic
      });
    }
  },
  render: function () {
    return (
      <div>
        <div id = "Subhead-Container">
          <div id = "Subhead-Content">
            <div className = "ProfilePicture">
              <img src="assets/graphics/dummy.svg" width="120px"></img>
            </div>
            <div className = "Username titleheader">
              {this.state.userName}
              <p>Mapping Maestro</p>
            </div>
            <div className = "Subhead-Nav">
              <IndexLink to={`/${this.state.userId}`} activeClassName="activeLink">Overview</IndexLink>
              <Link to={`/${this.state.userId}/badges`} activeClassName="activeLink">Badges</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
