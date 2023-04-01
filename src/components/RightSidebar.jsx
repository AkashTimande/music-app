import ChartItem from "./ChartItem";
import "./RightSidebar.css";

const RightSidebar = ({ tracks }) => {
  return (
    <div className="rightSidebar-container">
      <section className="charts-section">
        <div className="charts-section-header">
          <div className="charts-section-header-title">Top Charts</div>
          <div className="charts-section-header-more-btn">see more</div>
        </div>
        <div className="charts-section-content">
          {tracks.map((track, index) => (
            <ChartItem track={track} index={index + 1} />
          ))}
        </div>
      </section>
      <section className="artists-section">
        <div className="artists-section-header">
          <div className="artists-section-header-title">Top Artists</div>
          <div className="artists-section-header-more-btn">see more</div>
        </div>
        <div className="artists-section-container">
          {tracks.map((track) => {
            return (
              <>
                <div className="artists-section-content">
                  <img
                    src={track.images.background}
                    alt="artist"
                    className="artists-section-content-image"
                  />
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RightSidebar;
