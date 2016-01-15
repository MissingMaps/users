import ContributionBox from '../components/ContributionBox.js';
import React from 'react';
import R from 'ramda';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default (props) => {
  var user = props.data;
  const position = [51.505, -0.09];

  return (
    <div id = "Stats-Container">
      <div className = "Card">
        <div className = "Card-title">{user.name}''s Statistics</div>
        <div className = "Card-Content">
          <div className = "Split-3">
            <div className = "Card-Content Split-Content">
              <div className = "Card-Section-Title">
                PROJECTS CONTRIBUTED TO
              </div>
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
          <div className = "Split-3">
            <div className = "Card-Content Split-Content">
              <div className = "Card-Section-Title">
                BY THE NUMBERS
              </div>
              <table className = "table-curve">
                <tbody>
                <tr>
                  <td>Buildings added</td>
                  <td>{Number(user.total_building_count_add)}</td>
                </tr>
                <tr>
                  <td>Roads Added</td>
                  <td>{Number(user.total_road_count_add)}</td>
                </tr>
                <tr>
                  <td>km of Roads Added</td>
                  <td>{Number(user.total_road_km_add).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>km of Waterways Added</td>
                  <td>{Number(user.total_waterway_km_add).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Point of Interests Added</td>
                  <td>{Number(user.total_poi_count_add)}</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
          <div className = "Split-3">
            <div className = "Card-Content Split-Content">
              <div className = "Card-Section-Title">
                TYPE OF EDITS
              </div>
            </div>
          </div>
        </div>
        <div className ="Stat-Component-Container">
	        <ContributionBox timestamps={user.edit_times} />
					<div className = "Card-Section-Title Move-over">
						WORLD REACH
					</div>
					<div id = "MapContainer">
						<div className = "MapContent">
							<Map center={position} zoom={2}>
								<TileLayer
								url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
							</Map>
						</div>
					</div>
				</div>
	   </div>
    </div>
  );
};
