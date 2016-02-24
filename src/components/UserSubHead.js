import React from 'react';
import R from 'ramda';
import md5 from 'spark-md5';
import binaryXHR from 'binary-xhr';
import fetch from 'isomorphic-fetch';
import {Link, IndexLink} from 'react-router';
import {sortBadgeHashtags} from '../badge_logic/badge_cruncher.js';

export default React.createClass({
  getInitialState: function () {
    return {
      userName: '',
      userId: 0,
      userPic: '',
      userTagline: '',
      badges: ''
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
      '9a2ccc34a976d9e034142f01b205d8e8',
      '1189394e6979d5a03c75384b58b79b7c'
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
      var localGenericUrl = 'assets/graphics/osm-user-blank.jpg';
      var url = '';
      var urls = [];
      // Check for img href in user profile
      var urlBegin = xmlString.split('<img href="')[1];
      // If no img href, set state to the local generic image
      // (user's profile pic is generic)
      if (!urlBegin) {
        url = localGenericUrl;
        component.setState({userPic: url});
      } else {
        url = urlBegin.substring(0, urlBegin.indexOf('"/>'));
        urls = url.split('&amp;d=');
        if (urls.length < 2) {
          // If one img href, use the 'large' version to set
          // state (it is the user's custom OSM profile pic)
          url = url.replace('/original/', '/large/');
          component.setState({userPic: url});
        } else {
          // If >one img href, pic is from Gravatar, so check if
          // user has custom or generic pic and set state to local
          // generic or 128px version of their pic accordingly.
          url = urls[0].replace('?s=256', '?s=128');
          component.setGravatar(url, localGenericUrl, component);
        }
      }
    });
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps) {
      var userId = nextProps.user.id;
      var userTagline = this.userTagline(nextProps.user.badges.length);
      var latestBadge = sortBadgeHashtags(nextProps.user);
      var userName = nextProps.user.name;
      var userNameCap = nextProps.user.name.charAt(0).toUpperCase() + nextProps.user.name.slice(1);
      var badgeChecker = false;
      var latestBadgeName = '';
      var latestBadgeLevel = '';

      if (latestBadge.length !== 0) {
        latestBadgeName = latestBadge[0].name;
        latestBadgeLevel = latestBadge[0].level;
        badgeChecker = true;
      }

      this.setState({
        userName: userName,
        userNameCap: userNameCap,
        userId: userId,
        userTagline: userTagline,
        userBadge: latestBadgeName,
        badgeLevel: latestBadgeLevel,
        badgeCheck: badgeChecker
      });
      this.setUserPic(userId);
    }
  },
  userTagline: function (badgeCount) {
    if (badgeCount < 1) {
      return 'Beginner Mapper';
    }
    if (badgeCount >= 1 && badgeCount < 8) {
      return 'Novice Mapper';
    }
    if (badgeCount >= 8 && badgeCount < 16) {
      return 'Pro Mapper';
    }
    if (badgeCount >= 16 && badgeCount < 30) {
      return 'Super Mapper';
    }
    return 'Map Addict';
  },
  render: function () {
    var twittermsg = '';
    if (this.state.badgeCheck) {
      var badgeName = this.state.userBadge;
      var badgeLevel = this.state.badgeLevel;
      twittermsg = this.state.userNameCap + ' earned the ' + badgeName + ' badge (lv.' + badgeLevel + ') on MissingMaps!';
    } else {
      twittermsg = this.state.userNameCap + ' contributed to MissingMaps! Checkout their progress at ';
    }
    let message = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twittermsg + ' ' + window.location);
    var osmlink = 'http://www.openstreetmap.org/user/' + this.state.userName;
    return (
      <div>
        <div id = "Subhead-Container">
          <div className = "Subhead-Top">
            <div className = "Subhead-Back">
              <a href="">&#8592; Back to search</a>
            </div>
            <a className="Subhead-Share"
              style={{'cursor': 'pointer'}}
              href={message} target='_blank'>
                  <img src="assets/graphics/twitter.svg" width= "18px"></img>Share
            </a>
          </div>
          <div id = "Subhead-Content">
            <div className = "ProfilePicture"
              style = {{backgroundImage: 'url(' + this.state.userPic + ')'}}>
            </div>
            <div className = "Username titleheader">
              {this.state.userName}
              <p>{this.state.userTagline} &nbsp; | &nbsp; <a href={osmlink} target = "_blank">OSM Profile</a> </p>
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
