const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  id,
  setSongs,
  isPlaying,
  audioRef,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);

    const updatedLibrary = songs.map((song) => {
      if (song.id === id) {
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
    setSongs(updatedLibrary);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected-song" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
