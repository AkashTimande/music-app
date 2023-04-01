import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Track.css";
import AudioContext from "./../context/AudioContext";

const Track = ({ track, pauseAction, playAction }) => {
  const navigate = useNavigate();
  const ctx = useContext(AudioContext);

  const artists = track.artists.map((artist) => artist.alias);
  const artistsStr =
    artists.slice(0, -1).join(", ") + " & " + artists.slice(-1);

  // const handleTrack = () => {
  //   // navigate(`/play/${track.key}`);
  //   ctx.setCurrentSong(track);
  //   setPlaying(true);
  // };

  return (
    <>
      <section
        className="track-section"
        onClick={() => ctx.playPauseHandler(track)}
      >
        <div
          className={`track-image ${
            ctx?.currentSong?.key === track.key ? "active-song" : ""
          }`}
        >
          <img
            src={track.images.coverart}
            alt="track-img"
            className="track-image-img"
          />
        </div>
        <div className="track-title">{track.title}</div>
        <div className="track-artist">
          {track.artists.length > 1 ? artistsStr : track.artists[0].alias}
        </div>
        {ctx?.currentSong?.key === track.key && (
          <div className="overlay-btn">
            {ctx.isPlaying ? <GiPauseButton /> : <FaPlay />}
          </div>
        )}
      </section>
    </>
  );
};

export default Track;
