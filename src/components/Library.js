import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs , setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus , currentSong}) => {
    return (
         <div 
        style={{
                  background : `linear-gradient(to right , ${currentSong.color[0]} , ${currentSong.color[1]})`
                }}
         className={`library  ${libraryStatus ? 'active_library' : ''} `}>
                <h2>
                  My_228_List
                </h2>
                <div className="library_songs">
                   {
                       songs.map(song =>   (
                           <LibrarySong 
                           setSongs={setSongs}
                           id={song.id}
                           isPlaying={isPlaying}
                           audioRef={audioRef}
                           key={song.id}
                           songs={songs}
                           song = {song} 
                           setCurrentSong ={setCurrentSong}
                            />
                       ))
                   }
                </div>
         </div>

    );
}



export default Library;