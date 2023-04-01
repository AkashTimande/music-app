import { BsFillPlayCircleFill } from "react-icons/bs";
import "./ChartItem.css";

const ChartItem = ({ track, index }) => {
  const artists = track.artists.map((artist) => artist.alias);
  const artistsStr =
    artists.slice(0, -1).join(", ") + " & " + artists.slice(-1);

  return (
    <div className="chart-item-container">
      <div className="first-column">{index}</div>
      <div className="second-column">
        <div className="chart-item-img">
          <img src={track.images.coverart} alt="track-title-img" />
        </div>
        <div className="chart-item-details">
          <div className="chart-item-details-title">{track.title}</div>
          <div className="chart-item-details-artist">
            {track.artists.length > 1 ? artistsStr : track.artists[0].alias}
          </div>
        </div>
      </div>
      <div className="third-column">
        <BsFillPlayCircleFill />
      </div>
    </div>
  );
};

export default ChartItem;
