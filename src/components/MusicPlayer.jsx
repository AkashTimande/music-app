import { useState, useContext, useEffect, useRef } from "react";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { MdReplay } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { GiPauseButton } from "react-icons/gi";
import { ImVolumeHigh, ImVolumeLow, ImVolumeMute2 } from "react-icons/im";
import "./MusicPlayer.css";
import AudioContext from "./../context/AudioContext";

const MusicPlayer = () => {
  const ctx = useContext(AudioContext);
  const songProgressRef = useRef(null);
  const volumeRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [isMute, setIsMute] = useState(false);

  const artists = ctx.currrentSong?.artists.map((artist) => artist.alias);
  const artistsStr = artists
    ? artists.slice(0, -1).join(", ") + " & " + artists.slice(-1)
    : "";
  const [time, setTime] = useState();
  useEffect(() => {
    setInterval(() => {
      if (
        parseInt(ctx.audioRef.current.currentTime, 10) ===
        parseInt(ctx.audioRef.current.duration, 10)
      ) {
        let currIndex = ctx.tracks.findIndex(
          (track) => track.key === ctx.currentSong.key
        );
        if (currIndex === ctx.tracks.length - 1) {
          currIndex = -1;
        }
        const nextSong = ctx.tracks[currIndex + 1];
        ctx.setCurrentSong(nextSong);
      } else {
        songProgressRef.current.value = ctx.audioRef.current?.currentTime;
        setTime(ctx.audioRef.current?.currentTime);
      }
    }, 1000);
  });

  const progressHandler = (e) => {
    ctx.audioRef.current.currentTime = e.target.value;
  };

  const getTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes =
      minutes < 10 ? "0" + parseInt(minutes, 10) : parseInt(minutes, 10);
    extraSeconds =
      extraSeconds < 10
        ? "0" + parseInt(extraSeconds, 10)
        : parseInt(extraSeconds, 10);
    if (isNaN(minutes) || isNaN(extraSeconds)) {
      return "00:00";
    }
    return `${minutes}:${extraSeconds}`;
  };

  const volumeChnagehandler = (e) => {
    console.log("vol: ", e.target.value);
    setVolume(e.target.value);
    ctx.audioRef.current.volume = e.target.value;
  };

  const forwardHandler = () => {
    const currentTime = ctx.audioRef.current.currentTime + 5;
    if (currentTime > ctx.audioRef.current?.duration) {
      let currIndex = ctx.tracks.findIndex(
        (track) => track.key === ctx.currentSong.key
      );
      if (currIndex === ctx.tracks.length - 1) {
        currIndex = -1;
      }
      const nextSong = ctx.tracks[currIndex + 1];
      ctx.setCurrentSong(nextSong);
    }
    ctx.audioRef.current.currentTime = currentTime;
    songProgressRef.current.value = currentTime;
  };

  const backwardHandler = () => {
    const currentTime = ctx.audioRef.current.currentTime - 5;
    if (currentTime <= 0) {
      ctx.audioRef.current.currentTime = 0;
    } else {
      ctx.audioRef.current.currentTime = currentTime;
      songProgressRef.current.value = currentTime;
    }
  };

  const handleMute = () => {
    if (isMute) {
      setIsMute(false);
      ctx.audioRef.current.volume = volume;
    } else {
      setIsMute(true);
      ctx.audioRef.current.volume = 0;
    }
  };

  console.log("aref: ", ctx.audioRef);
  return (
    <div className="music-player-container">
      <div className="music-player-details-section">
        <div className="details-section-img">
          <img src={ctx.currentSong?.images.coverart} alt="track-title-img" />
        </div>
        <div className="details-section-details">
          <div className="details-section-title">{ctx.currentSong?.title}</div>
          <div className="details-section-artist">
            {ctx.currentSong?.subtitle}
          </div>
        </div>
      </div>
      <div className="music-player-controls-section">
        <div className="music-player-controls-conainer">
          <div className="action-btn">
            <MdReplay />
          </div>
          <div className="action-btn">
            <IoPlaySkipBackSharp onClick={backwardHandler} />
          </div>
          <div
            className="action-btn"
            onClick={() => ctx.playPauseHandler(ctx.currentSong)}
          >
            {ctx.isPlaying ? <GiPauseButton /> : <FaPlay />}
          </div>
          <div className="action-btn" onClick={forwardHandler}>
            <IoPlaySkipForwardSharp />
          </div>
          <div className="action-btn">
            <BiShuffle />
          </div>
        </div>
        <div className="progress-continer">
          <span className="time">{getTime(time)}</span>
          <input
            type="range"
            defaultValue="0"
            className="progress-input"
            ref={songProgressRef}
            onChange={progressHandler}
            min="0"
            max={ctx.audioRef.current?.duration}
          />
          <span className="time">
            {getTime(ctx.audioRef.current?.duration)}
          </span>
        </div>
      </div>
      <div className="music-player-volume-section">
        <span onClick={handleMute}>
          {volume === "0" || isMute ? (
            <ImVolumeMute2 />
          ) : volume <= 0.5 ? (
            <ImVolumeLow />
          ) : (
            <ImVolumeHigh />
          )}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          ref={volumeRef}
          onChange={volumeChnagehandler}
          value={volume}
          disabled={isMute}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
