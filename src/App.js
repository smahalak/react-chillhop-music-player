import "./styles/app.scss";
import music from "./Music";

import Player from "./components/Player";
import Nav from "./components/Nav";
import Song from "./components/Song";
import Library from "./components/Library";
import { useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(music());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    songLength: 0,
  });

  const timeUpdateHandler = () => {
    const currentTime = audioRef.current.currentTime;
    const songLength = audioRef.current.duration;
    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      songLength: songLength,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[currentIndex + 1] || songs[0]);
    activeLibraryHandler(songs[currentIndex + 1] || songs[0]);
    if (isPlaying) audioRef.current.play();
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        activeLibraryHandler={activeLibraryHandler}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
