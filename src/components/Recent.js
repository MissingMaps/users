import React from 'react';
import moment from 'moment';

export default (props) => {
  if (!props.data) { return <div>Loading...<div></div></div>; }

  var data = props.data;
  var total = Number(data.total_road_count_add) +
    Number(data.total_road_count_mod) +
    Number(data.total_building_count_add) +
    Number(data.total_building_count_mod) +
    Number(data.total_waterway_count_add) +
    Number(data.total_poi_count_add);

  var latest = data.latest;
  var latestTotal = Number(latest.road_count_add) +
    Number(latest.road_count_mod) +
    Number(latest.building_count_add) +
    Number(latest.building_count_mod) +
    Number(latest.waterway_count_add) +
    Number(latest.poi_count_add);

  var changesetCount = data.changeset_count;

  var averageEdits = total / changesetCount;
  var lastChangesetComparison = (latestTotal / (averageEdits) * 100).toFixed(2);

  var last_edit_time = latest.created_at;
  var last_edit_day = moment(last_edit_time).format('dddd');
  var last_edit_minutes = moment(last_edit_time).format('h:mm');
  var is_plural = '';

  test_plural(latestTotal);

  function test_plural (num) {
    if (num === 1) {
      is_plural = '';
    } else {
      is_plural = 's';
    }
  }

  return (
    <div className = "Split">
      <div className = "descriptor">Latest Edit</div>
      <div className = "Recent-Edit-Box">
        <div className = "EmphasizedNumber">{latestTotal}</div>
        <div className = "Recent-Edit-Sidebar">
          <p>edit{is_plural} made</p>
          <p>{last_edit_day} at {last_edit_minutes}</p>
          <p>#{data.latest.hashtags[0].hashtag}</p>
        </div>
      </div>
      <div className = "descriptor">Historical Comparison</div>
      <div className = "Average-Comparison">
        <div className = "emphasizedText">{lastChangesetComparison}%</div> increase against your average.
      </div>
    </div>
  );
};
