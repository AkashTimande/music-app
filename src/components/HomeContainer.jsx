import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Track from "./Track";
import { options } from "./../utilities/options";
import "./HomeContainer.css";

const HomeContainer = ({ tracks, playAction, pauseAction }) => {
  const [input, setInput] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    fetch(
      `https://shazam.p.rapidapi.com/auto-complete?term=${e.target.value}&locale=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAutoCompleteList(response.hints))
      .catch((err) => console.error(err));
  };

  const clearHandler = () => {
    setInput("");
    setAutoCompleteList([]);
  };

  return (
    <div className="homeContainer-container">
      <section className="header-section">
        <div className="search-bar">
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search"
            onChange={handleInputChange}
            value={input}
          />
          {input && input.length > 0 && (
            <span className="close-icon" onClick={clearHandler}>
              <MdClose />
            </span>
          )}
        </div>
        <div className="auto-complete-list">
          {autoCompleteList.map((item) => {
            return (
              <div className="auto-complete-item">
                <span className="search-bar-icon">
                  <BsSearch />
                </span>
                {item.term}
              </div>
            );
          })}
        </div>
        <div className="heading">Discover</div>
      </section>
      <div className="tracks-home-container">
        {tracks &&
          tracks.map((track) => (
            <Track
              track={track}
              playAction={playAction}
              pauseAction={pauseAction}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeContainer;
