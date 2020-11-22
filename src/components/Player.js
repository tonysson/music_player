import React    from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";


 const  Player = ({ setCurrentSong,currentSong, isPlaying , setIsPlaying, audioRef, songInfo , setSongInfo , songs , setSongs})  => {


     //Format the time
     const getTime = (time) => {
         return (
              Math.floor(time / 60)  +  ":"  +  ("0" + Math.floor(time %  60)).slice(-2) 
     
         )
    }

    // active the the library
    const activeLibraryHandler = (nextPrev) => {

         const newSongs = songs.map(song => {
         if(song.id === nextPrev.id ){
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
    }

    //EVENTS HANDLER

    // click event on the "PLAY" icon
    const playSongHandler = () => {
        // get the current audio :  console.log(audioRef.current);
        if(isPlaying){
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        }else{
            audioRef.current.play()
             setIsPlaying(!isPlaying)
        }
    }


    //Onchange event on the input
    const dragHandler = (e) => {
        // update the audio
        audioRef.current.currentTime = e.target.value
        // we update our state
        setSongInfo({...songInfo , currentTime : e.target.value })
    }


    // allow us to go to next or the previous song
    const skipSongHandler =  async (direction) => {

        //get the current song index
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

        if(direction === "skip-forward"){
            // if the cuurentIndex + 1  === songs.length : go back to 0 ! That is what modulo does
           await    setCurrentSong(songs[(currentIndex + 1) %  songs.length])
           activeLibraryHandler(songs[(currentIndex + 1) %  songs.length])
        }

         if(direction === "skip-back"){
            
            // when we reach the end of our index , go back to the last song
             if((currentIndex - 1) %  songs.length === -1){
              await   setCurrentSong(songs[songs.length - 1]);
              activeLibraryHandler(songs[songs.length - 1])
              if(isPlaying) audioRef.current.play()
                 return;
             }
             // go back since we have  a previous index
            await   setCurrentSong(songs[(currentIndex  - 1) %  songs.length])
             activeLibraryHandler(songs[(currentIndex  - 1) %  songs.length])
        }

        // still playing the song when we skip to another
        if(isPlaying) audioRef.current.play()
    }

    // Add styles to the input range
    const trackAnim  = {
        transform : `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <>
            <div className="player_container">
           <div className="time_control">
              <p>
                 {getTime(songInfo.currentTime)}
              </p>
              <div 
                style={{
                  background : `linear-gradient(to right , ${currentSong.color[0]} , ${currentSong.color[1]})`
                }}
                className="track"
              >
                   <input 
                        onChange={dragHandler}
                        value={songInfo.currentTime}
                        min={0}
                        max={songInfo.duration || 0 }
                        type="range"
                 />
                 <div style={trackAnim} className="animated_track"></div>
              </div>
               <p>
                   {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
               </p>
           </div>
           <div className="play_control">
                 <FontAwesomeIcon  
                        onClick={() => skipSongHandler('skip-back')}
                        className="skip_back"
                        icon={faAngleLeft} 
                        size="2x"   
                   />
                  <FontAwesomeIcon 
                        onClick={playSongHandler}
                        className="play"
                        icon={ isPlaying ?  faPause : faPlay}
                        size="2x" 
                    />
                 <FontAwesomeIcon  
                        onClick={() => skipSongHandler('skip-forward')}
                        className="skip_forward"
                        icon={  faAngleRight} 
                        size="2x"    
                   />
           </div>
        </div>
        </>
    )
}

export default Player
