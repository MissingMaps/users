import React from 'react';
import R from 'ramda';
import md5 from 'spark-md5';
import binaryXHR from 'binary-xhr';
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
  arrayBufferToBase64: function (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },
  setGravatar: function (imageUrl, localGenericUrl, component) {
    // Gravatar users who have not set an image may have one of
    // several generic image versions. They are visually identical
    // but resolve to different checksums. This list may grow as
    // more are discovered.
    var genericHashes = [
      'c8dc8819527dbe51bc56c1819ccd208e',
      'e80e0a0da66ad312f6012729eb8f21f0',
      '9b1f5539a95b09345c56d932e30ab335'
    ];
    binaryXHR(imageUrl, function (err, image) {
      if (!err) {
        // Hash image
        var imageStr64 = component.arrayBufferToBase64(image);
        var imageHash = md5.hash(imageStr64);
        // Compare hashes and set state to either the user's custom
        // Gravatar image or the local generic image
        var newImageUrl = R.contains(imageHash, genericHashes) ? localGenericUrl : imageUrl;
        component.setState({userPic: newImageUrl});
      }
    });
  },
  setUserPic: function (userId) {
    var component = this;
    return fetch('http://api.openstreetmap.org/api/0.6/user/' + userId)
    .then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        return res.text();
      } else {
        throw new Error("Couldn't retrieve data", res.statusText);
      }
    })
    .then(function (xmlString) {
      var localGenericUrl = 'assets/graphics/osm-user-blank.png';
      var url = '';
      var urls = [];
      // Check for img tag in user profile
      var urlBegin = xmlString.split('<img href="')[1];
      // If no img tag, set state to the local generic image
      // (user's profile pic is generic)
      if (!urlBegin) {
        url = localGenericUrl;
        component.setState({userPic: url});
      } else {
        url = urlBegin.substring(0, urlBegin.indexOf('"/>'));
        urls = url.split('&amp;d=');
        if (urls.length < 2) {
          // If one img href tag, use it to set state
          // (it is the user's custom OSM profile icon)
          component.setState({userPic: url});
        } else {
          // If more than one img href tag, user is using Gravatar,
          // so check whether they use a custom or default icon and
          // set state to local default or their custom accordingly
          component.setGravatar(urls[0], localGenericUrl, component);
        }
      }
    });
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps) {
      var userId = nextProps.user.id;
      this.setState({
        userName: nextProps.user.name,
        userId: userId
      });
      this.setUserPic(userId);
    }
  },
  render: function () {
    return (
      <div>
        <div id = "Subhead-Container">
          <div id = "Subhead-Content">
            <div className = "ProfilePicture">
              <img src={this.state.userPic} width="120px"></img>
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
