import LibrarySong from "./LibrarySong";

const Library = ({
  libraryStatus,
  songs,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
}) => {
  return (
    <div className={`library  ${libraryStatus ? "library-active" : ""}`}>
      <h2>Xtra Chill, Xtra Hop</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setCurrentSong={setCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
