import { useState, useEffect, useContext, useRef } from "react";
import HomeContainer from "../components/HomeContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import "./Home.css";
import AudioContext from "./../context/AudioContext";
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
  const ctx = useContext(AudioContext);
  const ref = useRef();

  const playAction = () => {
    const playPromise = ref.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {})
        .catch((error) => {
          console.log("error");
        });
    }
  };

  const pauseAction = () => {
    ref.current.pause();
  };
  return (
    <div className="container">
      <Sidebar />
      <HomeContainer
        tracks={ctx.tracks}
        playAction={playAction}
        pauseAction={pauseAction}
      />
      <RightSidebar tracks={ctx.tracks} />
      {ctx.currentSong && <MusicPlayer />}
    </div>
  );
};

export default Home;
