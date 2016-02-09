import ContributionBox from '../components/ContributionBox.js';
import PieChart from '../components/PieChart.js';
import React from 'react';
import R from 'ramda';
import L from 'leaflet';
import centroid from 'turf-centroid';
import polygon from 'turf-polygon';

export default React.createClass({
  getInitialState: function () {
    return {
      map: {},
      position: [51.505, -0.09]
    };
  },
  componentDidMount: function () {
    var map = L.map('map').setView(this.state.position, 2);

    L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVvZnNhdGVsbGl0ZSIsImEiOiJlZTM5ODI5NGYwZWM2MjRlZmEyNzEyMWRjZWJlY2FhZiJ9.omsA8QDSKggbxiJjumiA_w.', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var geo_extent = this.props.data.geo_extent;
    L.Icon.Default.imagePath = 'assets/images/';
    L.geoJson(geo_extent).addTo(map);
    geo_extent.geometry.coordinates.forEach(function (feature) {
      var poly = polygon(feature);
      var c = centroid(poly);
      L.marker(R.reverse(c.geometry.coordinates)).addTo(map);
    });

    this.setState({
      map: map
    });
  },
  render: function () {
    var user = this.props.data;
    return (
      <div id = "Stats-Container">
            <div className = "Split-3">
              <div className = "Card-Content Split-Content">
                <div className = "descriptor">By The Numbers</div>

              </div>
            </div>
            <div className = "Split-3">
              <div className = "Card-Content Split-Content">
                <div className = "descriptor">
                   Diversity of Edits
                </div>
                <PieChart user={user} />
              </div>
            </div>
            <div className = "Split-3">
              <div className = "Card-Content Split-Content">
                <div className = "descriptor">Projects Contributed To</div>
                <table className = "table-curve">
                  <tbody>
                    <tr>
                      <th>Project Hashtag</th>
                      <th>Edits</th>
                    </tr>
                    {R.take(4, Object.keys(user.hashtags)).map(function (hashtag) {
                      return (
                        <tr key={hashtag}>
                          <td key={hashtag}>#{hashtag}</td>
                          <td>{user.hashtags[hashtag]}</td>
                        </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
          </div>
          <div className ="Stat-Component-Container">
            <ContributionBox timestamps={user.edit_times} />
            <div className = "descriptor">
              WORLD REACH
            </div>
            <div id = "MapContainer">
              <div className = "MapContent">
                <div id="map"></div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});

