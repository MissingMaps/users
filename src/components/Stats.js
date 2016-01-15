import ContributionBox from '../components/ContributionBox.js';
import React from 'react';
import R from 'ramda';

export default (props) => {
  var user = props.data;

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
                Edits by Type
              </div>
            </div>
          </div>
        </div>
        <ContributionBox timestamps={user.edit_times} />
        <div id = "MapContainer">
        </div>
      </div>
    </div>
  );
};
