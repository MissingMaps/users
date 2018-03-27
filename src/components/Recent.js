import React from "react";
import moment from "moment";

const pluralSuffix = num => (num === 1 ? "" : "s");

export default props => {
  const { data, data: { latest } } = props;

  if (data == null) {
    return (
      <div>
        Loading...<div />
      </div>
    );
  }

  const latestTotal =
    Number(latest.road_count_add) +
    Number(latest.road_count_mod) +
    Number(latest.building_count_add) +
    Number(latest.building_count_mod) +
    Number(latest.waterway_count_add) +
    Number(latest.poi_count_add);

  const lastEditDay = moment(latest.created_at).format("dddd");
  const lastEditMinutes = moment(latest.created_at).format("h:mm");
  const lastHashtags = latest.hashtags.map(x => `#${x.hashtag}`).join(", ");

  return (
    <div className="Split split-stats">
      <div className="sub-section">
        <h3 className="descriptor">Latest Edit</h3>
        <div className="Recent-Edit-Box">
          <span className="EmphasizedNumber">
            {latestTotal.toLocaleString()}
          </span>
          <div className="Recent-Edit-Sidebar">
            <p>tracked edit{pluralSuffix(latestTotal)} made</p>
            <p>
            {latest.created_at ?
              <span>{lastEditDay} at {lastEditMinutes}</span>
              : <span>&nbsp;</span>
            }
            </p>
            <p>{lastHashtags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
