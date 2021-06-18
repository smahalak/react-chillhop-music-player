import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setCurrentSong,
  songs,
  currentSong,
  setSongInfo,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "next-song") {
      await setCurrentSong(songs[currentIndex + 1] || songs[0]);
    } else if (direction == "previous-song") {
      await setCurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]);
    }

    if (isPlaying) audioRef.current.play();
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player-container">
      <div className="time-container">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.songLength || 0}
          value={songInfo.currentTime}
          type="range"
        />
        <p>
          {songInfo.songLength ? getTime(songInfo.songLength) : "Loading..."}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("previous-song")}
          icon={faArrowCircleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("next-song")}
          icon={faArrowCircleRight}
          size="3x"
        />
      </div>
    </div>
  );
};

export default Player;
