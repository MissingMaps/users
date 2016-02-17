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
      position: [15, 0]
    };
  },
  componentDidMount: function () {
    var map = L.map('map', {minZoom: 2}).setView(this.state.position, 2);

    L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVvZnNhdGVsbGl0ZSIsImEiOiJlZTM5ODI5NGYwZWM2MjRlZmEyNzEyMWRjZWJlY2FhZiJ9.omsA8QDSKggbxiJjumiA_w.', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var geo_extent = this.props.data.geo_extent;
    var coordinates = geo_extent.geometry.coordinates;
    L.Icon.Default.imagePath = 'assets/images/';
    var icon = L.icon({
      iconUrl: 'assets/images/blurred-marker.png',
      shadowUrl: 'assets/images/blurred-marker.png',
      iconSize: [60, 60],
      shadowSize: [10, 10],
      iconAnchor: [30, 30],
      shadowAnchor: [5, 5]
    });

    L.geoJson(geo_extent).addTo(map);
    if (geo_extent.geometry.type === 'MultiPolygon') {
      coordinates.forEach(function (feature) {
        var poly = polygon(feature);
        var c = centroid(poly);
        L.marker(R.reverse(c.geometry.coordinates), {icon: icon}).addTo(map);
      });
    } else {
      var poly = polygon(coordinates);
      var c = centroid(poly);
      L.marker(R.reverse(c.geometry.coordinates), {icon: icon}).addTo(map);
    }

    this.setState({
      map: map
    });
  },
  render: function () {
    var user = this.props.data;
    var countries = R.reverse(R.sortBy(R.prop(1), R.toPairs(user.country_list)));
    var changesetCount = user.changeset_count;

    var total = Number(user.total_road_count_add) +
      Number(user.total_road_count_mod) +
      Number(user.total_building_count_add) +
      Number(user.total_building_count_mod) +
      Number(user.total_waterway_count_add) +
      Number(user.total_poi_count_add);

    var hashtag = "http://missingmaps-leaderboards-demo.devseed.com/#/"+user.hashtags[hashtag];

    return (
      <div id = "Stats-Container">
          <div className = "Split split-contributes">
            <div className = "Card-Content Split-Content">
              <div className = "descriptor">Projects Contributed To</div>
              <table className = "table-curve">
                <tbody>
                  <tr>
                    <th>Project Hashtag</th>
                    <th>Changesets</th>
                  </tr>
                  {R.take(4, Object.keys(user.hashtags)).map(function (hashtag) {
                    var hashtaglink = "http://missingmaps-leaderboards-demo.devseed.com/#/"+hashtag;
                    return (
                      <tr key={hashtag}>
                        <td key={hashtag}><a href={hashtaglink} target="_blank">#{hashtag}</a></td>
                        <td><span className="emphasizedText">{user.hashtags[hashtag]}</span></td>
                      </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className = "Split Split-Diversity">
            <div className = "Card-Content Split-Content">
              <div className = "descriptor">
                 Edits by the Numbers
              </div>
              <PieChart user={user} />
            </div>
            <div className = "Card-Content Split-Content">
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Edit.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{total}</span></p>
                  <p>Total Edits</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Changeset.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{changesetCount}</span></p>
                  <p>Changesets</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Building.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{Number(user.total_building_count_add)}</span></p>
                  <p>Buildings</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Road.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p>
                    <span className="emphasizedNumber">
                      {Number(user.total_road_count_add)}
                    </span>
                    <span className="emphasizedNumber small">
                      {' (' + Number(user.total_road_km_add).toFixed(1) + 'km)'}
                    </span>
                  </p>
                  <p>Roads</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Water.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p>
                    <span className="emphasizedNumber">
                      {Number(user.total_waterway_count_add)}
                    </span>
                    <span className="emphasizedNumber small">
                      {' (' + Number(user.total_waterway_km_add).toFixed(1) + 'km)'}
                    </span>
                  </p>
                  <p>Waterways</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/POI.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{Number(user.total_poi_count_add)}</span></p>
                  <p>Point of Interest</p>
                </div>
              </div>
            </div>
          </div>

        <div className ="Stat-Component-Container">
          <ContributionBox timestamps={user.edit_times} />
          <div className = "descriptor">
            WORLD REACH
          </div>
          <div className = "Split Split-WorldReach">
              <table className = "table-curve">
                <tbody>
                  <tr>
                    <th>Countries most mapped</th>
                    <th></th>
                  </tr>
                  {R.take(11, countries).map(function (country) {
                    return (
                      <tr key={country[0]}>
                        <td key={country[0]}>{country[0]}</td>
                        <td><span className="emphasizedText">{country[1]}</span></td>
                      </tr>
                      );
                  })}
                </tbody>
              </table>
          </div>
          <div className = "Split Split-Map">
            <div id = "MapContainer">
              <div className = "MapContent">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

