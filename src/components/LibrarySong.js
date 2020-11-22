import React from 'react';

const LibrarySong = ({song , songs , setCurrentSong ,audioRef, isPlaying, id , setSongs}) => {


const songSelectHandler = async  () => {

    // update the state with the song we selected
   await   setCurrentSong(song)

      //Add active state
     const newSongs = songs.map(song => {
         if(song.id === id ){
             return {
                 ...song,
                 active:true
             }
         }else{
             return{
                 ...song,
                 active:false
             }
         }
     })
     setSongs(newSongs)

      //check if the  song is playing
     if(isPlaying) audioRef.current.play()
}

    return (
        <div 
        onClick={ songSelectHandler} 
        className={`library_song  ${song.active ?  'selected' : ""}  `}>
           <img src={song.cover} alt={song.name}/>
           <div className="song_description">
               <h3>
               {song.name}
            </h3>
             <h4>
               {song.artist}
              </h4>
           </div>
       </div>
    );
}



export default LibrarySong;