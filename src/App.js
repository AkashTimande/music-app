import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import AudioContext from "./context/AudioContext";
import "./styles.css";
import { useRef, useState, useEffect } from "react";
import { options } from "./utilities/options";

export default function App() {
  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const audioRef = useRef(null);
  const songProgressRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0",
      options
    )
      .then((response) => response.json())
      .then((response) => setTracks(response.tracks))
      .catch((err) => console.error(err));
  }, []);

  const playAction = () => {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("playing");
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };
  console.log("audioRef: ", audioRef);

  const pauseAction = () => {
    audioRef.current.pause();
  };

  const playPauseHandler = (track) => {
    if (currentSong === undefined || currentSong?.key !== track.key) {
      setCurrentSong(track);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      pauseAction();
    } else {
      playAction();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    let currIndex = tracks.findIndex((track) => track.key === currentSong.key);
    if (currIndex === tracks.length - 1) {
      currIndex = -1;
    }
    const nextSong = tracks[currIndex + 1];
    setCurrentSong(nextSong);
  };

  const data = {
    tracks,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    playPauseHandler,
    audioRef,
    songProgressRef
  };
  return (
    <AudioContext.Provider value={data}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/play/:id" element={<Player />} />
        </Routes>
        <audio
          src={currentSong?.hub.actions[1].uri}
          autoPlay
          controls
          ref={audioRef}
        >
          {" "}
        </audio>
      </div>
    </AudioContext.Provider>
  );
}
