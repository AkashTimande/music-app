import { MdClose } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Player.css";

const Player = () => {
  const params = useParams();
  const [songDetails, setSongDetails] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    const id = parseInt(params.id, 10);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3e8e2b727fmsh55c0ae9fdac7e5bp1c8347jsn1ebb166beae5",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com"
      }
    };

    fetch(
      `https://shazam.p.rapidapi.com/songs/get-details?key=${id}&locale=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSongDetails(response))
      .catch((err) => console.error(err));
  }, [params]);

  const handleInputChange = () => {};

  const clearHandler = () => {};

  return (
    <div className="player-container">
      <section className="player-header">
        <div className="player-site-header">Spotify</div>
        <div className="player-search-bar">
          <input
            type="text"
            className="player-search-bar-input"
            placeholder="Search"
            onChange={handleInputChange}
            value={input}
          />
          {input && input.length > 0 && (
            <span className="player-close-icon" onClick={clearHandler}>
              <MdClose />
            </span>
          )}
        </div>
      </section>
      <section className="player-content">
        <div className="player-content-current-song">
          <img
            src={songDetails && songDetails?.images?.coverart}
            alt="song-details"
            className="player-song-image"
          />
          <div className="player-song-details">
            <div className="player-song-details-title">{songDetails.title}</div>
            <div className="player-song-details-singer">
              {songDetails.subtitle}
            </div>
          </div>
        </div>
        <div className="player-content-related-songs"></div>
      </section>
      <section className="audio-player">
        {/* <audio
          src={songDetails?.hub?.actions[1]?.uri}
          controls
          autoplay
          ref={ref}
        /> */}
      </section>
    </div>
  );
};

export default Player;
