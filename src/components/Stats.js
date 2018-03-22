import ContributionBox from '../components/ContributionBox.js';
import PieChart from '../components/PieChart.js';
import React from 'react';
import R from 'ramda';
import L from 'leaflet';
import centroid from 'turf-centroid';
import polygon from 'turf-polygon';

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function getOpacity(d) {
    return d > 10 ? 0.7 : 0;
}

export default React.createClass({
  getInitialState: function () {
    return {
      map: {},
      position: [15, 0],
      kmStatsStyle: {clear: 'none'}
    };
  },
  style: function (feature) {
    const { data: { country_list: countries } } = this.props;

    const count = countries[feature.properties.adm0_a3];

    return {
      fillColor: getColor(count),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: getOpacity(count)
    };
  },
  componentDidMount: function () {
    var map = L.map('map', {minZoom: 1}).setView(this.state.position, 1);
    map.attributionControl.setPrefix('');

    L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoic3RhdGVvZnNhdGVsbGl0ZSIsImEiOiJlZTM5ODI5NGYwZWM2MjRlZmEyNzEyMWRjZWJlY2FhZiJ9.omsA8QDSKggbxiJjumiA_w.', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson").then(rsp => rsp.json()).then(countries => {
      L.geoJson(countries, { style: this.style }).addTo(map);

      this.setState({
        countries
      })
    });


    // force km stats to clear left if too large for container
    var roadCountLength = Number(this.props.data.total_road_count_add).toFixed().length;
    var waterCountLength = Number(this.props.data.total_waterway_count_add).toFixed().length;
    if (roadCountLength > 3 || waterCountLength > 3) {
      this.setState({kmStatsStyle: {clear: 'left'}});
    }

    this.setState({
      map: map
    });
  },
  componentWillReceiveProps: function(props) {
  },
  render: function () {
    var user = this.props.data;
    const { countries } = this.state;

    let countryList;

    if (countries != null) {
      countryList = Object.keys(user.country_list)
        .map(x => {
          const feature = countries.features.find(c => c.properties.adm0_a3 === x);

          if (feature != null) {
            return [feature.properties.name_long, user.country_list[x]];
          }

          return [x, user.country_list[x]]
        });
    } else {
      countryList = Object.keys(user.country_list).map(x => [x, user.country_list[x]]);
    }

    const countryCounts = countryList.sort((a, b) => b[1] - a[1]);
    var changesetCount = Number(user.changeset_count);

    var total =
      user.total_road_count_add +
      user.total_road_count_mod +
      user.total_building_count_add +
      user.total_building_count_mod +
      user.total_waterway_count_add +
      user.total_poi_count_add;

    // Round km calculation depending on length
    var total_buildings = user.total_building_count_add + user.total_building_count_mod;
    var total_road_km = user.total_road_km_add.toFixed(1);
    total_road_km = (total_road_km.length > 4) ? Math.round(total_road_km) : total_road_km;
    var total_waterway_km = user.total_waterway_km_add.toFixed(1);
    total_waterway_km = (total_waterway_km.length > 4) ? Math.round(total_waterway_km) : total_waterway_km;

    return (
      <div id = "Stats-Container">
          <div className = "Split split-contributes">
            <div className = "Card-Content Split-Content">
              <div className = "descriptor">Recent Projects Contributed To</div>
              <table className = "table-curve">
                <tbody>
                  <tr>
                    <th>Project Hashtag</th>
                    <th>Changesets</th>
                  </tr>
                  {R.takeLast(4, Object.keys(user.hashtags)).map(function (hashtag) {
                    var hashtaglink = 'http://missingmaps.org/leaderboards/#/' + hashtag;
                    return (
                      <tr key={hashtag}>
                        <td key={hashtag}><a href={hashtaglink} target="_blank">#{hashtag}</a></td>
                        <td><span className="emphasizedText">{user.hashtags[hashtag].toLocaleString()}</span></td>
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
                  <p><span className="emphasizedNumber">{total.toLocaleString()}</span></p>
                  <p>Total Edits</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Changeset.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{changesetCount.toLocaleString()}</span></p>
                  <p>Changesets</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Building.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{total_buildings.toLocaleString()}</span></p>
                  <p>Building Edits</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/POI.svg" width="50px"></img>
                <div className="Stat-Info">
                  <p><span className="emphasizedNumber">{Number(user.total_poi_count_add).toLocaleString()}</span></p>
                  <p>Point of Interest</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Road.svg" width="50px"></img>
                <div className="Stat-Info">
                    <span className="emphasizedNumber small"
                      style={this.state.kmStatsStyle}>
                      {' ' + total_road_km.toLocaleString() + ' km'}
                    </span>
                  <p>Roads</p>
                </div>
              </div>
              <div className = "Stats-Item">
                <img src="assets/graphics/staticons/Water.svg" width="50px"></img>
                <div className="Stat-Info">
                    <span
                      className="emphasizedNumber small"
                      style={this.state.kmStatsStyle}
                    >
                      {' ' + total_waterway_km.toLocaleString() + ' km'}
                    </span>
                  <p>Waterways</p>
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
                    <th><span>Countries most mapped</span></th>
                    <th></th>
                  </tr>
                  {R.take(11, countryCounts).map(function (country) {
                    var countryName = country[0];

                    if (country[0] === 'Democratic Republic of the Congo') {
                      countryName = 'DR Congo';
                    } else if (country[0] === 'United States of America') {
                      countryName = 'USA';
                    } else if (country[0] === 'French Southern and Antarctic Lands') {
                      countryName = 'ATF';
                    } else if (country[0] === 'United Republic of Tanzania') {
                      countryName = 'Tanzania';
                    } else if (country[0] === 'Central African Republic') {
                      countryName = 'CAR';
                    }

                    return (
                      <tr key={country[0]}>
                        <td key={country[0]}>{countryName}</td>
                        <td><span className="emphasizedText">{country[1].toLocaleString()}</span></td>
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
